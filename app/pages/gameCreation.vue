<script setup>
import { useTokenStore } from '~/utils/test.js'
import { userEndValidation, bigStringUserInputValidation, playCount } from '~/utils/frontEndValidation.js'

/**
 * 
 * so can pass it to php so it can find it so if update name no issues
 * 
 */
let orginalName = ref("");
const gameNameInput = ref(null)
const gameDescription = ref(null)
const gamePlayerCount = ref(null)
const gameImgDescription = ref(null)
const imgSelectRef = ref(null);
const gameCost = ref(null);
const gamePlayTime = ref(null);
const gameMinPlayers = ref(null);
const gameMaxPlayers = ref(null);
const fullness = ref(null);
const radioButtons = ref("yes");
const props = defineProps(['name'])
const elem = useTemplateRef("imgSelectRef")
const displayImg = useTemplateRef("imgRef")
const route = useRoute()
/**
 * 
 * this so that if edit it will load the data into it
 */
const imageDescription = ref("")
const description = ref("")
const playerCount = ref("")
const gameName = ref("")
const cost = ref("")
const playTime = ref("")
const minPlayers = ref("")
const maxPlayers = ref("")
//const fullness = ref("")
//const radioButtons = ref("yes")   












function cancel() {
    navigateTo('/collection')
}

async function save() {
    console.log("---------------")
    console.log(minPlayers.value)
    console.log("--------------------")

    if (!gameNameInput.value.checkValidity() ||
        !gameDescription.value.checkValidity() ||
        !gamePlayerCount.value.checkValidity() ||
        !gameImgDescription.value.checkValidity() ||
        !imgSelectRef.value.checkValidity() ||
        !gameCost.value.checkValidity() ||
        !gamePlayTime.value.checkValidity() ||
        !gameMinPlayers.value.checkValidity() ||
        !gameMaxPlayers.value.checkValidity()) {

        gameNameInput.value.reportValidity()
        gameDescription.value.reportValidity()
        gamePlayerCount.value.reportValidity()
        gameImgDescription.value.reportValidity()
        imgSelectRef.value.reportValidity()
        gameCost.value.reportValidity()
        gamePlayTime.value.reportValidity()
        gameMinPlayers.value.reportValidity()
        gameMaxPlayers.value.reportValidity()

    } else {



        if (route.query.name != 'Edit') {


            getDataUrl(elem.value.files[0], "create")
        } else {
            /**
             * 
             * like this so that no issue with user not picking an img
             */
            if (elem.value.files[0] == null) {
                //if no img selected

                const tokenStore = useTokenStore()


                const formData = new FormData();
                formData.append("name", gameName.value);
                formData.append("playerCount", playerCount.value);
                //formData.append("imgRef", reader.result);
                formData.append("imgAlt", imageDescription.value);
                formData.append("description", description.value);
                formData.append("token", tokenStore.token);
                formData.append("imgPresent", "false");
                //need so if change name can still find it
                formData.append("orginalGameName", orginalName.value);
                formData.append("cost", cost.value);
                formData.append("time", playTime.value);
                formData.append("minPlayers", minPlayers.value);
                formData.append("maxPlayers", maxPlayers.value);
                formData.append("fullInBox", radioButtons.value);







                fetch('http://localhost:8080/edit', {
                    method: "POST",
                    body: formData
                }).then(res => res.json()).then(json => {
                    console.log(json)
                    return navigateTo('/collection')
                })



            } else {
                //if an img is selected
                getDataUrl(elem.value.files[0], "edit")
            }


        }
    }




    function getDataUrl(file, createOrEdit) {

        console.log(gameMinPlayers.value)

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {


                const tokenStore = useTokenStore()


                const formData = new FormData();
                formData.append("name", gameName.value);
                formData.append("playerCount", playerCount.value);
                formData.append("imgRef", reader.result);
                formData.append("imgAlt", imageDescription.value);
                formData.append("description", description.value);
                formData.append("token", tokenStore.token);
                formData.append("imgPresent", "true");
                formData.append("orginalGameName", orginalName.value);
                formData.append("cost", cost.value);
                formData.append("time", playTime.value);
                formData.append("minPlayers", minPlayers.value);
                formData.append("maxPlayers", maxPlayers.value);
                formData.append("fullInBox", radioButtons.value);




                fetch('http://localhost:8080/' + createOrEdit, {
                    method: "POST",
                    body: formData
                }).then(res => res.json()).then(json => {
                    console.log(json)
                    return navigateTo('/collection')
                })






                resolve(reader.result)
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);


        });

    }
}



//browed from stack overflow
async function imgChange() {
    const file = elem.value.files[0];


    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.value.src = e.target.result;




        };
        reader.readAsDataURL(file)

    }


}

onMounted(() => {

    if (route.query.name == 'Edit') {

        const formData = new FormData();
        const tokenStore = useTokenStore()



        formData.append("Token", tokenStore.token);
        formData.append("Game", route.query.gameName);

        fetch('http://localhost:8080/game/data', {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(json => {

            /*
             document.getElementById("gameName").value=json.name
             document.getElementById("description").value=json.description
             document.getElementById("playerCount").value=json.playerCount
             document.getElementById("imageDescription").value=json.imgAlt
             document.getElementById("cost").value=json.cost
             document.getElementById("minPlayers").value=json.minPlayers
             document.getElementById("maxPlayers").value=json.maxPlayers
             document.getElementById("playTime").value=json.time
             radioButtons.value=json.completed
             */

            gameName.value = json.name
            description.value = json.description
            playerCount.value = json.playerCount
            imageDescription.value = json.imgAlt
            cost.value = json.cost
            minPlayers.value = json.minPlayers
            maxPlayers.value = json.maxPlayers
            playTime.value = json.time
            radioButtons.value = json.completed
            document.getElementById("CreateDisplayImg").src = json.imgRef






            orginalName.value = json.name

            console.log("--------------------")
            console.log(json.imgRef)
            console.log(json)

        })

    }



})



</script>




<template>
    <!--
    
    translate-y-[-50%] translate-x-[-50%]
relative top-[50vh] left-[50vw]
    -->
    <main
        class="bg-[linear-gradient(225deg,_#FFDBBB,_#D9D9D9_60%)] flex flex-col justify-center w-[70vw] mr-auto ml-auto mt-[50px] mb-[50px] rounded-lg p-[20px] items-center overflow-hidden lg:absolute lg:top-[50vh] lg:left-[50vw] lg:translate-y-[-50%] lg:translate-x-[-50%] lg:mt-0 lg:mb-0   ">


        <!--h1 empty, so that it can be dynamically changed depending on where it comes from. -->
        <h1 class="text-2xl">{{ route.query.name }}</h1>
        <div class="bg-alt w-[100px] h-[5px] overflow-hidden "></div>
        <!--
    name 
    img 
    alt 
    player count 
    description
    
    
    -->

        <div class="w-[100%] flex flex-col lg:flex-row">
            <form class="flex flex-col grow lg:flex lg:flex-row lg:gap-[20px]">
                <section class="grow">
                    <div class="flex flex-col">
                        <label for="gameName">Game name</label>
                        <input @input="e => userEndValidation(e.target)" id="gameName" v-model="gameName"
                            ref="gameNameInput" required></input>
                    </div>
                    <div class="flex flex-col">

                        <label for="description">Description</label>
                        <input @input="e => bigStringUserInputValidation(e.target)" id="description"
                            v-model="description" required ref="gameDescription"></input>
                    </div>
                    <div class="flex flex-col">
                        <label for="playerCount">Average player count </label>
                        <input @input="e => playCount(e.target)" id="playerCount" type="number" v-model="playerCount"
                            required ref="gamePlayerCount" min="1"></input>
                    </div>
                    <!--new-->
                    <div class="flex flex-col">
                        <label for="minPlayers">Min players </label>
                        <input @input="e => playCount(e.target)" id="minPlayers" type="number" v-model="minPlayers"
                            required ref="gameMinPlayers" min="1"></input>
                    </div>
                    <div class="flex flex-col">
                        <label for="maxPlayers">Max players </label>

                        <input @input="e => playCount(e.target)" id="maxPlayers" type="number" v-model="maxPlayers"
                            required ref="gameMaxPlayers" min="1"></input>
                    </div>
                </section>
                <section class="grow">
                    <div class="flex flex-col">
                        <h2>Full in box</h2>
                        <div class="flex flex-row gap-[10px]">
                            <div>
                                <input type="radio" name="complete" id="yes" value="yes" ref="fullness"
                                    v-model="radioButtons" />
                                <label for="yes">Yes</label>
                            </div>
                            <div>
                                <input type="radio" name="complete" id="no" value="no" ref="fullness"
                                    v-model="radioButtons" />
                                <label for="no">No</label>
                            </div>
                            <div>
                                <input type="radio" name="complete" id="enoughToPlay" value="enoughToPlay"
                                    ref="fullness" v-model="radioButtons" />
                                <label for="enoughToPlay">Enough to play</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="cost">Cost in pounds </label>
                        <input @input="e => playCount(e.target)" id="cost" type="number" v-model="cost" required
                            ref="gameCost" min="0"></input>
                    </div>
                    <div class="flex flex-col">
                        <label for="playTime">Average playing time in minutes </label>
                        <input @input="e => playCount(e.target)" id="playTime" type="number" v-model="playTime" required
                            ref="gamePlayTime" min="1"></input>
                    </div>
                    <!--old-->
                    <div class="flex flex-col">
                        <label for="imageDescription">Image alt</label>
                        <input @input="e => bigStringUserInputValidation(e.target)" id="imageDescription"
                            v-model="imageDescription" required ref="gameImgDescription"></input>
                    </div>
                    <div class="flex flex-col">
                        <label for="imgFileSelection">Image</label>
                        <input @change="imgChange()" id="imgFileSelection" ref="imgSelectRef" type="file" name="image"
                            accept=".png,.jpg" required></input>
                    </div>

                </section>

            </form>



            <div
                class="max-w-[100%] max-h-[400px] flex items-center justify-center m-[10px] border-2 border-dashed border-[#496580] p-[10px] overflow-hidden">
                <!--in here so it stops being massive-->
                <img id="CreateDisplayImg" ref="imgRef" alt="Select an image"
                    class=" object-scale-down w-[100%] max-h-[400px] object-scale-down" />
            </div>

        </div>
        <div class="flex justify-between w-[100%]">
           
            <p @click="cancel"
                class="text-center bg-primary text-white w-[70px] text-center rounded-full lg:text-2xl lg:w-[100px] cursor-pointer">
                Cancel</p>
       
            <p @click="save()"
                class="text-center bg-primary text-white w-[70px] text-center rounded-full lg:text-2xl lg:w-[100px] cursor-pointer">
                Submit</p>
            </div>
    </main>
</template>
