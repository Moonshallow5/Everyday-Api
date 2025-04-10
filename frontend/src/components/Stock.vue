<template>


    <v-container>


        <h2 class="text-h5 mb-5 poppins">Stock Page</h2>
    <hr />
    <v-row class="mt-5">
        <v-col cols="6">
    <v-card class="mr-5 pa-4" >
        
            <h3>📊 Live Crypto Prices</h3>
            <p>Bitcoin: ${{ btc_price }}, ({{ btc_24h }})%</p>
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
  <v-btn @click="ml_speak" > Talk</v-btn>
  <div v-if="summary">
  <h3>📈 LLM Crypto Insight</h3>
  <p>{{ summary }}</p>
</div>


    </v-container>
</template>


<!-- "percent_change_1h": -0.152774,
"percent_change_24h": 0.518894,
"percent_change_7d": 0.986573 -->
<script>
import axios from 'axios';
import CoinChart from './CoinChart.vue';


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
            btc_per_change_7d:'',
            eth_per_change_7d:'',
            selected_coin:'',
            summary:'',
        }
    },
    methods:{
        async fetchStockData(){

        const response = await axios.get("https://everyday-api-backend.onrender.com/crypto")
        console.log(response)
        const coins=response.data.data
        const btc = coins.find(coin => coin.symbol === "BTC");
        const eth = coins.find(coin => coin.symbol === "ETH");

        this.btc_price=btc.quote.USD.price.toFixed(2)
        this.eth_price=eth.quote.USD.price.toFixed(2)

        this.btc_24h=btc.quote.USD.percent_change_24h.toFixed(2)
        this.eth_24h=eth.quote.USD.percent_change_24h.toFixed(2)
        this.btc_per_change_7d=btc.quote.USD.percent_change_7d.toFixed(2)
        this.eth_per_change_7d=eth.quote.USD.percent_change_7d.toFixed(2)

        },
        async ml_speak(){


            const prompt = `
Here is the latest crypto data:

Bitcoin (BTC)
- Current Price: $${this.btc_price}
- 24h Change: ${this.btc_24h}%
- 7d Change: ${this.btc_per_change_7d}%

Ethereum (ETH)
- Current Price: $${this.eth_price}
- 24h Change: ${this.eth_24h}%
- 7d Change: ${this.eth_per_change_7d}%


  `;    
    
  try {
    const ollamaResponse = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'llama3.2',
      prompt: prompt,
      stream: false,
    });

    this.summary = ollamaResponse.data.response;
  } catch (err) {
    console.error("Error talking to Ollama:", err.message);
    this.summary = "Failed to fetch investment advice.";
  }

    
            }

    
    },
    async mounted() {
     this.fetchStockData();
  }
}

</script>