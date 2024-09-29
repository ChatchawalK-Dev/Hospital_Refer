import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

interface Chartstate {
  series: {
    name: string;
    data: { x: string; y: number }[];
  }[];
}

interface LineChartProps {
  selectedYear: number;
  hospcode: string;
}

const Linechart: React.FC<LineChartProps> = ({ selectedYear,hospcode }) => {
  const [state, setState] = useState<Chartstate>({
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [referInResponse, referOutResponse] = await Promise.all([
          axios.get(`http://localhost:3001/dashboard/referin/${selectedYear}/?hospcode=${hospcode}`),
          axios.get(`http://localhost:3001/dashboard/referout/${selectedYear}/?hospcode=${hospcode}`)
        ]);
  
        const referInData = referInResponse.data.filter((item: any) => item.year === selectedYear && item.refer_in === '1' && item.status === '1');
        const referOutData = referOutResponse.data.filter((item: any) => item.year === selectedYear && item.refer_out === '1' && item.status === '1');

        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
         
        const formattedDataReferIn = referInData.map((item: any) => ({
          x: monthNames[parseInt(item.month) - 1],
          y: item.count,
        }));

        const formattedDataReferOut = referOutData.map((item: any) => ({
          x: monthNames[parseInt(item.month) - 1],
          y: item.count,
        }));

        setState({
          series: [
            {
              name: 'Refer In',
              data: formattedDataReferIn,
            },
            {
              name: 'Refer Out',
              data: formattedDataReferOut,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedYear, hospcode]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#1C1C1C', '#A8C5DA'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 2,
        blur: 1,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 1],
      curve: 'smooth',
      dashArray: [0, 8]
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    
  };

  return (
    <div className="col-span-12 rounded-md bg-gray-100/[.50] px-5 pt-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 drop-shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <h2 className="font-bold">รายงานผู้รับบริการต่อปี</h2>
          <div className="flex min-w-32">
            <span className="bg-black mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Refer In</p>
            </div>
          </div>
          <div className="flex min-w-32">
            <span className="bg-gray-500 mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Refer Out</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="linechart" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Linechart;
