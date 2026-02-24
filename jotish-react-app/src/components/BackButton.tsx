import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => navigate('/list')}
            className="group/btn cursor-pointer absolute top-6 left-6 z-50 py-2 px-6 text-sm font-medium rounded-full bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all duration-300 shadow-xl flex items-center gap-2"
        >
            <span className="transition-transform duration-300 group-hover/btn:-translate-x-1">
                &larr;
            </span>
            <span>Back to Dashboard</span>
            
            <BottomGradient />
        </button>
    );
}

const BottomGradient = () => {
  return (
    <>
      {/* Primary Cyan Line */}
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      
      {/* Blurred Indigo Glow (The "Cool" Factor) */}
      <span className="absolute inset-x-4 -bottom-px mx-auto block h-[2px] w-2/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};