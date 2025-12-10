import React from "react";
import Button from "@mui/material/Button";

function Hero({ openDialog }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-12 text-center max-w-4xl mx-auto">
      <h1
        className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r 
        from-purple-200 via-pink-300 to-purple-100 text-transparent bg-clip-text
        drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] tracking-wide mb-8"
      >
        DynoForm Generator
      </h1>

      <p
        className="text-xl md:text-2xl text-purple-100/90 font-light 
        leading-relaxed max-w-2xl mx-auto mb-12"
      >
        Create dynamic, beautifully responsive forms in minutes — with
        drag-and-drop controls, smart logic, and real-time preview.
      </p>

      <Button
        variant="contained"
        size="large"
        onClick={openDialog}
        className="bg-gradient-to-r from-pink-400 to-purple-500 text-white
        hover:from-pink-500 hover:to-purple-600
        shadow-[0_8px_25px_rgba(236,72,153,0.4)]
        hover:shadow-[0_10px_35px_rgba(236,72,153,0.6)]
        transform hover:scale-105 transition-all duration-300
        px-14 py-5 text-xl font-semibold rounded-full normal-case"
      >
        Get Started
      </Button>
    </div>
  );
}
export default Hero;
