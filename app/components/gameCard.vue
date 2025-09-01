<script setup>
import CollectionOptions from './collectionOptions.vue';
let show = ref(false)


const props = defineProps(['name', 'player', 'description', 'imgAlt', 'img'])


const imgURl = computed(() => {

    return props.img.replace(/ /g, '+');

});


console.log("inside game card")

</script>
<template>


<!--
                                                                                                                #D9D9D9
                                                                                                                #FFDBBB

-->

    <div class=" p-[20px]  w-[200px] h-[400px] rounded-lg flex flex-col relative bg-[linear-gradient(225deg,_#FFDBBB,_#D9D9D9_60%)]">
        <img src="/assets/reverseArrows.png" alt="reversable arrows"
            class="absolute top-[2px] right-[2px] w-[30px] h-30px] cursor-pointer" @click="$emit('flipCard')" />
        <img :src=imgURl :alt=imgAlt class='hover:animate-shake' />
        <div class="flex flex-col justify-between overflow-hidden gap-[5px] items-center">

            <h2 class="text-center underline pt-[10px]">{{ name }}</h2>

            <p class="text-center">player count = {{ player }}</p>

            <p class="overflow-y-auto text-center border-b-[2px]">
                {{ description }}
            </p>
            <a @click="show = !show" class="text-center bg-primary text-white w-[70px] text-center rounded-full cursor-pointer ">
                options
            </a>

        </div>
        <CollectionOptions :name=name v-if="show" @closeMenu="show = !show" @reload="$emit('reload')">
        </CollectionOptions>
    </div>

</template>
