import { createRouter, createWebHistory } from 'vue-router'
import SchemaView from '@/views/SchemaView.vue'
import TableView from '@/views/TableView.vue'
import SelectView from '@/views/SelectView.vue'
import DdlCreateView from '@/views/ddl/DdlCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/ddl/creation',
      name: 'DdlCreate',
      component: DdlCreateView,
      children: [
        {
          path: 'schema',
          component: SchemaView
        },
        {
          path: 'table',
          component: TableView
        }
      ]
    },
    // {
    //   path: '/schema',
    //   name: "schema",
    //   component: SchemaView
    // },
    // {
    //   path: '/table',
    //   name: 'table',
    //   component: TableView
    // },
    {
      path: '/dml/selection',
      name: 'DmlSelect',
      component: SelectView
    }
  ]
})

export default router
