import { createBrowserClient } from "@supabase/ssr"

export function getSupabaseStorageClient() {
  return createBrowserClient(
    process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!,
    process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY || process.env.SUPABASE_ANON_KEY!,
  )
}

export async function uploadLogo(file: File): Promise<string> {
  const supabase = getSupabaseStorageClient()

  // Create a unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${fileName}`

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage.from("logos").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw error
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(filePath)

  return publicUrl
}

export async function deleteLogo(url: string): Promise<void> {
  const supabase = getSupabaseStorageClient()

  // Extract file path from URL
  const urlParts = url.split("/logos/")
  if (urlParts.length < 2) {
    throw new Error("Invalid logo URL")
  }

  const filePath = urlParts[1]

  const { error } = await supabase.storage.from("logos").remove([filePath])

  if (error) {
    throw error
  }
}
