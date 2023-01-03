

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")

let columns = 16
let rows = 4

for(let i = 0; i< rows; i++){
    for (let i = 0; i < columns; i++) {
        let step = document.createElement('button')
        step.setAttribute('id',`step${i+1}` )
         step.classList.add("step")
        grid.appendChild(step)
    }


}

grid.addEventListener('click', function(event) {
    if (event.target.matches('.step')){
        event.target.classList.toggle("activeStep")
    }
})






//draw loop
const highlightStep = () => {
    
    // step.classList.add('active')
    // setTimeout(() => {
    //     step.classList.remove("active")
    // }, 100)
}

const play = async () => {
    Tone.Transport.stop()
    Tone.Transport.bpm.value = 120;

    let loop = new Tone.Loop((time) => {
        Tone.Draw.schedule(highlightStep, time)
    }, "8n").start(0)
    Tone.Transport.start()

}


const stop = ()=>{
    Tone.Transport.stop()
}
















playBtn.addEventListener("click", play)









