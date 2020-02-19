<template>
  <v-card color="blue lighten-4" class="pa-3">
    <div class="title text-right blue--text text--darken-4">
      {{ part.bookTitle }}
    </div>
    <div class="headline red--text text--darken-4">
      {{ part.partTitle }}
    </div>
    <v-divider class="white my-3"></v-divider>
    <div class="text-center">
      <youtube
        :video-id="part.youtube_id"
        :player-width="playerWidth"
        :player-height="playerHeight"
      ></youtube>
    </div>
    <v-divider class="white my-3"></v-divider>
    <div>
      <v-slider
        v-model="fontSize"
        :label="`Размер шрифта (${fontSize})`"
        min="10"
        max="32"
        step="1"
        tick-size="1"
        color="red darken-4"
        class="red--text text--darken-4"
      ></v-slider>

      <v-tabs
        v-model="tabMode"
        fixed-tabs
        dark
        background-color="blue darken-4"
        slider-color="white--text"
        slider-size="4"
      >
        <v-tab :href="`#english`" ripple>
          <v-icon class="mr-2">help_outline</v-icon>
          Текст с подсказками
        </v-tab>
        <v-tab :href="`#sidebyside`" ripple>
          <v-icon class="mr-2 icon-rotate">vertical_align_center</v-icon>
          Параллельно
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabMode">
        <v-tab-item :value="'english'" class="pa-3">
          <div v-for="(contItem, i) in part.content" :key="`cont${i}`">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span
              v-for="(sentence, y) in contItem.sentences"
              :key="`cont${i}sent${y}`"
              :style="textStyle"
            >
              <span>{{ sentence.origText }}</span>
              <v-icon
                :style="`${textStyle + '4px'}`"
                class="red--text text--lighten-2"
                @click.prevent="toggleVisible(i, y)"
                >{{ getVisibleFlag(i, y).icon }}</v-icon
              >
              <span
                class="blue--text text--darken-4"
                v-if="getVisibleFlag(i, y).value"
                ><em>{{ sentence.transText }}</em></span
              >
            </span>
          </div>
        </v-tab-item>
        <v-tab-item :value="'sidebyside'" class="pa-3">
          <v-container>
            <v-layout
              row
              wrap
              v-for="(contItem, i) in part.content"
              :key="`cont${i}_side`"
            >
              <v-flex xs6 class="pr-4 brd-right">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, y) in contItem.sentences"
                  :key="`cont${i}sent${y}_orig`"
                  :style="textStyle"
                >
                  <span>{{ sentence.origText }}</span>
                </span>
              </v-flex>
              <v-flex xs6 class="pl-4 brd-left">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span
                  v-for="(sentence, y) in contItem.sentences"
                  :key="`cont${i}sent${y}_trans`"
                  :style="textStyle"
                >
                  <span>{{ sentence.transText }}</span>
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    part: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tabMode: 'english',
      visibleKeys: [],
      typeIconHelp: 'help_outline',
      fontSize: 18
    };
  },
  computed: {
    playerWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '240px';
        case 'sm':
          return '360px';
        case 'md':
          return '480px';
        case 'lg':
          return '600px';
        case 'xl':
          return '720px';
      }
    },
    playerHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '180px';
        case 'sm':
          return '270px';
        case 'md':
          return '360px';
        case 'lg':
          return '450px';
        case 'xl':
          return '540px';
      }
    },
    textStyle() {
      return {
        fontSize: `${this.fontSize}px`
      };
    }
  },
  methods: {
    getVisibleFlag(i, y) {
      return this.visibleKeys.find(f => f.key === `${i}${y}`);
    },
    toggleVisible(i, y) {
      let flag = this.getVisibleFlag(i, y);
      flag.value = !flag.value;
      flag.icon = !flag.value ? 'help_outline' : 'help';
    }
  },
  created() {
    for (let i = 0; i < this.part.content.length; i++) {
      for (let y = 0; y < this.part.content[i].sentences.length; y++) {
        this.visibleKeys.push({
          key: `${i}${y}`,
          value: false,
          icon: 'help_outline'
        });
      }
    }
  }
};
</script>

<style scoped>
.icon-rotate {
  transform: rotate(90deg);
}
.brd-left {
  border-left: 1px solid #bbdefb;
}
.brd-right {
  border-right: 1px solid #bbdefb;
}
</style>
