'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  labels: string[];
  data: number[];
}

const Dashboard: React.FC = () => {
  const [candlestickData, setCandlestickData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [barData, setBarData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [candlestick, line, bar, pie] = await Promise.all([
          fetch('/api/candlestick-data').then(res => res.json()),
          fetch('/api/line-chart-data').then(res => res.json()),
          fetch('/api/bar-chart-data').then(res => res.json()),
          fetch('/api/pie-chart-data').then(res => res.json())
        ]);
        setCandlestickData(candlestick?.data || []);
        setLineData(line || null);
        setBarData(bar || null);
        setPieData(pie || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const labelColorMap: { [key: string]: string } = {
    Red: '#FF0000',
    Blue: '#0000FF',
    Yellow: '#FFFF00',
  };

  const pieChartColors = (pieData?.labels?.map(label => labelColorMap[label] || '#8884d8')) || [];


  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      
      <div className="chart-container">
        <h2>Candlestick Chart</h2>
        {candlestickData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={candlestickData}>
              <XAxis dataKey="x" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" fill="transparent" stroke="#000" barSize={2} />
              <Bar dataKey="high" fill="transparent" stroke="#000" barSize={2} />
              <Bar dataKey="open" fill="#ff0000" barSize={8} />
              <Bar dataKey="close" fill="#00ff00" barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div>No data available for Candlestick Chart</div>
        )}
      </div>

      <div className="chart-container">
        <h2>Line Chart</h2>
        {lineData && lineData.labels && lineData.data && lineData.labels.length > 0 && lineData.data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData.labels.map((label, index) => ({ name: label, value: lineData.data[index] }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div>No data available for Line Chart</div>
        )}
      </div>

      <div className="chart-container">
        <h2>Bar Chart</h2>
        {barData && barData.labels && barData.data && barData.labels.length > 0 && barData.data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData.labels.map((label, index) => ({ name: label, value: barData.data[index] }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div>No data available for Bar Chart</div>
        )}
      </div>

      <div className="chart-container">
      <h2>Pie Chart</h2>
      {pieData && pieData.labels?.length > 0 && pieData.data?.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData.labels.map((label, index) => ({ name: label, value: pieData.data[index] }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {pieData.labels.map((label, index) => (
                <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div>No data available for Pie Chart</div>
      )}
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
        }
        .chart-container {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
