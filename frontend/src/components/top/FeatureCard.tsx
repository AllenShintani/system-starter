'use client'

import type React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-4 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-400/10 transition-all duration-300 relative overflow-hidden group hover:translate-y-[-5px] hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] transition-transform duration-600 group-hover:translate-x-[100%]" />
      <div className="flex flex-col items-center gap-4 relative z-10">
        {icon}
        <h3 className="text-white font-bold tracking-wider font-mono text-xl">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed font-mono text-center">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
