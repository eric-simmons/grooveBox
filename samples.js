const player = new Tone.Player("https://tonejs.github.io/audio/berklee/femalevoices_aa2_A5.mp3").connect(recorder);
player.playbackRate = 1.00;

let audioLoop
const recorder = new Tone.Recorder()




recorder.start()
player.start()
//translate the time of sequen
setTimeout(async () =>{
    const recording = await recorder.stop()
    const url = URL.createObjectURL(recording)
    audioLoop = new Tone.Player(url).toDestination()
},4000)


audioLoop.start()
player.autostart = true;