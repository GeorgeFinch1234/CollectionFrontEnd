<script setup >
let Games = ref(null)

 fetch('http://localhost:8080/games')
            .then(res=>res.json())            
            .then(json=>{
             console.log(json)
             console.log("hit")
               Games.value = json;
                /* 
                name.value=json.name;
                 player.value=json.playerCount;
                  description.value=json.description;
            imgRef.value=json.base64
            imgAlt.value=json.imgAlt
            */
            } )
            
</script>

<template>
<main class="flex flex-col justify-center items-center gap-[20px] sm:grid  sm:gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(200px,auto))] sm:mx-[10px] sm:pt-[40px]  ">
    <div class="flex flex-col justify-center items-center sm:col-span-full">
    <h1 class="text-white mt-[20px] text-2xl sm:text-4xl">Collection</h1>
    <div class="bg-alt w-[150px] h-[5px] sm:w-[200px]"></div>
    </div>
    
<GameCard  v-for="game in Games" :name=game.Game2.name :player=game.Game2.playerCount :description=game.Game2.description :img=game.Game2.imgRef :imgAlt=game.Game2.imgAlt class="sm:justify-self-center"></GameCard>

</main>
</template>