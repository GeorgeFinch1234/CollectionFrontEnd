<script setup>
const showConfirmation = ref(false)
const action =ref()
const url = ref()




function carryOutAction(){

const formData = new FormData();

    const tokenStore = useTokenStore()

    formData.append("token", tokenStore.token);
    
    

    fetch('http://localhost:8080/settings/'+url.value, {
        method: "POST",
        body: formData
    }).then(res.json()).then(json =>{


        if(url.value == "delete"){
if(json==""){


return navigateTo('/')
}else{


    alert(json)
}
        }else{
return navigateTo('/collection')
        }


    })

}







</script>


<template>
    <main class="ml-auto mr-auto mt-[25vh] relative
bg-[linear-gradient(45deg,_#FFDBBB,_#D9D9D9_100%)] flex flex-col 
justify-center items-center w-fit rounded-lg p-[40px] gap-[10px]">
        <div class="flex flex-col justify-center items-center">
            <h1 class=" text-2xl sm:text-4xl z-[2]">Settings</h1>
            <div class="bg-darkAlt w-[150px] h-[5px] sm:w-[200px]"></div>
        </div>

        <a @click="()=>{
            showConfirmation = !showConfirmation
            action = 'Delete Your Account'
            url='delete'
        }" class="bg-darkAlt text-white rounded-lg pl-[10px] pr-[10px] pt-[2px] pb-[2px] w-[100%] text-center lg:text-lg cursor-pointer "> Delete Account </a>
        <a @click="()=>{
            showConfirmation = !showConfirmation
            action = 'Clear Your Game Collection'
        url='collection'
        }" class="bg-darkAlt text-white rounded-lg pl-[10px] pr-[10px] pt-[2px] pb-[2px] w-[100%] text-center lg:text-lg cursor-pointer"> Clear Collection </a>
        <a @click="()=>{
            showConfirmation = !showConfirmation
            action = 'Clear Your Messages'
       url='messages'
       }"class="bg-darkAlt text-white rounded-lg pl-[10px] pr-[10px] pt-[2px] pb-[2px] w-[100%] text-center lg:text-lg cursor-pointer"> Clear Messages </a>
       
        <!--
I am thinking stuff like
-> total cost
-> maybe added in number of plays 
-> game cost per play 
-> 


-->



        <section v-if="showConfirmation" class="flex flex-col item-center justify-center text-center absolute bg-[linear-gradient(135deg,_#FFDBBB,_#D9D9D9_100%)] p-[20px] border-2 border-dashed border-[#496580] z-[3] lg:text-lg">
            <h2 class="text-2xl sm:text-4xl">Confirmation</h2>
            <p> Are you sure you want to:</p>
            <p>{{ action }}.</p>
            <p>This cant be undone.</p>
            
            
            <div class="flex flex-row justify-between gap-[10px]">
                 <a @click="showConfirmation = !showConfirmation" class="bg-primary text-white rounded-lg pl-[10px] pr-[10px] pt-[2px] pb-[2px] w-[100%] text-center lg:text-lg cursor-pointer">No</a>
                <a @click="carryOutAction()"class="bg-primary text-white rounded-lg pl-[10px] pr-[10px] pt-[2px] pb-[2px] w-[100%] text-center lg:text-lg cursor-pointer">Yes</a>
            </div>
        </section>
    </main>



</template>