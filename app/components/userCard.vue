<script setup>
  import { useTokenStore } from '~/utils/test.js'
const props = defineProps(['userName','adminStatus'])
const adminControl = ref(props.adminStatus)
const emit = defineEmits(['reload'])

function deleteUser(){
/**
 * edge case
 * need to logout if deltet your self.
 * 
 * 
 */
        const formData = new FormData();
      

        formData.append("token", props.userName);
        formData.append("admin", adminControl.value);

        fetch('http://localhost:8080/settings/delete-no-token', {
            method: "POST",
            body: formData
        }).then(res=> res.json()).then(json=>{

if(json!=""){
    alert(json)
}else{
    


  const tokenStore = useTokenStore()


 const formData2 = new FormData();
formData2.append("token", tokenStore.token);
fetch('http://localhost:8080/user/user-from-token', {
            method: "POST",
            body: formData2
        }).then(res=>res.json()).then(json=>{
/**
 * so if deleted self
 */

if(props.userName==json){
return navigateTo("/")
}else{

emit('reload')

}



        })

}


        })
        
}
function clearMessages(){
 const formData = new FormData();
        

        formData.append("token", props.userName);
        

        fetch('http://localhost:8080/settings/messages-no-token', {
            method: "POST",
            body: formData
        }).then(res=>res.json).then(json=>{

            alert("messages have been cleared")

        })
}
function clearGames(){
 const formData = new FormData();
        

        formData.append("token", props.userName);
        

        fetch('http://localhost:8080/settings/collection-no-token', {
            method: "POST",
            body: formData
        }).then(res=>res.json).then(json=>{

            alert("games have been cleared")

        })
}

function setAdmin(){
    const formData = new FormData();
        

        formData.append("username",props.userName );
        formData.append("adminStatus",!adminControl.value );
        

        fetch('http://localhost:8080/user/admin-status', {
            method: "POST",
            body: formData
        }).then(res=>res.json()).then(json=>{

            if(json==""){
    

}else{
    
    alert(json)
    adminControl.value = true
}
           
        })

}
onMounted(()=>{
    console.log("mounted")
console.log(props.userName)
/**
 * 
 * like this asprops.adminStauts can be undefined as well as false
 */

    if(props.adminStatus!="true"){
adminControl.value = false
    }else{
        adminControl.value = true
    }




})

</script>

 
<template>

<section class=" flex flex-col text-center w-[200px] h-[300px] rounded-lg gap-[10px] justify-center items-center bg-[linear-gradient(45deg,_#FFDBBB,_#D9D9D9_90%)]">
<div>
<p>{{ userName }}</p>
 <div class="bg-darkAlt w-[100px] h-[5px]"></div>
</div>
 <div class="flex flex-col">
<label :for=userName class="cursor-pointer">Admin Status</label>
<input :id=userName type=checkbox checked class="cursor-pointer" v-model="adminControl" @click="setAdmin()">
</div>
<input type = button value ="Delete User" class="bg-darkAlt text-white rounded-lg pl-[5px] pr-[5px] cursor-pointer w-[75%] active:scale-[0.98] transition-all duration-1s linear" @click="deleteUser()"></input>
<input type = button value="Clear Messages" class="bg-darkAlt text-white rounded-lg pl-[5px] pr-[5px] cursor-pointer w-[75%] active:scale-[0.98] transition-all duration-1s linear" @click="clearMessages()"></input>
<input type = button value ="Clear Games" class="bg-darkAlt text-white rounded-lg pl-[5px] pr-[5px] cursor-pointer w-[75%] active:scale-[0.98] transition-all duration-1s linear" @click="clearGames()"></input>
</section>

</template>