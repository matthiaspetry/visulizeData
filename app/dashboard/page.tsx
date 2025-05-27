"use client"; // Mark as a client component

import VerticalBarPlot from '../../../components/charts/VerticalBarPlot';
import HorizontalBarPlot from '../../../components/charts/HorizontalBarPlot';
import VerticalStackedBarPlot from '../../../components/charts/VerticalStackedBarPlot';
import HorizontalStackedBarPlot from '../../../components/charts/HorizontalStackedBarPlot';
import NormalizedVerticalStackedBarPlot from '../../../components/charts/NormalizedVerticalStackedBarPlot';
import NormalizedHorizontalStackedBarPlot from '../../../components/charts/NormalizedHorizontalStackedBarPlot';
import LineChart from '../../../components/charts/LineChart';
import BoxPlot from '../../../components/charts/BoxPlot';
import StackedAreaChart from '../../../components/charts/StackedAreaChart';
import NormalizedAreaChart from '../../../components/charts/NormalizedAreaChart';
import PieChart from '../../../components/charts/PieChart';
import ScatterPlot from '../../../components/charts/ScatterPlot';
import Histogram from '../../../components/charts/Histogram';

const DashboardPage = () => {
  // Sample Data
  const letterFrequencyData = [
    { letter: "A", frequency: 0.08167 }, { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 }, { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 }, { letter: "F", frequency: 0.02228 },
    { letter: "G", frequency: 0.02015 }, { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 }, { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 }, { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 }, { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 }, { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 }, { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 }, { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 }, { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.02360 }, { letter: "X", frequency: 0.00150 },
    { letter: "Y", frequency: 0.01974 }, { letter: "Z", frequency: 0.00074 },
  ];

  const populationByAgeSexData = [
    { sex: "Male", age: "0-9", population: 20 }, { sex: "Male", age: "10-19", population: 25 },
    { sex: "Male", age: "20-29", population: 30 }, { sex: "Female", age: "0-9", population: 18 },
    { sex: "Female", age: "10-19", population: 28 }, { sex: "Female", age: "20-29", population: 32 },
  ];
  
  const fruitSalesData = [
    { fruit: "Apples", month: "Jan", sales: 100 }, { fruit: "Apples", month: "Feb", sales: 120 },
    { fruit: "Oranges", month: "Jan", sales: 80 }, { fruit: "Oranges", month: "Feb", sales: 90 },
    { fruit: "Bananas", month: "Jan", sales: 150 }, { fruit: "Bananas", month: "Feb", sales: 130 },
  ];

  const temperatureData = [
    { month: "Jan", city: "London", temp: 5 }, { month: "Feb", city: "London", temp: 6 }, 
    { month: "Mar", city: "London", temp: 8 }, { month: "Jan", city: "Paris", temp: 7 },
    { month: "Feb", city: "Paris", temp: 8 }, { month: "Mar", city: "Paris", temp: 10 },
  ];

  const examScoresData = [
    { subject: "Math", score: 80 }, { subject: "Math", score: 85 }, { subject: "Math", score: 70 },
    { subject: "Science", score: 90 }, { subject: "Science", score: 75 }, { subject: "Science", score: 88 },
    { subject: "History", score: 60 }, { subject: "History", score: 65 }, { subject: "History", score: 72 },
  ];

  const websiteTrafficData = [
    { date: "2023-01-01", source: "Organic", visits: 100 }, { date: "2023-01-01", source: "Referral", visits: 50 },
    { date: "2023-01-02", source: "Organic", visits: 120 }, { date: "2023-01-02", source: "Referral", visits: 60 },
    { date: "2023-01-03", source: "Organic", visits: 110 }, { date: "2023-01-03", source: "Referral", visits: 55 },
  ];
  
  const marketShareData = [
    { company: "A", share: 0.3 }, { company: "B", share: 0.25 }, 
    { company: "C", share: 0.2 }, { company: "D", share: 0.15 }, 
    { company: "E", share: 0.1 },
  ];

  const irisData = [
    { species: "setosa", sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2 },
    { species: "setosa", sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2 },
    { species: "versicolor", sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4 },
    { species: "versicolor", sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5 },
    { species: "virginica", sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5 },
    { species: "virginica", sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9 },
  ];
  
  const heightsData = Array.from({ length: 100 }, (_, i) => ({ id: i, height: 160 + Math.random() * 30 }));


  const chartContainerStyle: React.CSSProperties = {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const pageStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <div style={pageStyle}>
      <h1>Charts Dashboard</h1>

      <div style={chartContainerStyle}>
        <h2>Vertical Bar Plot</h2>
        <VerticalBarPlot data={letterFrequencyData} options={{ x: "letter", y: "frequency", fill: "cornflowerblue", title: "Letter Frequency" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Horizontal Bar Plot</h2>
        <HorizontalBarPlot data={letterFrequencyData.slice(0,10)} options={{ x: "frequency", y: "letter", fill: "lightcoral", title: "Top 10 Letter Frequency" }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Vertical Stacked Bar Plot</h2>
        <VerticalStackedBarPlot data={populationByAgeSexData} options={{ x: "age", y: "population", z: "sex", title: "Population by Age and Sex" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Horizontal Stacked Bar Plot</h2>
        <HorizontalStackedBarPlot data={fruitSalesData} options={{ x: "sales", y: "month", z: "fruit", title: "Fruit Sales by Month" }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Normalized Vertical Stacked Bar Plot</h2>
        <NormalizedVerticalStackedBarPlot data={populationByAgeSexData} options={{ x: "age", y: "population", z: "sex", title: "Normalized Population by Age and Sex (%)" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Normalized Horizontal Stacked Bar Plot</h2>
        <NormalizedHorizontalStackedBarPlot data={fruitSalesData} options={{ x: "sales", y: "month", z: "fruit", title: "Normalized Fruit Sales by Month (%)" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Line Chart</h2>
        <LineChart data={temperatureData} options={{ x: "month", y: "temp", stroke: "city", title: "Temperature in Cities", markers: true, curve: 'basis' }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Box Plot (Vertical)</h2>
        <BoxPlot data={examScoresData} options={{ value: "score", category: "subject", orientation: 'vertical', title: "Exam Scores by Subject" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Box Plot (Horizontal)</h2>
        <BoxPlot data={irisData} options={{ value: "sepalLength", category: "species", orientation: 'horizontal', title: "Sepal Length by Iris Species" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Stacked Area Chart</h2>
        <StackedAreaChart data={websiteTrafficData} options={{ x: "date", y: "visits", fill: "source", title: "Website Traffic by Source" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Normalized Area Chart</h2>
        <NormalizedAreaChart data={websiteTrafficData} options={{ x: "date", y: "visits", fill: "source", title: "Normalized Website Traffic by Source (%)" }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Pie Chart</h2>
        <PieChart data={marketShareData} options={{ value: "share", category: "company", title: "Market Share" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Donut Chart</h2>
        <PieChart data={marketShareData} options={{ value: "share", category: "company", innerRadius: 0.5, title: "Market Share (Donut)" }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Scatter Plot</h2>
        <ScatterPlot data={irisData} options={{ x: "sepalLength", y: "sepalWidth", fill: "species", size: "petalWidth", title: "Iris Sepal Length vs. Width (Size by Petal Width)" }} />
      </div>

      <div style={chartContainerStyle}>
        <h2>Histogram (Vertical)</h2>
        <Histogram data={heightsData} options={{ value: "height", orientation: 'vertical', thresholds: 10, title: "Distribution of Heights" }} />
      </div>
      
      <div style={chartContainerStyle}>
        <h2>Histogram (Horizontal)</h2>
        <Histogram data={heightsData} options={{ value: "height", orientation: 'horizontal', thresholds: 10, title: "Distribution of Heights (Horizontal)" }} />
      </div>

    </div>
  );
};

export default DashboardPage;
