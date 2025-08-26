<script setup>
 import {useTokenStore} from'~/utils/test.js'


const elem = useTemplateRef("imgSelectRef")
const displayImg = useTemplateRef("imgRef")

function cancel (){
    navigateTo('/collection')
}

async function save(){
   
  
 

 
 getDataUrl(elem.value.files[0])
    
}




function getDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            console.log("----------------------")
            console.log(reader.result)

const tokenStore = useTokenStore()
console.log("****"+tokenStore.token)
console.log("----------------------")

 const formData = new FormData();
formData.append("name", gameName.value);
formData.append("playerCount", playerCount.value);
formData.append("imgRef", reader.result);
formData.append("imgAlt", imageDescription.value);
formData.append("description", description.value);
formData.append("token",tokenStore.token );




fetch('http://localhost:8080/create', {
  method: "POST",
  body: formData
}).then(res=>res.json()).then(json=>{
    console.log(json)   
})






        resolve(reader.result)};
        reader.onerror = reject;
        reader.readAsDataURL(file);

        
    });
}



//browed from stack overflow
async function imgChange () {
    const file = elem.value.files[0];
    
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.value.src = e.target.result;
         
           

            
        };
        reader.readAsDataURL(file)

        }


}





</script>




<template>
    <!--
    
    translate-y-[-50%] translate-x-[-50%]
relative top-[50vh] left-[50vw]
    -->
    <main class="bg-secondary flex flex-col justify-center w-[70vw] mr-auto ml-auto mt-[50px] mb-[50px] rounded-lg p-[20px] items-center overflow-hidden">

  
        <!--h1 empty, so that it can be dynamically changed depending on where it comes from. -->
    <h1 class="text-2xl">test</h1>
<div class="bg-alt w-[100px] h-[5px] overflow-hidden "></div>
 <!--
    name 
    img 
    alt 
    player count 
    description
    
    
    -->
    <div class="w-[100%] flex flex-col lg:flex-row">
    <form class="flex flex-col gap-[20px] grow">
        <div class="flex flex-col">
            <label for="gameName">game name</label>
            <input id="gameName" v-model="gameName"></input>
        </div>
        <div class="flex flex-col">
      
            <label for="description">description</label>
            <input id="description" v-model="description"></input>
        </div>
        <div class="flex flex-col">
            <label for="playerCount">player count </label>
            <input id="playerCount" type="number" v-model="playerCount"></input>
    </div>
        <div class="flex flex-col">
            <label for="imageDescription">img alt</label>
            <input id="imageDescription" v-model="imageDescription"></input>
        </div>
       <div class="flex flex-col">
            <label for="imgFileSelection">img</label>
            <input @change="imgChange()" id="imgFileSelection" ref="imgSelectRef"type="file" name="image" accept=".png,.jpg" ></input>
        </div>
        
            <div class="flex justify-between ">
            <p @click="save()" class="text-center bg-primary text-white w-[70px] text-center rounded-full">submit</p>
            <p @click="cancel" class="text-center bg-primary text-white w-[70px] text-center rounded-full">cancel</p>
        </div>
    </form>
    <div class="max-w-[100%] max-h-[400px] flex items-center justify-center m-[10px] border-2 border-dashed border-[#496580] p-[10px] overflow-hidden">
       <!--in here so it stops being massive--> 
    <img id="CreateDisplayImg" ref="imgRef" alt="Select an image" class=" object-scale-down w-[100%] max-h-[400px] object-scale-down"/> 
    </div>
</div>
</main>
</template>
