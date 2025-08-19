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
    <main class="bg-secondary flex flex-col justify-center items-center w-[70vw] relative top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] rounded-lg">
<!--h1 empty, so that it can be dynamically changed depending on where it comes from. -->
    <h1>test</h1>

 <!--
    name 
    img 
    alt 
    player count 
    description
    
    
    -->
    <div class="flex">
    <form class="grid">
        
            <label for="gameName">game name</label>
            <input id="gameName"></input>
        
      
            <label for="description">description</label>
            <input id="description"></input>
        
            <label for="playerCount">player count </label>
            <input id="playerCount" type="number"></input>
        
            <label for="imageDescription">img alt</label>
            <input id="imageDescription"></input>
        
            <label for="imgFileSelection">img</label>
            <input id="imgFileSelection"type="file" name="image" accept=".png,.jpg" ></input>
        <div class="flex justify-between ">
            <p>submit</p>
            <p>cancel</p>
        </div>
    </form>
    <img id="CreateDisplayImg" alt="potential img"/> 
</div>
</main>
</template>
