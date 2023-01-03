

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")

playBtn.addEventListener('click', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});

let numSteps = 17
let steps = []
let index = 0



for (let i = 0; i < numSteps - 1; i++) {
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

    const time = Tone.Time("4n").toSeconds()*1000/2
    
    index = index % numSteps
    if (index > 15) { index = 0 }
    let currentStep = steps[index]

    
    currentStep.classList.add("playhead")
    setTimeout(() => {
        currentStep.classList.remove("playhead")
    }, time)
     
    index++

}





Tone.Transport.stop()
Tone.Transport.bpm.value = 220;

// const synth = new Tone.Synth({
//     oscillator: {
//         type: "fmsine4",
//         modulationType: "square"
//     }
// }).toDestination()



const visualSequence = new Tone.Sequence((time) => {
    Tone.Draw.schedule(highlightStep, time)
}, steps).start(0)

visualSequence.loopEnd = 16

console.log(visualSequence.events)



Tone.Transport.start()





























