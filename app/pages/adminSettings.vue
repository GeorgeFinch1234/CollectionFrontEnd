
<script setup>
const users= ref()






onMounted(()=>{


getUser()


})

function getUser(){
console.log("getUsers")
     const formData = new FormData();

    fetch('http://localhost:8080/users/get', {
        method: "POST",
        body: formData
    })
        .then(res => {
            return res.json()

        }).then(json=>{
console.log(json)
            users.value=json
        })




}

</script>




<template >
 <div class="flex flex-col justify-center items-center sm:col-span-full m-[10px] sm:mt-[20px]">
        <h1 class="text-white mt-[20px] text-2xl sm:text-4xl z-[2]">Admin Settings</h1>
        <div class="bg-alt w-[180px] h-[5px] sm:w-[260px]"></div>
    </div>

<main class="flex flex-row flex-wrap justify-center gap-[10px] p-[10px]"> 
<UserCard v-for="(user, id) in users" :userName="id" :adminStatus="user.admin" @reload="getUser()"></UserCard>

</main>

</template>
