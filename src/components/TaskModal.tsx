import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TaskModal({ isOpen, onClose, onSave, initialData = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({
      id: initialData?.id,
      title: title.trim(),
      description: description.trim() || "",
    });

    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}  
    >
      <div
        className="bg-[rgba(246,250,255,1)] p-5 rounded-lg shadow-lg w-[min(400px,85vw)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}  
      >
         <button onClick={onClose} className="absolute top-4 right-4">
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>

         <h2 className="text-[rgba(48,80,125,1)] text-sm font-bold font-poppins leading-[18px] mb-4 text-center">
          {initialData ? "Edit Task" : "Create Task"}
        </h2>

         <div className="relative mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(title.length > 0)}
            className="w-full border-[1px] border-[rgba(106,108,224,1)] pt-4 pl-3 pr-2 pb-1 rounded-md bg-[rgba(255,254,252,1)] focus:outline-none focus:ring-1 focus:ring-[rgba(106,108,224,1)] text-base"
          />
          <label
            className={`absolute left-3 transition-all ${
              isTitleFocused || title.length > 0
                ? "text-xs text-[rgba(108,134,168,1)] top-1"
                : "text-sm text-gray-400 top-3"
            }`}
          >
            Task Name
          </label>
        </div>

         <textarea
          placeholder="Type task details here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" text-[rgba(108,134,168,1)] font-medium text-sm md:text-base p-2 rounded-md font-poppins w-full border-[1px] border-gray-300 p-2 pl-3 rounded-md bg-[rgba(232,241,253,1)] shadow-[inset_1px_1px_4px_0px_rgba(48,80,125,0.25)] focus:outline-none focus:ring-1 focus:ring-gray-400 h-28 resize-none text-base mb-2"
        />

         <button
          onClick={handleSubmit}
          className="w-full bg-[rgba(106,108,224,1)] text-white py-2 rounded-md font-poppins font-medium text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
}
