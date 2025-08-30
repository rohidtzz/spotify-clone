<template>
  <router-view />
  <PWAPrompt />
</template>

<script>
import PWAPrompt from './components/PWAPrompt.vue'

export default {
  name: 'App',
  components: {
    PWAPrompt
  }
}
</script>
