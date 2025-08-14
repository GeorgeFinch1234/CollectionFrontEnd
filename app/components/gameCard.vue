<script setup>

defineProps(['name','player','description','imgAlt','img'])


</script>
<template>
    <div class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col">
       <img :src=img :alt=imgAlt /> 
        <div class="flex flex-col justify-between overflow-hidden gap-[10px]">
            
            <h2 class="text-center">{{ name }}</h2>
          
            <p class="text-center">player count = {{ player }}</p>
            
                <p class=" overflow-scroll text-center">
                {{description}}
                </p>
                <a  class=text-center>
                options
                </a>
            
        </div>
    </div>
</template>
