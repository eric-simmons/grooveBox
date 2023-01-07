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



let majorInterval = [2, 2, 1, 2, 2, 2, 1]
let minorInterval = [2, 1, 2, 2, 1, 2, 2]

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


let notes = [60,61,62,63,64,65,66,67,68,69,70,71,72]
let scale = createMidiScale(majorInterval, 60, 8)

const quantize = (notes, scale) => {


}
  /* write a binary search function that takes two arrays of integers arguments. array A is sorted, array B is not sorted. find all the integers that from array B that match with values in array A. If the value in array B does not match, make it match the value in array A that is the closest */
//runs for each index of the notes array
function binarySearch(scale, note) {
    let min = 0;
    let max = scale.length - 1;
    let guess;
    while (min <= max) {
        //set guess to middle of scale
      guess = Math.floor((min + max) / 2);
      //if found in middle return guess
      //if the guess was less than target set new minimum
      //if guess greater than target set new maximum
      if (scale[guess] === note) {
        return guess;
      } else if (scale[guess] < note) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }
    }
    //if not found return -1
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



// console.log(test)

// let CMajor = []
// const Major = [0, 2, 4, 5, 7, 9, 11];
// [12, 14, 16, 17, 19, 21, 23]
// let startingNote = 60
// for (let i = 0; i < Major.length; i++) {
//     // CMajor.push(Tone.Frequency(Major[i] + startingNote, 'midi').toNote())
//     CMajor.push(Major[i] + startingNote)
// }
// console.log(CMajor)




// const quantizeArray = (array, scale) => {
//     array.forEach(note => {
//         //check each note if it exists in scale array

//         //if not add value until it matches

//     })



//     return quantizedArray
