<template>

<v-container>

    <h2 class="text-h5 mb-5 poppins">Weather Page</h2>
    <hr />
    <v-select
    v-model="selectedCity"
    :items="cityOptions"
    label="Select a city"
    item-title="name"
    item-value="value"
    @change="fetchWeather" 

  ></v-select>
  <div v-if="selected">

            <v-card class="elevation-3 pa-4 mb-4">
      <v-row align="center">
        <v-col cols="6">
          <h3>Current Temperature: {{ currentTemp }}°C</h3>
          <p>Condition: {{ currentCondition }}</p>
        </v-col>
        <v-col cols="6">
          <v-img :src="currentIcon" max-height="80px" max-width="80px"></v-img>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
        <v-col cols="6">
            <v-card>
                <v-card-item>
                    <v-card-title style="color: aqua;">
                        Current Weather
                    </v-card-title>
                    

                <v-slide-group show-arrows>
                    <v-slide-group-item v-for="(hour, index) in hourlyForecast" :key="index">
                    <v-card class=" pa-3 text-center" width="100">
                        <h4>{{ hour.time.split(" ")[1] }}</h4>
                        <v-img :src="hour.condition.icon" max-height="50px" max-width="50px"></v-img>
                        <p>{{ hour.temp_c }}°C</p>
                   
                    </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-card-item>
    </v-card>
    </v-col>
    <v-col cols="6">
        <v-card>
           <v-card-title style="color: aqua;">3-Day Forecast</v-card-title>
            <div v-for="(day, index) in forecast.slice(1, 4)" :key="'day' + index">
            <h4 class="text-subtitle-1 font-weight-bold mt-3 pa-3">Date:  {{ day.date }}</h4>
            <v-slide-group show-arrows>
                <v-slide-group-item v-for="(hour, i) in day.hour" :key=" 'hour' + i">
                <v-card class=" pa-3 text-center" width="100">
                    <h4>{{ hour.time.split(" ")[1] }}</h4>
                    <v-img :src="hour.condition.icon" max-height="50px" max-width="50px"></v-img>
                    <p>{{ hour.temp_c }}°C</p>
                </v-card>
                </v-slide-group-item>
            </v-slide-group>
            </div>
    </v-card>
    </v-col>
    </v-row>
    </div>
 


</v-container>

</template>


<script>
import axios from "axios";


export default{
    


    name:'Weather',
    

    data(){
        return{
            selected:false,
            currentTemp: null,
      currentCondition: "",
      currentIcon: "",
      hourlyForecast:[],
      forecast:[],
      selectedCity:'',
      cityOptions: [
        { name: "London, UK", value: "London" },
        { name: "New York, USA", value: "New York" },
        { name: "Tokyo, Japan", value: "Tokyo" },
        { name: "Sydney, Australia", value: "Sydney" },
        { name: "Paris, France", value: "Paris" },
        { name: "Toronto, Canada", value: "Toronto" },
        { name: "Dubai, UAE", value: "Dubai" },
        {name: "Kuala Lumpur, Malaysia",value:'Kuala Lumpur'},
      ],
            

        }

    },
    watch: {
    selectedCity(newCity) {
        if (newCity) {
            this.selected=true
            this.fetchWeather();  
        }
    }
},

    methods:{
       
        async fetchWeather(){
            console.log(this.selectedCity)
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${this.selectedCity}&days=4&aqi=no&alerts=no`
            try{
                const response=await axios.get(url)
                const data=response.data
                console.log(data)
                this.currentTemp = data.current.temp_c;
        this.currentCondition = data.current.condition.text;
        this.currentIcon = data.current.condition.icon;
        this.hourlyForecast = data.forecast.forecastday[0].hour;
        this.forecast = data.forecast.forecastday; // Store all forecast days


            }catch(error){
                console.error('error')
            }

        }
    },
    

}

</script>