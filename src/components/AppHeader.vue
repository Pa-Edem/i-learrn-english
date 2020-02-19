<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item-group color="blue darken-4">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="`drawerItem${i}`"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark color="indigo darken-4">
      <v-btn
        fab
        text
        @click.stop="drawer = !drawer"
        class="ma-2 hidden-md-and-up"
      >
        <v-icon>list</v-icon>
      </v-btn>
      <router-link tag="span" to="/" class="pointer">
        <v-toolbar-title>I learn English</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          v-for="(item, i) in menuItems"
          :key="`menuItem${i}`"
          :to="item.route"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text @click.prevent="isLogout = true" v-if="isUserAuth">
          <v-icon left>exit_to_app</v-icon>Выйти
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-dialog width="400" v-model="isLogout">
      <v-card>
        <v-card-title class="headline">
          На сегодня хватит английского?
        </v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-4" text @click="isLogout = false"
            >Еще нет</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="blue darken-4" text @click="signout">До завтра</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      isLogout: false
    };
  },
  computed: {
    isUserAuth() {
      return this.$store.getters.isUserAuth;
    },
    menuLogin() {
      return [
        {
          title: 'Читать',
          icon: 'visibility',
          route: '/books'
        },
        {
          title: 'Кабинет',
          icon: 'account_circle',
          route: '/profile'
        }
      ];
    },
    menuLogout() {
      return [
        {
          title: 'Читать',
          icon: 'visibility',
          route: '/books'
        },
        {
          title: 'Войти',
          icon: 'input',
          route: '/signin'
        },
        {
          title: 'Регистрация',
          icon: 'lock_open',
          route: '/signup'
        }
      ];
    },
    menuItems() {
      return this.isUserAuth ? this.menuLogin : this.menuLogout;
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGNOUT');
      this.$router.push({ name: 'home' });
      this.isLogout = false;
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
