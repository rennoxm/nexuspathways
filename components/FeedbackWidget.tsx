"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

export function FeedbackWidget() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeoDfzHe4nw-EFVA0sAo8SdCoHOcXaP1DTgvh1ict7FtB8dww/viewform";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Version: Fully visible vertical side-tab on the right edge */}
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`feedback-tab-desktop select-none ${isScrolled ? "visible-tab" : "hidden-tab"}`}
        style={{
          marginRight: hovered ? "6px" : "0px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MessageSquare size={13} className="rotate-90" />
        <span>Give Feedback</span>
      </a>

      {/* Mobile Version: Written feedback text pill */}
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`feedback-tab-mobile select-none ${isScrolled ? "visible-pill" : "hidden-pill"}`}
        aria-label="Give feedback"
      >
        <span>Feedback</span>
        <MessageSquare size={14} />
      </a>

      {/* Responsive Styles and Transitions */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Default/Mobile: pill visible (when scrolled), tab hidden */
        .feedback-tab-desktop {
          display: none;
        }
        
        .feedback-tab-mobile {
          display: flex;
          align-items: center;
          gap: 6px;
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
          padding: 10px 18px;
          border-radius: 9999px;
          background-color: var(--primary);
          color: var(--primary-foreground);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(0, 201, 177, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }
        
        .visible-pill {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        
        .hidden-pill {
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          pointer-events: none;
        }

        .feedback-tab-mobile:active {
          transform: scale(0.95);
        }

        /* Desktop: tab visible, pill hidden */
        @media (min-width: 768px) {
          .feedback-tab-mobile {
            display: none;
          }
          
          .feedback-tab-desktop {
            display: flex;
            align-items: center;
            gap: 8px;
            position: fixed;
            top: 50%;
            z-index: 50;
            /* rotate and translate using bottom-right origin so the entire height/thickness stays on screen */
            transform: translateY(50%) rotate(-90deg);
            transform-origin: right bottom;
            background-color: var(--primary);
            color: var(--primary-foreground);
            padding: 12px 20px;
            border-radius: 8px 8px 0 0;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: -4px 0 15px rgba(0, 201, 177, 0.3);
            cursor: pointer;
            transition: right 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin-right 0.2s ease, opacity 0.3s ease;
          }
          
          .visible-tab {
            opacity: 1;
            right: 0px;
            pointer-events: auto;
          }
          
          .hidden-tab {
            opacity: 0;
            right: -60px;
            pointer-events: none;
          }
        }
      ` }} />
    </>
  );
}
