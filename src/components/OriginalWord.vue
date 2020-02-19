<template>
  <v-card-title :class="size">
    <span :class="align">{{ word.originalText }}</span>
    <v-icon
      right
      color="red darken-4"
      v-if="canPronounceWord"
      @click="pronounce(word)"
      >volume_up
    </v-icon>
  </v-card-title>
</template>

<script>
export default {
  props: {
    word: Object,
    align: String,
    size: String,
    showAudio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canPronounceWord: false,
      voice: null
    };
  },
  methods: {
    setSpeech() {
      return new Promise((resolve, reject) => {
        let synth = window.speechSynthesis;
        let id;

        id = setInterval(() => {
          if (synth.getVoices().length !== 0) {
            resolve(synth.getVoices());
            clearInterval(id);
          }
        }, 10);
      });
    },
    pronounce(word) {
      let msg = new SpeechSynthesisUtterance();
      msg.voice = this.voice;
      msg.rate = 1;
      msg.pitch = 1;
      msg.volume = 1;
      msg.text = this.word.originalText;

      speechSynthesis.speak(msg);
    }
  },
  created() {
    if (this.showAudio) {
      if ('speechSynthesis' in window) {
        let s = this.setSpeech();
        s.then(voices => {
          if (voices.length) {
            this.canPronounceWord = true;
            this.voice = voices[7];
          }
        });
      }
    }
  }
};
</script>
