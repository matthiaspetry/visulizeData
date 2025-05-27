import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface HistogramProps {
  data: DataItem[];
  options: {
    value: string; // Key for the continuous variable to bin
    orientation: 'vertical' | 'horizontal';
    fill?: string;
    stroke?: string;
    title?: string;
    thresholds?: number | any[]; // For binning configuration
    // Add other bin options like domain, etc. if needed
  };
}

const Histogram: React.FC<HistogramProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.value || !options.orientation) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (value, orientation) are missing for Histogram.";
      }
      return;
    }

    if (containerRef.current) {
      let transform;
      let mark;

      if (options.orientation === 'vertical') {
        transform = Plot.binX({ y: "count" }, { x: options.value, thresholds: options.thresholds });
        mark = Plot.rectY(data, transform);
      } else { // horizontal
        transform = Plot.binY({ x: "count" }, { y: options.value, thresholds: options.thresholds });
        mark = Plot.rectX(data, transform);
      }
      
      // Common mark options
      if (options.fill) mark.options.fill = options.fill;
      if (options.stroke) mark.options.stroke = options.stroke;
      if (!mark.options.fill) mark.options.fill = "steelblue"; // Default fill

      const plot = Plot.plot({
        marks: [mark],
        title: options.title,
        [options.orientation === 'vertical' ? 'x' : 'y']: { /*label: options.value*/ nice: true }, // Label for binned axis
        [options.orientation === 'vertical' ? 'y' : 'x']: { grid: true, /*label: "Count"*/ nice: true }, // Label for count axis
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

export default Histogram;
