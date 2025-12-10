import React, { useState } from "react";
import Hero from "./Hero";
import StartDialog from "./StartDialog";

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#7c3aed] flex items-center justify-center px-6 py-16">
        <Hero openDialog={() => setOpen(true)} />
      </div>

      <StartDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export default Home;
