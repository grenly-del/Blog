import {type RouteConfig, index, route} from '@react-router/dev/routes'


export default [
    index('./pages/Home.tsx'),
    route('login', './pages/Login.tsx'),

] satisfies RouteConfig


