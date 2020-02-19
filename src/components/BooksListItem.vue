<template>
  <v-card color="blue lighten-5">
    <v-container fluid>
      <v-layout row align-center class="hidden-sm-and-down">
        <v-flex xs5 md4 pl-2>
          <v-img :src="book.imageUrl" height="150"></v-img>
        </v-flex>
        <v-flex xs7 md8>
          <v-card-title class="title blue--text text--darken-4 pt-1">
            {{ book.title }}</v-card-title
          >
          <v-card-text class="blue--text text--darken-4">
            {{ book.description }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="blue--text text--darken-4 pb-1">
            Уровень: <strong>{{ getBookLevel(book.level) }}</strong
            >,
            <span class="ml-5">Количество частей: {{ book.parts.length }}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              color="blue darken-4"
              :to="{ name: 'book', params: { id: book.id } }"
            >
              <v-icon class="mr-3">visibility</v-icon>
              Открыть
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>

      <div class="hidden-md-and-up">
        <v-layout row align-center>
          <v-flex xs4 md3 pl-1>
            <v-img :src="book.imageUrl" height="150"></v-img>
          </v-flex>
          <v-flex xs8 md9 class="pb-0">
            <v-card-title class="title blue--text text--darken-4 pt-1">
              {{ book.title }}
            </v-card-title>
            <v-card-text
              class="text-center blue--text text--darken-4 pt-0 pb-1"
            >
              {{ book.description }}
            </v-card-text>
            <v-card-actions class="pb-0">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="blue darken-4"
                :to="{ name: 'book', params: { id: book.id } }"
              >
                <v-icon class="mr-3">visibility</v-icon>
                Открыть
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-divider></v-divider>
            <v-card-text class="blue--text text--darken-4 pb-1 pt-1">
              Уровень: <strong>{{ getBookLevel(book.level) }}</strong
              >,
              <span class="ml-5">Частей: {{ book.parts.length }}</span>
            </v-card-text>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import * as bookHelper from '../helpers/book.js';
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    getBookLevel: bookHelper.getBookLevel
  }
};
</script>
