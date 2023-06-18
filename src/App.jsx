import "./App.css";
import React, { useEffect, useRef } from "react";

function App() {
  const preRef = useRef(null);

  useEffect(() => {
    // Angles, Radius and Contants
    let A = 1;
    let B = 1;
    const R1 = 1;
    const R2 = 2;
    const K1 = 150;
    const K2 = 5;

    // Function to render ASCII frame
    const renderAsciiFrame = () => {
      const preTag = preRef.current;

      const b = []; // Array to stay ascii chars
      const z = []; // Array to store depth values

      const width = 280; // Width of frame
      const height = 160; // Height of frame

      A += 0.07; // Increment angle A
      B += 0.03; // Increment angle B

      // Sin and Cosine of angles
      const cA = Math.cos(A);
      const sA = Math.sin(A);
      const cB = Math.cos(B);
      const sB = Math.sin(B);

      // Initialize arrays with default angles
      for (let k = 0; k < width * height; k++) {
        // Set default ascii char
        b[k] = k % width === width - 1 ? "\n" : " ";
        // Set default depth
        z[k] = 0;
      }

      // Generate the ascii frame
      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j); // Cosine of j
        const st = Math.sin(j); // Sin of j

        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i); // Sin of i
          const cp = Math.cos(i); // Cosine of i
          const h = ct + 2; // Height calculation
          // Distance calculation
          const D = 1 / (sp * h * sA + st * cA + 5);
          // Temporary variable
          const t = sp * h * cA - st * sA;

          // Calculate coordinates of ascii char
          const x = Math.floor(
            width / 2 + (width / 4) * D * (cp * h * cB - t * sB)
          );
          const y = Math.floor(
            height / 2 + (height / 4) * D * (cp * h * sB + t * cB)
          );

          // Calculate the index in the array
          const o = x + width * y;
          // Calculate the ascii char index
          const N = Math.floor(
            8 *
              ((st * sA - sp * ct * cA) * cB -
                sp * ct * sA -
                st * cA -
                cp * ct * sB)
          );

          // Update ascii char and depth if conditions are met
          if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            // Update ascii char based on the index
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }

      // Update html element with the ascii frame
      preTag.innerHTML = b.join("");
    };

    renderAsciiFrame(); // Render the initial ascii frame

    // Function to start the animation
    const startAsciiAnimation = () => {
      // Start it by calling renderAsciiAnimation every 50ms
      window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    };

    startAsciiAnimation(); // Start the animation

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(window.asciiIntervalId);
    };
  }, []);

  return <pre id="donut" ref={preRef}></pre>;
}

export default App;
