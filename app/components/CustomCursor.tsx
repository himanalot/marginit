"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isOnSite, setIsOnSite] = useState(false);
  const prevPosition = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);
  const animationFrame = useRef<number | undefined>(undefined);
  const [isSafari, setIsSafari] = useState(false);

  // Function to normalize angle to shortest path
  const normalizeAngle = (newAngle: number, currentAngle: number) => {
    let diff = newAngle - currentAngle;
    
    // Normalize to -180 to 180 range
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    return currentAngle + diff;
  };

  // Smooth animation function
  const animateCursor = () => {
    setCursorPosition(current => {
      const deltaX = mousePosition.x - current.x;
      const deltaY = mousePosition.y - current.y;
      
      // Easing factor (0.1 = slower, 0.3 = faster)
      const ease = 0.15;
      
      return {
        x: current.x + deltaX * ease,
        y: current.y + deltaY * ease
      };
    });
    
    animationFrame.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    // Detect Safari browser
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Show cursor on first mouse movement
      if (!isOnSite) {
        setIsOnSite(true);
        setCursorPosition({ x: newX, y: newY });
        prevPosition.current = { x: newX, y: newY };
      }
      
      // Calculate movement vector
      const deltaX = newX - prevPosition.current.x;
      const deltaY = newY - prevPosition.current.y;
      
      // Only update rotation if there's significant movement
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        // Calculate angle in degrees where 0° is pointing right
        const radians = Math.atan2(deltaY, deltaX);
        let newAngle = radians * (180 / Math.PI) + 135;
        
        // Normalize the angle to take shortest path
        const normalizedAngle = normalizeAngle(newAngle, currentRotation.current);
        
        setRotation(normalizedAngle);
        currentRotation.current = normalizedAngle;
        
        // Update previous position for next calculation
        prevPosition.current = { x: newX, y: newY };
      }
      
      setMousePosition({ x: newX, y: newY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener
    document.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start animation loop
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      // Clean up animation frame
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [mousePosition]);

  if (isSafari) {
    // Safari: Use CSS positioning instead of transforms to avoid layer splitting
    return (
      <div
        className="cursor-arrow"
        style={{
          position: 'fixed',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '24px',
          height: '24px',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isOnSite ? 1 : 0,
          transform: isHovering ? 'scale(1.2)' : 'scale(1)',
          transformOrigin: 'center',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 4L20 12L12 16L8 20L4 4Z"
            fill="#A8BCED"
            stroke="#8BA4E3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // Chrome and other browsers: Original with smooth movement and rotation
  return (
    <div
      className={`cursor-arrow ${isHovering ? 'cursor-hover' : ''}`}
      style={{
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) rotate(${rotation}deg) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
        opacity: isOnSite ? 1 : 0,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 4L20 12L12 16L8 20L4 4Z"
          fill="#A8BCED"
          stroke="#8BA4E3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}