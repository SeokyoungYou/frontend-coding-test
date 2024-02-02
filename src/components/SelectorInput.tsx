import React, { useState, useRef, useEffect } from "react";
import { generateTimeOptions } from "../util/time";
import { ChevronDown } from "lucide-react";

type SelectorInputProps = {
  time: string;
  setTime: (time: string) => void;
};

const SelectorInput: React.FC<SelectorInputProps> = ({ time, setTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="py-2 px-3 rounded border border-slate-200 flex items-center gap-12"
        onClick={() => setIsOpen(!isOpen)}
      >
        {time}
        <ChevronDown className=" text-slate-600" size={18} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 left-0 right-0 border border-slate-200 max-h-56 overflow-y-auto">
          {timeOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 bg-white   hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                setTime(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectorInput;
