import { useEffect, useState } from 'react';
import './MobileBlocker.css';

export default function MobileBlocker({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-blocker">
        <p>This website is only supported on desktop devices.</p>
      </div>
    );
  }

  return children;
}
