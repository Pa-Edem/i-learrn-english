<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
        <v-card flat class="mx-auto">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/opiskelen-suomea.appspot.com/o/common%2Fdone.png?alt=media&token=7dce0e51-1b54-4bda-967c-ccd55003cf84"
            max-width="240"
          ></v-img>
          <v-card-title>
            <div class="headline text-center red--text text--darken-4">
              Я закончил читать эту часть {{ finishedDate | formatdate }}.
            </div>
          </v-card-title>
          <v-card-actions>
            <span class="subtitle-1 blue--text text--darken-4 px-4"
              >Моя оценка</span
            >
            <v-rating
              v-model="savedRating"
              half-increments
              readonly
              color="amber"
            ></v-rating>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part="part"></book-part-content>
      </v-flex>

      <v-flex xs12 sm10 offset-sm1>
        <!-- <book-part-words :words="part.words"></book-part-words> -->
        <my-words></my-words>
      </v-flex>

      <v-flex row xs12 sm10 offset-sm1 class="text-xs-center">
        <v-spacer></v-spacer>
        <v-btn
          large
          v-if="!finishedDate"
          color="success"
          dark
          @click.stop="finishDialog = true"
        >
          <v-icon left class="mr-3">playlist_add_check</v-icon>Прочитано!
        </v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="finishDialog" persistent max-width="354">
          <v-card class="mx-auto">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/opiskelen-suomea.appspot.com/o/common%2Fdone.png?alt=media&token=7dce0e51-1b54-4bda-967c-ccd55003cf84"
            ></v-img>
            <v-card-title>
              <div class="headline text-center blue--text text--darken-4">
                Я закончил читать эту часть!
              </div>
            </v-card-title>
            <v-card-text class="subtitle-1">
              <span>Моя оценка</span>
              <div class="text-center">
                <v-rating v-model="rating" half-increments></v-rating>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn dark color="error" @click.native="finishDialog = false">
                <v-icon left>close</v-icon>cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                dark
                class="px-3"
                color="blue darken-4"
                @click.native="finishWork"
              >
                <v-icon left class="pl-1">check</v-icon>finish
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import BookPartContent from '../components/BookPartContent.vue';
// import BookPartWords from '../components/BookPartWords.vue';
import MyWords from '../components/MyWords.vue';

export default {
  props: {
    bookId: {
      type: String,
      required: true
    },
    partId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      part: null,
      finishDialog: false,
      rating: 0
    };
  },
  computed: {
    finishedDate() {
      let currentBook = this.$store.getters.userData.books[this.bookId];
      if (!currentBook.parts.hasOwnProperty(this.partId)) {
        return false;
      } else {
        let currentPart = currentBook.parts[this.partId];
        if (!currentPart.hasOwnProperty('finishedDate')) {
          return false;
        } else {
          return currentPart.finishedDate;
        }
      }
    },
    savedRating() {
      return this.$store.getters.userData.books[this.bookId].parts[this.partId]
        .rating;
    }
  },
  methods: {
    finishWork() {
      this.$store.dispatch('FINISH_USER_BOOK_PART', {
        bookId: this.bookId,
        partId: this.partId,
        rating: this.rating
      });
      this.finishDialog = false;
    }
  },
  created() {
    Vue.$db
      .collection('bookParts')
      .where('bookId', '==', this.bookId)
      .where('bookPartId', '==', this.partId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(s => {
          this.part = s.data();
        });
      })
      .then(() => {
        this.$store.dispatch('UPDATE_USER_BOOK_PART_STATS', {
          bookId: this.bookId,
          partId: this.partId
        });
      })
      .catch(error => console.log(error));
  },
  components: {
    BookPartContent,
    // BookPartWords,
    MyWords
  }
};
</script>
