<script setup>
let user = ref("");
let password = ref("")
let passwordCheck = ref("");
let spinnyWheelShow = ref(false);

const signInUserName = ref(null)
const signInPassword = ref(null)


import { useTokenStore } from '~/utils/test.js'
/*
for user input validation
*/
import { userEndValidation } from '~/utils/frontEndValidation.js'


definePageMeta({
    layout: 'login'
})
function login() {
    navigateTo('/')
}
function submit(event) {

    if (password.value != passwordCheck.value) {

        signInPassword.value.setCustomValidity("passwords don't match")

    }


    if (!signInUserName.value.checkValidity() || !signInPassword.value.checkValidity()) {
        signInUserName.value.reportValidity()
        signInPassword.value.reportValidity()
    } else {






        spinnyWheelShow.value = true;
        const formData = new FormData();
        const tokenStore = useTokenStore()



        formData.append("username", user.value);
        formData.append("password", password.value);

        fetch('http://localhost:8080/signup', {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(json => {
            console.log("testttttttttt")
            console.log(json)
            if (json.error == '') {
                tokenStore.token = json.token

                navigateTo('/collection')
            } else {
                signInUserName.value.setCustomValidity(json.error)
                signInUserName.value.reportValidity()
                spinnyWheelShow.value = false;
            }

        })

    }
}


</script>



<template>
    <main
        class="p-[20px] gap-[20px] bg-[linear-gradient(0deg,_#FFDBBB,_#D9D9D9_100%)] w-[300px] h-[400px]  rounded-lg absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] sm:w-[600px]">
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-center text-2xl">Sign Up</h1>
            <div class="bg-alt w-[150px] h-[5px] "></div>
        </div>
        <!--post not get so the password now in the url-->
        <form action="" method="POST" class="flex flex-col gap-[40px]  pt-[20px]">
            <div class="flex flex-col gap-[10px]">
                <!--need labals for aria-->
                <input @input="e => userEndValidation(e.target)" v-model="user" placeholder="user name"
                    class="rounded-md  text-xl" ref="signInUserName" required />
                <input @input="e => userEndValidation(e.target)" v-model="password" placeholder="password" type="password"
                    class="rounded-md text-xl" ref="signInPassword" required />
                <input @input="e => userEndValidation(e.target)" v-model="passwordCheck" placeholder="Confrim password"
                    type="password" class="rounded-md text-xl" />
            </div>
            <div class="flex flex-col gap-[10px]">
                <input @click.prevent="submit()" type="submit" class="bg-primary rounded-md text-white text-xl"
                    id="loginSubmit" value="Sign Up"></input>
                <input @click="login()" type="button" class="bg-primary rounded-md text-white text-xl" value="Login" />
            </div>
        </form>


    </main>
    <!--need to implment-->
    <img v-if="spinnyWheelShow" src="/assets/loadingCircle.png" alt="spinny wheel"
        class="z-100 fixed top-[50vh] left-[50vw]  w-[150px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>



</template>
