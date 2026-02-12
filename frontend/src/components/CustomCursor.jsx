import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseOver = (e) => {
      const target = e.target;
      
      // Check for clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      // Check for text inputs
      const isInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      setIsHovering(isClickable);
      setIsHidden(isInput);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      opacity: isHidden ? 0 : 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1500, 
        damping: 50
      }
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.5,
      opacity: isHidden ? 0 : 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1500,
        damping: 50
      }
    }
  };

  return (
    <>
      <style>{`
        body, a, button {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: auto !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-black"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      >
        <Search size={24} strokeWidth={2.5} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
