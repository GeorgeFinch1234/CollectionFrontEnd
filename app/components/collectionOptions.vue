<script setup>
let show = ref(false)

function loadEdit() {
    return navigateTo({ name: 'gameCreation', query: { name: "Edit", gameName: props.name } })
}



const props = defineProps(['name'])
</script>
<template>
    <div
        class="p-[20px] bg-[linear-gradient(225deg,_#FFDBBB,_#D9D9D9_60%)] w-[200px] h-[400px] rounded-lg flex flex-col absolute top-[0] right-[0] items-center ">
        <div>
            <h1 class="text-center text-2xl">Options</h1>

            <div class="bg-alt w-[150px] h-[5px] "></div>
        </div>
        <div class="flex flex-col justify-start h-[100%] gap-[40px] p-[20px]">
            <a @click="loadEdit()" class="bg-primary rounded-md text-center text-white w-[100px] text-2xl cursor-pointer">Edit</a>
            <a @click="show = !show" class="bg-primary rounded-md text-center text-white w-[100px] text-2xl cursor-pointer">Delete</a>
            <p @click="$emit('closeMenu')" class="bg-primary rounded-md text-center text-white w-[100px] text-2xl cursor-pointer">Close
            </p>
        </div>
    </div>
    <delete :name=name v-if="show" @cancel="show = !show" @reload="$emit('reload')"></delete>
</template>
