import React from "react";
import Chart from "react-apexcharts";

const DiveSummaryChart = ({ data }) => {
  const categories = data.map(item => item.month);
  const kelpFound = data.map(item => item.kelp_found);
  const kelpPlanted = data.map(item => item.kelp_planted);
  const urchinsRemoved = data.map(item => item.urchins_removed);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: { horizontal: false },
    },
    xaxis: {
      categories: categories,
      title: { text: "Month" },
    },
    yaxis: {
      title: { text: "Actions" },
    },
    legend: { position: "top" },
    fill: { opacity: 1 },
    colors: ["#00b894", "#0984e3", "#d63031"],
  };

  const chartSeries = [
    {
      name: "Kelp Found",
      data: kelpFound,
    },
    {
      name: "Kelp Planted",
      data: kelpPlanted,
    },
    {
      name: "Urchins Removed",
      data: urchinsRemoved,
    },
  ];

  return (
    <div>
      <h3>Dive Impact Summary (Monthly)</h3>
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default DiveSummaryChart;
