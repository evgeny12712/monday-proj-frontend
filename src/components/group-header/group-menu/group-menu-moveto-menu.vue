<template>
  <section class="moveto-menu">
    <ul>
      <li v-for="board in boardsToShow" :key="board._id">
        <div class="menu-item" @click="moveToBoard(board)">
          {{ board.title }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'group-menu-moveto-menu',
  props: {
    boards: {
      type: Array,
    },
    board: {
      type: Object,
    },
  },
  created() {},
  methods: {
    moveToBoard(board) {
      this.$emit('moveToBoard', board);
    },
  },
  computed: {
    boardsToShow() {
      const boards = JSON.parse(JSON.stringify(this.boards));
      const idx = boards.findIndex((board) => board._id === this.board._id);
      boards.splice(idx, 1);
      return boards;
    },
  },
};
</script>

<style></style>
