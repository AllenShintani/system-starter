// components/Analytics.tsx
'use client'

import { GA_TRACKING_ID, GOOGLE_ADS_ID, CLARITY_TRACKING_ID } from '@/constants/analytics'
import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    // Google Analytics & Google Ads
    const loadGoogleTags = () => {
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
        gtag('config', '${GOOGLE_ADS_ID}');
      `
      document.head.appendChild(script2)
    }

    // Microsoft Clarity
    const loadMicrosoftClarity = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_TRACKING_ID}");
      `
      document.head.appendChild(script)
    }

    loadGoogleTags()
    loadMicrosoftClarity()
  }, [])

  return null
}
