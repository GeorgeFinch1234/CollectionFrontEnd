<script setup>

import { useTokenStore } from '~/utils/test.js'
const emit = defineEmits(['reload'])

/*

so can pass it via api in to it.
*/
let props = defineProps(['name'])
function confirmDelete() {



    const formData = new FormData();
    const tokenStore = useTokenStore()



    formData.append("Token", tokenStore.token);
    formData.append("Game", props.name);

    fetch('http://localhost:8080/delete/game', {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(json => {




    })

    emit('reload')




//need to get access token and also pass down to it the game name so it can fine it.
/*

$database->getReference('posts')->remove();

all need to do on php side.
*/
}


</script>
<template>
    <div
        class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col absolute top-[0] right-[0] items-center justify-center">
        <div>
            <h1 class="text-center text-2xl">Delete</h1>

            <div class="bg-alt w-[150px] h-[5px] "></div>
            <p class="text-center">are you sure you want to delete</p>
        </div>
        <div class="flex flex-row justify-center gap-[5px] p-[20px]">
            <a @click="confirmDelete() "
                class="bg-primary rounded-md text-center text-white text-2xl h-fit p-[5px]">confirm</a>
            <a @click="$emit('cancel')"
                class="bg-primary rounded-md text-center text-white text-2xl h-fit p-[5px]">cancel</a>
        </div>
    </div>
</template>
