
<script setup>
const props = defineProps(['name', 'player', 'description', 'imgAlt', 'img','minPlayers', 'maxPlayers', 'completed', 'cost', 'time'])
/**
 * being the side with the img
 */
let frontToBeShown = ref(true)

function flip(){ 
    if (frontToBeShown.value == false){
       frontToBeShown.value = true
    } else{
         frontToBeShown.value = false      
    }
}




</script>
<template>

    
    
<gameInfo :minPlayers=props.minPlayers :maxPlayers=props.maxPlayers :completed=props.completed :cost=props.cost
                :time=props.time class="absolute top-[0] right-[0] opacity-[0]" :class="{
                   'animate-flipEndWrongWayUp': frontToBeShown,
                    'animate-flipEndfrontWayUp': !frontToBeShown
                }"
                @flipCard="flip()"></gameInfo>




            <gameCard :name=props.name :player=props.player :description=props.description :img=props.img
                :imgAlt=props.imgAlt 
              
                class="sm:justify-self-center "
                :class="{
                    'animate-flipEndWrongWayUp': !frontToBeShown,
                    'animate-flipEndfrontWayUp': frontToBeShown,
                
                    

               }"

               @flipCard="flip()"
                >

            </gameCard>
     
</template>