import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface HorizontalBarPlotProps {
  data: DataItem[];
  options?: {
    x: string; // data key for x-axis (length of bars)
    y: string; // data key for y-axis (categories)
    fill?: string; // color for bars
    title?: string; // chart title
  };
}

const HorizontalBarPlot: React.FC<HorizontalBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options?.x || !options?.y) {
      if (containerRef.current) {
         containerRef.current.innerHTML = "Data or required options (x, y keys) are missing for HorizontalBarPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        title: options.title,
        marks: [
          Plot.barX(data, { x: options.x, y: options.y, fill: options.fill || "steelblue" }),
        ],
        x: { // Configuration for the x-axis (quantitative axis for barX)
          grid: true,
        },
        // y: { // Configuration for the y-axis (categorical axis for barX)
        //   // Add any specific y-axis options if needed, like label
        // }
      });
      containerRef.current.innerHTML = ""; // Clear previous plot
      containerRef.current.appendChild(plot);
    }
    
    return () => { // Cleanup function
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data, options]);

  return <div ref={containerRef} style={{ minHeight: '150px' }} />; // Added minHeight
};

export default HorizontalBarPlot;
