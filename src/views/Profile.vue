<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs
          v-model="tabMode"
          fixed-tabs
          dark
          background-color="blue darken-4"
          slider-color="red--text text--darken-4"
          slider-size="5"
        >
          <v-tab :href="`#data`" ripple>
            <v-icon class="mr-2">how_to_reg</v-icon>
            Мои данные
          </v-tab>
          <v-tab :href="`#books`" ripple>
            <v-icon class="mr-2">library_books</v-icon>
            Мои книги
          </v-tab>
          <v-tab :href="`#words`" ripple>
            <v-icon class="mr-2">g_translate</v-icon>
            Мои слова
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabMode">
          <v-tab-item :value="'data'" class="pa-3">
            <user-profile-data></user-profile-data>
          </v-tab-item>
          <v-tab-item :value="'books'" class="pa-3"> </v-tab-item>
          <v-tab-item :value="'words'" class="pa-3">
            <user-profile-words></user-profile-words>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserProfileData from '../components/UserProfileData';
import UserProfileWords from '../components/UserProfileWords';

export default {
  data() {
    return {
      tabMode: 'data'
    };
  },
  components: {
    UserProfileData,
    UserProfileWords
  }
};
</script>

<style scoped></style>
