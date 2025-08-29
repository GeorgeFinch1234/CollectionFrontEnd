<script setup>
import GameCard from '~/components/gameCard.vue';

const toUser = ref("");

const aboutGame = ref("");
const subject = ref("");
const message = ref("");
const gameSelected = ref(false)
const GameInfo = ref()
const show = ref(false)
const gameChosen = ref()


let Games =ref();


function getUserGames() {


    const formData = new FormData();



    formData.append("findUser", toUser.value);


    fetch('http://localhost:8080/find-user', {
        method: "POST",
        body: formData
    })
        .then(res => {


            return res.json()
        })
        .then(json => {

            if (json != null) {
                Games.value =json.games
                
            } else {
                 Games.value =null
            }
        })

}
/**
 * need to change to message but while developing why not.
 */
function backToCollection() {

    return navigateTo('/collection')

}

function sendMessage() {

    const formData = new FormData();



    formData.append("findUser", toUser.value);
    formData.append("aboutGame", aboutGame.value);
    formData.append("subject", subject.value);
    formData.append("message", message.value);

    //need to add a from so it can be sent back to them.


    fetch('http://localhost:8080/send-message', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            if (json != null) {
                //Games = ref(json.games)
            } else {
                //Games.value = null

            }
        })

}


function loadGameCard(aboutGame) {

    const formData = new FormData();

    formData.append("UserName", toUser.value);


    formData.append("Game", "Gyarados");
  
    fetch('http://localhost:8080/load-game-for-message', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(json => {
          
            gameSelected.value = true
            GameInfo.value = json
            show.value = true

        })




}



</script>

<template>



    <main
        class="bg-secondary rounded-2xl text-center absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] w-[75%]">
        <h1 class="text-2xl">Message</h1>
        <div class="bg-alt w-[100%] h-[5px]"></div>
        <form class="flex flex-col gap-[5px]">
            <div class="flex flex-col justify-between">
                <label>To</label>
                <input type="text" class="text-center" v-model="toUser" @blur="getUserGames()"> </input>
            </div>
            <div class="flex flex-col justify-between">
                <label>Game</label>
                <!--@click="getUserGames()" add in to below-->
              <!--
                <input list="games" class="text-center" v-model="aboutGame" @click="loadGameCard(aboutGame)">
            -->



            </div>
            <div class="flex flex-col justify-between">
                <select class="text-center" v-model="gameChosen" @change="loadGameCard(gameChosen)">
                    <option>test1</option>
                    <!--error is it thinks its a type never so cant have .name but
                    its not and does have .name when in use but i dont know how to inform it of that.-->
                    <option v-for="game in Games">{{ game.name }}</option>
                </select>



              
            </div>
            <div class="flex flex-col justify-between">
                <label>Subject line</label>
                <input class="text-center" v-model="subject"></input>
            </div>
            <div class="flex flex-col justify-between">
                <label>Message</label>
                <textarea class="text-center" v-model="message"></textarea>
            </div>




        </form>

<div class="flex justify-center">
        <GameCard v-if="show" :name=GameInfo.name :player=GameInfo.playerCount :description=GameInfo.description
            :img=GameInfo.imgRef :imgAlt=GameInfo.imgAlt class="border-2 border-dashed border-[#496580] mt-[5px]"></GameCard>
</div>
        <div class="flex flex-row justify-between p-[10px]">
            <input type="submit" @click.prevent="sendMessage()"
                class="bg-primary rounded-md text-white text-xl w-fit p-[5px]" value="Submit"></input>
            <input type="submit" @click.prevent="backToCollection()"
                class="bg-primary rounded-md text-white text-xl w-fit p-[5px]" value="Cancel"> </input>
        </div>
    </main>

</template>