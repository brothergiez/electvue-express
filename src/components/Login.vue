<template>
  <div id="Login" class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="../assets/pos.png">
        <div class="md-title">Free POS v.1.0.0</div>
      </div>

      <div class="form">
        <md-field>
          <label>Username</label>
          <md-input v-model="login.username" @keyup.enter="auth" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" @keyup.enter="auth" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <!-- <a href="/resetpassword">Reset password</a> -->
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
    <SnackBar v-bind:snackBarProps='snackBarProps' />
  </div>
</template>

<script>
import SnackBar from './reusable/snackbar';
const axios = require('axios');

export default {
  name: "Login",
  components: {
    SnackBar
  },
  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: ""
      },
      snackBarProps: {
        showSnackbar: false,
        position: 'center',
        duration: 4000,
        isInfinity: false,
        message: 'No Connection'
      }
    };
  },
  methods: {
    createSnackbar(message){
      this.snackBarProps.message = message
      this.snackBarProps.showSnackbar = true;
    },
    async auth() {
      if(this.login.username != "" && this.login.password != "") {
        const params = {
          username: this.login.username,
          password: this.login.password
        }
        try {
          const { data } = await axios.post('http://localhost:4142/login', params);
          this.createSnackbar(`Login berhasil. Token kamu ${data.token}`);
        }catch(e){
          this.createSnackbar('Username or Password did not match');
        }
      } else {
        this.createSnackbar('A username and password must be present');
      }
    }
  }
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 90vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 80%;
    width: 100%;
    top: 20;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 80%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
