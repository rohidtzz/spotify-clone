<template>
  <div>
    <!-- Simple Install Prompt -->
    <div 
      v-if="showInstallPrompt" 
      class="pwa-prompt install-prompt"
      @click="handleInstall"
    >
      <span class="prompt-icon">⬇️</span>
      <span class="prompt-text">Install</span>
      <button class="dismiss-btn" @click.stop="dismissInstall">×</button>
    </div>

    <!-- Simple Update Prompt -->
    <div 
      v-if="showUpdatePrompt" 
      class="pwa-prompt update-prompt"
      @click="handleUpdate"
    >
      <span class="prompt-icon">🔄</span>
      <span class="prompt-text">Update</span>
      <button class="dismiss-btn" @click.stop="dismissUpdate">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PWAPrompt',
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false,
      showUpdatePrompt: false,
      updateRegistration: null
    }
  },
  mounted() {
    this.setupInstallPrompt()
    this.setupUpdatePrompt()
  },
  methods: {
    setupInstallPrompt() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.deferredPrompt = e
        
        // Show prompt only after user has been on site for a while
        setTimeout(() => {
          if (this.deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
            this.showInstallPrompt = true
          }
        }, 5000) // Show after 5 seconds
      })
    },
    
    setupUpdatePrompt() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  this.updateRegistration = registration
                  this.showUpdatePrompt = true
                }
              })
            }
          })
        })
      }
    },
    
    async handleInstall() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt()
        const { outcome } = await this.deferredPrompt.userChoice
        console.log('Install result:', outcome)
        this.deferredPrompt = null
        this.showInstallPrompt = false
      }
    },
    
    handleUpdate() {
      if (this.updateRegistration && this.updateRegistration.waiting) {
        this.updateRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    },
    
    dismissInstall() {
      this.showInstallPrompt = false
    },
    
    dismissUpdate() {
      this.showUpdatePrompt = false
    }
  }
}
</script>

<style scoped>
.pwa-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(29, 185, 84, 0.95);
  color: white;
  padding: 14px 20px;
  border-radius: 28px;
  box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  z-index: 9999;
  transition: all 0.3s ease;
  font-family: system-ui, -apple-system, sans-serif;
  min-width: 100px;
}

.pwa-prompt:hover {
  background: rgba(29, 185, 84, 1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(29, 185, 84, 0.4);
}

.update-prompt {
  background: rgba(255, 152, 0, 0.95);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.update-prompt:hover {
  background: rgba(255, 152, 0, 1);
  box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4);
}

.prompt-icon {
  font-size: 18px;
}

.prompt-text {
  font-size: 15px;
  font-weight: 600;
}

.dismiss-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 6px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.dismiss-btn:hover {
  opacity: 1;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .pwa-prompt {
    top: 15px;
    right: 15px;
    font-size: 14px;
    padding: 12px 16px;
    min-width: 90px;
  }
  
  .prompt-icon {
    font-size: 16px;
  }
  
  .prompt-text {
    font-size: 14px;
  }
}
</style>
