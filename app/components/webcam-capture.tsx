"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, RotateCcw, Upload, CheckCircle, AlertCircle } from "lucide-react"

interface WebcamCaptureProps {
  onPhotoCapture: (file: File | null) => void
  capturedPhoto: File | null
}

export default function WebcamCapture({ onPhotoCapture, capturedPhoto }: WebcamCaptureProps) {
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [imageQuality, setImageQuality] = useState<{
    lighting: "good" | "poor" | "unknown"
    faceDetected: boolean
    blur: "low" | "high" | "unknown"
  }>({
    lighting: "unknown",
    faceDetected: false,
    blur: "unknown",
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setStream(mediaStream)
      setIsWebcamActive(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      // Simulate real-time quality analysis
      const qualityInterval = setInterval(() => {
        setImageQuality({
          lighting: Math.random() > 0.3 ? "good" : "poor",
          faceDetected: Math.random() > 0.2,
          blur: Math.random() > 0.4 ? "low" : "high",
        })
      }, 1000)

      return () => clearInterval(qualityInterval)
    } catch (error) {
      console.error("Error accessing webcam:", error)
    }
  }

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsWebcamActive(false)
  }

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "selfie.jpg", { type: "image/jpeg" })
              onPhotoCapture(file)
              stopWebcam()
            }
          },
          "image/jpeg",
          0.8,
        )
      }
    }
  }, [onPhotoCapture])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onPhotoCapture(files[0])
    }
  }

  const retakePhoto = () => {
    onPhotoCapture(null)
    startWebcam()
  }

  if (capturedPhoto) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <img
              src={URL.createObjectURL(capturedPhoto) || "/placeholder.svg"}
              alt="Captured selfie"
              className="w-full max-w-sm mx-auto rounded-lg border"
            />
            <div className="mt-4 space-x-2">
              <Button onClick={retakePhoto} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        {!isWebcamActive ? (
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <Button onClick={startWebcam} className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Start Camera
              </Button>
              <p className="text-sm text-gray-500">or</p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border" />

              {/* Face frame overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 border-2 border-white rounded-lg shadow-lg">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                </div>
              </div>
            </div>

            {/* Quality indicators */}
            <div className="flex flex-wrap gap-2">
              <Badge variant={imageQuality.lighting === "good" ? "default" : "destructive"}>
                {imageQuality.lighting === "good" ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                Lighting: {imageQuality.lighting}
              </Badge>

              <Badge variant={imageQuality.faceDetected ? "default" : "destructive"}>
                {imageQuality.faceDetected ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                Face: {imageQuality.faceDetected ? "Detected" : "Not detected"}
              </Badge>

              <Badge variant={imageQuality.blur === "low" ? "default" : "destructive"}>
                {imageQuality.blur === "low" ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                Blur: {imageQuality.blur}
              </Badge>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={capturePhoto}
                disabled={!imageQuality.faceDetected || imageQuality.lighting === "poor"}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture Photo
              </Button>
              <Button onClick={stopWebcam} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}
