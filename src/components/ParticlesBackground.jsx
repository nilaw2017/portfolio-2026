import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Particles loaded
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: ["#06b6d4", "#0891b2", "#10b981", "#0e7490"],
      },
      links: {
        color: "#06b6d4",
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 900,
        },
        value: 70,
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
}
