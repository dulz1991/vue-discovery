import Home from '@/components/Home'
import Login from '@/components/account/Login'
import Regist from '@/components/account/Regist'
import Help from '@/components/Help'
import About from '@/components/About'

//blog
import Detail from '@/components/blog/Detail'
import Post from '@/components/blog/Post'

//usercenter
import UserCenterIndex from '@/components/userCenter/Index'
import MyInfo from '@/components/userCenter/MyInfo'
import Feedback from '@/components/userCenter/Feedback'
import MyPost from '@/components/userCenter/MyPost'
import MyComment from '@/components/userCenter/MyComment'
import MyCollection from '@/components/userCenter/MyCollection'
import Setting from '@/components/userCenter/Setting'
import Changepwd from '@/components/userCenter/Changepwd'
import UploadAvatar from '@/components/userCenter/UploadAvatar'

export default ({
	name:'myRoute',
	routes: {
		'/notFount': { template: '<p>Page not found</p>' },
		'/': Home,
		'/login': Login,
		'/regist': Regist,
		'/about': About,
		'/help': Help,
		'/detail': Detail,
		'/post': Post,
		'/user/index': UserCenterIndex,
		'/user/info': MyInfo,
		'/user/feedback': Feedback,
		'/user/myPost': MyPost,
		'/user/myComment': MyComment,
		'/user/myCollection': MyCollection,
		'/user/set': Setting,
		'/user/changepwd': Changepwd,
		'/user/uploadAvatar': UploadAvatar
	}
})
