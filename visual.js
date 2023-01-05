

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")
const bpmSlider = document.getElementById("bpm")
const loopEndSlider = document.getElementById("loopEnd")


Tone.Transport.bpm.value = 220;
Tone.Transport.loopEnd = 16
let numSteps = 16
let steps = []
let kickSteps = []




const setStepBtn = () => {
    for (let i = 0; i < numSteps; i++) {
        let step = document.createElement('button')
        step.setAttribute('id', `step${i}`)
        step.classList.add("step")
        grid.appendChild(step)
        steps.push({
            domElement: step,
            noteOn: false,
        })
    }


    grid.addEventListener('click', function (event) {
        if (event.target.matches('.step')) {
            event.target.classList.toggle("activeStep")
        }
    })
}
setStepBtn()



const drawPlayhead = () => {
    let currentStep = Math.floor(visualSequence.progress * visualSequence.loopEnd)

    const time = Tone.Time("4n").toSeconds() * 1000 / 2
    let activeStep = steps[currentStep].domElement
    let lastStep = steps[visualSequence.loopEnd - 1].domElement
   




    if (lastStep.matches(`#step${visualSequence.loopEnd-1}`)) {
        lastStep.classList.add("lastStep")
    }
    else{activeStep.classList.remove("lastStep")}





    if (activeStep.matches('.activeStep')) {
        kick.triggerAttackRelease("C2", "8n")
        steps[currentStep].noteOn = true
    }

    
    activeStep.classList.add("playHead")
    setTimeout(() => {
        activeStep.classList.remove("playHead")
    }, time)
}

const visualSequence = new Tone.Sequence((time) => {
    Tone.Draw.schedule(drawPlayhead, time)
}, steps).start(0)

visualSequence.set({
    loopEnd: 16
})




const kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 10,
    envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4
    }
}
).toDestination()

//update kick setttings
kick.set({
    probability: 1,
})

const kickSequence = new Tone.Sequence((time, note) => {
    console.log("hey")
}).start(0)


Tone.Transport.start()

playBtn.addEventListener('click', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});





const slideBpm = (event) => {
    Tone.Transport.bpm.rampTo(+event.target.value, 0.1)
}


bpmSlider.addEventListener('input', slideBpm)

loopEndSlider.addEventListener('input', function (event) {
    visualSequence.set({
        loopEnd: +loopEndSlider.value
    })
})

























