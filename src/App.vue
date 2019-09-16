<template>
  <div id="app">
    <li v-for="res in response" v-bind:key="res.id">
      {{ res.username }} : {{ res.password }}
    </li>
  </div>
</template>

<script>
import axios from 'axios';
const port = process.env.PORT || 4142;
export default {
  name: 'app',
  data(){
    return{
        response: '',
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get(`http://localhost:${port}/users
        `).then(res => {
        this.response = res.data
      }).catch ((err) => {
        this.response = err.message
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
