<script setup>
let show=ref(false)
</script>

<template>
     <Transition name="menuSlide"> 
        <div v-if="show" class="flex flex-col w-screen h-screen text-center justify-center gap-[10vh] fixed bg-primary items-center opacity-95 top-0">
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center">collection</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center ">browse</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center" >message</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center">wishlist</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center ">logout</NuxtLink>

    </div>
</Transition> 
    <P class="fixed top-[10px] right-[10px] text-white z-2" @click="show = !show"> &#9776</P>
<slot/>
</template>
<style>

.menuSlide-enter-active,
.menuSlide-leave-active {
  transition: transform 1s;
}

.menuSlide-enter-from,
.menuSlide-leave-to {
  transform:translateX(100%);
}
.menuSlide-enter-to,
.menuSlide-leave-from {
  transform:translateX(0);
}
</style>