<script setup>


const elem = useTemplateRef("imgSelectRef")
const displayImg = useTemplateRef("imgRef")



async function save(){
   /*
  // base64(elem.value.files[0]);
  const file = elem.value.files[0];
if (!file) return;

const arrayBuffer = await file.arrayBuffer();
const byteArray = new Uint8Array(arrayBuffer);

function byteArrayToBase64(byteArray) {
  let binary = '';
  for (let i = 0; i < byteArray.length; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }
  return btoa(binary);
}

const base64String = byteArrayToBase64(byteArray);
console.log("Base64:", base64String);
   
*/
/*
   
    const test = elem.value.files[0]
    const byteArray = test.bytes
console.log("Byte array:", byteArray);
 */
  
 const getBase64StringFromDataURL = (dataURL) =>{
    dataURL.replace('data:', '').replace(/^.+,/, '');
 }

      
     

 console.log("------------------------------")
 console.log()
 
 getDataUrl(elem.value.files[0])
    
}




function getDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            console.log("----------------------")
            console.log(reader.result)

 fetch("http://localhost:8080/create?name="+gameName.value+"&playerCount="+playerCount.value+"&imgRef="+ reader.result  +"&imgAlt="+imageDescription.value+"&description="+description.value)
 



            resolve(reader.result)};
        reader.onerror = reject;
        reader.readAsDataURL(file);

        
    });
}


/*
async function base64(url){
    
       // Convert file (Blob) to ArrayBuffer
    const arrayBuffer = await url.arrayBuffer();

    // Convert ArrayBuffer → Uint8Array (byte array)
    const byteArray = new Uint8Array(arrayBuffer);

    console.log("Byte array:", byteArray);

    




    

    /*
fetch in here so when img in base64 string it then get sent, as await has no effect
    */
     /*
    fetch("http://localhost:8080/create?name="+gameName.value+"&playerCount="+playerCount.value+"&imgRef="+ byteArray  +"&imgAlt="+imageDescription.value+"&description="+description.value)
  


}
*/





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
    <main class="bg-secondary flex flex-col justify-center w-[70vw] relative top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] rounded-lg p-[20px] items-center">
<!--h1 empty, so that it can be dynamically changed depending on where it comes from. -->
    <h1 class="text-2xl">test</h1>
<div class="bg-alt w-[100px] h-[5px] "></div>
 <!--
    name 
    img 
    alt 
    player count 
    description
    
    
    -->
    <div class="w-[100%] lg:flex">
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
            <p class="text-center bg-primary text-white w-[70px] text-center rounded-full">cancel</p>
        </div>
    </form>
    <img id="CreateDisplayImg" ref="imgRef" alt="unselectedImg" class="basis-3xl lg:grow object-scale-down max-w-[100%] h-auto"/> 
</div>
</main>
</template>
