import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface NormalizedAreaChartProps {
  data: DataItem[];
  options: {
    x: string;
    y: string;
    fill: string; // Key for series to stack and color by
    title?: string;
    // curve?: 'basis' | 'linear' | 'step'; // Optional curve type
  };
}

const NormalizedAreaChart: React.FC<NormalizedAreaChartProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.x || !options.y || !options.fill) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (x, y, fill keys) are missing for NormalizedAreaChart.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        y: { percent: true, grid: true }, // Key for normalization
        marks: [
          Plot.areaY(data, Plot.stackY({ 
             x: options.x, 
             y: options.y, 
             fill: options.fill,
             // curve: options.curve || 'linear',
             // normalize: true, // This could also be used within stackY, but y: {percent: true} is preferred for areaY
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

export default NormalizedAreaChart;
