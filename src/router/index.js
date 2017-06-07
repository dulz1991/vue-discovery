import Home from '@/components/Home'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import Help from '@/components/Help'
import About from '@/components/About'
import Detail from '@/components/blog/Detail'
import Post from '@/components/blog/Post'
const NotFound = { template: '<p>Page not found</p>' }

export default ({
	name:'',
	routes: {
		'/NotFound': NotFound,
		'/': Home,
		'/login': Login,
		'/regist': Regist,
		'/about': About,
		'/help': Help,
		'/detail': Detail,
		'/post': Post
	}
})
