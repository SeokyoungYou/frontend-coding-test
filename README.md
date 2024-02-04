# Yess Web Frontend 사전 과제 기반 코드 (CRA 활용)

## 사용 라이브러리

- TypeScript
- 상태관리:[Jotai](https://jotai.org/)
- 스타일: TailwindCSS, lucide-react(아이콘)
- axios, lodash.isequal, uuid

## 1. Cat Viewer

### 요구사항

#### 레이아웃

- 응답 데이터를 3열로 분리합니다.

```tsx
  const [column1, column2, column3] = [0, 1, 2].map((columnIndex) =>
    catData.images.filter((_, index) => index % 3 === columnIndex)
  );

  ...

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        <div key="cat-col-1" className="flex flex-col gap-4">
        {column1.map((image, imageIndex) => (
            <ColumnOne key={image.id} image={image} index={imageIndex} />
        ))}
        </div>
        <div key="cat-col-2" className="flex flex-col gap-4">
        {column2.map((image, imageIndex) => (
            <ColumnTwo key={image.id} image={image} index={imageIndex} />
        ))}
        </div>
        <div key="cat-col-3" className="flex flex-col gap-4">
        {column3.map((image, imageIndex) => (
            <ColumnThree key={image.id} image={image} index={imageIndex} />
        ))}
        </div>
    </div>

```

- 각 열의 이미지를 순서에 따라 높이로 구분하여 그립니다.

```tsx
function Image({ image, height }: { image: ImageType; height: string }) {
  const handleImageClick = useClickImage();

  return (
    <div className="relative overflow-hidden">
      <img
        key={image.id}
        src={image.url}
        alt={`cat-${image.id}`}
        className={`w-full object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ${height}`}
        onClick={handleImageClick(image)}
      />
    </div>
  );
}

function ColumnOne({ image, index }: { image: ImageType; index: number }) {
  const heightClasses = ["h-40", "h-40", "h-36"];
  const height = heightClasses[index % heightClasses.length];
  return <Image image={image} height={height} />;
}
```

#### 이미지 확대 기능

- 이미지 확대 기능을 위한 3 개의 상태를 생성하였습니다.

```tsx
const [selectedImage, setSelectedImage] = useAtom(catSelectedImageAtom); // 선택된 이미지  응답값
const [imageStyle, setImageStyle] = useAtom(catSelectedStyleAtom);
const [originalStyle, setOriginalStyle] = useAtom(catOriginalStyleAtom);
```

- 이미지 클릭에 대한 애니메이션 비즈니스 로직을 분리합니다

```ts
function useClickImage() {
  const setSelectedImage = useSetAtom(catSelectedImageAtom);
  const setSelecteedImageStyle = useSetAtom(catSelectedStyleAtom);
  const setOriginalStyle = useSetAtom(catOriginalStyleAtom);

  const handleImageClick =
    (image: ImageType) => (event: React.MouseEvent<HTMLImageElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      setSelectedImage(image);
      const initialStyle = {
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transition: "all 0.3s ease-in-out",
        zIndex: 50,
        transform: "translate(0, 0)",
      };
      setSelecteedImageStyle(initialStyle);
      setOriginalStyle(initialStyle);

      requestAnimationFrame(() => {
        setSelecteedImageStyle({
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease-in-out",
          zIndex: 50,
        });
      });
    };

  return handleImageClick;
}

export default useClickImage;
```

- 반응형
![Feb-04-2024 15-37-17](https://github.com/SeokyoungYou/frontend-coding-test/assets/79842380/bbff7952-1fb4-475f-80ac-e5d6c8113ee1)



#### 에러 핸들링

- 서버 상태를 관리하는 비즈니스 훅을 추출합니다.

```tsx
function useQueryCat() {
  const [catData, setCatData] = useAtom(catViewerAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  const fetchCats = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_CAT_API_URL}?limit=${IMAGE_LOAD_UNIT}&page=${catData.currentPage}&api_key=${process.env.REACT_APP_CAT_API_KEY}`
      );

      if (response && response.data) {
        setError(null);

        setCatData((prev) => ({
          images: [...prev.images, ...response.data],
          currentPage: prev.currentPage + 1,
        }));

        return;
      }

      setError("Failed to load new cats.\n The response was not as expected."); // Response 에러 처리
    } catch (error) {
      setError("An error occurred while fetching cats."); // 호출 에러 처리
    }

    setLoading(false);
  }, [catData.currentPage, loading, setCatData]);

    ...

  return { catData, loading, fetchCats, error };
}
export default useQueryCat;

```

- 에러 UI
![image](https://github.com/SeokyoungYou/frontend-coding-test/assets/79842380/7159fa89-a8dc-4c2e-aa81-024e9c03ff8c)


### 추가 UI/UX 개선

- 이미지 hover 시 확대
- 무한 스크롤에 대한 loading indicator 추가
![Feb-04-2024 15-37-07](https://github.com/SeokyoungYou/frontend-coding-test/assets/79842380/49663c54-3fa2-4d4f-a6be-8b13f9a00447)

## 2. Working Hours

### 요구사항

- RangeInput CRUD: 하나의 atom에서 관리. uuid 사용

```ts
export const createDefaultWorkingHour = () => {
  return {
    id: uuidv4(),
    startTime: "09:00",
    endTime: "17:00",
    isValid: true,
  };
};

...

  const addWorkingHour = (dayName: WeekDays) => {
    setWorkingHours((prevHours) =>
      prevHours.map((day) =>
        day.dayname === dayName
          ? {
              ...day,
              workingHours: [...day.workingHours, createDefaultWorkingHour()],
            }
          : day
      )
    );
  };

  const deleteWorkingHour = (dayName: WeekDays, workingHourId: string) => {
    setWorkingHours((prevHours) =>
      prevHours.map((day) =>
        day.dayname === dayName
          ? {
              ...day,
              workingHours: day.workingHours.filter(
                (workingHour) => workingHour.id !== workingHourId
              ),
            }
          : day
      )
    );
  };


...

    const updateWorkingHour = React.useCallback(() => {
    setWorkingHours((prevHours) =>
        prevHours.map((day) =>
        day.dayname === dayname
            ? {
                ...day,
                workingHours: day.workingHours.map((hour) =>
                hour.id === workingHour.id
                    ? {
                        ...hour,
                        startTime,
                        endTime,
                        isValid: startTime <= endTime,
                    }
                    : hour
                ),
            }
            : day
        )
    );
    }, [dayname, setWorkingHours, workingHour.id, startTime, endTime]);
```

- Update 클릭 시 변경사항 저장 및 로드

```tsx
<button
  onClick={() =>
    localStorage.setItem(WORKING_HOURS_KEY, JSON.stringify(workingHours))
  }
  className=" text-gray-50 bg-blue-600 px-4 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
  disabled={!checkAllValid(workingHours)}
>
  Update
</button>

...

export const initialWorkingHours = localStorage.getItem(WORKING_HOURS_KEY)
  ? JSON.parse(localStorage.getItem(WORKING_HOURS_KEY) || "")
  : defaultWorkingHours;

export const workingHoursAtom =
  atomWithReset<DailyWorkingHours[]>(initialWorkingHours);
```

### 선택 요구사항

- RangeInput 에러처리: isValid 속성 활용

```tsx
export type WorkingHour = {
  id: string;
  startTime: string;
  endTime: string;
  isValid: boolean;
};

...
 {
    id,
    startTime,
    endTime,
    isValid: startTime <= endTime,
 }
```

- Update 버튼의 에러 처리

```ts
export const checkAllValid = (workingHours: DailyWorkingHours[]) => {
  return workingHours.every((day) =>
    day.workingHours.every((workingHour) => workingHour.isValid)
  );
};
```
