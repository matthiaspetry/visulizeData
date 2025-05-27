import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface LineChartProps {
  data: DataItem[];
  options: {
    x: string;
    y: string;
    stroke?: string; // Key for series, or a static color
    title?: string;
    curve?: 'basis' | 'linear' | 'step' | 'cardinal' | 'catmull-rom'; // Added catmull-rom
    markers?: boolean | 'auto'; // 'auto' shows markers if space permits
    // Potentially add other options like strokeWidth, lineStyle etc.
  };
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y keys) are missing for LineChart.";
      }
      return;
    }

    if (containerRef.current) {
      const plotOptions: Plot.PlotOptions = {
        marks: [
          Plot.line(data, { 
            x: options.x, 
            y: options.y, 
            stroke: options.stroke || "steelblue", // Default color or series key
            curve: options.curve || 'linear', // Default curve type
            marker: options.markers === true ? 'circle' : (options.markers === 'auto' ? 'auto' : undefined),
          }),
          Plot.ruleY([0])
        ],
        title: options.title,
        // Assuming x might be categorical or time. For strictly linear/time data,
        // x: { type: 'linear' } or x: { type: 'time' } might be more appropriate.
        // 'point' scale is often used for x-axes when data points are discrete.
        x: { type: 'point', nice: true }, // nice: true can improve axis ticks
        y: { grid: true, nice: true }    // nice: true can improve axis ticks
      };
      
      // If options.stroke points to a key in the data, Plot.line will automatically
      // create multiple lines, each with a distinct color from the default scheme.
      // If options.stroke is a literal color string (e.g., "blue"), all lines get that color.
      // If options.stroke is undefined, it defaults to "steelblue" for a single line.

      const plot = Plot.plot(plotOptions);
      containerRef.current.innerHTML = ""; // Clear previous plot
      containerRef.current.appendChild(plot);
    }
    
    return () => { // Cleanup function
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data, options]);

  return <div ref={containerRef} style={{ minHeight: '200px' }} />;
};

export default LineChart;
