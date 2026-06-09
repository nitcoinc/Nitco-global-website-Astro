import { useEffect } from 'react';
import AOS from 'aos';

/** Initialises AOS on client mount. Render with client:load in BaseLayout. */
export default function AOSInit() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);
  return null;
}
