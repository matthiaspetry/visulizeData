import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface ScatterPlotProps {
  data: DataItem[];
  options: {
    x: string;
    y: string;
    fill?: string; // Key for color encoding or static color
    size?: string | number; // Key for size encoding or static size
    title?: string;
  };
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y keys) are missing for ScatterPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        grid: true,
        marks: [
          Plot.dot(data, { 
            x: options.x, 
            y: options.y, 
            fill: options.fill || "steelblue",
            // Use Plot.valueof if options.size is a string (data key), otherwise pass the number directly.
            r: typeof options.size === 'string' ? Plot.valueof(data, options.size as any) : options.size, 
          }),
          // Plot.ruleY([0]), // Optional: zero lines if meaningful
          // Plot.ruleX([0]),
        ],
        title: options.title,
        // Optional: Add legend for fill if it's a data key
        // color: options.fill && typeof options.fill === 'string' && data[0] && data[0][options.fill] ? { legend: true } : undefined,
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

export default ScatterPlot;
