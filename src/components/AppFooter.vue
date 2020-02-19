<template>
  <div>
    <v-flex indigo darken-4 py-4 text-center white--text xs12>
      &copy; {{ new Date().getFullYear() }} - I learn English
    </v-flex>
  </div>
</template>

<style>
#alert-message {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#alert-text {
  min-height: 40px;
  line-height: 1.125rem;
  font-size: 1rem;
  margin: 0;
}
</style>
