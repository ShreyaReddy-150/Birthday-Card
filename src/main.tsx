import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize cursor tracking for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Function to create glitter particles that follow the cursor
  const handleMouseMove = (e: MouseEvent) => {
    // Create a new glitter particle
    const particle = document.createElement('div');
    particle.classList.add('glitter-particle');
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.background = `radial-gradient(circle, 
      rgba(155, 135, 245, ${Math.random() * 0.8 + 0.2}), 
      rgba(217, 70, 239, ${Math.random() * 0.8}), 
      rgba(139, 92, 246, ${Math.random() * 0.5}) 70%)`;
    particle.style.width = `${Math.random() * 10 + 5}px`;
    particle.style.height = particle.style.width;
    
    // Add to DOM
    document.body.appendChild(particle);
    
    // Animate and remove
    setTimeout(() => {
      particle.style.transition = 'all 0.8s ease-out';
      particle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`;
      particle.style.opacity = '0';
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 800);
    }, 10);
  };
  
  // Add the event listener to the entire document
  document.addEventListener('mousemove', handleMouseMove);
});

createRoot(document.getElementById("root")!).render(<App />);