import Vue from 'vue';
import Router from 'vue-router';

const asyncComponent = (name) => {
  return resolve => require([`@/components/${name}`], resolve)
}

const WelcomeComponent = asyncComponent('welcome/index');
const RecommendComponent = asyncComponent('recommend/index');
const ThemeComponent = asyncComponent('theme/index');
const SearchThemeComponent = asyncComponent('theme/search');
const AddThemeComponent = asyncComponent('theme/add');
const PostComponent = asyncComponent('post/index');
const PostPage = asyncComponent('post/page');
const SubReply = asyncComponent('sub-reply/index');
const MainComponent = asyncComponent('main/index');
const UserComponent = asyncComponent('user/index');
const LoginComponent = asyncComponent('user/login');
const RegisterComponent = asyncComponent('user/register');
const UserMenuComponent = asyncComponent('user/menu');
const UpdatePwdComponent = asyncComponent('user/update-pwd');
const UpdateNicknameComponent = asyncComponent('user/update-nickname');
const UpdateHeadThumbComponent = asyncComponent('user/update-head-thumb');
const BackgroundComponent = asyncComponent('user/background');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: WelcomeComponent
    },
    {
      path: '/main',
      component: MainComponent,
      children: [
        {
          path: '/',
          component: RecommendComponent
        },
        {
          path: 'recommend',
          component: RecommendComponent
        },
        {
          path: 'theme',
          component: ThemeComponent
        }
      ]
    },
    {
      path: '/post/:id',
      component: PostComponent
    },
    {
      path: '/post_page/:id',
      component: PostPage
    },
    {
      path: '/sub_reply/:id/:index/:builderId',
      component: SubReply
    },
    {
      path: '/search_theme',
      component: SearchThemeComponent
    },
    {
      path: '/add_theme',
      component: AddThemeComponent
    },
    {
      path: '/user',
      component: UserComponent
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/register',
      component: RegisterComponent
    },
    {
      path: '/user_menu',
      component: UserMenuComponent
    },
    {
      path: '/update_pwd',
      component: UpdatePwdComponent
    },
    {
      path: '/update_nickname',
      component: UpdateNicknameComponent
    },
    {
      path: '/update_head_thumb',
      component: UpdateHeadThumbComponent
    },
    {
      path: '/background',
      component: BackgroundComponent
    }
  ]
})
