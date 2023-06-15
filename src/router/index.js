import Vue from "vue";
import VueRouter from "vue-router";
import HomeComp from "@/views/HomeComp.vue";
import OpinionFormComp from '../views/OpinionFormComp.vue';
import NotFound from '@/views/NotFound.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComp
  },
  {
    path: '/opinion/:gameName',
    name: 'OpinionForm',
    component: OpinionFormComp
  },
  {
    path: '/personal-area',
    name: 'PersonalArea',
    component: () => import(/* webpackChunkName: "personal-area" */ '../views/PersonalArea.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

