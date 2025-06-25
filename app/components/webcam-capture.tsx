"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Upload } from "lucide-react";

interface WebcamCaptureProps {
  onPhotoCapture: (file: File | null) => void;
  capturedPhoto: File | null;
}

export default function WebcamCapture({ onPhotoCapture, capturedPhoto }: WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
          console.log("Captured file", file);
          onPhotoCapture(file);
          setIsCameraOn(false);
        });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPhotoCapture(file);
  };

  if (capturedPhoto) {
    return (
      <Card>
        <CardContent className="p-4">
          <img src={URL.createObjectURL(capturedPhoto)} className="rounded border w-full max-w-sm mx-auto" />
          <div className="mt-4 text-center">
            <Button onClick={() => onPhotoCapture(null)} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4 text-center">
        {!isCameraOn ? (
          <>
            <Button onClick={() => setIsCameraOn(true)} className="w-full">
              📷 Start Camera
            </Button>
            <p className="text-sm text-gray-500">or</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
              Upload Photo
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="rounded-lg border w-full max-w-sm mx-auto"
              videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
            />
            <Button onClick={capture} className="w-full">
              📸 Capture Photo
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
