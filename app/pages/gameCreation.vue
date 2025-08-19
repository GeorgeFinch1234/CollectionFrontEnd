<script setup>


onMounted(()=>{

const elem = document.getElementById("imgFileSelection")
const displayImg = document.getElementById("CreateDisplayImg")

//browed from stack overflow
elem.addEventListener('change', function () {
    const file = elem.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


})



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
            <input id="gameName" class=""></input>
        </div>
        <div class="flex flex-col">
      
            <label for="description">description</label>
            <input id="description"></input>
        </div>
        <div class="flex flex-col">
            <label for="playerCount">player count </label>
            <input id="playerCount" type="number"></input>
</div>
        <div class="flex flex-col">
            <label for="imageDescription">img alt</label>
            <input id="imageDescription"></input>
        </div>
       <div class="flex flex-col">
            <label for="imgFileSelection">img</label>
            <input id="imgFileSelection"type="file" name="image" accept=".png,.jpg" ></input>
        </div>
        
            <div class="flex justify-between ">
            <p class="text-center bg-primary text-white w-[70px] text-center rounded-full">submit</p>
            <p class="text-center bg-primary text-white w-[70px] text-center rounded-full">cancel</p>
        </div>
    </form>
    <img id="CreateDisplayImg" alt="unselectedImg" class="basis-3xl lg:grow "/> 
</div>
</main>
</template>
