<script setup>
const sortBy = ref()
const startAt = ref()
const endAt = ref()

const emit = defineEmits(['filters','close'])
function filter(){
emit('filters',{
"sort":sortBy.value,
"start":startAt.value, 
"end":endAt.value



})
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
            <h2>Sort by</h2>
        <select class="text-center" v-model="sortBy">
            <option>playerCount</option>
            <option>minPlayers</option>
            <option>maxPlayers</option>
            <option>cost</option>
            <option>time</option>
        </select>
        </div>
<div class="flex flex-col">
<label>start at</label>
        <input type="number" class="text-center" v-model="startAt"/>
       </div>
        <div class="flex flex-col"> 
        <label>end at</label>
        <input type="number"  class="text-center" v-model="endAt"/>
        </div>
        <input type="submit" @click.prevent="filter()" class="bg-[#FFCC99]"/>
    
        <input type="submit" @click.prevent="$emit('close')" value="close" class="bg-[#FFCC99]"/>
        </form>
    </div>
</template>