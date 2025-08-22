<script setup>

function removeGame(){

}


</script>
<template>
    <div class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col absolute top-[0] right-[0] items-center justify-center">
       <div>
        <h1 class="text-center text-2xl">Delete</h1>
       
    <div class="bg-alt w-[150px] h-[5px] "></div>
    <p class="text-center">are you sure you want to delete</p>
    </div>
    <div class="flex flex-row justify-center gap-[5px] p-[20px]">
    <a class="bg-primary rounded-md text-center text-white text-2xl h-fit p-[5px]">confirm</a>
    <a @click="$emit('cancel')" class="bg-primary rounded-md text-center text-white text-2xl h-fit p-[5px]">cancel</a>
     </div>
    </div>
</template>
