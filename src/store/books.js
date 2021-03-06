import Vue from 'vue';

export default {
  state: {
    books: []
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    }
  },
  actions: {
    LOAD_BOOKS({ commit }) {
      Vue.$db
        .collection('books')
        .get()
        .then(querySnapshot => {
          let books = [];
          querySnapshot.forEach(s => {
            const data = s.data();
            let book = {
              id: s.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              level: data.level.slice()
            };
            let parts = [];
            if (data.parts) {
              data.parts.forEach(p => {
                let part = {
                  id: p.id,
                  title: p.title,
                  youtube_id: p.youtube_id,
                  imgUrl: p.imgUrl
                };

                parts.push(part);
              });
            }
            book.parts = parts;

            books.push(book);
          });
          commit('setBooks', books);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    getBooks: state => state.books
  }
};
