import { GlobeIcon, ShieldCheckIcon, HandHeartIcon } from 'lucide-react'

export const features = [
  {
    icon: (
      <HandHeartIcon
        size={40}
        color="#00ffff"
      />
    ),
    title: 'Community Friendly',
    description:
      'An active community of OSINTers has been built and continues to grow on various social networking sites such as Discord and Reddit!',
  },
  {
    icon: (
      <GlobeIcon
        size={40}
        color="#00ffff"
      />
    ),
    title: 'Worldwide Requests',
    description:
      'A wealth of research projects worldwide, both private and corporate, and a network of OSINTers',
  },
  {
    icon: (
      <ShieldCheckIcon
        size={40}
        color="#00ffff"
      />
    ),
    title: 'Secure Operations',
    description:
      'Requests registered in Your Service X must be submitted by verified users who agree to the terms and conditions prohibiting abuse, or directly by management.',
  },
]
