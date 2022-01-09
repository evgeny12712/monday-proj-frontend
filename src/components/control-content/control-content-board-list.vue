<template>
  <section class="boards-list">
    <ul class="clean-list">
      <li class="board-preview-wrapper" v-for="board in boards" :key="board._id">
        <div class="board-preview flex align-center space-between" :class="{ 'curr-board': board._id === activeBoard._id }" @click="showBoard(board)">
          <div class="board-preview-icon-box btn-icon">
            <span class="board-preview-icon flex align-center">
              <svg viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" aria-label="Public board" class="icon_component">
                <path
                  d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span class="flex align-center">
              {{ board.title }}
            </span>
          </div>

          <div @click.stop="showBoardMenu(board)" class="board-preview-dropdown-icon-wrapper">
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </div>
          <board-preview-menu v-if="isCurrBoardMenu(board)" :board="board" @removeBoard="removeBoard" @saveBoard="saveBoard" v-click-outside="closeBoardMenu" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import boardPreviewMenu from '@/components/surface-control/board-preview-menu';
export default {
  name: 'control-content-board-list',
  props: {
    boards: {
      type: Array,
      required: true,
    },
    activeBoard: {
      type: Object,
    },
  },
  data() {
    return {
      isShowDropdownIcon: true,
      currBoardMenu: null,
    };
  },
  methods: {
    showBoard(board) {
      this.$emit('showBoard', board);
    },
    showBoardMenu(board) {
      if (!this.currBoardMenu || this.currBoardMenu !== board) this.currBoardMenu = board;
      else if (this.currBoardMenu === board) this.currBoardMenu = null;
    },
    closeBoardMenu() {
      this.currBoardMenu = true;
    },
    isCurrBoardMenu(board) {
      return this.currBoardMenu === board;
    },
    removeBoard(board) {
      this.$emit('removeBoard', board);
    },
    saveBoard(board) {
      this.$emit('saveBoard', board);
      this.currBoardMenu = false;
    },
  },
  components: {
    boardPreviewMenu,
  },
};
</script>
