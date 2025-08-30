import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: () => import('../views/Playlist/playlist.vue'),
    },
    {
      path: '/:playlistId',
      name: 'PlaylistId',
      component: () => import('../views/Playlist/byId.vue'),
    },
  ]
})

export default router
