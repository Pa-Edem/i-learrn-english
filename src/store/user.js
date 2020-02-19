import firebase from 'firebase';
import { EventBus } from '../helpers/eventBus';

export default {
  state: {
    user: {
      isAuth: false,
      uid: null,
      name: null,
      email: null
    },
    unSubscribeAuth: null
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuth = true;
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
    setUserName(state, payload) {
      state.user.name = payload;
    },
    setUserEmail(state, payload) {
      state.user.email = payload;
    },
    unsetUser(state) {
      state.user = {
        isAuth: false,
        uid: null
      };
    },
    setUnSubscribeAuth(state, payload) {
      state.unSubscribeAuth = payload;
    }
  },
  actions: {
    INIT_AUTH({ commit, dispatch, state }) {
      return new Promise(resolve => {
        if (state.unSubscribeAuth) {
          state.unSubscribeAuth();
        }

        let unSubscribe = firebase.auth().onAuthStateChanged(function(user) {
          dispatch('STATE_CHANGED', user);

          resolve(user);
        });

        commit('setUnSubscribeAuth', unSubscribe);
      });
    },
    SIGNUP({ commit }, payload) {
      commit('clearError');
      commit('setProcessing', true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: payload.name })
            .then(() => commit('setUserName', payload.name));

          commit('setProcessing', false);
        })
        .catch(function(error) {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    SIGNIN({ commit }, payload) {
      commit('clearError');
      commit('setProcessing', true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit('setProcessing', false);
        })
        .catch(function(error) {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    SIGNOUT({ commit }) {
      firebase.auth().signOut();
      commit('clearError');
    },
    STATE_CHANGED({ commit, dispatch }, payload) {
      if (payload) {
        commit('setUser', { uid: payload.uid, email: payload.email });
        commit('setUserName', payload.displayName);
        dispatch('LOAD_USER_DATA', payload.uid);
      } else {
        commit('unsetUser');
      }
    },
    CHANGE_USER_PROFILE_DATA({ commit }, payload) {
      let user = firebase.auth().currentUser;
      let credential = firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password
      );

      commit('clearError');
      commit('setProcessing', true);

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          let currentUser = firebase.auth().currentUser;
          if (payload.changeType === 'name') {
            currentUser
              .updateProfile({ displayName: payload.newname })
              .then(() => {
                commit('setUserName', payload.newname);
                commit('setProcessing', false);
                EventBus.notify('profile-changed');
              })
              .catch(error => {
                commit('setProcessing', false);
                commit('setError', error.message);
              });
          }

          if (payload.changeType === 'email') {
            currentUser
              .updateEmail(payload.newemail)
              .then(() => {
                commit('setUserEmail', payload.newemail);
                commit('setProcessing', false);
                EventBus.notify('profile-changed');
              })
              .catch(error => {
                commit('setProcessing', false);
                commit('setError', error.message);
              });
          }

          if (payload.changeType === 'password') {
            currentUser
              .updatePassword(payload.newpassword)
              .then(() => {
                commit('setProcessing', false);
                EventBus.notify('profile-changed');
              })
              .catch(error => {
                commit('setProcessing', false);
                commit('setError', error.message);
              });
          }
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    }
  },
  getters: {
    isUserAuth: state => state.user.isAuth,
    userId: state => state.user.uid,
    userName: state => state.user.name,
    userEmail: state => state.user.email
  }
};
