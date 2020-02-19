<template>
  <v-card color="blue lighten-5">
    <v-container fluid>
      <v-layout
        row
        align-center
        justify-center
        fill-height
        class="hidden-sm-and-down"
      >
        <v-flex xs5 pl-2>
          <v-img :src="book.imageUrl" height="180"></v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title class="title blue--text text--darken-4 pt-1">
            {{ book.title }}</v-card-title
          >
          <v-card-text class="subtitle-1 blue--text text--darken-4">
            {{ book.description }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="blue--text text--darken-4 pb-2">
            Уровень: <strong>{{ getBookLevel(book.level) }}</strong
            >,
            <span class="ml-5">Количество частей: {{ book.parts.length }}</span>
          </v-card-text>
          <v-card-actions class="pb-0">
            <v-btn
              outlined
              block
              color="blue darken-4"
              v-if="canLoadBook(book.id)"
              @click="loadBook(book.id)"
            >
              <v-icon class="mr-3">cloud_download</v-icon>
              Добавить в библиотеку
            </v-btn>
            <v-btn
              outlined
              block
              class="red--text text--darken-4"
              v-if="getUserDataBook(book.id)"
            >
              <v-icon class="mr-3">library_books</v-icon>
              Читаю с {{ getBookAddedDate(book.id) | formatdate }}
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>

      <div class="hidden-md-and-up">
        <v-layout row>
          <v-flex xs4 pl-1>
            <v-img :src="book.imageUrl" height="150"></v-img>
          </v-flex>
          <v-flex xs8>
            <v-card-title class="title blue--text text--darken-4 pt-1">
              {{ book.title }}
            </v-card-title>
            <v-card-text
              class="subtitle-1 text-center blue--text text--darken-4 pt-0 pb-1"
            >
              {{ book.description }}
            </v-card-text>
            <v-card-text class="blue--text text--darken-4 pb-1 pt-1">
              Уровень: <strong>{{ getBookLevel(book.level) }}</strong
              >,
              <span class="ml-5">Частей: {{ book.parts.length }}</span>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions class="pb-0">
              <v-btn
                outlined
                block
                color="blue darken-4"
                v-if="canLoadBook(book.id)"
                @click="loadBook(book.id)"
              >
                <v-icon class="mr-3">cloud_download</v-icon>
                Добавить в библиотеку
              </v-btn>
              <v-btn
                outlined
                block
                class="red--text text--darken-4"
                v-if="getUserDataBook(book.id)"
              >
                <v-icon class="mr-3">library_books</v-icon>
                Читаю с {{ getBookAddedDate(book.id) | formatdate }}
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import * as bookHelper from '../helpers/book.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isUserAuth', 'userData', 'getProcessing'])
  },
  methods: {
    getBookLevel: bookHelper.getBookLevel,
    canLoadBook(bookId) {
      let book = this.getUserDataBook(bookId);
      return this.isUserAuth && !this.getProcessing && !book;
    },
    getUserDataBook(bookId) {
      return this.userData.books[bookId];
    },
    loadBook(bookId) {
      this.$store.dispatch('ADD_USER_BOOK', bookId);
    },
    getBookAddedDate(bookId) {
      let book = this.getUserDataBook(bookId);
      return book.addedDate;
    }
  }
};
</script>
