"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Copy, Check } from "lucide-react"

export default function UploadLogoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string>("")

  const supabase = getSupabaseBrowserClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
      setUploadedUrl("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    setUploading(true)
    setError("")

    try {
      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage.from("logos").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("logos").getPublicUrl(filePath)

      setUploadedUrl(publicUrl)
      setFile(null)

      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (err: any) {
      setError(err.message || "Failed to upload file")
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Upload Logo to Supabase Storage</CardTitle>
          <CardDescription>
            Upload broker or prop firm logos and get the public URL to use in your database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file-input">Select Logo Image</Label>
            <Input id="file-input" type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Logo"}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {uploadedUrl && (
            <Alert>
              <AlertDescription className="space-y-2">
                <p className="font-semibold text-green-600">Upload successful!</p>
                <div className="flex items-center gap-2">
                  <Input value={uploadedUrl} readOnly className="flex-1" />
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Copy this URL and paste it into the logo field in your Supabase database
                </p>
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4 border-t space-y-2">
            <h3 className="font-semibold">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Select a logo image file (PNG, JPG, SVG recommended)</li>
              <li>Click "Upload Logo" to upload to Supabase Storage</li>
              <li>Copy the generated public URL</li>
              <li>Go to your Supabase dashboard → Table Editor</li>
              <li>Find the broker/prop firm record and paste the URL in the "logo" field</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
