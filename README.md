# Everyday API

## ⏰Something To Note:

Link to run: https://everyday-api-frontend.onrender.com/

- Since I'm using an Ollama Model, you have to understand it's only meant to work if you have the same model of ollama 3.2 running in your computer.

- I tried to use ngrok to specify a domain for this model to be used globally, but with the free license the url will be randomised each time user starts a new ollama session



## 💡Inspiration
I always wanted to do this project in some way :) I wanted to build a program which is able to tell you your daily tasks and automatically be able to speak it to you.

## 👀What it does?
Want to know the current weather, your to-do tasks or maybe your stock prices that you have invested in. Now you can do so with an ollama model reading out the API details and responsivevoice.js to speak it out.

API's used: weatherapi.com, pro-api.coinmarketcap.com and api.coingecko.com

Utilized ollama 3.2, express.js, postgreSQL and vue.

## 💡What I learnt
- I learnt how to deal with different APIs and Ollama
- I also realised how there are not many free api keys for LLMs avaiable nowadays for user to try on for fun resulting in me using Ollama which can only run locally


## 🚧Challenges I ran into
- Dealing with CORS issue for the API keys, hence me making a middleware.
- Realising a lot of openAI gpt models require api key and their free license is very limited resulting in me using ollama

- Tried multiple ways to make my ollama model onto a public domain to be used globally but I soon realsed the domain would change every time upon intitalisation thus this method didn't really work

## 🟩Further Improvements

- Pay for the openAI api key so ppl can use the AI functionality :'(