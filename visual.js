

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")

playBtn.addEventListener('click', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});



Tone.Transport.bpm.value = 220;
let numSteps = 16
let steps = []
let index = 0


let bools = []
console.log(bools)



for (let i = 0; i < numSteps; i++) {
    let step = document.createElement('button')
    step.setAttribute('id', `step${i}`)
    step.classList.add("step")
    grid.appendChild(step)
    steps.push(step)
}
grid.addEventListener('click', function (event) {
    if (event.target.matches('.step')) {
        event.target.classList.toggle("activeStep")
    }
})






//draw loop  t
const highlightStep = () => {
    const time = Tone.Time("4n").toSeconds() * 1000 / 2

    index = index % numSteps
    if (index > 15) { index = 0 }
    let currentStep = steps[index]
    if (currentStep.matches('.activeStep')) {
        console.log("hey")
    }
    currentStep.classList.add("playhead")
    setTimeout(() => {
        currentStep.classList.remove("playhead")
    }, time)
    index++
    return currentStep
}





Tone.Transport.stop()




const visualSequence = new Tone.Sequence((time) => {
    Tone.Draw.schedule(highlightStep, time)
}, steps).start(0)


const kickSequence = new Tone.Sequence((time, note) => {




})


Tone.Transport.start()





























