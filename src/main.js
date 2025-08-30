import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('✅ Service Worker registered:', registration.scope)
      
      // Handle SW updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Just log update available, no popup notification
              console.log('🔄 App update available - will apply on next visit')
            }
          })
        }
      })
      
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  })
}

// PWA Install Prompt Handler
let deferredPrompt = null

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📱 PWA install prompt available')
  e.preventDefault()
  deferredPrompt = e
  
  // Don't show popup automatically - just store the prompt
  // User can install manually via browser menu or address bar icon
})

// PWA Update Handler
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
  })
}

// PWA Offline Status
window.addEventListener('online', () => {
  console.log('App is online')
})

window.addEventListener('offline', () => {
  console.log('App is offline')
  // Show offline notification
  const offlineNotification = document.createElement('div')
  offlineNotification.id = 'offline-notification'
  offlineNotification.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; background: #ff4444; color: white; padding: 12px; text-align: center; z-index: 9999;">
      📶 You're offline. Some features may not work.
    </div>
  `
  document.body.appendChild(offlineNotification)
})

window.addEventListener('online', () => {
  const offlineNotification = document.getElementById('offline-notification')
  if (offlineNotification) {
    offlineNotification.remove()
  }
})
