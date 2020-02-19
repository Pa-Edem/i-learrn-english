<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar color="blue darken-4" dark flat>
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-app-bar color="error" dark flat v-if="error">
              <div id="alert-message">
                <p id="alert-text">{{ error }}</p>
                <v-btn icon @click="closeErrorMessage">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-app-bar>
            <v-form v-model="valid">
              <v-text-field
                label="E-mail"
                name="email"
                prepend-icon="alternate_email"
                type="email"
                required
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                label="Пароль"
                name="password"
                prepend-icon="lock"
                type="password"
                required
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-4"
              @click.prevent="signin"
              :disabled="processing || !valid"
            >
              <span class="white--text">Войти</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'Пожалуйста, введите e-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный e-mail'
      ],
      passwordRules: [
        v => !!v || 'Пожалуйста, введите пароль',
        v =>
          (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
      ]
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
    isUserAuth() {
      return this.$store.getters.isUserAuth;
    }
  },
  watch: {
    isUserAuth(val) {
      if (val) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    signin() {
      this.$store.dispatch('SIGNIN', {
        email: this.email,
        password: this.password
      });
    },
    closeErrorMessage() {
      this.$store.dispatch('CLEAR_ERROR');
    }
  }
};
</script>
