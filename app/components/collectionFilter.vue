<script setup>

import { playCount } from '~/utils/frontEndValidation.js'

const sortBy = ref('playerCount')
const refStartAt = ref()
const refEndAt = ref()
const startAt= ref()
const endAt = ref()

const emit = defineEmits(['filters','close'])
function filter(){

console.log("here");
if(refStartAt.value.checkValidity()&&
refEndAt.value.checkValidity()){
console.log("passed")

emit('filters',{
"sort":sortBy.value,
"start":startAt.value, 
"end":endAt.value



})

}else{

refStartAt.value.reportValidity()
refEndAt.value.reportValidity()


}



}

</script>
<template>
    <div class="bg-[linear-gradient(0deg,_#FFDBBB,_#D9D9D9_100%)]   z-10
        border-2 border-dashed border-[#496580]
        w-[150x] p-[10px]
        flex flex-col text-center items-center
        
        " >

        <h2>Sort / Filter</h2>
 <div class="bg-alt w-[150px] h-[5px] "></div>
   


        <form class="flex flex-col text-center justify-between h-[100%] gap-[10px]">
        
        <div class="flex flex-col">
            <h2 for="sortTypeSelector">Sort by</h2>
        <select class="text-center pl-[1em]" id="sortTypeSelector"v-model="sortBy" required>
            <option>playerCount</option>
            <option>minPlayers</option>
            <option>maxPlayers</option>
            <option>cost</option>
            <option>time</option>
        </select>
        </div>
<div class="flex flex-col">
<label for="filterStartAt">start at</label>
<!--pl-[1em] is to adjust for the off centering by the arrows-->
        <input id="filterStartAt" type="number" class="text-center pl-[1em]" v-model="startAt" required ref="refStartAt" @input="e => playCount(e.target)" min="0" placeholder="0"/>
       </div>
        <div class="flex flex-col"> 
        <label for="filterEndAt">end at</label>
        <input type="number"id="filterEndAt"  class="text-center pl-[1em]" v-model="endAt" required ref="refEndAt" @input="e => playCount(e.target)" min="0" placeholder="20"/>
        </div>
        <input type="submit" @click.prevent="filter()" class="bg-[#FFCC99]"/>
    
        <input type="submit" @click.prevent="$emit('close')" value="close" class="bg-[#FFCC99]"/>
        </form>
    </div>
</template>