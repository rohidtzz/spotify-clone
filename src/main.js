import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { PWAUtils } from './utils/pwa.js'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Initialize PWA features
document.addEventListener('DOMContentLoaded', () => {
  PWAUtils.showOfflineMessage();
  
  // Check for updates every 5 minutes
  setInterval(() => {
    PWAUtils.checkForUpdates();
  }, 5 * 60 * 1000);
});
