import Vue from 'vue';
import Router from 'vue-router';
import CreateBill from '@/components/CreateBill';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateBill',
      component: CreateBill,
    },
  ],
});
