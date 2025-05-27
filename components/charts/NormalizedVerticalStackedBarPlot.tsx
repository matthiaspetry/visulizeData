import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface NormalizedVerticalStackedBarPlotProps {
  data: DataItem[];
  options: {
    x: string;
    y: string;
    z: string; // Key for stacking
    fill?: string; // Static color or key for color encoding
    title?: string;
  };
}

const NormalizedVerticalStackedBarPlot: React.FC<NormalizedVerticalStackedBarPlotProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.z) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, z keys) are missing for NormalizedVerticalStackedBarPlot.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        y: { percent: true, grid: true }, // Key change for normalization
        marks: [
          Plot.barY(data, Plot.stackY({ // Explicit stackY transform
            x: options.x, 
            y: options.y, 
            fill: options.fill || options.z, 
            // The order of series in the stack can be controlled with the `order` option in stackY if needed
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

export default NormalizedVerticalStackedBarPlot;
