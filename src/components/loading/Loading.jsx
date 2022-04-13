import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center h-screen ">
      <div className="relative">
        <div className="absolute right-0 h-10 w-10 rounded-full bg-lime-500 animate-green-ball mix-blend-difference" />
        <div className="absolute left-0 h-10 w-10 rounded-full bg-orange-500 animate-orange-ball mix-blend-difference" />
      </div>
    </div>
  );
}
