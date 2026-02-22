import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "emgo-farms", // ✅ must match your Sanity project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
})