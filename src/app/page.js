"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Chatbox() {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const sliderRef = useRef(null);
  const [maxOffset, setMaxOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track initialization status
  const handleWidth = 64; // w-16 = 64px

  useEffect(() => {
    function updateMaxOffset() {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        setMaxOffset(width - handleWidth);
      }
    }

    updateMaxOffset();
    setIsLoading(false); // Mark initialization as complete
    window.addEventListener("resize", updateMaxOffset);
    
    return () => {
      window.removeEventListener("resize", updateMaxOffset);
      setDragging(false); // Cleanup dragging state
    };
  }, []);

  const onDragStart = (e) => {
    if (isLoading) return; // Prevent interaction during loading
    setDragging(true);
    e.preventDefault();
  };

  const onDragEnd = () => {
    if (isLoading) return;
    setDragging(false);
    if (offset > maxOffset * 0.95) {
      alert("Submitted!");
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
            className="bg-[#009778]/50 backdrop-blur-md p-5 md:p-10 rounded-[5px] border border-white/20 shadow-lg"
          >
            Bn
          </button>
          <button
            value="en"
            className="bg-[#003a52]/50 backdrop-blur-md p-5 md:p-10 rounded-[5px] border border-white/20 shadow-lg"
          >
            En
          </button>
        </div>

        {/* Loading overlay and slider container */}
        <div className="relative bg-[#003a52]/50 backdrop-blur-md rounded-[5px] border border-white/20 shadow-lg h-16 w-[220px] md:w-[300px] mx-auto">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#003a52] rounded-[5px] z-10">
              <span className="text-white">Please wait...</span>
            </div>
          )}

          {/* Slide to submit */}
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
            {/* Track text */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-3xl pointer-events-none">
              Lets Begin
            </div>

            {/* Draggable handle */}
            <div
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              style={{ transform: `translateX(${offset}px)` }}
              className="absolute top-1 bottom-1 left-0 w-16 bg-white rounded-[5px] shadow-md flex items-center justify-center text-[#003a52] font-bold select-none"
            >
              ➔
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}