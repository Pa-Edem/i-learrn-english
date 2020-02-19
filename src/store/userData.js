import Vue from 'vue';
import firebase from 'firebase';
import { EventBus } from '../helpers/eventBus';

let defaultUserData = {
  books: {},
  words: {}
};

export default {
  state: {
    userData: defaultUserData
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
    addUserBook(state, payload) {
      Vue.set(state.userData.books, payload.bookId, payload.book);
    },
    addUserBookPart(state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts, payload.partId, {
        addedDate: payload.timestamp
      });
    },
    updateUserBookPartLastOpenedDate(state, payload) {
      Vue.set(
        state.userData.books[payload.bookId].parts[payload.partId],
        'lastOpenedDate',
        payload.timestamp
      );
    },
    updateUserBookPartFinishInfo(state, payload) {
      Vue.set(
        state.userData.books[payload.bookId].parts[payload.partId],
        'finishedDate',
        payload.timestamp
      );
      Vue.set(
        state.userData.books[payload.bookId].parts[payload.partId],
        'rating',
        payload.rating
      );
    },
    addUserWord(state, payload) {
      Vue.set(state.userData.words, payload.wordId, payload.word);
    },
    removeUserWord(state, payload) {
      Vue.delete(state.userData.words, payload);
      EventBus.notify('userword-updated', payload);
    },
    updateUserWord(state, payload) {
      Vue.set(
        state.userData.words[payload.wordId],
        'bucket',
        payload.word.bucket
      );
      Vue.set(
        state.userData.words[payload.wordId],
        'nextShowDate',
        payload.word.nextShowDate
      );
      EventBus.notify('userword-updated', payload.wordId);
    }
  },
  actions: {
    LOAD_USER_DATA({ commit }, payload) {
      commit('clearError');
      commit('setProcessing', true);

      let userDataRef = Vue.$db.collection('userData').doc(payload);
      userDataRef
        .get()
        .then(data => {
          let userData = data.exists ? data.data() : defaultUserData;

          if (!userData.books) {
            userData.books = {};
          }

          if (!userData.words) {
            userData.words = {};
          }

          commit('setUserData', userData);
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    ADD_USER_BOOK({ commit, getters }, payload) {
      commit('clearError');
      commit('setProcessing', true);

      let userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      let book = {
        addedDate: new Date(),
        parts: {}
      };

      userDataRef
        .set(
          {
            books: {
              [payload]: book
            }
          },
          { merge: true }
        )
        .then(() => {
          commit('addUserBook', {
            bookId: payload,
            book: book
          });
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    UPDATE_USER_BOOK_PART_STATS({ commit, getters }, payload) {
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      let timestamp = new Date();

      // когда первый раз открыли эту часть
      if (!getters.userData.books[payload.bookId].parts[payload.partId]) {
        userDataRef
          .update({
            [`books.${payload.bookId}.parts.${payload.partId}.addedDate`]: timestamp
          })
          .then(() =>
            commit('addUserBookPart', {
              bookId: payload.bookId,
              partId: payload.partId,
              timestamp: timestamp
            })
          );
      }
      // когда не первый
      userDataRef
        .update({
          [`books.${payload.bookId}.parts.${payload.partId}.lastOpenedDate`]: timestamp
        })
        .then(() =>
          commit('updateUserBookPartLastOpenedDate', {
            bookId: payload.bookId,
            partId: payload.partId,
            timestamp: timestamp
          })
        );
    },
    FINISH_USER_BOOK_PART({ commit, getters }, payload) {
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      let timestamp = new Date();

      userDataRef
        .update({
          [`books.${payload.bookId}.parts.${payload.partId}.finishedDate`]: timestamp,
          [`books.${payload.bookId}.parts.${payload.partId}.rating`]: payload.rating
        })
        .then(() =>
          commit('updateUserBookPartFinishInfo', {
            bookId: payload.bookId,
            partId: payload.partId,
            timestamp: timestamp,
            rating: payload.rating
          })
        );
    },
    ADD_USER_WORD({ commit, getters }, payload) {
      commit('clearError');
      commit('setProcessing', true);

      let userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      let word = {
        originalText: payload.originalText,
        translateText: payload.translateText,
        addedDate: new Date(),
        bucket: 1,
        nextShowDate: new Date()
      };

      userDataRef
        .set(
          {
            words: {
              [payload.originalText]: word
            }
          },
          { merge: true }
        )
        .then(() => {
          commit('addUserWord', {
            wordId: payload.originalText,
            word: word
          });
          commit('setProcessing', false);
          EventBus.notify('add-word');
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    PROCESS_USER_WORD({ commit, getters }, payload) {
      let word = getters.userData.words[payload];
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId);

      if (word.bucket == 5) {
        userDataRef
          .update({
            [`words.${payload}`]: firebase.firestore.FieldValue.delete()
          })
          .then(() => commit('removeUserWord', payload));
      } else {
        let nextDate = new Date();
        nextDate = new Date(
          nextDate.setDate(new Date().getDate() + word.bucket)
        );
        word.nextShowDate = nextDate;
        word.bucket++;

        userDataRef
          .set(
            {
              words: {
                [payload]: word
              }
            },
            { merge: true }
          )
          .then(() =>
            commit('updateUserWord', { word: word, wordId: payload })
          );
      }
    }
  },
  getters: {
    userData: state => state.userData
  }
};
