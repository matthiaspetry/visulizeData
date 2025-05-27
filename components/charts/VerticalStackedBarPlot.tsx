import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface VerticalStackedBarPlotProps {
  data: DataItem[];
  options: { // Made options mandatory as x, y, z are crucial
    x: string;
    y: string;
    z: string; // Key for stacking
    fill?: string; // Can be a static color or a key for color encoding
    title?: string;
  };
}

const VerticalStackedBarPlot: React.FC<VerticalStackedBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.z) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, z keys) are missing for VerticalStackedBarPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        // Example: y: { percent: options.normalize || false, grid: true }, // for normalization if that's a separate component/option
        marks: [
          Plot.barY(data, { 
            x: options.x, 
            y: options.y, 
            fill: options.fill || options.z, // Use z for fill by default to get different colors per stack segment
            // Observable Plot's barY with a 'fill' channel for different series usually implies stacking.
            // For explicit control or specific stack orders/offsets, transforms like Plot.stackY could be used.
            // For simplicity, we'll rely on the implicit stacking via the 'fill' channel based on 'z'.
          }),
          Plot.ruleY([0]) // Adds a zero baseline
        ],
        title: options.title,
        y: { // Added y-axis grid for better readability
          grid: true,
        },
      });
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(plot);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data, options]);

  return <div ref={containerRef} style={{ minHeight: '200px' }} />;
};

export default VerticalStackedBarPlot;
