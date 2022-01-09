<template>
  <section class="search-tasks-wrapper" :class="{ 'open-input': isOpenInput }" v-click-outside="closeInput">
    <div class="search-icon-wrapper" @click="toggleInput">
      <ion-icon name="search-outline"></ion-icon>
    </div>
    <span v-if="!isOpenInput" @click="toggleInput"> Search</span>
    <input v-else ref="input" class="search-input" type="search" v-model="filterBy" placeholder="Search" @input="filter" />
  </section>
</template>

<script>
export default {
  name: 'board-header-filter-search',
  data() {
    return {
      isOpenInput: false,
      filterBy: '',
    };
  },
  methods: {
    toggleInput() {
      this.isOpenInput = !this.isOpenInput;
      if (this.isOpenInput) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
    closeInput() {
      this.isOpenInput = false;
    },
    filter() {
      this.$emit('filterBy', this.filterBy);
    },
  },
};
</script>

<style></style>
