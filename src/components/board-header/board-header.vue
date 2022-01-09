<template>
  <div class="board-header-container">
    <board-header-main :activeBoard="activeBoard" @openSlidePanel="openSlidePanel" @saveBoard="saveBoard" />
    <board-header-subset-toolbar @openDashBoard="openDashBoard" @openMainTable="openMainTable" />
    <board-header-view-bar @addGroup="addGroup" @addTask="addTask" @filterBy="filterBy" :board="activeBoard" />
  </div>
</template>

<script>
import boardHeaderViewBar from './board-header-view-bar';
import boardHeaderSubsetToolbar from './board-header-subset-toolbar';
import boardHeaderMain from './board-header-main';
export default {
  name: 'boardHeader',
  props: {
    activeBoard: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addGroup() {
      this.$emit('addGroup');
    },
    addTask() {
      this.$emit('addTask');
    },
    saveBoard(board) {
      this.$emit('saveBoard', board);
    },
    openSlidePanel() {
      this.$emit('openSlidePanel');
    },
    openDashBoard() {
      this.$emit('openDashBoard');
    },
    openMainTable() {
      this.$emit('openMainTable');
    },
    filterBy(filterBy) {
      this.$emit('filterBy', filterBy);
    },
  },
  components: {
    boardHeaderViewBar,
    boardHeaderMain,
    boardHeaderSubsetToolbar,
  },
};
</script>
