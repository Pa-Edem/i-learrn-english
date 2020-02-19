<template>
  <v-container fluid px-0>
    <v-card-title class="red--text text--darken-4 display-1 pt-2">
      Слова для изучения
    </v-card-title>
    <v-data-iterator :items="words" :hide-default-footer="true">
      <v-layout row wrap>
        <v-flex v-for="(item, i) in words" :key="`words${i}`" xs12 sm6 md4 lg3>
          <v-card class="my-2 mx-1 blue lighten-5">
            <v-layout row>
              <v-flex xs9>
                <v-card-title class="blue-grey--text text--darken-1 title py-0">
                  {{ item.origWord }}
                </v-card-title>
                <v-card-title class="blue-grey--text subtitle-1 py-0">
                  <em>{{ item.transWord }}</em>
                </v-card-title>
              </v-flex>
              <v-flex xs3 align-self-center>
                <v-btn small outlined fab color="blue darken-4">
                  <v-icon large>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddWord: false
    };
  }
};
</script>
