export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative flex justify-center">
        {/* green ball */}
        <div className="animate-green-ball h-10 w-10 rounded-full bg-lime-500 " />
        {/* orange ball */}
        <div className="mix-blend-difference animate-orange-ball h-10 w-10 rounded-full bg-orange-500" />
      </div>
    </div>
  );
}
