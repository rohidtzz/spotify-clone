# Contributing to Spotify Clone PWA

Terima kasih atas minat Anda untuk berkontribusi pada proyek ini! 🎉

## Cara Berkontribusi

### Melaporkan Bug

Jika Anda menemukan bug, silakan buat issue baru dengan informasi berikut:

1. **Deskripsi jelas** tentang masalahnya
2. **Langkah-langkah untuk mereproduksi** bug
3. **Perilaku yang diharapkan** vs **perilaku aktual**
4. **Browser dan versi** (Chrome 120, Firefox 121, dll)
5. **Device** (Desktop/Mobile/Tablet)
6. **Screenshots atau video** jika relevan

### Mengajukan Fitur Baru

Untuk fitur baru, buat issue dengan label "enhancement" yang menjelaskan:

1. Apa yang ingin Anda tambahkan
2. Mengapa fitur ini berguna
3. Mockup atau wireframe jika memungkinkan

### Pull Request Process

1. **Fork repository** ini
2. **Clone** fork Anda: `git clone https://github.com/YOUR_USERNAME/spotify-clone.git`
3. **Buat branch** baru: `git checkout -b feature/nama-fitur-anda`
4. **Install dependencies**: `npm install`
5. **Buat perubahan** Anda
6. **Test** di browser (Chrome, Firefox, Safari)
7. **Test PWA features** (install, offline mode)
8. **Commit** dengan pesan yang jelas: `git commit -m "Add: fitur xyz"`
9. **Push** ke branch Anda: `git push origin feature/nama-fitur-anda`
10. **Buat Pull Request** ke branch `main`

### Commit Message Guidelines

Gunakan format berikut untuk commit message:

```
Add: menambahkan fitur baru
Fix: memperbaiki bug
Update: memperbarui fitur yang ada
Remove: menghapus fitur/file
Refactor: refactoring code tanpa mengubah fungsionalitas
Docs: update dokumentasi
Style: perubahan styling/CSS
UI: perubahan user interface
PWA: perubahan terkait Progressive Web App
```

Contoh:
```
Add: music player controls
Fix: PWA install button not showing on iOS
Update: improve offline caching strategy
UI: redesign playlist card component
PWA: add background sync for favorites
```

### Code Style

#### JavaScript/Vue
- Gunakan **2 spaces** untuk indentasi
- Gunakan **camelCase** untuk variable dan function names
- Gunakan **PascalCase** untuk component names
- Gunakan **composition API** atau **options API** secara konsisten
- Tambahkan **comments** untuk logic yang kompleks

#### CSS/Tailwind
- Gunakan **Tailwind utility classes** sebisa mungkin
- Untuk custom CSS, letakkan di `src/index.css`
- Ikuti **mobile-first approach** untuk responsive design
- Gunakan **dark theme** sebagai default

### Testing Checklist

Sebelum submit PR, pastikan:

- [ ] Code berjalan tanpa error di console
- [ ] UI responsive di mobile, tablet, dan desktop
- [ ] Test di minimal 2 browser berbeda (Chrome + Firefox/Safari)
- [ ] PWA install berfungsi
- [ ] Service Worker tidak error
- [ ] Tidak ada console warnings
- [ ] Build production berhasil: `npm run build`
- [ ] Tidak ada credentials atau API URLs yang ter-commit di code

### Development Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate salt secara otomatis
npm run key:generate

# Edit .env dengan credentials Navidrome Anda
# (URL, username, password sudah, salt sudah di-generate)

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### NPM Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm run preview` | Preview build |
| `npm run key:generate` | Generate random salt |

### PWA Development Tips

1. **Testing Service Worker**:
   - Gunakan Chrome DevTools → Application → Service Workers
   - Enable "Update on reload" saat development
   - Clear storage jika ada masalah caching

2. **Testing Install**:
   - Service Worker hanya aktif di HTTPS atau localhost
   - Gunakan Chrome DevTools → Application → Manifest untuk debug

3. **Testing Offline**:
   - Chrome DevTools → Network → Offline
   - Test apakah app tetap bisa load

### Apa yang TIDAK boleh di-commit

- ❌ File `.env` dengan credentials asli
- ❌ Folder `node_modules/`
- ❌ Folder `dist/` hasil build
- ❌ File `.DS_Store` atau temporary files
- ❌ Navidrome/Subsonic credentials
- ❌ Personal API URLs

### Project Structure

```
spotify-clone/
├── src/
│   ├── App.vue           # Root component
│   ├── main.js           # Entry point
│   ├── index.css         # Global styles
│   ├── router/           # Vue Router
│   ├── services/         # API services
│   ├── utils/            # Utilities (PWA, etc)
│   └── views/            # Page components
├── public/
│   ├── sw.js             # Service Worker
│   └── icons/            # PWA icons
├── index.html
└── vite.config.js
```

### Component Guidelines

Saat membuat Vue component baru:

```vue
<template>
  <div class="bg-gray-800 p-4 rounded-lg">
    <!-- Component template -->
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    handleClick() {
      // Logic here
    }
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
```

### UI/UX Guidelines

- Gunakan **consistent spacing** (Tailwind spacing scale)
- Berikan **loading states** untuk async operations
- Tampilkan **error messages** yang user-friendly
- Gunakan **transitions** untuk interaksi yang smooth
- Pastikan **accessibility** (keyboard navigation, ARIA labels)
- **Mobile-first** design approach
- Maintain **Spotify-like** aesthetic (dark theme, green accents)

### Need Help?

Jika Anda memiliki pertanyaan, silakan:

1. Cek [README.md](README.md) terlebih dahulu
2. Cari di Issues yang sudah ada
3. Buat issue baru jika belum ada jawaban

## Code of Conduct

Proyek ini mengadopsi standar perilaku yang ramah dan inklusif. Dengan berpartisipasi, Anda diharapkan untuk:

- Menggunakan bahasa yang ramah dan inklusif
- Menghormati sudut pandang dan pengalaman yang berbeda
- Menerima kritik konstruktif dengan baik
- Fokus pada yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lainnya

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah GPL-3.0-or-later License yang sama dengan proyek ini.
