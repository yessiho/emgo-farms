import mongoose from 'mongoose'

const HeroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  ctaText: String,
  ctaLink: String,
  ctaTitle: String,
  ctaSubtitle: String
})

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema)
