<script setup >
let Games = ref(null)
let spinnyWheelShow = ref(true)
let noGame =ref(false)

import {useTokenStore} from'~/utils/test.js'


 function loadCreate(){
return navigateTo({name:'gameCreation', query:{name:"Create"}})
} 



//need else nuxt will try to access local stroange on sever side
onMounted(()=>{
    //this so that it will show in php $_POST stuff
 const formData = new FormData();

 const tokenStore = useTokenStore()

formData.append("token", tokenStore.token);

fetch('http://localhost:8080/games', {
  method: "POST",
  body: formData
})
            .then(res=>{console.log("hello world")
return res.json()

            })            
            .then(json=>{

              if(json == null){
                noGame.value=true;
              }else{
               Games.value = json;
              }
               spinnyWheelShow.value=false;
                /* 
                name.value=json.name;
                 player.value=json.playerCount;
                  description.value=json.description;
            imgRef.value=json.base64
            imgAlt.value=json.imgAlt
            */
            },()=>{
                
                spinnyWheelShow.value=false;
            } )
     

})
</script>

<template>

        

    <p @click="loadCreate()" class="bg-secondary rounded-full w-[60px] text-lg text-center fixed right-[20px] bottom-[20px]">+</p>
    <main class="flex flex-col justify-center items-center gap-[20px] sm:grid  sm:gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(200px,auto))] sm:mx-[10px] sm:pt-[40px]  ">
    <div class="flex flex-col justify-center items-center sm:col-span-full">
    <h1 class="text-white mt-[20px] text-2xl sm:text-4xl">Collection</h1>
    <div class="bg-alt w-[150px] h-[5px] sm:w-[200px]"></div>
    </div>
    
<GameCard  v-for="game in Games" :name=game.name :player=game.playerCount :description=game.description :img=game.imgRef :imgAlt=game.imgAlt class="sm:justify-self-center"></GameCard>

</main>
<img v-if="spinnyWheelShow"src="/assets/shinyGengar.png" alt="spinny wheel" class="z-100 fixed top-[50vh] left-[50vw]  w-[400px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>


<!--for if there are no games-->

<div v-if="noGame" class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg fixed flex flex-col top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%]">
       <img src="/assets/shinyGengar.png" alt="placeholder for no game collection" /> 
        <div class="flex flex-col justify-between overflow-hidden gap-[5px] items-center">
            
            <h2 class="text-center underline pt-[10px]">Empty Collection</h2>
          
            <p class="text-center">click the button bellow to add your first game</p>
            
               
                <a @click="loadCreate()" class="text-center bg-primary text-white w-[70px] text-center rounded-full ">
                Add
                </a>
            
        </div>
        
   
    </div>
</template>