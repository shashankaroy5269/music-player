import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/playerSlice";

export default function AudioUpload() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");

   
    const handleFile = (file: File) => {
        
        if (!file.type.startsWith("audio/")) {
            setError("Only audio files allowed");
            return;
        }

        setError("");

        const newSong = {
            id: Date.now(),
            title: file.name,
            artist: "Unknown",
            url: URL.createObjectURL(file),
            image: "/images/default.jpg",
        };

        dispatch(addSong(newSong));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files.length > 0) {
                        handleFile(e.dataTransfer.files[0]);
                    }
                }}

                style={{
                    border: "0.5px solid green",
                    padding: "20px 5px",
                    textAlign: "center",
                    borderRadius: "8px",
                    width: "20%",   
                }}

            >
                Drag & Drop Audio File Here
                <br />

                or

                <br />

                
                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            handleFile(e.target.files[0]);
                        }
                    }}
                />
            </div>

            
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
