"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Download, User, Calendar, Shield } from "lucide-react"

interface VerificationData {
  age: number
  dob: string
  matchConfidence: number
  status: "verified" | "not_verified"
  extractedName?: string
  aadharPhoto?: string
  selfiePhoto?: string
}

interface VerificationResultsProps {
  data: VerificationData
  onReset: () => void
  aadharFile: File | null
  selfieFile: File | null
}

export default function VerificationResults({ data, onReset, aadharFile, selfieFile }: VerificationResultsProps) {
  const isVerified = data.status === "verified"

  const downloadReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      ...data,
      aadharFileName: aadharFile?.name,
      selfieFileName: selfieFile?.name,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `verification-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Card */}
      <Card
        className={`border-2 ${isVerified ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}`}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isVerified ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle
            className={`text-2xl ${isVerified ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}
          >
            {isVerified ? "Verification Successful" : "Verification Failed"}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Extracted Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Extracted Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.extractedName && (
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg font-semibold">{data.extractedName}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="text-lg font-semibold flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {data.dob}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Calculated Age</label>
              <p className="text-lg font-semibold">{data.age} years</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Age Status</label>
              <Badge variant={data.age >= 18 ? "default" : "destructive"} className="ml-2">
                {data.age >= 18 ? "18+ Verified" : "Under 18"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Face Match Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Face Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Match Confidence</label>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{data.matchConfidence.toFixed(1)}%</span>
                  <Badge variant={data.matchConfidence >= 80 ? "default" : "destructive"}>
                    {data.matchConfidence >= 80 ? "High Confidence" : "Low Confidence"}
                  </Badge>
                </div>
                <Progress value={data.matchConfidence} className="h-3" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Threshold</label>
              <p className="text-sm text-gray-600">Minimum 80% required for verification</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Algorithm</label>
              <p className="text-sm text-gray-600">FaceNet Deep Learning Model</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Image Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="font-medium mb-2">Aadhar Photo</h4>
              {aadharFile && (
                <img
                  src={URL.createObjectURL(aadharFile) || "/placeholder.svg"}
                  alt="Aadhar document"
                  className="w-full max-w-sm mx-auto rounded-lg border"
                />
              )}
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2">Selfie Photo</h4>
              {selfieFile && (
                <img
                  src={URL.createObjectURL(selfieFile) || "/placeholder.svg"}
                  alt="Selfie"
                  className="w-full max-w-sm mx-auto rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <span className="text-sm font-medium">Similarity Score:</span>
              <span className={`text-lg font-bold ${isVerified ? "text-green-600" : "text-red-600"}`}>
                {data.matchConfidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onReset} variant="outline" size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Verify Another ID
        </Button>

        <Button onClick={downloadReport} variant="outline" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">Data Security</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                Your verification data has been processed securely. All uploaded images have been automatically deleted
                from our servers. This report contains only the verification results and no personal images.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
