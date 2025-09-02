<script setup>
import { useTokenStore } from '~/utils/test.js'

let messages = ref()

onMounted(() => {
    
    loadMessages()


})
function loadMessages() {
   const formData = new FormData();

    const tokenStore = useTokenStore()
/**
 * 
 * so gets the message only for the loginied in user.
 * 
 */
    formData.append("token", tokenStore.token);

    fetch('http://localhost:8080/get-messages', {
        method: "POST",
        body: formData
    })
        .then(res => {
            return res.json()

        })
        .then(json => {
console.log(json)
messages.value = json
        })

    }


function loadNewMessage() {
    return navigateTo('/createMessage')
}






    
</script>




<template>
<p @click="loadNewMessage()"
        class="bg-secondary rounded-full w-[80px] text-lg text-center fixed right-[20px] bottom-[20px] z-[9] border-2 border-solid border-[#496580] cursor-pointer">
        &#128228</p> 
 <div class="flex flex-col justify-center items-center sm:col-span-full m-[10px] sm:mt-[20px]">
        <h1 class="text-white mt-[20px] text-2xl sm:text-4xl">Messages</h1>
        <div class="bg-alt w-[150px] h-[5px] sm:w-[200px]"></div>
    </div>


<!--const props = defineProps(['subject', 'body', 'gameName'])-->
<div class=" flex flex-row justify-center items-center gap-[20px] flex-wrap">
<message v-for="message in messages" :subject="message.subject" :body="message.message" 
:gameName="message.aboutGame" :from="message.from"></message>
</div>


</template>