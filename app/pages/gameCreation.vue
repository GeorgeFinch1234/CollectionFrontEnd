<script setup>
 import {useTokenStore} from'~/utils/test.js'
import {userEndValidation, bigStringUserInputValidation, playCount} from'~/utils/frontEndValidation.js'

/**
 * 
 * so can pass it to php so it can find it so if update name no issues
 * 
 */
let orginalName = ref("");
const gameNameInput = ref(null)
const gameDescription = ref(null)
const gamePlayerCount = ref(null)
const gameImgDescription = ref(null)
const imgSelectRef = ref(null);


const props = defineProps(['name'])
const elem = useTemplateRef("imgSelectRef")
const displayImg = useTemplateRef("imgRef")
const route = useRoute()












function cancel (){
    navigateTo('/collection')
}

async function save(){
   

if(!gameNameInput.value.checkValidity() ||
 !gameDescription.value.checkValidity()|| 
 !gamePlayerCount.value.checkValidity() ||
 !gameImgDescription.value.checkValidity()||
!imgSelectRef.value.checkValidity()  ){
   
    gameNameInput.value.reportValidity() 
 gameDescription.value.reportValidity() 
 gamePlayerCount.value.reportValidity() 
 gameImgDescription.value.reportValidity() 
 imgSelectRef.value.reportValidity()
   
}else{


  
 if(route.query.name != 'Edit'){

 
 getDataUrl(elem.value.files[0], "create")
 }else{
/**
 * 
 * like this so that no issue with user not picking an img
 */
    if(elem.value.files[0] == null){
//if no img selected

const tokenStore = useTokenStore()


 const formData = new FormData();
formData.append("name", gameName.value);
formData.append("playerCount", playerCount.value);
//formData.append("imgRef", reader.result);
formData.append("imgAlt", imageDescription.value);
formData.append("description", description.value);
formData.append("token",tokenStore.token );
formData.append("imgPresent","false" );
formData.append("orginalGameName",orginalName.value );




fetch('http://localhost:8080/edit', {
  method: "POST",
  body: formData
}).then(res=>res.json()).then(json=>{
    console.log(json) 
return navigateTo('/collection')
})



    }else{
//if an img is selected
getDataUrl(elem.value.files[0], "edit")
    }


 }
}




function getDataUrl(file, createOrEdit) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            

const tokenStore = useTokenStore()


 const formData = new FormData();
formData.append("name", gameName.value);
formData.append("playerCount", playerCount.value);
formData.append("imgRef", reader.result);
formData.append("imgAlt", imageDescription.value);
formData.append("description", description.value);
formData.append("token",tokenStore.token );
formData.append("imgPresent","true" );
formData.append("orginalGameName",orginalName.value );



fetch('http://localhost:8080/'+createOrEdit, {
  method: "POST",
  body: formData
}).then(res=>res.json()).then(json=>{
    console.log(json) 
return navigateTo('/collection')
})






        resolve(reader.result)};

        reader.onerror = reject;
        reader.readAsDataURL(file);

        
    });

}
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

onMounted(()=>{

if(route.query.name == 'Edit'){

    const formData = new FormData();
    const tokenStore = useTokenStore()


   
    formData.append("Token", tokenStore.token);
    formData.append("Game", route.query.gameName);
    
    fetch('http://localhost:8080/game/data', {
      method: "POST",
      body: formData
    }).then(res=>res.json()).then(json=>{
       
        document.getElementById("gameName").value=json.name
        document.getElementById("description").value=json.description
        document.getElementById("playerCount").value=json.playerCount
        document.getElementById("imageDescription").value=json.imgAlt
        document.getElementById("CreateDisplayImg").src=json.imgRef
       orginalName.value = json.name 
      
       console.log("--------------------")
            console.log(json.imgRef)
            console.log(json)
        
    })
    
}



})



</script>




<template>
    <!--
    
    translate-y-[-50%] translate-x-[-50%]
relative top-[50vh] left-[50vw]
    -->
    <main class="bg-secondary flex flex-col justify-center w-[70vw] mr-auto ml-auto mt-[50px] mb-[50px] rounded-lg p-[20px] items-center overflow-hidden">

  
        <!--h1 empty, so that it can be dynamically changed depending on where it comes from. -->
    <h1 class="text-2xl">{{ route.query.name }}</h1>
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
            <label for="gameName">Game name</label>
            <input @input="e=>userEndValidation(e.target)" id="gameName" v-model="gameName" ref="gameNameInput" required ></input>
        </div>
        <div class="flex flex-col">
      
            <label for="description">Description</label>
            <input @input="e=>bigStringUserInputValidation(e.target)" id="description" v-model="description" required ref="gameDescription"></input>
        </div>
        <div class="flex flex-col">
            <label for="playerCount">Player count </label>
            <input @input="e=>playCount(e.target)" id="playerCount" type="number" v-model="playerCount" required ref="gamePlayerCount"></input>
    </div>
        <div class="flex flex-col">
            <label for="imageDescription">Image alt</label>
            <input @input="e=>bigStringUserInputValidation(e.target)" id="imageDescription" v-model="imageDescription" required ref="gameImgDescription"></input>
        </div>
       <div class="flex flex-col">
            <label for="imgFileSelection">Image</label>
            <input @change="imgChange()" id="imgFileSelection" ref="imgSelectRef"type="file" name="image" accept=".png,.jpg" required ></input>
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
