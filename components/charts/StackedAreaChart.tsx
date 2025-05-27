import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface StackedAreaChartProps {
  data: DataItem[];
  options: {
    x: string;
    y: string;
    fill: string; // Key for series to stack and color by
    title?: string;
    // curve?: 'basis' | 'linear' | 'step'; // Optional curve type
    // normalize?: boolean; // Add this if making it a combined component
  };
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.fill) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, fill keys) are missing for StackedAreaChart.";
      }
      return;
    }

    if (containerRef.current) {
      // For simple stacking, mapping 'fill' to a data field in areaY is often enough.
      // For explicit control (e.g. order, or if normalization is added later), Plot.stackY is used.
      const plot = Plot.plot({
        y: { grid: true }, // Added y-axis grid for better readability
        marks: [
          Plot.areaY(data, Plot.stackY({ // Explicit stacking for clarity
             x: options.x, 
             y: options.y, 
             fill: options.fill, 
             // curve: options.curve || 'linear', 
          })),
          Plot.ruleY([0])
        ],
        title: options.title,
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

export default StackedAreaChart;
