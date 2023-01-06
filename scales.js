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

const createScaleMidi = (interval, offset) => {
    let i = 0
    for (let y = 0; y < 8; y++) {
        interval = interval.concat(interval)
    }
    let scale = []

    while (i < 53) {
        if (i === 0) {
            scale.push(offset)
        }
        note = scale[i] + interval[i]
        scale.push(note)
        i++
    }
    return scale
}

notes = [1, 2, 5, 7, 8, 9, 11]
scale = [0, 2, 4, 6, 7, 10, 11]

const quantize = (notes, scale) => {


}
console.log(createScaleMidi(majorInterval, 60))

function closestInts(A, B) {
    function binarySearch(x) {
        let low = 0;
        let high = A.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (A[mid] < x) {
                low = mid + 1;
            } else if (A[mid] > x) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return low;
    }

    const closest = [];
    for (let x of B) {
        let idx = binarySearch(x);
        if (idx === 0) {
            closest.push(A[0]);
        } else if (idx === A.length






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
// }
