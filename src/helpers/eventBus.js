import Vue from 'vue';

export const EventBus = new Vue({
  methods: {
    notify(eName, eParams) {
      this.$emit(eName, eParams);
    }
  }
});

export function createBus() {
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get() {
        return EventBus;
      }
    }
  });
}
