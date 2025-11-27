<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
    <!-- Header Section -->
    <div class="pt-8 pb-6 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <div class="mb-4">
            <div class="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-bold mb-2 text-white">Playlists</h1>
          <p class="text-lg text-gray-300">Discover and enjoy music collection</p>
        </div>
      </div>
    </div>

    <!-- Playlists Grid -->
    <div class="px-4 pb-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="value in playlists" :key="value.id" class="group">
            <router-link 
              :to="{ name: 'PlaylistId', params: { playlistId: value.id } }"
              class="block bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700/50 hover:border-green-500/50 group-hover:bg-gray-800/70"
            >
              <!-- Playlist Icon -->
              <div class="mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Playlist Info -->
              <div>
                <h2 class="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                  {{ value.name }}
                </h2>
                <p class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  Playlist • {{ value.songCount || 'Unknown' }} songs
                </p>
              </div>

              <!-- Play Button Overlay -->
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transform hover:scale-110 transition-all duration-200">
                  <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="playlists.length === 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No playlists found</h3>
          <p class="text-gray-400">Your playlists will appear here when available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import { XMLParser } from 'fast-xml-parser'

export default {
  name: 'Home',
  data() {
    return {
      playlists: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await api.get('/getPlaylists')
        const parser = new XMLParser({
          ignoreAttributes: false, 
          attributeNamePrefix: '', 
        })
        const result = parser.parse(response.data)
        this.playlists = result['subsonic-response'].playlists.playlist
      } catch (error) {
        console.error(error)
      }
    }
  },
}
</script>

<style scoped>
/* Add custom styles for better appearance */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom backdrop blur fallback */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Enhanced hover effects */
.group:hover .transform {
  transform: translateY(-8px) scale(1.02);
}

/* Gradient animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
</style>
