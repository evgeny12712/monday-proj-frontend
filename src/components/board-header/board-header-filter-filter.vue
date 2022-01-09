<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="Filter by anything"
    placement="top"
  >
    <div
      class="filter-filter-wrapper flex"
      @click="isDropdownOpen = true"
      v-click-outside="closeDropDown"
    >
      <div class="filter-icon-wrapper">
        <ion-icon name="funnel-outline"></ion-icon>
      </div>
      <span class="filter-span"> Filter</span>
      <!-- <span class="btn filter-span" @click="filter"> Filter</span> -->
      <div class="filter-dropdown-btn">
        <ion-icon name="chevron-down-outline" />
      </div>
      <div v-if="isDropdownOpen" class="filter-dropdown">
        <div class="filter-options-wrapper flex">
          <!-- <div class="column-option">
            <div class="filter-column-title">Group</div>
            <ul class="filter-items-container flex"></ul>
          </div>
          <div class="column-option">
            <div class="filter-column-title">Person</div>
            <ul class="filter-items-container flex">
              <li v-for="member in members" :key="member._d">
                <div class="filter-item">{{ member.username }}</div>
              </li>
            </ul>
          </div> -->
          <div class="column-option">
            <ul class="filter-items-container flex">
              <div class="filter-column-title">Status</div>
              <li v-for="status in boardStatuses" :key="status.id">
                <div
                  class="filter-item"
                  @click="filterBy(status.display)"
                  :class="{ 'chosen-filter': isChosen(status.display) }"
                >
                  <div
                    class="color-filter"
                    :style="{ backgroundColor: status.style.backgroundColor }"
                  ></div>
                  {{ status.name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'board-header-filter-filter',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chosenStatuses: [],
      isDropdownOpen: false,
      members: this.$store.getters.users,
    };
  },
  created() {},
  methods: {
    filterBy(display) {
      if (this.chosenStatuses.includes(display)) {
        const idx = this.chosenStatuses.findIndex(
          (status) => status === display
        );
        this.chosenStatuses.splice(idx, 1);
      } else {
        this.chosenStatuses.push(display);
      }
      this.$emit('filterBy', this.chosenStatuses);
    },
    isChosen(display) {
      return this.chosenStatuses.includes(display);
    },
    closeDropDown() {
      this.isDropdownOpen = false;
    },
  },
  computed: {
    boardStatuses() {
      return this.board.cols[0].data.opts;
    },
  },
};
</script>

<style></style>
