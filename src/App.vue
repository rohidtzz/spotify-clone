<template>
  <div>
    <!-- Main App Content -->
    <router-view />
  </div>
</template>

<script>
import { PWAUtils } from './utils/pwa.js'

export default {
  name: 'App',
  mounted() {
    // Check if already installed
    if (PWAUtils.isInstalled()) {
      console.log('App is already installed as PWA');
    }
  }
}
</script>

<style>
/* Global PWA styles */
@media (display-mode: standalone) {
  body {
    user-select: none;
    -webkit-user-select: none;
  }
}
</style>
