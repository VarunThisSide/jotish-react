import { useSearchParams , useNavigate } from "react-router-dom";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useRef, useState, useCallback } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Webcam from "react-webcam";
import BackButton from "@/components/BackButton";

export default function Details() {
    const navigate = useNavigate();
    // State to toggle the camera UI
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // Reference to the Webcam component
    const webcamRef = useRef<Webcam>(null);
    
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name");
    const role = searchParams.get("role");
    const location = searchParams.get("location");
    const pincode = searchParams.get("pincode");
    const date = searchParams.get("date");
    const salary = searchParams.get("salary");

    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
            // This instantly grabs the frame as a Base64 string
            const imageUrl = webcamRef.current.getScreenshot();
            
            if (imageUrl) {
                // Turn off camera UI and navigate
                setIsCameraOpen(false);
                navigate('/photo-result', { state: { capturedImage: imageUrl, employeeName: name } });
            }
        }
    }, [webcamRef, navigate, name]);

    return (
        <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
            <BackButton/>
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />
            {!isCameraOpen && <div className="w-1/2 flex justify-center items-center min-h-screen mx-auto p-20">
                <CardSpotlight className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-2xl border border-slate-800 bg-slate-900/50">

                    <div className="relative z-20">

                        <div className="mb-6 pb-6 border-b border-slate-700/50">
                            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                                {name || "Unknown Employee"}
                            </h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {role || "N/A"}
                            </span>
                        </div>


                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Location
                                </span>
                                <span className="text-slate-200 font-medium">
                                    {location}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Pincode
                                </span>
                                <span className="text-slate-200 font-medium">
                                    {pincode}
                                </span>
                            </div>

                            <div className="flex flex-col col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Date of Joining
                                </span>
                                <span className="text-slate-200 font-medium">
                                    {date}
                                </span>
                            </div>
                        </div>


                        <div className="pt-6 border-t border-slate-700/50 flex items-center justify-between">
                            <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Compensation
                            </span>
                            <span className="text-2xl font-bold text-indigo-400">
                                {salary}
                            </span>
                        </div>

                    </div>
                </CardSpotlight>
                <button 
                        onClick={() => setIsCameraOpen(true)}
                        className="cursor-pointer z-100 absolute top-10 p-4 w-60 max-w-md py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
                    >
                        Click picture
                </button>
            </div>}

            {isCameraOpen && (
                <div className="absolute z-100 w-full max-w-md flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                    <h2 className="text-2xl font-bold text-white mb-4">Place your face in Frame</h2>
                    
                    {/* The react-webcam Component */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black border-2 border-slate-700 shadow-2xl mb-6">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode: "user", aspectRatio: 1 }}
                            className="w-full h-full object-cover"
                        />
                        {/* Aiming reticle overlay */}
                        <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40">
                            <div className="w-full h-full border-2 border-dashed border-white/50 rounded-lg"></div>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button 
                            onClick={() => setIsCameraOpen(false)}
                            className="cursor-pointer flex-1 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={capturePhoto}
                            className="cursor-pointer flex-1 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                        >
                            Capture
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}