<script setup >
let Games = ref(null)
let spinnyWheelShow = ref(true)

import {useTokenStore} from'~/utils/test.js'

//need else nuxt will try to access local stroange on sever side
onMounted(()=>{
    //this so that it will show in php $_POST stuff
 const formData = new FormData();

 const tokenStore = useTokenStore()
console.log("**++"+tokenStore.token)
console.log("----------------------")
formData.append("token", tokenStore.token);

fetch('http://localhost:8080/games', {
  method: "POST",
  body: formData
})
            .then(res=>{console.log("hello world")
return res.json()

            })            
            .then(json=>{

                console.log("hit")
             console.log(json)
             console.log("hit")
               Games.value = json;
               spinnyWheelShow=false;
                /* 
                name.value=json.name;
                 player.value=json.playerCount;
                  description.value=json.description;
            imgRef.value=json.base64
            imgAlt.value=json.imgAlt
            */
            },()=>{
                console.log("fail")
            } )
   function loadEdit(){
return navigateTo('/gameCreation')
}    

})
</script>

<template>

        

    <p @click="loadEdit()" class="bg-secondary rounded-full w-[60px] text-lg text-center fixed right-[20px] bottom-[20px]">+</p>
<main class="flex flex-col justify-center items-center gap-[20px] sm:grid  sm:gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(200px,auto))] sm:mx-[10px] sm:pt-[40px]  ">
    <div class="flex flex-col justify-center items-center sm:col-span-full">
    <h1 class="text-white mt-[20px] text-2xl sm:text-4xl">Collection</h1>
    <div class="bg-alt w-[150px] h-[5px] sm:w-[200px]"></div>
    </div>
    
<GameCard  v-for="game in Games" :name=game.name :player=game.playerCount :description=game.description :img=game.imgRef :imgAlt=game.imgAlt class="sm:justify-self-center"></GameCard>

</main>
<img v-if="spinnyWheelShow"src="/assets/shinyGengar.png" alt="spinny wheel" class="z-100 fixed top-[50vh] left-[50vw]  w-[400px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>
</template>