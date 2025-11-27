<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <!-- Header Section -->
        <div class="pt-8 pb-6 px-4">
            <div class="max-w-6xl mx-auto">
                <!-- Back Button -->
                <div class="mb-6">
                    <router-link 
                        to="/playlist"
                        class="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                        Back to Playlists
                    </router-link>
                </div>

                <!-- Playlist Header -->
                <div class="flex items-start space-x-6 mb-8">
                    <div class="hidden md:flex w-48 h-48 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl items-center justify-center">
                        <svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                    </div>
                    <div class="flex-1 pt-4">
                        <p class="text-sm text-gray-300 mb-2">PLAYLIST</p>
                        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ playlist.name }}</h1>
                        <div class="flex items-center text-gray-300 space-x-1">
                            <span>{{ songs.length }} songs</span>
                        </div>
                        
                        <!-- Play All Button -->
                        <div class="mt-6">
                            <button @click="playAllSongs" class="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Play All
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Songs List -->
        <div class="px-4 pb-8">
            <div class="max-w-6xl mx-auto">
                <div class="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <!-- Table Header -->
                    <div class="grid grid-cols-12 gap-4 pb-3 mb-4 border-b border-gray-700/50 text-gray-400 text-sm font-medium">
                        <div class="col-span-1 text-center">#</div>
                        <div class="col-span-6">TITLE</div>
                        <div class="col-span-3">ARTIST</div>
                        <div class="col-span-2 text-center">ACTION</div>
                    </div>

                    <!-- Songs -->
                    <div v-for="(value, index) in songs" :key="value.id" 
                         class="group grid grid-cols-12 gap-4 py-3 hover:bg-white/5 rounded-lg transition-all duration-300 items-center"
                         :class="{ 'bg-green-500/10 border-l-4 border-l-green-500': currentSongIndex === index }">
                        <!-- Track Number -->
                        <div class="col-span-1 text-center">
                            <span v-if="currentSongIndex === index && isPlaying" class="text-green-400">
                                <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </span>
                            <span v-else-if="currentSongIndex === index" class="text-green-400">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                            </span>
                            <span v-else class="text-gray-400 group-hover:hidden">{{ index + 1 }}</span>
                            <button v-if="currentSongIndex !== index" class="hidden group-hover:inline-block text-white hover:text-green-400 transition-colors" @click="playSong(value, index)">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </button>
                        </div>

                        <!-- Song Info -->
                        <div class="col-span-6">
                            <div class="flex items-center space-x-3">
                                <!-- <div class="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded flex items-center justify-center">
                                    <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                    </svg>
                                </div> -->
                                <div>
                                    <h3 class="text-white font-medium group-hover:text-green-400 transition-colors line-clamp-1"
                                        :class="{ 'text-green-400': currentSongIndex === index }">
                                        {{ value.title }}
                                    </h3>
                                    <p class="text-gray-400 text-sm">{{ value.album || 'Unknown Album' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Artist -->
                        <div class="col-span-3">
                            <p class="text-gray-300 hover:text-white transition-colors cursor-pointer line-clamp-1">
                                {{ value.artist }}
                            </p>
                        </div>

                        <!-- Play Button -->
                        <div class="col-span-2 text-center">
                            <button @click="playSong(value, index)" class="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div class="flex items-center justify-center">
                                    <svg v-if="currentSongIndex === index && isPlaying" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                    </svg>
                                    <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    {{ currentSongIndex === index && isPlaying ? 'Pause' : 'Play' }}
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="songs.length === 0" class="text-center py-16">
                        <div class="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                            <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-2">No songs found</h3>
                        <p class="text-gray-400">This playlist doesn't contain any songs yet</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Spacing for Music Player -->
        <div v-if="currentSong" class="h-48 md:h-22"></div>
        <div v-else class="md:h-28"></div>

        <!-- Music Player Bar (Fixed Bottom) -->
        <div v-if="currentSong" class="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 p-4">
            <div class="max-w-6xl mx-auto">
                <!-- Progress Bar -->
                <div class="mb-4">
                    <div class="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{{ formatTime(currentTime) }}</span>
                        <div class="flex-1 relative group">
                            <input 
                                type="range" 
                                :min="0" 
                                :max="duration || 0" 
                                :value="currentTime" 
                                @input="seekTo($event.target.value)"
                                @mousedown="onProgressMouseDown"
                                @mouseup="onProgressMouseUp"
                                class="w-full appearance-none cursor-pointer progress-slider"
                            />
                        </div>
                        <span>{{ formatTime(duration) }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4 items-center">
                    <!-- Current Song Info -->
                    <div class="flex items-center space-x-4 min-w-0">
                        <!-- <div class="w-12 h-12 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                            </svg>
                        </div> -->
                        <div v-if="currentSongIndex >= 0" class="min-w-0">
                            <h4 class="text-white font-medium truncate">{{ songs[currentSongIndex]?.title }}</h4>
                            <p class="text-gray-400 text-sm truncate">{{ songs[currentSongIndex]?.artist }}</p>
                        </div>
                    </div>

                    <!-- Player Controls (Center) -->
                    <div class="flex items-center justify-center space-x-4">
                        <button @click="playPreviousSong" class="text-gray-300 hover:text-white transition-colors" :disabled="currentSongIndex <= 0">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                            </svg>
                        </button>
                        
                        <button @click="togglePlayPause" class="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform">
                            <svg v-if="isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>

                        <button @click="playNextSong" class="text-gray-300 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Volume Control (Right) -->
                    <div class="flex items-center justify-end space-x-3 min-w-0">
                        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                        <div class="w-24">
                            <input 
                                type="range" 
                                :min="0" 
                                :max="1" 
                                :step="0.01"
                                :value="volume" 
                                @input="setVolume($event.target.value)"
                                class="w-full appearance-none cursor-pointer volume-slider"
                            />
                        </div>
                        <span class="text-xs text-gray-400 w-8 text-right">{{ Math.round(volume * 100) }}</span>
                    </div>
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
      songs: [],
      playlist: {},
      playlistId: this.$route.params.playlistId,
      currentSong: null,
      audioPlayer: null,
      isPlaying: false,
      currentSongIndex: -1,
      volume: parseFloat(localStorage.getItem('spotify-volume')) || 0.7,
      currentTime: 0,
      duration: 0,
      isDragging: false
    };
  },
  watch: {
    volume(newVolume) {
      if (this.audioPlayer) {
        this.audioPlayer.volume = newVolume
      }
      if (this.currentSong) {
        this.updateVolumeSlider()
      }
    }
  },
  mounted() {
    this.getData()
    // Don't initialize volume slider until music starts playing
  },
  methods: {
    async getData() {
      try {
        const response = await api.get('/getPlaylist?id=' + this.playlistId, )
        const parser = new XMLParser({
          ignoreAttributes: false, 
          attributeNamePrefix: '', 
        })
        const result = parser.parse(response.data)
        
        // Set playlist information
        this.playlist = result['subsonic-response'].playlist
        
        // Set songs array
        this.songs = result['subsonic-response'].playlist.entry || []
      } catch (error) {
        console.error(error)
      }
    },
    async playSong(song, index) {
      try {
        // Stop current song if playing
        if (this.audioPlayer) {
          this.audioPlayer.pause()
          URL.revokeObjectURL(this.currentSong)
        }

        // Get the audio stream
        const response = await api.get('/stream.view?id=' + song.id, {
          responseType: 'blob'
        })
        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
        this.currentSong = URL.createObjectURL(audioBlob)
        this.currentSongIndex = index

        // Create and play audio
        this.audioPlayer = new Audio(this.currentSong)
        this.audioPlayer.volume = this.volume
        this.audioPlayer.play()
        this.isPlaying = true

        // Handle audio events
        this.audioPlayer.addEventListener('ended', () => {
          this.playNextSong()
        })

        this.audioPlayer.addEventListener('pause', () => {
          this.isPlaying = false
        })

        this.audioPlayer.addEventListener('play', () => {
          this.isPlaying = true
        })

        this.audioPlayer.addEventListener('timeupdate', () => {
          if (!this.isDragging) {
            this.currentTime = this.audioPlayer.currentTime
            this.updateProgressSlider()
          }
        })

        this.audioPlayer.addEventListener('loadedmetadata', () => {
          this.duration = this.audioPlayer.duration
          // Initialize volume slider when song starts
          this.updateVolumeSlider()
        })

      } catch (error) {
        console.error('Error playing song:', error)
      }
    },
    async playAllSongs() {
      if (this.songs.length > 0) {
        await this.playSong(this.songs[0], 0)
      }
    },
    playNextSong() {
      if (this.currentSongIndex < this.songs.length - 1) {
        // Play next song in the playlist
        this.playSong(this.songs[this.currentSongIndex + 1], this.currentSongIndex + 1)
      } else {
        // If we're at the last song, loop back to the first song
        this.playSong(this.songs[0], 0)
      }
    },
    playPreviousSong() {
      if (this.currentSongIndex > 0) {
        this.playSong(this.songs[this.currentSongIndex - 1], this.currentSongIndex - 1)
      }
    },
    togglePlayPause() {
      if (this.audioPlayer) {
        if (this.isPlaying) {
          this.audioPlayer.pause()
        } else {
          this.audioPlayer.play()
        }
      }
    },
    setVolume(volume) {
      const newVolume = parseFloat(volume)
      this.volume = newVolume
      
      // Save volume to localStorage
      localStorage.setItem('spotify-volume', newVolume.toString())
      
      if (this.audioPlayer) {
        this.audioPlayer.volume = newVolume
      }
      // Only update slider appearance when music is playing
      if (this.currentSong) {
        this.updateVolumeSlider()
      }
    },
    seekTo(time) {
      if (this.audioPlayer) {
        this.audioPlayer.currentTime = time
        this.currentTime = time
      }
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return '0:00'
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },
    onProgressMouseDown() {
      this.isDragging = true
    },
    onProgressMouseUp() {
      this.isDragging = false
    },
    updateProgressSlider() {
      const progressSlider = document.querySelector('.progress-slider')
      if (progressSlider && this.duration > 0) {
        const progress = (this.currentTime / this.duration) * 100
        progressSlider.style.setProperty('--progress', `${progress}%`)
        progressSlider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`
      }
    },
    updateVolumeSlider() {
      const volumeSlider = document.querySelector('.volume-slider')
      if (volumeSlider && this.currentSong) {
        const volume = this.volume * 100
        volumeSlider.style.setProperty('--volume', `${volume}%`)
        volumeSlider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
      }
    }
  },
  beforeUnmount() {
    // Clean up audio when component is destroyed
    if (this.audioPlayer) {
      this.audioPlayer.pause()
      URL.revokeObjectURL(this.currentSong)
    }
  }
}

</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom backdrop blur fallback */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
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

/* Enhanced hover effects */
.group:hover .transform {
  transform: translateY(-2px) scale(1.02);
}

/* Button hover effects */
button:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Grid responsive adjustments */
@media (max-width: 768px) {
  .grid.grid-cols-12 {
    grid-template-columns: auto 1fr auto;
  }
  
  .col-span-1 { grid-column: span 1; }
  .col-span-6 { grid-column: span 1; }
  .col-span-3 { display: none; }
  .col-span-2 { grid-column: span 1; }
}

/* Custom Slider Styles */
.progress-slider {
  background: linear-gradient(to right, #ffffff 0%, #ffffff 0%, #4b5563 0%, #4b5563 100%);
  height: 4px;
  border-radius: 2px;
  outline: none;
}

.progress-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-slider:hover::-webkit-slider-thumb {
  opacity: 1;
}

.progress-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.6);
}

.volume-slider {
  background: linear-gradient(to right, #ffffff 0%, #ffffff 70%, #4b5563 70%, #4b5563 100%);
  height: 4px;
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.6);
}

.volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.6);
}

/* Update slider progress dynamically */
input[type="range"] {
  background: transparent;
}

/* Bottom player responsive */
@media (max-width: 768px) {
  .fixed.bottom-0 .grid.grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .fixed.bottom-0 .justify-end {
    justify-content: center;
  }
  
  .fixed.bottom-0 .flex.items-center.space-x-4.min-w-0 {
    justify-content: center;
  }
}
</style>