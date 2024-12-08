import { Home } from './component/home'
import { Detail } from './component/detail'

export default [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home,
    loadData: Home.loadData,
  },
  {
    key: 'detail',
    path: '/detail',
    exact: true,
    component: Detail,
  },
]
