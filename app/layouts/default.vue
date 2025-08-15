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
     <Transition name="menuSlide"> 
        <div v-if="show" class="flex flex-col w-screen h-screen text-center justify-center gap-[10vh] fixed bg-primary items-center opacity-95 top-0 sm:flex-row sm:gap-[10px] sm:bg-transparent sm:h-fit sm:m-[10px] sm:justify-end sm:right-1">
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary">collection</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary">browse</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary" >message</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary">wishlist</NuxtLink>
        <NuxtLink to="/" class="text-[25px] hover:bg-alt w-[300px] self-center rounded-md duration-[1.5s] bg-secondary text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-secondary">logout</NuxtLink>

    </div>
</Transition> 
    <P class="fixed top-[10px] right-[10px] text-white z-2 sm:hidden" @click="show = !show"> &#9776</P>
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