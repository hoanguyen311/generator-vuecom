import Vue from 'vue';
import './index.scss';
import VueCom from '@/index.vue';

new Vue({
  el: '#container',
  render: (h) => h(VueCom)
});