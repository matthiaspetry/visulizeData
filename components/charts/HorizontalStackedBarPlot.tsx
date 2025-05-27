import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface HorizontalStackedBarPlotProps {
  data: DataItem[];
  options: {
    x: string; // Magnitudes
    y: string; // Categories
    z: string; // Key for stacking
    fill?: string; // Static color or key for color encoding
    title?: string;
  };
}

const HorizontalStackedBarPlot: React.FC<HorizontalStackedBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.z) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, z keys) are missing for HorizontalStackedBarPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        marks: [
          Plot.barX(data, { 
            x: options.x, 
            y: options.y, 
            fill: options.fill || options.z, // Use z for fill by default
            // Observable Plot's barX with a 'fill' channel for different series usually implies stacking.
            // For explicit control or specific stack orders/offsets, transforms like Plot.stackX could be used.
            // For simplicity, we'll rely on the implicit stacking via the 'fill' channel based on 'z'.
          }),
          Plot.ruleX([0]) // Adds a zero baseline
        ],
        title: options.title,
        x: { // Added x-axis grid for better readability
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

export default HorizontalStackedBarPlot;
