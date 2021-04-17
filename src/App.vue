<template>
  <apostador-crud></apostador-crud>
  <br/><br/>
  <ronda-vista></ronda-vista>
</template>

<script>
import ApostadorCrud from './components/ApostadorCrud.vue'
import RondaVista from './components/RondaVista.vue'

export default {
  name: 'App',
  components: {
    ApostadorCrud,
    RondaVista
  }
}
</script>

<style>
</style>
