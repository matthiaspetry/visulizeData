import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface DataItem {
  [key: string]: any;
}

interface PieChartProps {
  data: DataItem[];
  options: {
    value: string;        // Data key for slice values
    category: string;     // Data key for slice categories (and colors)
    innerRadius?: number; // For donut chart, e.g., 0.5. Defaults to 0 for pie.
    title?: string;
    sort?: null | string; // Optionally, key to sort categories by, or null for no sort
  };
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !options || !options.value || !options.category) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "Data or required options (value, category) are missing for PieChart.";
      }
      return;
    }

    if (containerRef.current) {
      const plot = Plot.plot({
        title: options.title,
        // Set aspect ratio to 1 and hide axes for a typical pie chart look
        height: 300, // Example height, adjust as needed
        width: 300,  // Example width
        inset: 10,   // Padding around the chart
        coord: { type: "polar", innerRadius: options.innerRadius || 0 },
        axis: null, // Hide axes
        marks: [
          Plot.barY(data, Plot.stackY({ 
            x: () => 1, // Dummy x value for barY in polar coords for pie
            y: options.value, 
            fill: options.category,
            // sort: options.sort === null ? null : { x: "fill", value: options.sort || "-y" } // Example sort
          })),
          // Optional: Add labels using Plot.text and Plot.stackY
          // Plot.text(data, Plot.stackY({
          //   x: () => 1,
          //   y: options.value,
          //   text: options.category,
          //   textAnchor: "middle",
          //   fill: "white", // Adjust label appearance
          // })),
        ],
        // color: { legend: true } // Optional: show legend
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

  return <div ref={containerRef} style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
};

export default PieChart;
