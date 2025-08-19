<script setup>
let show=ref(false)

function handleResize() {
  show.value = true
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<template>

<div class="w-screen h-screen bg-primary relative" >
    <slot/>
</div>


     <Transition name="menuSlide"> 
        <div v-if="show" class="flex flex-col w-screen h-screen text-center justify-center gap-[10vh] fixed bg-primary items-center opacity-95 top-0 sm:flex-row sm:gap-[10px] sm:bg-transparent sm:h-fit sm:m-[10px] sm:justify-end sm:right-1 z-99999999">
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary z-10">collection</NuxtLink>
        <!--for now just to get easy access-->
        <NuxtLink to="/gameCreation" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary z-10">browse</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary z-10" >message</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary z-10">wishlist</NuxtLink>
        <NuxtLink to="/login" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary z-10">logout</NuxtLink>

    </div>
</Transition> 
  
<P class="fixed top-[10px] right-[10px] text-white z-3 sm:hidden" @click="show = !show"> &#9776</P>

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