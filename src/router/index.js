import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Layout,
      children:[
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/Users.vue')
        },
        {
          path: '/upload',
          name: 'upload',
          component: () => import('../views/Upload.vue')
        },
        {
          path: '/webworker',
          name: 'webworker',
          component: () => import('../views/WebWorker.vue')
        },
        {
          path: '/webworker2',
          name: 'webworker2',
          component: () => import('../views/WebWorker2.vue')
        },
        {
          path: '/CrossLabelCommunication',
          name: 'CrossLabelCommunication',
          component: () => import('../views/CrossLabelCommunication.vue')
        },
        {
          path: '/CrossLabelCommunication2',
          name: 'CrossLabelCommunication2',
          component: () => import('../views/CrossLabelCommunication2.vue')
        },
        {
          path: '/websocket',
          name: 'websocket',
          component: () => import('../views/Websocket.vue')
        },
        {
          path: '/virtuallist',
          name: 'VirtualList',
          component: () => import('../views/VirtualList.vue')
        },
        {
          path: '/virtuallist2',
          name: 'VirtualList2',
          component: () => import('../views/VirtualList2.vue')
        },
        {
          path: '/lazyloadimg',
          name: 'LazyLoadImg',
          component: () => import('../views/LazyLoadImg.vue')
        },
        {
          path: '/iframe',
          name: 'Iframe',
          component: () => import('../views/Iframe.vue')
        },
        {
          path: '/hook',
          name: 'Hook',
          component: () => import('../views/Hook.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('../views/Video.vue')
        },
        {
          path: '/chat',
          name: 'Chat',
          component: () => import('../views/Chat.vue')
        },
        {
          path: '/test',
          name: 'Test',
          component: () => import('../views/Test.vue')
        },
      ]
    },
  ]
})

export default router
