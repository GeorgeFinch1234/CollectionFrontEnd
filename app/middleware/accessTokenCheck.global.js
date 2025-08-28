import { useTokenStore } from '~/utils/test.js'




export default defineNuxtRouteMiddleware((to, from) => {

    const tokenStore = useTokenStore()
    // so if they have access its fine to continue so can skip all this stuff
    if (tokenStore.token == "") {
        //even if not logged in going to login is fine or signup
        if (to.path == "/" || to.path == "/signup") {

            return
        } else {
            //sends them to login page
            return navigateTo('/')
        }
    }






})

