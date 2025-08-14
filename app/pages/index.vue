<script setup >
let name = ref("loading");
let player = ref("loading");
let description = ref("loading");

let imgRef = ref("")
let imgAlt=ref("boardGameImg")

 fetch('http://localhost:8080/games')
            .then(res=>res.json())            
            .then(json=>{ 
                name.value=json.name;
                 player.value=json.playerCount;
                  description.value=json.description;
            imgRef.value=json.base64
            imgAlt.value=json.imgAlt
            console.log(imgRef.value)
            console.log(json)
            } )
            
</script>

<template>
<main class="flex flex-col justify-center items-center gap-[20px]">
    <div class="flex flex-col justify-center items-center">
    <h1 class="text-white mt-[20px]">Collection</h1>
    <div class="bg-alt w-[150px] h-[5px]"></div>
    </div>
    <P class="fixed top-[10px] right-[10px] text-white "> &#9776</P>
<GameCard  v-for="n in 10" :name=name :player=player :description=description :img=imgRef :imgAlt=imgAlt ></GameCard>
</main>
</template>