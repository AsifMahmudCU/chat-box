"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function Chatbox() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const sliderRef = useRef(null);
  const [maxOffset, setMaxOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleWidth = 64;
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    function updateMaxOffset() {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        setMaxOffset(width - handleWidth);
      }
    }

    updateMaxOffset();
    setIsLoading(false);
    window.addEventListener("resize", updateMaxOffset);

    return () => {
      window.removeEventListener("resize", updateMaxOffset);
      setDragging(false);
    };
  }, []);

  const onDragStart = (e) => {
    if (isLoading) return;
    setDragging(true);
    e.preventDefault();
  };

  const onDragEnd = () => {
    if (isLoading) return;
    setDragging(false);

    if (offset > maxOffset * 0.95) {
      if (selectedLang) {
        const toastId = toast.loading("Please Wait...", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        router.push(`/${selectedLang}`);
        toast.dismiss(toastId);
      } else {
        toast("Please Select a language to start", {
          icon: "✋",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      setOffset(0);
    } else {
      setOffset(0);
    }
  };

  const onDrag = (e) => {
    if (!dragging || isLoading) return;
    let clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newOffset = clientX - sliderRect.left - handleWidth / 2;

    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxOffset) newOffset = maxOffset;

    setOffset(newOffset);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-4 lg:mx-auto my-10 p-4 ">
        <h1 className="text-white text-2xl md:text-5xl uppercase leading-8 md:leading-14">
          Welcome <span className="block">to live chatbot</span>
        </h1>
        <div className="text-white flex items-center justify-center gap-4 md:gap-8 text-lg md:text-3xl my-5 md:my-10">
          <button
            value="bn"
            onClick={() => setSelectedLang("bn")}
            className={`bg-[#009778]/50 backdrop-blur-md p-5 md:p-10 rounded-[5px] border ${
              selectedLang === "bn"
                ? "border-green-200 shadow-[0_0_20px_6px_#22c55e] scale-105"
                : "border-white/20 scale-100"
            } shadow-lg transition-all duration-300 ease-out`}
          >
            Bn
          </button>
          <button
            value="en"
            onClick={() => setSelectedLang("en")}
            className={`bg-[#003a52]/50 backdrop-blur-md p-5 md:p-10 rounded-[5px] border ${
              selectedLang === "en"
                ? "border-blue-200 shadow-[0_0_20px_6px_#3b82f6] scale-105"
                : "border-white/20 scale-100"
            } shadow-lg transition-all duration-300 ease-out`}
          >
            En
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full md:bg-[#003a52]/50 backdrop-blur-md shadow-lg py-4 flex justify-center bg-none ">
        <div className="bg-[#003a52]/50 backdrop-blur-md rounded-[5px] border border-white/20 shadow-lg h-16 w-[220px] md:w-[300px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#003a52] rounded-[5px] z-10">
              <span className="text-white">Please wait...</span>
            </div>
          )}

          <div
            ref={sliderRef}
            onMouseMove={onDrag}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchMove={onDrag}
            onTouchEnd={onDragEnd}
            className={`relative h-full w-full rounded-[5px] cursor-pointer select-none ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-3xl pointer-events-none">
              Lets Begin
            </div>

            <div
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              style={{ transform: `translateX(${offset}px)` }}
              className="absolute top-1 bottom-1 left-0 w-16 bg-white/40 backdrop-blur-md p-5  border border-white/20  rounded-[5px] shadow-md flex items-center justify-center text-[#003a52] font-bold select-none"
            >
              ➔
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
