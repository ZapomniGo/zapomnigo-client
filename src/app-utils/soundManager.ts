class LazyAudio {
  private audio: HTMLAudioElement | null = null;
  private src: string;

  constructor(src: string) {
    this.src = src;
  }

  play() {
    if (!this.audio) {
      this.audio = new Audio(this.src);
    }
    this.audio.play();
  }
  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }
  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}

//Flip Close
const FC = new LazyAudio("../../Sounds/FC.wav");
//Flip Open
const FO = new LazyAudio("../../Sounds/FO.wav");
//Long Negative
const LN = new LazyAudio("../../Sounds/LN.wav");
//Long Positive
const LP = new LazyAudio("../../Sounds/LP.wav");
//Medium Negative
const MN = new LazyAudio("../../Sounds/MN.wav");
//Medium Positive
const MP = new LazyAudio("../../Sounds/MP.wav");
//Short Negative
const SN = new LazyAudio("../../Sounds/SN.wav");
//Short Positive
const SP = new LazyAudio("../../Sounds/SP.wav");

export { FC, FO, LN, LP, MN, MP, SN, SP };
