<script setup>

defineProps(['name','player','description','imgAlt','img'])


</script>
<template>
    <div class="p-[20px] bg-secondary w-[200px] h-[300px] rounded-lg flex flex-col ">
       <img :src=img :alt=imgAlt /> 
        <div class="flex flex-col justify-between">
            <div class="flex flex-row justify-between">
            <h2>{{ name }}</h2>
             <a>
                options
                </a>
            </div>
            <p>{{ player }}</p>
            
                <p>
                {{description}}
                </p>
               
            
        </div>
    </div>
</template>
