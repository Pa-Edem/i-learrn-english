<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-container fluid>
          <v-layout row>
            <v-flex xs7 md8>
              <v-text-field
                label="Искать в названии или описании"
                v-model="searchTerm"
              ></v-text-field>
            </v-flex>
            <v-flex xs5 md4>
              <v-select
                label="Уровень"
                :items="levels"
                multiple
                v-model="level"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex
        xs12
        sm10
        md8
        offset-sm1
        offset-md2
        v-for="book in filteredBooks"
        :key="book.id"
      >
        <book :book="book"></book>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Book from './BooksListItem.vue';
export default {
  components: {
    Book
  },
  data() {
    return {
      searchTerm: null,
      level: [],
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    };
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
    filteredBooks() {
      let books = this.books;
      if (this.searchTerm) {
        books = books.filter(
          b =>
            b.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            b.description
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) >= 0
        );
      }
      if (this.level.length) {
        books = books.filter(
          b => this.level.filter(val => b.level.indexOf(val) !== -1).length > 0
        );
      }
      return books;
    }
  }
};
</script>
