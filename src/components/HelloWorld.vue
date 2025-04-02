<template>
  <v-container class="d-flex align-center fill-height mx-auto" style="justify-self: center; text-align: center;">

    <v-row>
      <v-col cols="12">

      <h2>An all in one Platform</h2>
      </v-col>
      <v-col cols="12">
       <v-btn class="mt-3 mx-3 " color="primary" style="text-transform: none;" @click="this.$router.push('weather')">Weather</v-btn>
       <v-btn class="mt-3 mx-3 " color="primary" style="text-transform: none;"  @click="this.$router.push('stock')">Stock</v-btn>
       <v-btn class="mt-3 mx-3 " color="primary" style="text-transform: none;" @click="this.$router.push('todo')">Your Daily Tasks</v-btn>
       </v-col>

    </v-row>


    
  </v-container>
</template>

<script>
export default{
  name:'Home',



}
  
</script>
