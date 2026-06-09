import { useEffect, useState } from 'react';

export default function LazyChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const triggers = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    let triggered = false;
    const onTrigger = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoad(true);
      triggers.forEach(t => window.removeEventListener(t, onTrigger));
    };
    const timer = setTimeout(onTrigger, 5000);
    triggers.forEach(t => window.addEventListener(t, onTrigger, { passive: true, once: true }));
    return () => {
      clearTimeout(timer);
      triggers.forEach(t => window.removeEventListener(t, onTrigger));
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/kore-web-sdk@11.19.1/dist/umd/kore-web-sdk-umd-chat.min.js';
    script.async = true;
    script.onload = () => {
      if (window.KoreChatSDK) {
        window.KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY =
          import.meta.env.PUBLIC_KORE_API_KEY || '724abd38ef7541939c8c13ea8efa4f1ac884140988204488bae0f4fc2e82a1bbstf3';
        window.KoreChatSDK.chatConfig.widgetOptions = { position: 'bottom-right' };
        new window.KoreChatSDK.chatWindow().show(window.KoreChatSDK.chatConfig);
      }
    };
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [shouldLoad]);

  return null;
}
