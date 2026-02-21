import { createClient } from "@sanity/client"

export const sanity = createClient({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})