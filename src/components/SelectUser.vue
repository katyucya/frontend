<template>
  <div>
    <v-card class="pa-2">
      <h4 class="mb-4">Vizualizar timeline como:</h4>
      <v-row class="mx-3">
        <v-col
          @click="selectUser(user)"
          v-for="(user, index) in users"
          :key="index"
          :cols="maxCols"
          :md="numOfCols"
          :class="activeUser === user ? 'active' : ''"
        >
          <user-avatar
            :user="user"
            @click="selectUser(user)"
            class="clickable"
          ></user-avatar>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['users', 'activeUser'],
  data() {
    return {
      maxCols: 12,
    };
  },
  computed: {
    numOfCols() {
      if (this.users.length > 0) {
        // 12 = material base num of cols
        return this.maxCols / this.users.length;
      }

      return 12;
    },
  },
  methods: {
    selectUser(user) {
      this.$emit('change-user', user);
    },
  },
};
</script>

<style></style>
