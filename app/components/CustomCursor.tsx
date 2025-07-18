"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const prevPosition = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);

  // Function to normalize angle to shortest path
  const normalizeAngle = (newAngle: number, currentAngle: number) => {
    let diff = newAngle - currentAngle;
    
    // Normalize to -180 to 180 range
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    return currentAngle + diff;
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
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

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`cursor-arrow ${isHovering ? 'cursor-hover' : ''}`}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(${rotation}deg) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 3L21 12L12 15L9 21L3 3Z"
          fill="none"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}