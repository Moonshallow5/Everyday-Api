<template>


    <v-container>


        <h2 class="text-h5 mb-5 poppins">Stock Page</h2>
    <hr />
    <v-row class="mt-5">
        <v-col cols="6">
    <v-card class="mr-5" >
        
            <h3>📊 Live Crypto Prices</h3>
            <p>Bitcoin: ${{ btc_price }} , ({{ btc_24h }})%</p>
            <p>Ethereum:${{ eth_price }}, ({{ eth_24h }})% </p>
        
    </v-card>
    </v-col>
        <v-col cols="6">
            <v-row class="mb-3 ml-2">
            <v-btn @click="selected_coin='bitcoin'">BTC</v-btn>
            <v-btn class="ml-3" @click="selected_coin='ethereum'">ETH</v-btn>
            </v-row>
            <v-card >
                <CoinChart :coinId='selected_coin' :key="selected_coin" />
            </v-card>
        </v-col>

  </v-row>


    </v-container>
</template>


<!-- "percent_change_1h": -0.152774,
"percent_change_24h": 0.518894,
"percent_change_7d": 0.986573 -->
<script>
import axios from 'axios';
import CoinChart from './CoinChart.vue';
//CG-tZoYqhrZ94QZHKbrSs96BgJN	

export default{
    name:'Stock',
    components:[
        CoinChart
    ],

    data(){
        return{
            btc_price:'',
            eth_price:'',
            btc_24h:'',
            eth_24h:'',
            selected_coin:'',
        }
    },
//b81e9630-af47-49a3-85cc-6df9652154e4
    methods:{
        async fetchStockData(){

        const response = await axios.get("http://localhost:5000/crypto")
        console.log(response)
        const coins=response.data.data
        const btc = coins.find(coin => coin.symbol === "BTC");
        const eth = coins.find(coin => coin.symbol === "ETH");

        this.btc_price=btc.quote.USD.price.toFixed(2)
        this.eth_price=eth.quote.USD.price.toFixed(2)

        this.btc_24h=btc.quote.USD.percent_change_24h.toFixed(2)
        this.eth_24h=eth.quote.USD.percent_change_24h.toFixed(2)

        },

    
    },
    async mounted() {
     this.fetchStockData();
  }
}

</script>