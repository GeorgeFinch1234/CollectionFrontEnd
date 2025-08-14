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
<div class="bg-primary h-screen w-full">
<GameCard :name=name :player=player :description=description :img=imgRef :imgAlt=imgAlt ></GameCard>
</div>
</template>