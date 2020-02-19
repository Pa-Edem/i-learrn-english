<template>
  <v-card color="blue lighten-4">
    <v-container fluid>
      <v-layout row>
        <v-flex xs4 md3 lg2 pl-1 align-self-center>
          <v-img :src="part.imgUrl" height="80"></v-img>
        </v-flex>
        <v-flex xs8 md9 lg10 align-self-center>
          <v-layout row>
            <v-flex xs12 md6 align-self-center>
              <v-card-title class="title red--text text--darken-4 pt-1">
                {{ part.title }}
              </v-card-title>
            </v-flex>
            <v-flex xs12 md6 align-self-center class="text-right pr-3">
              <v-card-actions>
                <v-spacer></v-spacer>
                <div
                  v-if="finishedDate"
                  class="subtitle-2 blue--text text--darken-4 mr-2"
                >
                  Прочитано {{ finishedDate | formatdate }}
                </div>
                <v-btn
                  outlined
                  color="blue darken-4"
                  :to="{
                    name: 'bookPart',
                    params: { bookId: bookId, partId: part.id }
                  }"
                  v-if="isUserBookLoaded"
                >
                  Читать
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    part: {
      type: Object,
      required: true
    },
    bookId: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['isUserAuth', 'userData', 'getProcessing']),
    isUserBookLoaded() {
      return (
        this.isUserAuth &&
        !this.getProcessing &&
        !!this.userData.books[this.bookId]
      );
    },
    finishedDate() {
      if (!this.isUserBookLoaded) {
        return false;
      }
      let book = this.userData.books[this.bookId];
      if (book && book.parts[this.part.id]) {
        return book.parts[this.part.id].finishedDate;
      }
    }
  }
};
</script>
