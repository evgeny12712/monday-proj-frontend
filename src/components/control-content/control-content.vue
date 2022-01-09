<template>
  <section :style="[showControlContent ? { width: '255px' } : { width: '33px' }]" class="first-level-control-content flex column">
    <button class="btn btn-round btn-open-control" @click="toggleOpen">
      <font-awesome-icon v-if="showControlContent" icon="chevron-left" />
      <font-awesome-icon v-else icon="chevron-right" />
    </button>
    <div class="control-content-container" :style="[showControlContent ? { display: 'block' } : { display: 'none' }]">
      <div v-if="showControlContent" class="home-control-component flex column">
        <header class="control-content-header flex column">
          <div class="dropdown-navigation-header flex align-center space-between">
            <span>Worksapce</span>
            <button class="btn btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
          <div role="button" class="btn btn-workspace-dropdown-container flex space-between align-center" @click="toggleWorkspaceList">
            <h2>Worksapce main</h2>
            <button class="btn btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </header>
        <div class="control-btns flex column gap">
          <button class="btn btn-icon" @click="addBoard">
            <span class="flex align-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </span>

            <span>Add</span>
          </button>
          <button class="btn btn-icon">
            <span class="flex align-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </span>

            <span>Filters</span>
          </button>
          <button class="btn btn-icon">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <span>Search</span>
          </button>
        </div>
        <div class="spacer"></div>
        <hr class="control-content-separator" />

        <control-content-board-list :boards="boards" :activeBoard="activeBoard" @showBoard="showBoard" @removeBoard="removeBoard" @saveBoard="saveBoard" />
      </div>
    </div>
  </section>
</template>

<script>
import controlContentBoardList from '@/components/control-content/control-content-board-list';
export default {
  name: 'controlContent',
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
      showControlContent: false,
      isShowDropdownIcon: true,
    };
  },
  methods: {
    toggleOpen() {
      this.$emit('toggleOpen');
      this.showControlContent = !this.showControlContent;
    },
    addBoard() {
      this.$emit('add');
    },
    showBoard(board) {
      this.$emit('showBoard', board);
    },
    removeBoard(board) {
      this.$emit('removeBoard', board);
    },
    saveBoard(board) {
      this.$emit('saveBoard', board);
    },
    toggleWorkspaceList() {},
  },
  computed: {},
  components: {
    controlContentBoardList,
  },
};
</script>
