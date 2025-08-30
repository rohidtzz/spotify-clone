// PWA Utilities
export class PWAUtils {
  static isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true
  }
  
  static isPWAInstalled() {
    return this.isStandalone()
  }
  
  static canInstall() {
    return !this.isPWAInstalled() && 'serviceWorker' in navigator
  }
  
  static async checkForUpdates() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        registration.update()
      }
    }
  }
  
  static async getAppInfo() {
    let installPrompt = null
    
    window.addEventListener('beforeinstallprompt', (e) => {
      installPrompt = e
    })
    
    return {
      isInstalled: this.isPWAInstalled(),
      canInstall: this.canInstall(),
      isStandalone: this.isStandalone(),
      installPrompt
    }
  }
  
  static addToHomeScreen(deferredPrompt) {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      return deferredPrompt.userChoice
    }
    return Promise.resolve({ outcome: 'dismissed' })
  }
  
  static async requestNotificationPermission() {
    if ('Notification' in window) {
      return await Notification.requestPermission()
    }
    return 'denied'
  }
  
  static async showNotification(title, options = {}) {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        return registration.showNotification(title, {
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-96x96.png',
          vibrate: [200, 100, 200],
          ...options
        })
      }
    }
    
    if (Notification.permission === 'granted') {
      return new Notification(title, options)
    }
  }
  
  static isOnline() {
    return navigator.onLine
  }
  
  static onNetworkChange(callback) {
    window.addEventListener('online', () => callback(true))
    window.addEventListener('offline', () => callback(false))
  }
  
  static async shareContent(data) {
    if (navigator.share) {
      try {
        await navigator.share(data)
        return true
      } catch (err) {
        console.log('Share cancelled or failed:', err)
        return false
      }
    }
    
    // Fallback - copy to clipboard
    if (navigator.clipboard && data.url) {
      try {
        await navigator.clipboard.writeText(data.url)
        return true
      } catch (err) {
        console.log('Clipboard write failed:', err)
        return false
      }
    }
    
    return false
  }
  
  static async enableBackgroundSync() {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      return registration.sync.register('background-sync')
    }
    return Promise.reject('Background sync not supported')
  }
  
  static getDeviceInfo() {
    return {
      isMobile: /Mobi|Android/i.test(navigator.userAgent),
      isTablet: /Tablet|iPad/i.test(navigator.userAgent),
      isDesktop: !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent),
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      standalone: this.isStandalone()
    }
  }
}

// PWA Event Emitter for communication between components
export class PWAEvents extends EventTarget {
  static instance = null
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new PWAEvents()
    }
    return this.instance
  }
  
  emit(eventType, data = {}) {
    this.dispatchEvent(new CustomEvent(eventType, { detail: data }))
  }
  
  on(eventType, handler) {
    this.addEventListener(eventType, handler)
  }
  
  off(eventType, handler) {
    this.removeEventListener(eventType, handler)
  }
}

// PWA Storage utilities
export class PWAStorage {
  static get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch {
      return defaultValue
    }
  }
  
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }
  
  static remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
  
  static clear() {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
  
  // Offline data management
  static setOfflineData(key, data) {
    const offlineData = this.get('offline-data', {})
    offlineData[key] = {
      data,
      timestamp: Date.now()
    }
    return this.set('offline-data', offlineData)
  }
  
  static getOfflineData(key) {
    const offlineData = this.get('offline-data', {})
    return offlineData[key]?.data || null
  }
  
  static clearOldOfflineData(maxAge = 7 * 24 * 60 * 60 * 1000) { // 7 days
    const offlineData = this.get('offline-data', {})
    const now = Date.now()
    
    Object.keys(offlineData).forEach(key => {
      if (now - offlineData[key].timestamp > maxAge) {
        delete offlineData[key]
      }
    })
    
    return this.set('offline-data', offlineData)
  }
}
