<template>
  <md-snackbar :md-position="snackBarProps.position" :md-duration="snackBarProps.isInfinity ? Infinity : snackBarProps.duration" :md-active.sync="snackBarProps.showSnackbar" md-persistent>
      <span>{{snackBarProps.message}}</span>
      <md-button class="md-primary" @click="snackBarProps.showSnackbar = false">Retry</md-button>
  </md-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: ['snackBarProps']
}
</script>