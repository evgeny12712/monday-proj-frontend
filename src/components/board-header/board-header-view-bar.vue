<template>
  <section class="board-header-view-bar flex-def">
    <board-header-add-task @addTask="addTask" @addGroup="addGroup" />
    <section class="filter-tasks-wrapper flex">
      <board-header-filter-search @filterBy="filterBy" />
      <!-- <board-header-filter-person />
      <board-header-filter-filter :board="board" @filterBy="filterBy" />
      <board-header-filter-sort />
      <board-header-filter-pin /> -->
    </section>
  </section>
</template>

<script>
import boardHeaderAddTask from './board-header-add-task';
import boardHeaderFilterSearch from './board-header-filter-search';
// import boardHeaderFilterPerson from './board-header-filter-person';
// import boardHeaderFilterFilter from './board-header-filter-filter';
// import boardHeaderFilterSort from './board-header-filter-sort';
// import boardHeaderFilterPin from './board-header-filter-pin';
export default {
  name: 'boardHeaderViewBar',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpenInput: false,
    };
  },
  created() {},
  methods: {
    filter(e) {
      console.log(e.target.classList.add());
    },
    addTask() {
      this.$emit('addTask');
    },
    addGroup() {
      this.$emit('addGroup');
    },
    filterBy(filterBy) {
      this.$emit('filterBy', filterBy);
    },
  },
  computed: {},
  components: {
    boardHeaderAddTask,
    boardHeaderFilterSearch,
    // boardHeaderFilterPerson,
    // boardHeaderFilterFilter,
    // boardHeaderFilterSort,
    // boardHeaderFilterPin,
  },
};
</script>
