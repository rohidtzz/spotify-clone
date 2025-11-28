<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Install PWA Button - Only show if not installed and can install -->
    <button 
      v-if="showInstallButton"
      @click="installApp"
      class="fixed top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 z-50"
      title="Install App"
    >
      📱 Install App
    </button>
    
    <!-- Header -->
    <div class="pt-8 pb-6 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <div class="mb-4">
            <div class="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-bold mb-2 text-white">Spotify Clone PWA</h1>
          <p class="text-lg text-gray-300">Simple Progressive Web App</p>
        </div>
      </div>
    </div>

    
    <!-- PWA Status Cards -->
    <div class="px-4 text-center p-6">
          <router-link 
            to="/playlist" 
            class="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 mr-4 mb-4"
          >
            View Playlists
          </router-link>
          <!-- <button 
            @click="testOffline"
            class="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Test Offline Mode
          </button> -->
    </div>
    <div class="px-4 pb-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Installation Status -->
          <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Installation</h3>
            </div>
            <p class="text-gray-300" v-if="isInstalled">✅ App is installed as PWA</p>
            <p class="text-gray-300" v-else>📱 Available for installation</p>
          </div>

          <!-- Offline Status -->
          <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Connectivity</h3>
            </div>
            <p class="text-gray-300" v-if="isOnline">🟢 Online</p>
            <p class="text-gray-300" v-else>🔴 Offline</p>
          </div>

          <!-- Service Worker Status -->
          
        </div>

        <!-- Features List -->
        <div class="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 class="text-2xl font-bold mb-6 text-white">PWA Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Installable on device
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Offline functionality
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Responsive design
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Fast loading
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Push notifications ready
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Secure (HTTPS)
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <!-- <div class="mt-8 text-center">
          <router-link 
            to="/playlist" 
            class="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 mr-4 mb-4"
          >
            View Playlists
          </router-link>
          <button 
            @click="testOffline"
            class="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Test Offline Mode
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { PWAUtils } from '@/utils/pwa.js'

export default {
  name: 'HomePage',
  data() {
    return {
      isInstalled: false,
      isOnline: navigator.onLine,
      swRegistered: false,
      deferredPrompt: null,
      showInstallButton: false
    }
  },
  computed: {
    canInstall() {
      return !this.isInstalled && this.deferredPrompt !== null;
    }
  },
  async mounted() {
    this.isInstalled = PWAUtils.isInstalled();
    
    // Check service worker status
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      this.swRegistered = !!registration;
    }

    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = !this.isInstalled;
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.showInstallButton = false;
      this.deferredPrompt = null;
    });
  },
  methods: {
    async installApp() {
      if (!this.deferredPrompt) return;
      
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
      this.showInstallButton = false;
    },
    testOffline() {
      // Simulate offline test by disabling network temporarily
      alert('Untuk menguji mode offline:\n\n1. Buka Developer Tools (F12)\n2. Pilih tab Network\n3. Centang "Offline"\n4. Refresh halaman\n\nApp akan tetap berfungsi karena service worker cache!');
    }
  }
}
</script>
