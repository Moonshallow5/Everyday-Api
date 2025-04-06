<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>


<script>
import { Chart as ChartJS, Title,  LineController, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';
ChartJS.register(Title, Tooltip,  LineController,Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default{
    props: ['coinId'],
    name:'Coin-Chart',
    data(){
        return{
            chartData: {
                labels: [],
                datasets: [{
                    label: "Price History",
                    data: [],
                    borderColor: "blue",
                    fill: false,
                }]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    watch: {
    coinId: {
      immediate: true,
      handler() {
        this.fetchCoinHistory();
      },
    },
  },
        async mounted() {
            await this.fetchCoinHistory();
            this.renderChart()
        },

    methods:{
        async fetchCoinHistory() {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${this.coinId}/market_chart?vs_currency=usd&days=30`);
                const prices = response.data.prices;
                console.log(prices)
                this.chartData.labels = prices.map(entry => new Date(entry[0]).toLocaleDateString());
                this.chartData.datasets[0].data = prices.map(entry => entry[1]);
            } catch (error) {
                console.error("Error fetching coin history:", error);
            }
        },
        renderChart() {
            if (this.chart) {
        this.chart.destroy(); // Destroy old chart before creating a new one
      }
            const ctx = this.$refs.chartCanvas.getContext("2d");
            new ChartJS(ctx, {
                type: "line",
                data: this.chartData,
                options: this.chartOptions,
            });
        }




    }
}



</script>