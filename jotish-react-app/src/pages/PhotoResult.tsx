import { useLocation, useNavigate } from "react-router-dom";
import { Meteors } from "../components/ui/meteors";

export default function PhotoResult() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const imageUrl = location.state?.capturedImage;
    const employeeName = location.state?.employeeName || "Employee";

    if (!imageUrl) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
                <p className="text-xl text-slate-400 mb-4">No photo was captured.</p>
                <button onClick={() => navigate(-1)} className="text-indigo-400 hover:text-indigo-300">
                    &larr; Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            
            <div className="relative z-20 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-white mb-8">Photo Result</h1>
                
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl max-w-md w-full">
                    <div className="overflow-hidden rounded-xl border border-slate-700 bg-black aspect-square flex items-center justify-center">
                        <img 
                            src={imageUrl} 
                            alt="Captured ID" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <h2 className="text-center text-emerald-400 font-semibold mt-4 text-lg">
                        {employeeName}'s ID Captured Successfully!
                    </h2>
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className="cursor-pointer mt-8 px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-colors shadow-lg"
                >
                    Return to Details
                </button>
            </div>

            <Meteors number={30} />
        </div>
    );
}