export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/auth',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/auth/login',
            component: './auth/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/daily/posts-manager',
              },
              {
                path: '/daily',
                name: '喳·日常',
                icon: 'appstore',
                routes: [
                  {
                    path: '/daily/posts-manager',
                    name: '帖子管理',
                    component: './daily/posts-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/daily/home-label',
                    name: '首页标签管理',
                    component: './daily/home-label-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/daily/label-manager',
                    name: '标签管理',
                    component: './daily/label-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/daily/report-manager',
                    name: '举报管理',
                    component: './daily/report-manager',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/faqs',
                name: '喳·问答',
                icon: 'layout',
                routes: [
                  {
                    path: '/faqs/question-manager',
                    name: '提问管理',
                    component: './faqs/question-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/faqs/answer-manager',
                    name: '回答管理',
                    component: './faqs/answer-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/faqs/topic-manager',
                    name: '话题管理',
                    component: './faqs/topic-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/faqs/report-manager',
                    name: '举报管理',
                    component: './faqs/report-manager',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/activity',
                name: '喳·活动',
                icon: 'schedule',
                routes: [
                  {
                    path: '/activity/activity-manager',
                    name: '活动管理',
                    component: './activity/activity-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/activity/coupon-manager',
                    name: '优惠券管理',
                    component: './activity/coupon-manager',
                    authority: ['admin'],
                  },
                  {
                    path: '/activity/banner-manager',
                    name: '广告图管理',
                    component: './activity/banner-manager',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/other',
                name: '喳·其他',
                icon: 'project',
                routes: [
                  {
                    path: '/other/hot-search',
                    name: '热搜管理',
                    component: './other/hot-search',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/user',
                name: '喳·用户',
                icon: 'user',
                routes: [
                  {
                    path: '/user/user-manager',
                    name: '用户管理',
                    component: './user/user-manager',
                    authority: ['admin'],
                  },
                ],
              },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './TableList',
              // },
              
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
