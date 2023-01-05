

const body = document.getElementById("body")
const grid = document.getElementById("grid")
const playBtn = document.getElementById("playBtn")
const stopBtn = document.getElementById("stopBtn")
const bpmSlider = document.getElementById("bpm")
const loopEndSlider = document.getElementById("loopEnd")
const bpmValue = document.getElementById('bpmValue')
const loopEndValue = document.getElementById('loopEndValue')
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

//scales
let CMajor = []
const Major = [0, 2, 4, 5, 7, 9, 11, 12];
let startingNote = 60
for (let i = 0; i < Major.length; i++) {
    CMajor.push(Major[i] + startingNote);
}

// setPitch = () => {
//     return (CMajor[Math.floor(Math.random() * CMajor.length)])
// }

// setStep = (bar, sixteenth) => {
//     return {
//         time: setTime(bar, sixteenth),
//         note: setPitch(bar),
//         velocity: setVelocity()
//     }
// }

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

        sequencerSliders[index].classList.toggle("activeSlider")
        event.target.classList.toggle("activeStep")

    })
})

//determine last beat in loop and dim all buttons after last beat
//set loop end for sequences
loopEndSlider.addEventListener('input', (event) => {
    visualSequence.set({
        loopEnd: +loopEndSlider.value
    })
    kickSequence.set({
        loopEnd: +loopEndSlider.value
    })
    loopEndValue.innerHTML = `LoopEnd ${loopEndSlider.value}`
    stepBtns.forEach((button, index) => {
        if (index >= loopEndSlider.value) {
            button.classList.add("lastStep")
        }
        else (button.classList.remove("lastStep"))
    })

    sequencerSliders.forEach((slider, index) => {
        if (index >= loopEndSlider.value) {
            slider.classList.add("lastStep")
        }
        else (slider.classList.remove("lastStep"))
    })


})



//highlight button/slider for current step
const visualSequence = new Tone.Sequence((time) => {
    Tone.Draw.schedule(() => {
        let currentStep = Math.floor(visualSequence.progress * visualSequence.loopEnd)
        const time = Tone.Time("4n").toSeconds() * 1000 / 2
        let currentBtn = stepBtns[currentStep]
        let currentSlider = sequencerSliders[currentStep]
        currentSlider.classList.add("currentSlider")
        currentBtn.classList.add("playHead")

        setTimeout(() => {
            currentBtn.classList.remove("playHead")
        }, time)
        setTimeout(() => {
            currentSlider.classList.remove("currentSlider")
        }, time)
    }, time)
}, notes).start(0)






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
    let currentStep = Math.floor(kickSequence.progress * kickSequence.loopEnd)
    if (stepBtns[currentStep].matches('.activeStep')) {
        kick.triggerAttackRelease(notes[currentStep], noteLength[currentStep], time)
    }
}, notes).start(0)


//starting values
kickSequence.loopEnd = 16
visualSequence.loopEnd = 16



playBtn.addEventListener('click', () => {
    Tone.Transport.start()
    if (Tone.context.state !== 'running') Tone.context.resume();
});

bpmSlider.addEventListener('input', (event) => {
    bpmValue.innerText = `BPM ${event.target.value}`
    Tone.Transport.bpm.rampTo(+event.target.value, 0.1)
})


























