<template>
  <md-dialog-alert
      :md-active.sync="alertProps.activate"
      md-title={{alertProps.title}}
      md-content={{alertProps.content}} />
</template>

<script>
  export default {
    name: 'DialogAlert',
    props: ['alertProps']
  }
</script>