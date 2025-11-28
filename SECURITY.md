# Security Policy

## Supported Versions

Kami saat ini mendukung versi berikut dengan security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Jika Anda menemukan vulnerability keamanan di project ini, mohon **JANGAN** membuat public issue.

Sebagai gantinya, silakan laporkan secara privat dengan cara:

1. **Email** ke security contact (bisa ditambahkan email Anda)
2. Atau gunakan **GitHub Security Advisories**:
   - Buka tab "Security" di repository
   - Klik "Report a vulnerability"
   - Isi form dengan detail vulnerability

### Informasi yang Perlu Disertakan

- Deskripsi vulnerability (XSS, CSRF, credential exposure, dll)
- Steps to reproduce
- Affected browsers/versions
- Potential impact
- Suggested fix (jika ada)

### Response Timeline

- **Initial Response**: Dalam 48 jam
- **Investigation**: 1-2 minggu
- **Fix & Disclosure**: Tergantung severity

## Security Best Practices untuk Pengguna

### 1. Environment Variables
- **JANGAN** commit file `.env` dengan credentials asli
- Gunakan `.env.example` sebagai template
- Credentials di `.env` akan ter-expose di browser (ini normal untuk Vite)
- Untuk production, pertimbangkan backend proxy untuk hide credentials

### 2. Navidrome/Subsonic Server
- Gunakan **HTTPS** untuk production
- Set **strong password** untuk user
- Enable **rate limiting** jika tersedia
- Limit akses hanya dari IP yang dipercaya

### 3. PWA Security
- Service Worker bisa cache sensitive data
- Clear cache saat logout
- Gunakan HTTPS untuk enable Service Worker di production

### 4. Dependencies
Update dependencies secara teratur:
```bash
npm audit
npm audit fix
```

## Known Security Considerations

### 1. Credential Exposure in Frontend

⚠️ **PENTING**: Environment variables dengan prefix `VITE_` akan ter-bundle ke JavaScript dan bisa dilihat di browser DevTools.

```
VITE_API_USER=your_username    # VISIBLE di browser
VITE_API_PASS=your_password    # VISIBLE di browser
VITE_API_SALT=your_salt        # VISIBLE di browser
```

**Mitigasi**:
- Gunakan user dengan **limited permissions** di Navidrome
- Untuk production, buat **backend proxy** yang handle authentication
- Jangan gunakan credentials yang sama dengan akun lain

### 2. MD5 Password Hashing

Subsonic API menggunakan MD5 untuk authentication:
```
token = md5(password + salt)
```

MD5 sudah tidak aman untuk password hashing modern, tapi ini adalah standar Subsonic API. Mitigasi:
- Gunakan password yang unik untuk Navidrome
- Gunakan HTTPS untuk enkripsi traffic

### 3. Service Worker Caching

Service Worker bisa cache data sensitif. Pastikan:
- Tidak cache credentials
- Clear cache saat logout
- Review `public/sw.js` sebelum deploy

## Secure Deployment Checklist

- [ ] HTTPS enabled
- [ ] Environment variables tidak mengandung credentials production
- [ ] Navidrome user memiliki limited permissions
- [ ] CORS configured correctly di Navidrome
- [ ] Dependencies up to date (`npm audit`)
- [ ] Service Worker reviewed untuk sensitive data caching
- [ ] No hardcoded credentials di source code

## Dependency Security

Kami secara aktif monitor dependencies untuk known vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Auto-fix non-breaking changes
npm audit fix

# Check outdated packages
npm outdated
```

## Responsible Disclosure

Kami menghargai security researchers yang membantu menjaga project ini aman. Jika Anda menemukan vulnerability:

1. **Jangan** publish sebelum fixed
2. **Jangan** exploit vulnerability
3. Berikan waktu yang cukup untuk fix
4. Anda akan di-credit di release notes (jika diinginkan)

Terima kasih telah membantu menjaga keamanan project ini! 🔐
