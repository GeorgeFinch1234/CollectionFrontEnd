<script setup>
import GameCard from '~/components/gameCard.vue';
import { userEndValidation, bigStringUserInputValidation, gameSelectedValidation } from '~/utils/frontEndValidation.js'

import { useTokenStore } from '~/utils/test.js'
const toUser = ref("");

const aboutGame = ref("");
const subject = ref("");
const message = ref("");
const gameSelected = ref(false)
const GameInfo = ref()
const show = ref(false)
const gameChosen = ref("")
const gameChosenRef = ref("")


const messageSubjectLine = ref(null)
const messageTo = ref(null)
const messageBody = ref(null)

let Games = ref();


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
                Games.value = json.games

            } else {
                Games.value = null
            }
        })

}
/**
 * need to change to message but while developing why not.
 */
function backToCollection() {

    return navigateTo('/messaging')

}

function sendMessage() {



    if (!gameChosenRef.value.checkValidity() || !messageSubjectLine.value.checkValidity() || !messageTo.value.checkValidity()
        || !messageBody.value.checkValidity()) {
        messageTo.value.reportValidity()
        messageBody.value.reportValidity()
        messageSubjectLine.value.reportValidity()
        gameChosenRef.value.reportValidity()
    } else {








        const formData = new FormData();
        const tokenStore = useTokenStore()


        formData.append("findUser", toUser.value);
        formData.append("aboutGame", gameChosen.value);
        formData.append("subject", subject.value);
        formData.append("message", message.value);
        formData.append("from", tokenStore.token);

        //need to add a from so it can be sent back to them.


        fetch('http://localhost:8080/send-message', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(json => {

                if (json == null) {
                    //Games = ref(json.games)
                    return navigateTo('/messaging')
                } else {
                    //Games.value = null

                }
            })


    }

}


function loadGameCard(about, target) {
    gameSelectedValidation(target)

    if (about != "No Games Found") {
        const formData = new FormData();

        formData.append("UserName", toUser.value);


        formData.append("Game", gameChosen.value);


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
}



</script>

<template>


<!--trying to get it almost gradient from the submit button-->
    <main class="bg-[linear-gradient(351deg,_#FFDBBB,_#D9D9D9_125%)] rounded-2xl text-center  ml-auto mr-auto mt-[100px] w-[75%]">
        <div class="flex flex-col justify-center items-center">
        <h1 class="text-2xl">Message</h1>
        <div class="bg-alt w-[200px] h-[5px]"></div>
        </div>
        <form class="flex flex-col gap-[5px]">
            <div class="flex flex-col justify-between">
                <label for="messageTo">To</label>
                <input type="text" class="text-center" v-model="toUser" @blur="getUserGames()" required ref="messageTo"
                    id="messageTo" @input="e => userEndValidation(e.target)"></input>
            </div>
            <div class="flex flex-col justify-between">
                <label for="selectGames">Game</label>




            </div>
            <div class="flex flex-col justify-between">
                <select class="text-center pl-[1em]" v-model="gameChosen" @change="(e) => { loadGameCard(gameChosen, e.target) }"
                    ref="gameChosenRef" id="selectGames" required>
                    <option v-if="Games == null">No Games Found</option>
                    <!--error is it thinks its a type never so cant have .name but
                    its not and does have .name when in use but i dont know how to inform it of that.-->
                    <option v-for="game in Games">{{ game.name }}</option>
                </select>




            </div>
            <div class="flex flex-col justify-between">
                <label for="subjectLine">Subject line</label>
                <input class="text-center" v-model="subject" required ref="messageSubjectLine" id="subjectLine"
                    @input="e => userEndValidation(e.target)"></input>
            </div>
            <div class="flex flex-col justify-between">
                <label for="messageBody">Message</label>
                <textarea class="text-center" v-model="message" required ref="messageBody" id="messageBody"
                    @input="e => bigStringUserInputValidation(e.target)"></textarea>
            </div>




        </form>

        <div class="flex justify-center">





            <div v-if="show" class="relative border-2 border-dashed border-[#496580] m-[10px]">

                <cardFrontAndBack :name="GameInfo.name" :player="GameInfo.playerCount"
                    :description="GameInfo.description" :imgAlt="GameInfo.imgAlt" :img="GameInfo.imgRef"
                    :minPlayers="GameInfo.minPlayers" :maxPlayers="GameInfo.maxPlayers" :completed="GameInfo.completed"
                    :cost="GameInfo.cost" :time="GameInfo.time">
                </cardFrontAndBack>

            </div>








        </div>
        <div class="flex flex-row justify-between p-[10px]">
            <input type="submit" @click.prevent="backToCollection()"
                class="bg-primary rounded-md text-white text-xl w-fit p-[5px]" value="Cancel"> </input>
            <input type="submit" @click.prevent="sendMessage()"
                class="bg-primary rounded-md text-white text-xl w-fit p-[5px]" value="Submit"></input>
           
        </div>
    </main>

</template>