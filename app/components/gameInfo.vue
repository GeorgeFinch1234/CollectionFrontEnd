<script setup>

const props = defineProps(['minPlayers', 'maxPlayers', 'completed', 'cost', 'time'])

</script>

<template>

    <div
        class="p-[20px] bg-secondary w-[200px] h-[400px] rounded-lg flex flex-col  items-center justify-center gap-[20px] absolute">


        <img src="/assets/reverseArrows.png" alt="reversable arrows"
            class="absolute top-[2px] left-[2px] w-[30px] h-30px]" @click="$emit('flipCard')" />
        <h1 class="text-center text-2xl underline">Game Info</h1>

        <p>min players = {{ minPlayers }}</p>
        <p>max players = {{ maxPlayers }}</p>

        <p>complete = {{ completed }}</p>

        <p>cost = £{{ cost }}</p>

        <p>time = {{ time }} mins</p>





    </div>
</template>