import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        redirect: "/app",
    },
    {
        path: "/app",
        name: "app",
        redirect: "/app/dashboard",
        component: AppLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
              },
              {
                path: 'products',
                name: 'app.products',
                component: Dashboard
              },
              {
                path: 'users',
                name: 'app.users',
                component: Dashboard
              },
              {
                path: 'customers',
                name: 'app.customers',
                component: Dashboard
              },
              {
                path: 'customers/:id',
                name: 'app.customers.view',
                component: Dashboard
              },
              {
                path: 'orders',
                name: 'app.orders',
                component: Dashboard
              },
              {
                path: 'orders/:id',
                name: 'app.orders.view',
                component: Dashboard
              },
              {
                path: '/report',
                name: 'reports',
                component: Dashboard,
                meta: {
                  requiresAuth: true
                },
                children: [
                  {
                    path: 'orders/:date?',
                    name: 'reports.orders',
                    component: Dashboard
                  },
                  {
                    path: 'customers/:date?',
                    name: 'reports.customers',
                    component: Dashboard
                  }
                ]
              },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          requiresGuest: true
        }
    },
    {
        path: "/request-password",
        name: "requestPassword",
        component: RequestPassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        component: ResetPassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/:pathMatch(.*)",
        name: "notfound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
