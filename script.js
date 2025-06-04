let midiAccess;
const noteMap = {
  38: "sounds/snare.wav",
  36: "sounds/kick.wav",
  49: "sounds/crash.wav"
};

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

function onMIDIMessage(message) {
  const [command, note, velocity] = message.data;
  if (command === 144 && velocity > 0) {
    const noteName = {
      38: "SNARE", 36: "KICK", 49: "CRASH"
    }[note] || `NOTE ${note}`;
    document.getElementById("note").textContent = noteName;

    if (noteMap[note]) {
      playSound(noteMap[note]);
    }
  }
}

async function connectBLE() {
  try {
    const midi = await navigator.requestMIDIAccess({ sysex: false });
    midiAccess = midi;
    for (let input of midiAccess.inputs.values()) {
      input.onmidimessage = onMIDIMessage;
    }
    alert("🎉 Połączono z ESP!");
  } catch (err) {
    alert("Błąd podczas łączenia: " + err);
  }
}
