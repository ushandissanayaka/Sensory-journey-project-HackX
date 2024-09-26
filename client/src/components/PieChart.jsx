import React,{useEffect} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const PieChart1 = ({ menu }) => {
  // Sum up all scores
  const totalScore = menu.reduce((sum, game) => sum + parseInt(game.score || 0), 0);
  useEffect(() => {
    const ctx = document.getElementById('chartPie').getContext('2d');
    const distinctTags=Array.from(new Set(menu.flatMap(game => [game.tag1, game.tag2])));
    const dataPie = {
      labels: distinctTags,
      datasets: [
        {
          
          data: distinctTags.map(tag => {
            return menu.reduce((sum, game) => {
              if (game.tag1 === tag || game.tag2 === tag) {
                return sum + parseInt(game.score || 0);
              }
              return sum;
            }, 0);
          }),
          backgroundColor: [
            "rgb(191, 74, 74)",
            "rgb(142, 24, 185)",
            "rgb(185, 68, 133)",
            "rgb(50, 143, 241)",
            "rgb(50, 212, 241)",
            "rgb(50, 241, 107)",
            "rgb(187, 241, 50)",
          ],
          borderColor: 'black', // Set custom border color
          borderWidth: 1, // Customize the border width
          hoverOffset: 4,
          
        },
      ],
    };
    
    const configPie = {
      type: 'line',
      data: dataPie,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display:false
          },
          
          title: {
            display: true,
            text: 'Current Progress',
            color:'red',
            font:{
                size:'20'
            }
          }
        }
      },
    };

    const chartPie = new Chart(ctx, configPie);

    // Cleanup the chart on component unmount
    return () => {
      chartPie.destroy();
    };
  }, []);

  return (
    <div className=" rounded-lg h-1/2 overflow-hidden min-w-fit ">
      
      <canvas className="p-1 shadow-lg h-full bg-white rounded-lg ml-40 mr-40 " id="chartPie"></canvas>
    </div>
  );
}

export default PieChart1;
