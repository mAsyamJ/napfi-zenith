import { useEffect, useRef } from 'react';

const AnimatedGradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Colors for the gradient
    const colors = ['#7f7fd5', '#86a8e7', '#91eae4'];
    let colorIndex = 0;

    // Gradient positions
    let gradientPositions = {
      x1: canvas.width / 2,
      y1: canvas.height / 2,
      x2: canvas.width / 2,
      y2: canvas.height / 2
    };

    // Mouse position for interactivity
    let mousePosition = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation function
    const animate = () => {
      // Smooth gradient position movement towards mouse
      gradientPositions.x1 += (mousePosition.x - gradientPositions.x1) * 0.05;
      gradientPositions.y1 += (mousePosition.y - gradientPositions.y1) * 0.05;
      gradientPositions.x2 += (canvas.width - mousePosition.x - gradientPositions.x2) * 0.05;
      gradientPositions.y2 += (canvas.height - mousePosition.y - gradientPositions.y2) * 0.05;

      // Create gradient
      const gradient = ctx.createLinearGradient(
        gradientPositions.x1,
        gradientPositions.y1,
        gradientPositions.x2,
        gradientPositions.y2
      );

      // Add color stops
      colors.forEach((color, index) => {
        const offset = (index + colorIndex) % colors.length / (colors.length - 1);
        gradient.addColorStop(offset, color);
      });

      // Slowly rotate colors
      colorIndex += 0.001;
      if (colorIndex >= colors.length) colorIndex = 0;

      // Fill canvas
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add overlay to make it more subtle
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default AnimatedGradient;