# Spotify Clone PWA

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Vue.js](https://img.shields.io/badge/vue.js-3.5-green)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/vite-7.0-purple)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](https://web.dev/progressive-web-apps/)

Frontend Progressive Web App (PWA) dengan tampilan seperti Spotify untuk musik streaming dari server Navidrome/Subsonic.

## 🎵 Tentang Project Ini

Spotify Clone PWA adalah web app yang:
- **Tampilan seperti Spotify** - UI modern dengan dark theme
- **Progressive Web App (PWA)** - Bisa diinstall di device seperti app native
- **Connect ke Navidrome/Subsonic** - Self-hosted music streaming server
- **Offline Ready** - Service Worker untuk caching

**Catatan:** Ini BUKAN downloader. Ini adalah music player yang connect ke server musik Anda sendiri (Navidrome/Subsonic).

## ✨ Features

- ✅ Tampilan modern seperti Spotify
- ✅ Progressive Web App (PWA) - installable
- ✅ Service Worker untuk offline caching
- ✅ Responsive design (mobile-first)
- ✅ Dark mode
- ✅ Playlist management
- ✅ Connect ke Navidrome/Subsonic API
- ✅ Docker support

## Prerequisites

- Node.js 20.19+ atau 22.12+
- Navidrome atau server Subsonic-compatible yang sudah running
- Docker & Docker Compose (untuk deployment)

## Instalasi

### Opsi 1: Tanpa Docker (Development)

#### 1. Install Dependencies

```sh
npm install
```

#### 2. Konfigurasi Environment Variables

Copy file `.env.example` ke `.env`:
```sh
cp .env.example .env
```

#### 3. Generate Salt (Recommended)

Jalankan perintah untuk generate salt secara otomatis:
```sh
npm run key:generate
```

Ini akan menggenerate random salt dan mengupdate file `.env` Anda secara otomatis.

#### 4. Edit Credentials

Edit file `.env` dengan kredensial Navidrome/Subsonic Anda:
```env
# URL Navidrome/Subsonic server Anda
VITE_API_URL=http://localhost:4533/rest/

# Credentials
VITE_API_USER=your_username
VITE_API_PASS=your_password
VITE_API_SALT=auto_generated_by_key_generate

# API Version & Client
VITE_API_VER=1.16.1
VITE_API_CLIENT=spotifyclone
```

**Catatan tentang Authentication:**
- `VITE_API_SALT` - Random string (gunakan `npm run key:generate` untuk generate otomatis)
- Password di-hash dengan MD5: `md5(password + salt)`
- Ini adalah standar Subsonic API authentication

#### 5. Jalankan Development Server

```sh
npm run dev
```

App akan berjalan di `http://localhost:5173`

#### 6. Build untuk Production

```sh
npm run build
```

File hasil build ada di folder `dist/`

---

### Opsi 2: Dengan Docker

#### 1. Konfigurasi Environment

Edit `docker-compose.yml` jika perlu ganti port (default: 8060)

#### 2. Build dan Jalankan

```sh
docker-compose up -d --build
```

App akan berjalan di `http://localhost:8060`

#### 3. Stop Service

```sh
docker-compose down
```

---

## Konfigurasi Navidrome

Jika Anda belum punya Navidrome, berikut cara setup:

### Install Navidrome dengan Docker

```yaml
# docker-compose.yml untuk Navidrome
services:
  navidrome:
    image: deluan/navidrome:latest
    ports:
      - "4533:4533"
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - "./data:/data"
      - "/path/to/your/music:/music:ro"
```

Jalankan:
```sh
docker-compose up -d
```

Buka `http://localhost:4533` dan buat user baru.

---

## Struktur Project

```
spotify-clone/
├── src/
│   ├── App.vue              # Root component
│   ├── main.js              # Entry point
│   ├── index.css            # Global styles
│   ├── router/              # Vue Router
│   │   └── index.js
│   ├── services/            # API services
│   │   └── api.js           # Subsonic API client
│   ├── utils/               # Utilities
│   │   └── pwa.js           # PWA utilities
│   └── views/               # Page components
│       ├── Home.vue
│       └── Playlist/
│           ├── playlist.vue
│           └── byId.vue
├── public/
│   ├── sw.js                # Service Worker
│   └── icons/               # PWA icons
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## PWA Features

### Install App

1. Buka app di browser (Chrome/Edge/Safari)
2. Klik tombol "Install App" atau gunakan menu browser
3. App akan terinstall seperti native app

### Offline Mode

Service Worker akan cache:
- Static assets (JS, CSS, images)
- App shell
- Recent playlists (limited)

---

## API Reference

Aplikasi ini menggunakan Subsonic API. Dokumentasi lengkap: [Subsonic API](http://www.subsonic.org/pages/api.jsp)

### Endpoints yang Digunakan

| Endpoint | Deskripsi |
|----------|-----------|
| `/rest/ping` | Test connection |
| `/rest/getPlaylists` | Get all playlists |
| `/rest/getPlaylist` | Get playlist by ID |
| `/rest/stream` | Stream audio file |
| `/rest/getCoverArt` | Get album art |

---

## Troubleshooting

### Connection Failed
- Pastikan Navidrome/Subsonic server running
- Cek `VITE_API_URL` sudah benar
- Pastikan credentials (user/pass) benar
- Cek CORS settings di Navidrome

### PWA Not Installing
- Pastikan menggunakan HTTPS (atau localhost)
- Cek Console untuk errors
- Clear cache dan reload

### Authentication Error
- Jalankan `npm run key:generate` untuk generate salt baru
- Cek password tidak ada special characters yang bermasalah
- Test dengan curl: `curl "http://server:4533/rest/ping?u=user&t=md5token&s=salt&v=1.16.1&c=test"`

---

## Development

### NPM Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server dengan hot reload |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run key:generate` | Generate random salt untuk authentication |

### Generate Salt
```sh
npm run key:generate
```

Output:
```
🔐 Subsonic API Salt Generator

================================

Generated Salt: a1b2c3d4e5f6g7h8

✅ Updated VITE_API_SALT in .env
```

### Hot Reload
```sh
npm run dev
```

### Build Production
```sh
npm run build
```

### Preview Build
```sh
npm run preview
```

---

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **Vite 7** - Next Generation Frontend Tooling
- **Vue Router** - Official router for Vue.js
- **Axios** - Promise based HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **PWA (vite-plugin-pwa)** - Progressive Web App support
- **MD5** - Password hashing untuk Subsonic API

---

## Related Projects

- [backend](https://github.com/spot-downloader/backend) - Backend API untuk Spotify Downloader
- [frontend](https://github.com/spot-downloader/frontend) - Frontend untuk Spotify Downloader

---

## License

GPL-3.0-or-later
