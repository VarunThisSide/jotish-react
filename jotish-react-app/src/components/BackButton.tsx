import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate('/list')}
            className="absolute top-4 left-4 z-50 p-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-colors"
        >
            &larr; Back
        </button>
    );
}