"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Camera, Upload, XCircle, Loader2, Moon, Sun } from "lucide-react"
import FileUpload from "./components/file-upload"
import WebcamCapture from "./components/webcam-capture"
import VerificationResults from "./components/verification-results"
import { useTheme } from "next-themes"

interface VerificationData {
  age: number
  dob: string
  matchConfidence: number
  status: "verified" | "not_verified"
  extractedName?: string
  aadharPhoto?: string
  selfiePhoto?: string
}

export default function Home() {
  const [aadharFile, setAadharFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const handleVerification = async () => {
    if (!aadharFile || !selfieFile) {
      setError("Please upload both Aadhar card and selfie")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("aadhar", aadharFile)
      formData.append("selfie", selfieFile)

      const response = await fetch("/api/verify", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Verification failed")
      }

      const result = await response.json()
      setVerificationResult(result)
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const resetVerification = () => {
    setAadharFile(null)
    setSelfieFile(null)
    setVerificationResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Based ID & Age Verifier</h1>
          </div>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Verify Age & Identity with AI</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Verify age and identity with just a selfie and an Aadhar upload!
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Camera className="h-4 w-4 mr-2" />
              AI Face Matching
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Upload className="h-4 w-4 mr-2" />
              OCR Text Extraction
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Secure Processing
            </Badge>
          </div>
        </div>

        {!verificationResult ? (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>
                  Upload your Aadhar card and take a selfie to verify your identity and age
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* File Upload Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">1. Upload Aadhar Card</h3>
                    <FileUpload
                      onFileSelect={setAadharFile}
                      selectedFile={aadharFile}
                      accept="image/*,.pdf"
                      label="Drag & drop your Aadhar card or click to browse"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">2. Capture Selfie</h3>
                    <WebcamCapture onPhotoCapture={setSelfieFile} capturedPhoto={selfieFile} />
                  </div>
                </div>

                <Separator />

                {/* Verification Button */}
                <div className="text-center">
                  <Button
                    onClick={handleVerification}
                    disabled={!aadharFile || !selfieFile || isVerifying}
                    size="lg"
                    className="px-8"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Verify Identity & Age
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <VerificationResults
            data={verificationResult}
            onReset={resetVerification}
            aadharFile={aadharFile}
            selfieFile={selfieFile}
          />
        )}

        {/* Security Notice */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">Privacy & Security</h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    All processing is done securely in server memory. No data is stored permanently. Your images are
                    automatically deleted after verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
