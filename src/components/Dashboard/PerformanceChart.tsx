import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const timeframes = ["1M", "6M", "1Y", "All"];

export const PerformanceChart = () => {
  const [activeTimeframe, setActiveTimeframe] = useState(0);

  const chartData = [
    { name: "Portfolio Value", data: [100, 110, 105, 120, 118, 135, 142] }
  ];

  const chartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      foreColor: '#999',
    },
    colors: ['hsl(217, 91%, 60%)'],
    stroke: { 
      curve: 'smooth', 
      width: 3,
    },
    grid: { 
      borderColor: 'hsl(240, 10%, 15%)',
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5', 'Apr 12'],
      labels: { 
        style: { 
          colors: '#666',
          fontSize: '11px',
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { 
        style: { 
          colors: '#666',
          fontSize: '11px',
        },
        formatter: (value) => `$${value}K`
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value}K`
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  return (
    <Card className="lg:col-span-2 bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Portfolio Performance</h2>
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes.map((tf, idx) => (
              <Button
                key={tf}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTimeframe(idx)}
                className={`h-7 px-3 text-xs ${
                  idx === activeTimeframe 
                    ? "bg-primary/20 text-primary hover:bg-primary/30" 
                    : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                }`}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-64 w-full">
          <Chart
            type="area"
            height="100%"
            width="100%"
            series={chartData}
            options={chartOptions}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-xs mb-1">Current</p>
            <p className="text-lg font-bold">$142,568</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-xs mb-1">Profit/Loss</p>
            <p className="text-lg font-bold text-success">+$24,318</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-xs mb-1">ROI</p>
            <p className="text-lg font-bold text-success">+21.4%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
