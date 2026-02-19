interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  className?: string
}

export const Hero = ({ title, subtitle, ctaText, ctaLink, className }: HeroProps) => {
  return (
    <div className={`${className} relative`}>
      <div className="absolute h-full w-full opacity-30 bg-green-800 flex items-center justify-center"></div>
      <div className="relative text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg md:text-2xl text-white mb-6">{subtitle}</p>
        <a 
          href={ctaLink} 
          className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
        >
          {ctaText}
        </a>
      </div>
    </div>
  )
}
