<template>
  <section class="board-header-main flex">
    <div class="board-header-main-top flex space-between align-center">
      <div class="board-title flex align-center">
        <el-tooltip class="item" effect="dark" content="Click to edit" placement="bottom">
          <h1 v-if="!isEditName" @click="editName" class="element-type-h1">
            {{ boardToEdit.title }}
          </h1>
          <input v-else type="text" value="boardToEdit.title" ref="titleInput" v-model="boardToEdit.title" @keyup.enter="$event.target.blur()" @blur="editName" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Hide board description" placement="bottom">
          <button class="btn board-header-title-icon" @click="isShowDescription = !isShowDescription" v-html="descriptionTogglBtn"></button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Add to favorites" placement="bottom">
          <button class="btn board-header-title-icon" @click="toggleFavorite" v-html="starToggle" :class="{ 'starred-board': this.boardToEdit.isFavorite }"></button>
        </el-tooltip>
      </div>
      <div class="actions-header">
        <button class="btn btn-icon flex align-center gap" @click="openSlidePanel">
          <div style="width: 16px; height: 16px" class="flex align-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span>Activity</span>
        </button>

        <button class="btn btn-icon add-to-board btn-size-small">+ Add to board</button>
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
    </div>
    <section class="board-description" v-if="isShowDescription" @click="editDescription">
      <div class="description-line" v-if="!isEditDesctiption">
        <span class="text-content">
          {{ boardDescription }}
        </span>
      </div>
      <textarea v-else cols="1" rows="1" type="text" value="boardToEdit.description" ref="descInput" v-model="boardToEdit.description" @blur="editDescription" />
    </section>
  </section>
</template>

<script>
export default {
  name: 'boardHeaderMain',
  props: {
    activeBoard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditName: false,
      isEditDesctiption: false,
      isShowDescription: true,
    };
  },
  methods: {
    async editName() {
      await (this.isEditName = !this.isEditName);
      if (this.$refs.titleInput) this.$refs.titleInput.focus();
      if (this.boardToEdit.title !== this.activeBoard.title) {
        this.$emit('saveBoard', this.boardToEdit);
      }
    },
    async editDescription() {
      await (this.isEditDesctiption = !this.isEditDesctiption);
      if (this.$refs.descInput) this.$refs.descInput.focus();
      if (this.boardToEdit.description !== this.activeBoard.description) {
        this.$emit('saveBoard', this.boardToEdit);
      }
    },
    async toggleFavorite() {
      this.boardToEdit.isFavorite = !this.boardToEdit.isFavorite;
      this.$emit('saveBoard', this.boardToEdit);
    },
    openSlidePanel() {
      this.$emit('openSlidePanel');
    },
  },
  computed: {
    descriptionTogglBtn() {
      return this.isShowDescription ? '<ion-icon name="alert-circle"></ion-icon>' : '<ion-icon name="alert-circle-outline"></ion-icon>';
    },
    starToggle() {
      return this.boardToEdit.isFavorite ? '<ion-icon name="star"></ion-icon>' : '<ion-icon name="star-outline"></ion-icon>';
    },
    isStarredComp() {
      return { 'starred-board': this.isStarred };
    },
    boardDescription() {
      return this.boardToEdit.description.length ? this.boardToEdit.description : 'Add board description';
    },
    boardToEdit() {
      return JSON.parse(JSON.stringify(this.activeBoard));
    },
  },
  components: {},
};
</script>
