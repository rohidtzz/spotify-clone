// PWA utilities
export class PWAUtils {
  static isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }

  static canInstall() {
    return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
  }

  static async checkForUpdates() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
      }
    }
  }

  static addInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show custom install button
      const installBtn = document.getElementById('install-btn');
      if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', () => {
          installBtn.style.display = 'none';
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
          });
        });
      }
    });
  }

  static showOfflineMessage() {
    const offlineDiv = document.createElement('div');
    offlineDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff6b6b;
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 9999;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
      " id="offline-indicator">
        🔌 Anda sedang offline
      </div>
    `;
    document.body.appendChild(offlineDiv);

    window.addEventListener('offline', () => {
      const indicator = document.getElementById('offline-indicator');
      if (indicator) {
        indicator.style.transform = 'translateY(0)';
      }
    });

    window.addEventListener('online', () => {
      const indicator = document.getElementById('offline-indicator');
      if (indicator) {
        indicator.style.transform = 'translateY(-100%)';
      }
    });
  }
}
