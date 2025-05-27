import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface NormalizedHorizontalStackedBarPlotProps {
  data: DataItem[];
  options: {
    x: string; // Magnitudes
    y: string; // Categories
    z: string; // Key for stacking
    fill?: string; // Static color or key for color encoding
    title?: string;
  };
}

const NormalizedHorizontalStackedBarPlot: React.FC<NormalizedHorizontalStackedBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.z) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, z keys) are missing for NormalizedHorizontalStackedBarPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        x: { percent: true, grid: true }, // Key change for normalization
        marks: [
          Plot.barX(data, Plot.stackX({ 
            x: options.x, 
            y: options.y, 
            fill: options.fill || options.z, 
            // The order of series in the stack can be controlled with the `order` option in stackX if needed
          })),
          Plot.ruleX([0])
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

export default NormalizedHorizontalStackedBarPlot;
