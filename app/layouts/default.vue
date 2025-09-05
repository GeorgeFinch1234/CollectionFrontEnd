<script setup>
import { useTokenStore } from '~/utils/test.js'

let show = ref(true)
let showAdminOptions = ref(false)

  


function handleMenu() {
  if (window.innerWidth > 640) {
    show.value = true
  } else {
    show.value = false
  }
}

onMounted(() => {
 

  window.addEventListener('resize', handleMenu)
const tokenStore = useTokenStore()
  
if(tokenStore.adminStatus){
  showAdminOptions.value = true
}else{
  showAdminOptions.value = false
}


})




</script>

<template>

  <div class="w-[100%] h-[100%]  relative ">
    <slot />
  </div>


  <Transition name="menuSlide">
    <div v-if="show"
      class="flex flex-col w-screen h-screen text-center justify-center gap-[10vh] fixed bg-primary items-center opacity-95 top-0 sm:flex-row sm:gap-[10px] sm:bg-transparent sm:h-fit sm:m-[10px] sm:justify-end sm:right-1 z-[100]">
      <NuxtLink @click="handleMenu" to="/collection"
        class="text-[25px] hover:bg-altButton w-[300px] self-center rounded-md duration-[0.5s] bg-alt text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-altButton z-10 sm:z-[10] border-2 border-solid border-primary">
        Collection</NuxtLink>
      <!--for now just to get easy access-->
      
      <NuxtLink @click="handleMenu" to="/messaging"
        class="text-[25px] hover:bg-altButton w-[300px] self-center rounded-md duration-[0.5s] bg-alt text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-altButton z-10 sm:z-[10] border-2 border-solid border-primary">
        Message</NuxtLink>
     <NuxtLink @click="handleMenu" to="/userSettings"
        class="text-[25px] hover:bg-altButton w-[300px] self-center rounded-md duration-[0.5s] bg-alt text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-altButton z-10 sm:z-[10] border-2 border-solid border-primary">
        Setting </NuxtLink>
         <NuxtLink v-if="showAdminOptions" @click="handleMenu" to="/adminSettings"
        class="text-[25px] hover:bg-altButton w-[300px] self-center rounded-md duration-[0.5s] bg-alt text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-altButton z-10 sm:z-[10] border-2 border-solid border-primary">
        Admin </NuxtLink>
      <NuxtLink @click="handleMenu" to="/"
        class="text-[25px] hover:bg-altButton w-[300px] self-center rounded-md duration-[0.5s] bg-alt text-center sm:bg-alt sm:text-[20px] sm:w-[100px] sm:hover:bg-altButton z-10 sm:z-[10] border-2 border-solid border-primary">
        Logout</NuxtLink>

    </div>
  </Transition>

  <p class="fixed top-[10px] right-[10px] text-white z-[101] sm:hidden" @click="show = !show"> &#9776</P>

</template>
<style>
.menuSlide-enter-active,
.menuSlide-leave-active {
  transition: transform 1s;
}

.menuSlide-enter-from,
.menuSlide-leave-to {
  transform: translateX(100%);
}

.menuSlide-enter-to,
.menuSlide-leave-from {
  transform: translateX(0);
}
</style>