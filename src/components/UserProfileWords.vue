<template>
  <div>
    <v-card v-if="currentWord" outlined elevation="10">
      <v-container fluid>
        <v-layout row align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <original-word
              v-if="!showСheck"
              class="blue--text text--darken-4 pa-0 pb-2 pl-5"
              :word="currentWord"
              :showAudio="true"
            ></original-word>
            <v-card-text
              v-else
              class="headline red--text text--darken-4 py-1 pl-5 ml-5"
            >
              {{ currentWord.translateText }}
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider class="mx-5"></v-divider>
        <v-layout row align-center class="pa-0">
          <v-flex xs12 class="pa-0">
            <v-card-actions class="pa-0 pt-2">
              <v-card-text
                v-if="show"
                class="title red--text text--darken-4 py-0 pl-5 ml-5"
              >
                <em>{{ currentWord.translateText }}</em>
              </v-card-text>
              <v-card-text v-if="showСheck" class="py-0 pl-5 ml-5">
                <v-text-field
                  v-model="checkWord"
                  hide-details
                  class="pt-0"
                  label="Write in English"
                  type="text"
                ></v-text-field>
              </v-card-text>

              <v-spacer></v-spacer>
              <v-btn
                v-if="!show"
                v-show="!showСheck"
                class="mx-2"
                outlined
                color="red darken-4"
                @click="show = !show"
              >
                <v-icon>{{ show ? 'visibility_off' : 'visibility' }}</v-icon>
              </v-btn>
              <template>
                <v-btn
                  v-if="!showСheck"
                  class="mx-2"
                  outlined
                  color="blue darken-4"
                  @click="checking"
                >
                  <v-icon>check</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  class="mx-2"
                  outlined
                  color="blue darken-4"
                  @click="processWord(currentWord)"
                >
                  <v-icon>check</v-icon>
                </v-btn>
              </template>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card flat class="mt-5">
      <v-card-text v-if="words.length" class="blue-grey--text text--darken-2">
        <p class="headline text-center mb-0">
          Все слова на сегодня ( {{ words.length }} )
        </p>
      </v-card-text>
      <v-card-text v-else class="blue-grey--text text--darken-2">
        <p class="headline text-center">
          На сегодня нет слов для изучения. Добавьте новые из книг.
        </p>
      </v-card-text>

      <v-card-text color="blue-grey darken-2" class="px-0 pt-0">
        <v-container grid-list-lg class="px-0 pt-0">
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              lg3
              xl2
              v-for="(word, i) in words"
              :key="i"
              @click="selectWord(word)"
              class="pointer"
            >
              <v-card text outlined color="blue lighten-4" class="blue py-1">
                <original-word
                  class="blue-grey--text text--darken-4 py-0"
                  :word="word"
                  :size="'title'"
                  :align="'mx-auto'"
                ></original-word>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import OriginalWord from './OriginalWord';

export default {
  data() {
    return {
      show: false,
      showСheck: false,
      isDone: false,
      words: [],
      currentWord: '',
      checkWord: ''
    };
  },
  methods: {
    setWords() {
      this.words = [];
      let userWords = this.$store.getters.userData.words;
      for (let property in userWords) {
        if (userWords.hasOwnProperty(property)) {
          let word = userWords[property];

          let isAvailable =
            word.nextShowDate instanceof Date
              ? word.nextShowDate <= new Date()
              : word.nextShowDate.toDate() <= new Date();

          if (isAvailable) {
            this.words.push({
              originalText: word.originalText,
              translateText: word.translateText,
              key: word.originalText
            });
          }
        }
      }
      this.words.shuffle();
      this.currentWord = this.words.length > 0 ? this.words[0] : '';
    },
    checking() {
      this.showСheck = true;
      this.show = false;
    },
    processWord(word) {
      if (
        this.checkWord.toLowerCase() ===
        this.currentWord.originalText.toLowerCase()
      ) {
        this.$store.dispatch('PROCESS_USER_WORD', word.key);
      }
    },
    selectWord(word) {
      this.show = false;
      this.showСheck = false;
      this.currentWord = word;
    }
  },
  components: {
    OriginalWord
  },
  mounted() {
    Array.prototype.shuffle = function() {
      if (this.length == 1) {
        return this;
      }
      for (
        let j, x, i = this.length;
        i;
        j = Math.floor(Math.random() * i),
          x = this[--i],
          this[i] = this[j],
          this[j] = x
      );
      return this;
    };

    this.setWords();

    this.$bus.$on('userword-updated', () => {
      this.show = false;
      this.showСheck = false;
      this.checkWord = '';
      this.setWords();
    });
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
