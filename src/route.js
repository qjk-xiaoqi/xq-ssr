import { APP } from '../component/app'
import { Home } from '../component/home'
import { Detail } from '../component/detail'

export default [
  {
    component: APP,
    routes: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/detail',
        Component: Detail,
      },
    ],
  },
]
