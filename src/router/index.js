import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

/*
const routes = {
  '/': Home,
  '/about': About
}
*/


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
		path: '/login',
		name: 'Login',
		component: Login
	}
  ]
})
