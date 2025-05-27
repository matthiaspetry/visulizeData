import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface BoxPlotProps {
  data: DataItem[];
  options: {
    value: string; // Key for the continuous variable
    category?: string; // Key for the categorical variable
    orientation: 'vertical' | 'horizontal';
    fill?: string; // Fill color for the boxes
    title?: string;
  };
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.value || !options.orientation) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (value, orientation) are missing for BoxPlot.";
      }
      return;
    }

    if (containerRef.current) {
      let mark;
      const plotConfig: Plot.PlotOptions = {
        title: options.title,
      };

      if (options.orientation === 'vertical') {
        mark = Plot.boxY(data, { y: options.value, x: options.category, fill: options.fill || "steelblue" });
        plotConfig.y = { grid: true, nice: true }; // Grid on the value axis
        if (options.category) {
          plotConfig.x = { type: 'band', padding: 0.1, nice: true }; // Categorical axis
        }
      } else { // horizontal
        mark = Plot.boxX(data, { x: options.value, y: options.category, fill: options.fill || "steelblue" });
        plotConfig.x = { grid: true, nice: true }; // Grid on the value axis
        if (options.category) {
          plotConfig.y = { type: 'band', padding: 0.1, nice: true }; // Categorical axis
        }
      }

      plotConfig.marks = [mark];

      const plot = Plot.plot(plotConfig);
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

export default BoxPlot;
