<template>
  <v-form>
    <v-container fluid px-0 grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            outlined
            hide-details
            prepend-inner-icon="sort_by_alpha"
            label="English word"
            type="text"
            required
            v-model.trim="originalWord"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            outlined
            hide-details
            prepend-inner-icon="text_fields"
            label="Перевод"
            type="text"
            required
            v-model.trim="translateWord"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="pt-0 pb-5">
          <v-card-actions>
            <v-btn
              block
              dark
              color="blue darken-4"
              :disabled="processing"
              @click.prevent="addToDictionary"
            >
              <v-icon left class="mr-4">extension</v-icon>
              Добавить слово для изучения
            </v-btn>
          </v-card-actions>
        </v-flex>
        <v-snackbar bottom multi-line light color="error" v-model="errorWord">
          <v-icon class="mr-2">warning</v-icon>
          {{ textErrorWord }}
        </v-snackbar>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      originalWord: '',
      translateWord: '',
      errorWord: false,
      textErrorWord: ''
    };
  },
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    addToDictionary() {
      if (this.originalWord !== '' && this.translateWord !== '') {
        let userWords = this.$store.getters.userData.words;
        let addedWord = userWords[this.originalWord];

        if (addedWord) {
          this.errorWord = true;
          this.textErrorWord = 'Вы уже добавили это слово для изучения';
        } else if (Object.keys(userWords).length > 100) {
          this.errorWord = true;
          this.textErrorWord =
            'Вы уже добавили слишком много слов для изучения';
        } else {
          this.$store.dispatch('ADD_USER_WORD', {
            originalText: this.originalWord,
            translateText: this.translateWord
          });
        }
      }
    }
  },
  created() {
    this.$bus.$on('add-word', () => {
      this.originalWord = '';
      this.translateWord = '';
    });
  },
  beforeDestroy() {
    this.$bus.$off('add-word');
  }
};
</script>
