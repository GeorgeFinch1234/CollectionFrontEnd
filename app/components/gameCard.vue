<script setup>
import CollectionOptions from './collectionOptions.vue';
let show=ref(false)

const props = defineProps(['name','player','description','imgAlt','img'])


const imgURl = computed(() => {
console.log(props.img.replace(/ /g, '+'));
    return props.img.replace(/ /g, '+');

});





</script>
<template>
    <div class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col relative">
       <img :src=imgURl :alt=imgAlt /> 
        <div class="flex flex-col justify-between overflow-hidden gap-[5px] items-center">
            
            <h2 class="text-center underline pt-[10px]">{{ name }}</h2>
          
            <p class="text-center">player count = {{ player }}</p>
            
                <p class="overflow-y-auto text-center border-b-[2px]">
                {{description}}
                </p>
                <a @click="show = !show" class="text-center bg-primary text-white w-[70px] text-center rounded-full ">
                options
                </a>
            
        </div>
        <CollectionOptions :name=name v-if="show" @closeMenu="show=!show" @reload="$emit('reload')">
    </CollectionOptions>
    </div>
  
</template>
