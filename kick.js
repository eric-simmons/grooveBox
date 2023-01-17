

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


let majorInterval = [2, 2, 1, 2, 2, 2, 1]
let minorInterval = [2, 1, 2, 2, 1, 2, 2]

Tone.Transport.bpm.value = 220;
Tone.Transport.loopEnd = 16
let numSteps = 16
let steps = []
let kickSteps = []
let notes = []
let noteLength = ["8n"]
let step = {}

//get the notes from slider and translate to midi note then push to notes array
const getNotes = () => {
    notes = []
    sequencerSliders.forEach(slider => {
        // let note = Tone.Frequency(slider.value, 'midi').toNote()
        let note = +slider.value
        notes.push(note)
    })
}
getNotes()
console.log(notes)

//scales
const createScaleFrequencies = (keyFreq) => {
    let scale = []
    let i = 0
    while (i < 53) {
        note = keyFreq * 2 ** (1 / 12)
        // keyFreq = Tone.Frequency.ftom(keyFreq)
        scale.push(note)
        i++
    }
    return scale
}
// console.log(createScale(440))

const createMidiScale = (interval, offset, octaves) => {
    let i = 0
    for (let y = 0; y < octaves; y++) {
        interval = interval.concat(interval)
    }
    let scale = []

    while (i < 53) {
        if (i === 0) {
            scale.push(offset)
        }
        let note = scale[i] + interval[i]
        scale.push(note)
        i++
    }
    return scale
}


// let notes = [66,67,68,69,70,71,60,61,62,63,64,65,72,73,74,75]
let scale = createMidiScale(majorInterval, 60, 8)

  /* write a binary search function that takes two arrays of integers arguments. array A is sorted, array B is not sorted. find all the integers that from array B that match with values in array A. If the value in array B does not match, make it match the value in array A that is the closest */
//runs for each index of the notes array
function binarySearch(scale, note) {
    let min = 0;
    let max = scale.length - 1;
    let guess;
    while (min <= max) {
      guess = Math.floor((min + max) / 2);
      if (scale[guess] === note) {
        return guess;
      } else if (scale[guess] < note) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }
    }
    return -1;
  }


  function findClosest(array, target) {
    let min = 0;
    let max = array.length - 1;
    let guess;
    while (min <= max) {
      guess = Math.floor((min + max) / 2);
      if (array[guess] === target) {
        return guess;
      } else if (array[guess] < target) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }
    }
    return guess;
  }

  function findMatches(arrayA, arrayB) {
    let matches = [];

    for (let i = 0; i < arrayB.length; i++) {
      let index = binarySearch(arrayA, arrayB[i]);
      if (index === -1) {
        let closest = findClosest(arrayA, arrayB[i]);
        matches.push(arrayA[closest]);
      } else {
        matches.push(arrayA[index]);
      }
    }
    return matches;
  }

console.log(findMatches(scale, notes));











// console.log(notes)


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



// {
//     pitchDecay: 0.05,
//     octaves: 10,
//     envelope: {
//         attack: 0.001,
//         decay: 0.4,
//         sustain: 0.01,
//         release: 0.4
//     }
// }


const kick = new Tone.MembraneSynth().toDestination()

const kickSequence = new Tone.Sequence((time) => {
    let currentStep = Math.floor(kickSequence.progress * kickSequence.loopEnd)
    if (stepBtns[currentStep].matches('.activeStep')) {
        kick.triggerAttackRelease(notes[currentStep], noteLength[currentStep], time)
    }
}, findMatches(scale, notes)).start(0)


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
























