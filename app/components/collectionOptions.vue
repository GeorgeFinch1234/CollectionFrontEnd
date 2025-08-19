<script setup>




</script>
<template>
    <div class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col absolute top-[0] right-[0] items-center ">
       <div>
        <h1 class="text-center text-2xl">Options</h1>
       
    <div class="bg-alt w-[150px] h-[5px] "></div>
    </div>
    <div class="flex flex-col justify-start h-[100%] gap-[40px] p-[20px]">
    <a class="bg-primary rounded-md text-center text-white w-[100px] text-2xl">Eddit</a>
    <a class="bg-primary rounded-md text-center text-white w-[100px] text-2xl">Delete</a>
    <p @click="$emit('closeMenu')" class="bg-primary rounded-md text-center text-white w-[100px] text-2xl">Close</p>
    </div>
    </div>
</template>
