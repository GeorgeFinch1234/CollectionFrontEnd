<script setup>
let user = ref("");
let password = ref("");

definePageMeta({
  layout: 'login'
})
onMounted(() => {
    //code taken from old project, dot connection, on same github
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let circleX = 0
let circleY = 0
let dotsInCircle = []
let circleSize;
let dotCount;
let dots = [];
//they move in a strught line, when hit the wall they change direction
class Dot {
    constructor(initialX, initialY, initialVX, initialVY) {
        this.x = initialX;
        this.y = initialY;
        //velocity x,
        this.VX = initialVX
        this.VY = initialVY
    }
}




function createDots(){
    dots = [];
    dotCount = Math.floor(window.innerWidth / 15);
    for (let i = 0; i < dotCount; i++) {
        //to stop it being able to be zero eg not move 
        let zeroX = 0;
        while (zeroX == 0) {
            //-0.5 so can go back
            //2 is speed bascially
            zeroX = (Math.random() - 0.5) * 2

        }
        let zeroY = 0;
        while (zeroY == 0) {
            zeroY = (Math.random() - 0.5) * 2
        }






        dots.push(
            new Dot(
                Math.floor(Math.random() * window.innerWidth),
                Math.floor(Math.random() * window.innerHeight),
                zeroX,
                zeroY
            )
        )

    }
}


function run() {
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots()
    draw()
}

function draw() {
    
    ctx.fillStyle = "#496580"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    //floor to stop any issue with being floating point
    
    //clear dotsInCirle, so if leave no longer effected
    dotsInCircle = []
    for (let i = dots.length - 1; i >= 0; i--) {


        //-0.5 so get positive and negs
        //changes 2 for movement speed
        dots[i].x += dots[i].VX
        dots[i].y += dots[i].VY

        //dont like this so it just changes direction
        if (dots[i].x <= 0) {
            dots[i].VX = (Math.random()) * 2
        }
        if (dots[i].x >= window.innerWidth) {
            dots[i].VX = (Math.random() - 1) * 2
        }
        if (dots[i].y <= 0) {
            dots[i].VY = (Math.random()) * 2
        }
        if (dots[i].y >= window.innerHeight) {
            dots[i].VY = (Math.random() - 1) * 2
        }

        ctx.beginPath()
        ctx.arc(dots[i].x, dots[i].y, 1, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill();

        if (dots[i].x > circleX - 200 && dots[i].x < circleX + 200 && dots[i].y > circleY - 200 && dots[i].y < circleY + 200) {
            dotsInCircle.push(dots[i]);
        }



//f as in first loop
        for (let f = 0; f < dotsInCircle.length;f++) {

//so only do a check once
//s for second
            for (let s = f; s <dotsInCircle.length; s++) {


                let dx = dotsInCircle[f].x - dotsInCircle[s].x;
                let dy = dotsInCircle[f].y - dotsInCircle[s].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 125) {
                    ctx.beginPath()
                    ctx.moveTo(dotsInCircle[f].x, dotsInCircle[f].y)
                    ctx.lineTo(dotsInCircle[s].x, dotsInCircle[s].y)
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                    ctx.stroke()
                }
                // sqrt((x2 - x1)^2 + (y2 - y1)^2)
                let mdx = circleX - dotsInCircle[s].x;
                let mdy = circleY - dotsInCircle[s].y;
                let mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mouseDistance < 125) {
                    ctx.beginPath()
                    ctx.moveTo(circleX, circleY)
                    ctx.lineTo(dotsInCircle[s].x, dotsInCircle[s].y)
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                    ctx.stroke()
                }





              

            }

        }


    }

    
   // circle()

    setTimeout(draw, 25)
}

addEventListener("mousemove", e => {
    circleX = e.clientX
    circleY = e.clientY
})
addEventListener("touchmove", (e) => {
   
    e.preventDefault();
    //prevent default so can scroll
    circleX = e.touches[0].clientX
    circleY = e.touches[0].clientY

     
})

addEventListener("resize",()=>{
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     createDots()
    
})
run();


});
/*
done this was to make yii2 and nuxt work together, 
else other way couldnt get access to var in $_POST
*/
function sendData() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/login");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onload = function() {
console.log(this.responseText)   
}
  xhttp.send("username="+user.value + "&password="+password.value);
  }

onMounted(()=>{
 const submit = document.getElementById("loginSubmit");
submit.addEventListener("click",(event)=>{
event.preventDefault()

sendData()





 

})

})

</script>

<template>
    
    <canvas id="canvas" role="presentational" class=" bg-primary w-screen h-screen z-0">

    </canvas>
  
    <!--transform-[translate(0%,-50%)]-->
    
    <main class="p-[20px] gap-[20px] bg-secondary w-[300px] h-[300px]  rounded-lg absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] sm:w-[600px]">
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-center text-2xl">Welcome</h1>
    <div class="bg-alt w-[150px] h-[5px] "></div>
    </div>
   <!--post not get so the password now in the url-->
    <form action="" method="POST" class="flex flex-col gap-[40px]  pt-[20px]">
        <div class="flex flex-col gap-[10px]">
           <!--need labals for aria-->
            <input v-model="user" placeholder="user name" class="rounded-md  text-xl"/>
            <input v-model="password" placeholder="password" type="password" class="rounded-md text-xl"/>
        </div>
        <div class="flex flex-col gap-[10px]">
            <input type="submit" class="bg-primary rounded-md text-white text-xl" id="loginSubmit"></input>
            <input type="button" class="bg-primary rounded-md text-white text-xl" value="sign up"/>
        </div>
    </form>
    </main>
    
</template>