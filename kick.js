

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")
const bpmSlider = document.getElementById("bpm")
const loopEndSlider = document.getElementById("loopEnd")
const sequencerSliders = document.querySelectorAll('.sequencer')
const sequencerValues = document.querySelectorAll('.sequencerValue')


Tone.Transport.bpm.value = 220;
Tone.Transport.loopEnd = 16
let numSteps = 16
let steps = []
let kickSteps = []
let notes = []
let noteLength = ["2n", "8n", "16n"]
let step = {

}

const getNotes = () => {
    notes = []
    sequencerSliders.forEach(slider => {
        let note = Tone.Frequency(slider.value, 'midi').toNote()
        notes.push(note)
    })
}
getNotes()
console.log(notes)

sequencerSliders.forEach((slider, index) => {
    sequencerValues[index].textContent = Tone.Frequency(slider.value, 'midi').toNote()
    slider.addEventListener('input', () => {
        sequencerValues[index].textContent = Tone.Frequency(slider.value, 'midi').toNote()
        getNotes()
    })
    
    
})


const createStepButton = () => {
    for (let i = 0; i < numSteps; i++) {
        let step = document.createElement('button')
        step.setAttribute('id', `step${i}`)
        step.classList.add("step")
        grid.appendChild(step)
        steps.push({
            domElement: step,
            noteOn: false
        })
    }
}

const setActiveStep = () => {
    grid.addEventListener('click', function (event) {
        if (event.target.matches('.step')) {
            event.target.classList.toggle("activeStep")
        }
    })
}

createStepButton()
setActiveStep()






const drawPlayhead = () => {
    let currentStep = Math.floor(visualSequence.progress * visualSequence.loopEnd)
    const time = Tone.Time("4n").toSeconds() * 1000 / 2
    let activeStep = steps[currentStep].domElement
    let lastStep = steps[visualSequence.loopEnd - 1].domElement
    lastStep.classList.add("lastStep")
    activeStep.classList.remove("lastStep")
    //set note on to true if button selected
    if (activeStep.matches('.activeStep')) {
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

const kickSequence = new Tone.Sequence((time) => {
    kickSequence.loopEnd = 16
    let currentStep = Math.floor(kickSequence.progress * kickSequence.loopEnd)

    if (steps[currentStep].noteOn) {
        kick.triggerAttackRelease(notes[currentStep], noteLength[currentStep], time)
    }
}, notes).start(0)

//update kick setttings
kick.set({
    probability: 1,
})



Tone.Transport.start()

playBtn.addEventListener('click', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});














const slideBpm = (event) => {
    Tone.Transport.bpm.rampTo(+event.target.value, 0.1)
}


bpmSlider.addEventListener('input', slideBpm)

loopEndSlider.addEventListener('input', function (event) {
    Tone.Transport.stop()
    visualSequence.set({
        loopEnd: +loopEndSlider.value
    })
    Tone.Transport.start()
})

























