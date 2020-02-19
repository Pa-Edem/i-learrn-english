<template>
  <div app>
    <v-content>
      <section>
        <v-parallax src="../assets/uk.jpg" height="600">
          <v-layout column align-center justify-center class="white--text">
            <h1 class="white--text mb-2 display-1 text-center">
              Я Учу Английский Язык
            </h1>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="mt-8 mb-0" align-center>
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="headline red--text text--darken-4">
                Учи английский язык с удовольствием!
              </h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--darken-4"
                        >library_books</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Читай или Слушай</div>
                    </v-card-title>
                    <v-card-text>
                      Подбирайте адаптированные книги на английском для своего
                      уровня. Выбирайте произведения по силам: начинайте с
                      коротких рассказов. Постарайтесь найти интересные именно
                      вам книги.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--darken-4"
                        >g_translate</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Учи слова</div>
                    </v-card-title>
                    <v-card-text>
                      Учи новые слова и выражения. Каждый текст содержит
                      интересные и важные слова, которые Вы можете добавить в
                      свой личный список для изучения. Учите только то, что Вам
                      действительно нужно.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--darken-4"
                        >phonelink</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Учись где хочешь</div>
                    </v-card-title>
                    <v-card-text>
                      Этот сайт оптимизирован для работы на любом устройстве.
                      Учись со своего стационарного компьютера, планшета или
                      мобильного телефона. Все что нужно - это доступ в интернет
                      и Ваше желание.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-container grid-list-xl class="mt-0">
          <v-layout row wrap justify-center class="mb-5 mt-0">
            <v-flex xs12 sm8 class="mt-0">
              <v-card class="transparent mt-0 indigo lighten-4">
                <v-card-title class="layout justify-center">
                  <h2 class="headline red--text text--darken-4 mb-5">
                    Случайные книги
                  </h2>
                </v-card-title>
                <v-card-text class="layout justify-center mx-auto">
                  <v-carousel
                    xs12
                    cycle
                    hide-delimiter-background
                    show-arrows-on-hover
                  >
                    <v-carousel-item
                      v-for="(book, i) in books"
                      :key="i"
                      :src="book.imageUrl"
                    >
                      <div class="book-title" @click="goToBook(book.id)">
                        {{ book.title }}
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </div>
</template>

<script>
export default {
  computed: {
    books() {
      let books = this.$store.getters.getBooks;
      if (!books) {
        return [];
      }

      const shuffled = books.sort(() => 0.5 - Math.random());
      let result = [];
      if (shuffled.length < 5) {
        result = shuffled;
      } else {
        result = shuffled.slice(0, 5);
      }

      return result;
    }
  },
  methods: {
    goToBook(bookId) {}
  }
};
</script>

<style scoped>
.book-title {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.65);
  font-size: 2rem;
  padding: 15px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.book-title:hover {
  background-color: rgba(0, 0, 0, 0.85);
}
</style>
