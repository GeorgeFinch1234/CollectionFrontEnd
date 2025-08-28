<script setup >
let Games = ref(null)
let spinnyWheelShow = ref(true)
let noGame =ref(false)
let selectedGameId = ref(null);
let previousSelectedGameId = ref(null);



import {useTokenStore} from'~/utils/test.js'


 function loadCreate(){
return navigateTo({name:'gameCreation', query:{name:"Create"}})
} 



//need else nuxt will try to access local stroange on sever side
onMounted(()=>{
 loadGames()
})
function loadGames(){
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
                
            },()=>{
                
                spinnyWheelShow.value=false;
            } )
     

}

function selectGame(gameId) {
    if(selectedGameId.value === gameId) {
        // Deselect if the same game is clicked again
        previousSelectedGameId.value = selectedGameId.value;
        selectedGameId.value = null;
        return;
    }else{
  previousSelectedGameId.value = selectedGameId.value;
  selectedGameId.value = gameId;
    }
}


</script>

<template>

        

    <p @click="loadCreate()" class="bg-secondary rounded-full w-[60px] text-lg text-center fixed right-[20px] bottom-[20px]">+</p>
    <div class="flex flex-col justify-center items-center sm:col-span-full m-[10px] sm:mt-[20px]">
    <h1 class="text-white mt-[20px] text-2xl sm:text-4xl">Collection</h1>
    <div class="bg-alt w-[150px] h-[5px] sm:w-[200px]"></div>
    </div>
    <main class="flex flex-col justify-center items-center gap-[20px] sm:flex  sm:gap-4 sm:flex-row sm:flex-wrap sm:mx-[10px]  m-[10px]  ">
    <!--add the @click to a button in it, or something like that and have it emit and event up and then can keep it the same, ish-->
<div v-for="game in Games" class="relative" :key="game.name">

    <GameInfo class="absolute top-[0] right-[0] transform-3d backface-hidden" :class="{'animate-flipEndfrontWayUp': selectedGameId === game.name, 
'animate-flipEndWrongWayUp': previousSelectedGameId === game.name && previousSelectedGameId !== selectedGameId,}"></GameInfo>

    <GameCard   :name=game.name :player=game.playerCount :description=game.description :img=game.imgRef :imgAlt=game.imgAlt 
class="sm:justify-self-center transform-3d backface-hidden" @reload="loadGames()" :class="{'animate-flipEndWrongWayUp': selectedGameId === game.name, 
'animate-flipEndfrontWayUp': previousSelectedGameId === game.name && previousSelectedGameId !== selectedGameId,}" @click="selectGame(game.name)">

</GameCard>

</div>



</main>
<img v-if="spinnyWheelShow"src="/assets/loadingCircle.png" alt="spinny wheel" class="z-100 fixed top-[50vh] left-[50vw]  w-[150px] translate-x-[-50%] -translate-y-[+50%] animate-spinCentered"></img>


<!--for if there are no games-->

<div v-if="noGame" class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg fixed flex flex-col top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%]">
       <img src="/assets/loadingCircle.png" alt="placeholder for no game collection" /> 
        <div class="flex flex-col justify-between overflow-hidden gap-[5px] items-center">
            
            <h2 class="text-center underline pt-[10px]">Empty Collection</h2>
          
            <p class="text-center">click the button bellow to add your first game</p>
            
               
                <a @click="loadCreate()" class="text-center bg-primary text-white w-[70px] text-center rounded-full ">
                Add
                </a>
            
        </div>
        
   
    </div>
</template>