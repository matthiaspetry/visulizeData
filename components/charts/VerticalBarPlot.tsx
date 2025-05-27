import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  letter?: string; // Example specific key
  frequency?: number; // Example specific key
  [key: string]: any; // Allows other keys
}

interface VerticalBarPlotProps {
  data: DataItem[];
  options?: {
    x: string; // data key for x-axis
    y: string; // data key for y-axis
    fill?: string; // color for bars
    title?: string; // chart title
  };
}

const VerticalBarPlot: React.FC<VerticalBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.length > 0 && containerRef.current && options?.x && options?.y) {
      const plot = Plot.plot({
        title: options?.title,
        marks: [
          Plot.barY(data, { x: options.x, y: options.y, fill: options.fill || "steelblue" }),
        ],
        y: {
          grid: true, // Add y-axis grid
        },
        // Add any other common plot options if needed
      });
      containerRef.current.innerHTML = ""; // Clear previous plot
      containerRef.current.appendChild(plot);
    } else if (containerRef.current) {
      // Clear the container if data is not valid or not present
      containerRef.current.innerHTML = "Please provide valid data and options (x, y keys).";
    }

    return () => { // Cleanup function
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data, options]);

  return <div ref={containerRef} style={{ minHeight: '200px' }} />; // Added minHeight for visibility
};

export default VerticalBarPlot;
