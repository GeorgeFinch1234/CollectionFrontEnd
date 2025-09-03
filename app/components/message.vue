<script setup>
import { useTokenStore } from '~/utils/test.js'

const props = defineProps(['subject', 'body', 'gameName', 'from', 'ID', 'lastMessageID'])
let loadImg = ref(false)

let GameInfo = ref()

const emit = defineEmits(['reload'])
const pastMessage =ref()
const showLastMessage = ref(false)








function loadGameCard(aboutGame) {

    const formData = new FormData();
    const tokenStore = useTokenStore()


    formData.append("UserName", tokenStore.token);


    formData.append("Game", aboutGame);


    fetch('http://localhost:8080/load-game-for-received-messaging', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            



            GameInfo.value = json

            loadImg.value = true;

        })




}


onMounted(() => {
  
    loadGameCard(props.gameName)


})


function removeMessage(){
  const formData = new FormData();
    const tokenStore = useTokenStore()


    formData.append("UserName", tokenStore.token);


    formData.append("messageID", props.ID);
  

    fetch('http://localhost:8080/message/delete', {
        method: "POST",
        body: formData
}).then(()=>{
    emit("reload")
})
}







function loadCreateMessagePage() {
     return navigateTo({ name: 'createMessage', query: { from: "reply", lastMessageID: props.ID } })
}

function loadLastMessage(){


if(props.lastMessageID !=""){
  const formData = new FormData();
    

        
    formData.append("UserName", props.from);


    formData.append("messageID", props.lastMessageID);


    fetch('http://localhost:8080/message/Specific/not-token', {
        method: "POST",
        body: formData
}) .then(res => res.json())
            .then(json => {






    pastMessage.value = json


showLastMessage.value = true




})

}else{

    alert("end of linked list")
}


}




</script>

<template>

    <!--as recurions have to have this dic so that it will go over it-->
    <div>
    <div class="relative">
    <div class="p-[20px]  w-[200px] h-[400px] rounded-lg  bg-[linear-gradient(45deg,_#FFDBBB,_#D9D9D9_100%)]
items-center justify-center gap-[10px] flex flex-col justify-between relative">

        <img v-if="loadImg" :src="GameInfo.imgRef" :alt="GameInfo.imgAlt"></img>
         <img v-if="!loadImg" src="/assets/loadingCircle.png" alt="spinny wheel" class="animate-spin w-[50px] h-[50px]"></img>
<div class="flex flex-col grow">
 


<div class="flex flex-col justify-center items-center text-center border-b-[2px] overflow-y-auto">

    <h2 class="underline">message from</h2>
    <p>{{ props.from }}</p>
</div>



<div class="flex flex-col justify-center items-center text-center border-b-[2px] overflow-y-auto">
    
<h3 class="underline" >subject</h3>
        <p>{{ props.subject }}</p>
</div>
<div class="flex flex-col justify-center items-center text-center border-b-[2px] overflow-y-auto">
    <h3 class="underline" >message</h3>
        <p>{{ props.body }}</p>
</div>



        

    </div>

 
   
<div class="flex flex-row justify-between w-[100%]">    


<p class="bg-[#FFCC99] rounded-lg w-[100%] h-[100%] block w-[60px] text-center cursor-pointer" @click="removeMessage()">Delete</p>


<p class="bg-[#FFCC99] rounded-lg w-[100%] h-[100%] block w-[60px] text-center cursor-pointer" @click="loadCreateMessagePage()">Reply</p>





</div>

 <div class="flex flex-row justify-between w-[100%]">    

<p class="bg-[#FFCC99] rounded-lg w-[100%] h-[100%] block w-[60px] text-center cursor-pointer" @click="loadLastMessage()">&#8592</p>


<p class="bg-[#FFCC99] rounded-lg w-[100%] h-[100%] block w-[60px] text-center cursor-pointer" @click="$emit('back')">&#8594</p>




</div>




<!--ideas is precious message goes over the top of it-->
 

</div>

 <message v-if="showLastMessage" :subject="pastMessage.subject" :body="pastMessage.message" 
:gameName="pastMessage.aboutGame" :from="pastMessage.from" :ID="pastMessage.ID" :lastMessageID="pastMessage.lastMessageID"
class="absolute top-[0px] "
@back="showLastMessage = !showLastMessage"

>
</message>
</div>
</div>
</template>
