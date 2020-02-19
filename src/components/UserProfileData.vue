<template>
  <v-card class="mx-auto">
    <v-card-title>
      <v-icon class="mr-5" color="blue darken-4">person</v-icon> {{ userName }}
    </v-card-title>
    <v-card-title>
      <v-icon class="mr-5" color="blue darken-4">email</v-icon> {{ userEmail }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="560">
        <template v-slot:activator="{ on }">
          <v-btn outlined color="red darken-4" v-on="on">
            <v-icon left>edit</v-icon>Изменить данные
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Изменить мои данные?</v-card-title>
          <v-form v-model="valid">
            <v-text-field
              class="px-5"
              label="E-mail"
              name="email"
              prepend-icon="alternate_email"
              type="email"
              required
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              class="px-5"
              label="Пароль"
              name="password"
              prepend-icon="lock"
              type="password"
              required
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>

            <v-app-bar class="mx-3" color="error" dark flat v-if="getError">
              <div id="alert-message">
                <p id="alert-text">{{ getError }}</p>
                <v-btn icon @click="closeErrorMessage">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-app-bar>

            <v-card-title class="title mx-4 red--text text--darken-4">
              Я хочу изменить
            </v-card-title>

            <v-card-actions class="mx-5">
              <v-radio-group v-model="changeType" row class="mt-0">
                <v-radio
                  label="Имя"
                  :value="'name'"
                  color="red darken-3"
                ></v-radio>
                <v-radio
                  label="E-mail"
                  :value="'email'"
                  color="red darken-3"
                ></v-radio>
                <v-radio
                  label="Пароль"
                  :value="'password'"
                  color="red darken-3"
                ></v-radio>
              </v-radio-group>
            </v-card-actions>

            <v-text-field
              class="px-5 pt-0"
              v-if="changeType == 'name'"
              label="Новое имя"
              name="newname"
              prepend-icon="person"
              type="text"
              required
              v-model="newname"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              class="px-5 pt-0"
              v-if="changeType == 'email'"
              label="Новый e-mail"
              name="newemail"
              prepend-icon="alternate_email"
              type="email"
              required
              v-model="newemail"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              class="px-5 pt-0"
              v-if="changeType == 'password'"
              label="Новый пароль"
              name="newpassword"
              prepend-icon="lock"
              type="password"
              required
              v-model="newpassword"
              :rules="passwordRules"
            ></v-text-field>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-4" text @click.prevent="dialog = false"
              >Отмена</v-btn
            >
            <v-btn
              color="blue darken-4"
              text
              @click.prevent="changeUserData"
              :disabled="getProcessing || !valid"
              >Изменить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,

      email: '',
      password: '',

      newname: '',
      newemail: '',
      newpassword: '',

      valid: false,
      nameRules: [v => !!v || 'Пожалуйста, введите Ваше имя'],
      emailRules: [
        v => !!v || 'Пожалуйста, введите e-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный e-mail'
      ],
      passwordRules: [
        v => !!v || 'Пожалуйста, введите пароль',
        v =>
          (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
      ],
      changeType: ''
    };
  },
  computed: {
    ...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError'])
  },
  methods: {
    changeHints() {
      console.log(!!this.hint);
    },
    closeErrorMessage() {
      this.$store.dispatch('CLEAR_ERROR');
    },
    changeUserData() {
      this.$store.dispatch('CHANGE_USER_PROFILE_DATA', {
        email: this.email,
        password: this.password,
        newname: this.newname,
        newemail: this.newemail,
        newpassword: this.newpassword,
        changeType: this.changeType
      });
    }
  },
  created() {
    this.$bus.$on('profile-changed', () => {
      this.dialog = false;
    });
  },
  beforeDestroy() {
    this.$bus.$off('profile-changed');
  }
};
</script>
