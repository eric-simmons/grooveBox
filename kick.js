

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")
const bpmSlider = document.getElementById("bpm")
const loopEndSlider = document.getElementById("loopEnd")
const sequencerSliders = document.querySelectorAll('.sequencer')
const sequencerValues = document.querySelectorAll('.sequencerValue')
const stepBtns = document.querySelectorAll('.stepBtn')


Tone.Transport.bpm.value = 220;
Tone.Transport.loopEnd = 16
let numSteps = 16
let steps = []
let kickSteps = []
let notes = []
let noteLength = ["2n", "8n", "16n"]
let step = {}


//get the notes from slider and translate to midi note then push to notes array
const getNotes = () => {
    notes = []
    sequencerSliders.forEach(slider => {
        let note = Tone.Frequency(slider.value, 'midi').toNote()
        notes.push(note)
    })
}
getNotes()

//get pitch from slider and assign to notes pitch and display value on dom
sequencerSliders.forEach((slider, index) => {
    sequencerValues[index].textContent = Tone.Frequency(slider.value, 'midi').toNote()
    slider.addEventListener('input', () => {
        sequencerValues[index].textContent = Tone.Frequency(slider.value, 'midi').toNote()
        getNotes()
    })
})

//toggle active step buttons
stepBtns.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.target.classList.toggle("activeStep")
    })
})

//determine last beat in loop and dim all buttons after last beat
loopEndSlider.addEventListener('input', (event) => {
    // let lastBtn = stepBtns[loopEndSlider.value]
    
    //all buttons that come before the last button
    stepBtns.forEach((button, index) => {
        if (index > loopEndSlider.value) {
            button.classList.add("lastStep")
        }
        else (button.classList.remove("lastStep"))
    })
    // console.log(lastBtn)
})


const drawPlayhead = () => {
    //highlight button for current step
    let currentStep = Math.floor(visualSequence.progress * visualSequence.loopEnd)
    const time = Tone.Time("4n").toSeconds() * 1000 / 2
    let currentBtn = stepBtns[currentStep]
    currentBtn.classList.add("playHead")
    setTimeout(() => {
        currentBtn.classList.remove("playHead")
    }, time)

    //dim steps after last step
    let lastBtn = stepBtns[visualSequence.loopEnd]
    console.log(lastBtn)


    // let lastBtn = stepBtns[visualSequence.loopEnd - 1]
    // lastStep.classList.add("lastStep")
    // activeStep.classList.remove("lastStep")
    //set note on to true if button selected
    // if (currentBtn.matches('.activeStep')) {
    //     steps[currentStep].noteOn = true
    // }

}




const visualSequence = new Tone.Sequence((time) => {
    Tone.Draw.schedule(drawPlayhead, time)
}, notes).start(0)

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

    if (stepBtns[currentStep].matches('activeStep')) {
        kick.triggerAttackRelease(notes[currentStep], noteLength[currentStep], time)
    }
}, notes).start(0)

//update kick setttings
kick.set({
    probability: 1,
})





playBtn.addEventListener('click', () => {
    console.log('Play')

    Tone.Transport.start()
    // if (Tone.context.state !== 'running') Tone.context.resume();
});

bpmSlider.addEventListener('input', (event) => {
    Tone.Transport.bpm.rampTo(+event.target.value, 0.1)
})

// loopEndSlider.addEventListener('input', (event) => {
//     setLastBtn()
//     visualSequence.set({
//         loopEnd: +loopEndSlider.value
//     })
// })

























