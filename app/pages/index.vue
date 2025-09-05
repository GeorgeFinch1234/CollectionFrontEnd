<script setup>


//test
import { useTokenStore } from '~/utils/test.js'
import { userEndValidation } from '~/utils/frontEndValidation.js'

let user = ref("");
let password = ref("");
let spinnyWheelShow = ref(false);
const signInUserName = ref(null)
const signInPassword = ref(null)
const fireSubmitAnimation = ref(false)
const tokenStore = useTokenStore()
/**
 * so reste ever time
 */
tokenStore.adminStatus = false


definePageMeta({
    layout: 'login'
})





/*
done this was to make yii2 and nuxt work together, 
else other way couldnt get access to var in $_POST
*/
function sendData() {


    const formData = new FormData();

    const tokenStore = useTokenStore()

    formData.append("username", user.value);
    formData.append("password", password.value);

    fetch('http://localhost:8080/login', {
        method: "POST",
        body: formData
    })
        .then(res => {
           
            return res.json()

        })
        .then(json => {
            

 

            if (json.error == "") {
                //redirects if successful.

                tokenStore.token = json.token
tokenStore.adminStatus = json.isAdmin
                return navigateTo('/collection')
            } else {

                /**
                 * 
                 * so back end message can get shown in the same manner as the front end ones.
                 * 
                 */

                console.log(json.errorFrom)
                if (json.errorFrom != "password") {
                    signInUserName.value.setCustomValidity(json.error)
                    signInUserName.value.reportValidity()
                } else {
                    signInPassword.value.setCustomValidity(json.error)
                    signInPassword.value.reportValidity()
                }

                spinnyWheelShow.value = false;

                /*
            
                temp, rember to remove it.
            
                */

                //alert(json)

            }









        }, () => {

            spinnyWheelShow.value = false;
        })


}




function submitHandler() {





    if (!signInUserName.value.checkValidity() || !signInPassword.value.checkValidity()) {
        signInUserName.value.reportValidity()
        signInPassword.value.reportValidity()
    } else {
        spinnyWheelShow.value = true;
        sendData()
    }


}









function signUp() {
    navigateTo('/signup')
}

function hover(){
fireSubmitAnimation.value = true


}
function cancelAniamtion(){

fireSubmitAnimation.value = false


}


</script>

<template>

  

    <!--transform-[translate(0%,-50%)]-->
<!--bg-[linear-gradient(225deg,_#FFDBBB,_#D9D9D9_100%)]-->
    <main
        class="p-[20px] gap-[20px] bg-[linear-gradient(0deg,_#FFDBBB,_#D9D9D9_120%)] w-[300px] h-[300px]  rounded-lg absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] sm:w-[600px]">
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-center text-2xl lg:text-4xl">Welcome</h1>
            <div class="bg-darkAlt w-[150px] h-[5px] "></div>
        </div>
        <!--post not get so the password now in the url-->
        <form action="" method="POST" class="flex flex-col gap-[40px]  pt-[20px]">
            <div class="flex flex-col gap-[10px]">
                <!--need labals for aria-->
                <input @input="e => userEndValidation(e.target)" v-model="user" placeholder="Username"
                    class="rounded-md  text-xl text-center" ref="signInUserName" required />
                <input @input="e => userEndValidation(e.target)" v-model="password" placeholder="Password" type="password"
                    class="rounded-md text-xl text-center" ref="signInPassword" required />
            </div>

            <div class="flex flex-col gap-[10px]">
                <div class="w-[100%] relative">
                <input @click.prevent="submitHandler" type="submit" class="bg-darkAlt rounded-md text-white text-xl w-[100%] h-[30px] relative z-[2] "
                    
                id="loginSubmit"
                @mouseenter="hover()"
                @mouseleave="cancelAniamtion()"
                
                
                ></input>
                <div class="w-[100%] absolute border-2 border-solid border-[#496580] h-[30px] rounded-md top-[0px]" :class="{'animate-pulse':fireSubmitAnimation}" ></div>
                <div class="w-[100%] absolute border-2 border-solid border-[#496580] h-[30px] rounded-md top-[0px]" :class="{'animate-pulse2':fireSubmitAnimation}" ></div>
                <div class="w-[100%] absolute border-2 border-solid border-[#496580] h-[30px] rounded-md top-[0px]" :class="{'animate-pulse':fireSubmitAnimation}" ></div>
                
                </div>
                    <input @click="signUp()" type="button" class="bg-darkAlt rounded-md text-white text-xl  h-[30px]"
                    value="sign up" />
            </div>
        </form>


    </main>
    <img v-if="spinnyWheelShow" src="/assets/loadingCircle.png" alt="spinny wheel"
        class="z-100 fixed top-[50vh] left-[50vw]  w-[150px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>
</template>