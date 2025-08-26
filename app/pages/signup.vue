<script setup>
let user = ref("");
let password = ref("")
let passwordCheck = ref("");
let spinnyWheelShow = ref(false);

import {useTokenStore} from'~/utils/test.js'

definePageMeta({
  layout: 'login'
})
function login (){
    navigateTo('/')
}
function submit(event){
    event.preventDefault();
    spinnyWheelShow.value=true;
    const formData = new FormData();
    const tokenStore = useTokenStore()

if(password.value != passwordCheck.value){
    alert("passwords dont match")
}else{
    formData.append("username", user.value);
    formData.append("password", password.value);
    
    fetch('http://localhost:8080/signup', {
      method: "POST",
      body: formData
    }).then(res=>res.json()).then(json=>{
        console.log(json)
        if (json.error==''){
            tokenStore.token=json.token

            navigateTo('/collection')
        }else{
            alert("signup failed")
            spinnyWheelShow.value=false;
        }
        
    })

}
}


</script>  



<template>
 <main class="p-[20px] gap-[20px] bg-secondary w-[300px] h-[400px]  rounded-lg absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] sm:w-[600px]">
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-center text-2xl">Sign Up</h1>
    <div class="bg-alt w-[150px] h-[5px] "></div>
    </div>
   <!--post not get so the password now in the url-->
    <form action="" method="POST" class="flex flex-col gap-[40px]  pt-[20px]">
        <div class="flex flex-col gap-[10px]">
           <!--need labals for aria-->
            <input v-model="user" placeholder="user name" class="rounded-md  text-xl"/>
            <input v-model="password" placeholder="password" type="password" class="rounded-md text-xl" />
            <input v-model="passwordCheck" placeholder="Confrim password" type="password" class="rounded-md text-xl" />
              </div>
        <div class="flex flex-col gap-[10px]">
            <input @click="submit" type="submit" class="bg-primary rounded-md text-white text-xl" id="loginSubmit" value="Sign Up"></input>
            <input @click="login()" type="button" class="bg-primary rounded-md text-white text-xl" value="Login"/>
        </div>
    </form>
    

    </main>
    <!--need to implment-->
    <img v-if="spinnyWheelShow" src="/assets/shinyGengar.png" alt="spinny wheel" class="z-100 fixed top-[50vh] left-[50vw]  w-[400px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>
</template>
   
