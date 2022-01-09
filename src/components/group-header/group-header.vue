<template>
  <section class="grid-row-component group-header" ref="header">
    <div class="group-name-component grid-cell-row-component-header floating-cell">
      <div class="menu-btn-container flex justify-center" @click="toggleGroupMenu">
        <group-color-palette v-click-outside="toggleColorPalette" v-if="showColorPalette" :colors="clrs" @selected="changeColor" />
        <button class="btn btn-menu-group-header fa flex align-center" :style="{ color, backgroundColor: color, borderColor: color }">
          <font-awesome-icon icon="caret-down" />
        </button>
        <group-menu
          v-click-outside="toggleGroupMenu"
          v-if="showGroupMenu"
          :boards="boards"
          :board="board"
          :groupColor="group.style.clr"
          :isCollapsed="isCollapsed"
          @addGroup="addGroup"
          @toggleTasks="toggleTasks"
          @toggleAllTasks="toggleAllTasks"
          @removeGroup="remove"
          @moveToBoard="moveToBoard"
          @duplicateGroup="duplicateGroup"
          @changeColor="toggleColorPalette"
        />
      </div>

      <div class="group-name" v-click-outside="closeEdit" @keyup.enter="editTitle" @mouseover="showTaskToggleBtn = true" @mouseleave="showTaskToggleBtn = false">
        <button v-if="showTaskToggleBtn" @click="toggleTasks" class="btn toggle-tasks-btn" v-html="toggleGroupBtnIcon"></button>
        <span v-if="!showEdit" :style="{ color }" @click="editTitle"> {{ groupToEdit.title }}</span>
        <div v-else class="edit-group-container flex align-center">
          <div class="color-picker-btn-container flex align-center" :class="{ 'dropdown-open': showColorPalette }">
            <button class="btn btn-round btn-change-color" :style="{ backgroundColor: color }" @click="toggleColorPalette"></button>
            <!-- v-if="showColorPalette" -->
          </div>

          <input :style="{ color: color }" type="text" ref="titleInput" v-model="groupToEdit.title" />
        </div>
        <!-- @blur="editTitle" -->
        <!-- @keyup.enter="$event.target.blur()" -->
      </div>
    </div>
    <div class="grid-cells-row-component">
      <div v-for="(col, idx) in cols" :key="idx" class="grid-cell-component-wrapper col-identifier-status" :style="{ width: col.data.style.maxWidth }">
        <!-- <div class="column-header-inner"> -->
        <!-- <div class="column-header-element-wrapper">
						<span class="column-header-drag-wrapper flex align-center">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								width="20"
								height="20"
								class="drag-handle"
							>
								<path
									d="M7.5 4C6.67157 4 6 3.32843 6 2.5 6 1.67157 6.67157 1 7.5 1 8.32843 1 9 1.67157 9 2.5 9 3.32843 8.32843 4 7.5 4zM12.5 4C11.6716 4 11 3.32843 11 2.5 11 1.67157 11.6716 1 12.5 1 13.3284 1 14 1.67157 14 2.5 14 3.32843 13.3284 4 12.5 4zM7.5 9C6.67157 9 6 8.32843 6 7.5 6 6.67157 6.67157 6 7.5 6 8.32843 6 9 6.67157 9 7.5 9 8.32843 8.32843 9 7.5 9zM12.5 9C11.6716 9 11 8.32843 11 7.5 11 6.67157 11.6716 6 12.5 6 13.3284 6 14 6.67157 14 7.5 14 8.32843 13.3284 9 12.5 9zM7.5 14C6.67157 14 6 13.3284 6 12.5 6 11.6716 6.67157 11 7.5 11 8.32843 11 9 11.6716 9 12.5 9 13.3284 8.32843 14 7.5 14zM7.5 19C6.67157 19 6 18.3284 6 17.5 6 16.6716 6.67157 16 7.5 16 8.32843 16 9 16.6716 9 17.5 9 18.3284 8.32843 19 7.5 19zM12.5 14C11.6716 14 11 13.3284 11 12.5 11 11.6716 11.6716 11 12.5 11 13.3284 11 14 11.6716 14 12.5 14 13.3284 13.3284 14 12.5 14zM12.5 19C11.6716 19 11 18.3284 11 17.5 11 16.6716 11.6716 16 12.5 16 13.3284 16 14 16.6716 14 17.5 14 18.3284 13.3284 19 12.5 19z"
									fill="currentColor"
								></path>
							</svg>
						</span>
					</div> -->
        <div class="title-wrapper flex align-center">
          <span>{{ cmpNameForDisplay(col.type) }}</span>
        </div>
        <!-- <div class="column-header-element-wrapper flex align-center">
						<span class="column-header-drag-wrapper flex align-center">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								width="20"
								height="20"
								class="drag-handle"
							>
								<path
									d="M7.5 4C6.67157 4 6 3.32843 6 2.5 6 1.67157 6.67157 1 7.5 1 8.32843 1 9 1.67157 9 2.5 9 3.32843 8.32843 4 7.5 4zM12.5 4C11.6716 4 11 3.32843 11 2.5 11 1.67157 11.6716 1 12.5 1 13.3284 1 14 1.67157 14 2.5 14 3.32843 13.3284 4 12.5 4zM7.5 9C6.67157 9 6 8.32843 6 7.5 6 6.67157 6.67157 6 7.5 6 8.32843 6 9 6.67157 9 7.5 9 8.32843 8.32843 9 7.5 9zM12.5 9C11.6716 9 11 8.32843 11 7.5 11 6.67157 11.6716 6 12.5 6 13.3284 6 14 6.67157 14 7.5 14 8.32843 13.3284 9 12.5 9zM7.5 14C6.67157 14 6 13.3284 6 12.5 6 11.6716 6.67157 11 7.5 11 8.32843 11 9 11.6716 9 12.5 9 13.3284 8.32843 14 7.5 14zM7.5 19C6.67157 19 6 18.3284 6 17.5 6 16.6716 6.67157 16 7.5 16 8.32843 16 9 16.6716 9 17.5 9 18.3284 8.32843 19 7.5 19zM12.5 14C11.6716 14 11 13.3284 11 12.5 11 11.6716 11.6716 11 12.5 11 13.3284 11 14 11.6716 14 12.5 14 13.3284 13.3284 14 12.5 14zM12.5 19C11.6716 19 11 18.3284 11 17.5 11 16.6716 11.6716 16 12.5 16 13.3284 16 14 16.6716 14 17.5 14 18.3284 13.3284 19 12.5 19z"
									fill="currentColor"
								></path>
							</svg>
						</span>
					</div> -->
        <!-- </div> -->
      </div>
    </div>
    <div class="add-column-container flex align-center">
      <button class="btn btn-icon">
        <i class="icon el-icon-circle-plus-outline"></i>
      </button>
      <column-menu v-if="showColumnMenu" @addColumn="addColumn" />
    </div>
  </section>
</template>

<script>
// import { ref } from "vue"
import groupMenu from '@/components/group-header/group-menu/group-menu';
import groupColorPalette from './color-platte/group-color-palette.vue';
import columnMenu from '@/components/task-cmps/column-menu';

export default {
  name: 'groupHeader',
  props: {
    group: {
      type: Object,
      required: true,
    },
    boards: {
      type: Array,
    },
    board: {
      type: Object,
    },
    isCollapsed: {
      type: Boolean,
    },
    isControlContent: {
      type: Boolean,
    },
  },
  data() {
    return {
      showEdit: false,
      showTaskToggleBtn: false,
      groupToEdit: { ...this.group },
      cols: null,
      showGroupMenu: false,
      showColorPalette: false,
      isSticky: false,
      showColumnMenu: false,
    };
  },
  created() {
    this.cols = this.$store.getters.cols;
  },
  methods: {
    changeColor(clr) {
      const groupCopy = JSON.parse(JSON.stringify(this.group));
      groupCopy.style.clr = clr;
      this.group.style.clr = clr;
      this.$emit('saveGroup', groupCopy);
      this.toggleColorPalette();
      this.showEdit = false;
    },
    cmpNameForDisplay(cmp) {
      const name = cmp.replace('Picker', '').replace(cmp[0], cmp[0].toUpperCase());
      return name;
    },
    closeEdit() {
      this.showEdit = false;
      if (this.group.title !== this.groupToEdit.title) this.$emit('saveGroup', this.groupToEdit);
      if (this.$refs.titleInput) this.$refs.titleInput.focus();
    },
    async editTitle(e) {
      if (e.target.classList.contains('btn-change-color')) return;
      await (this.showEdit = !this.showEdit);
      if (this.$refs.titleInput) this.$refs.titleInput.focus();
      if (this.group.title !== this.groupToEdit.title) this.$emit('saveGroup', this.groupToEdit);
      this.showTaskToggleBtn = false;
    },
    remove() {
      this.$emit('removeGroup', this.group);
    },
    addGroup() {
      this.$emit('saveGroup');
    },
    moveToBoard(board) {
      const moveDetails = { board, group: this.group };
      this.$emit('moveToBoard', moveDetails);
    },
    duplicateGroup() {
      this.groupToEdit.id = '';
      this.$emit('saveGroup', this.groupToEdit);
    },
    stickyHeader(entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) this.isSticky = true;
      else this.isSticky = false;
    },
    addColumn(columnType) {
      this.$emit('addColumn', columnType);
    },
    // TOGGLE
    toggle(toggleType) {
      this[toggleType] = !this[toggleType];
    },
    toggleTasks() {
      this.$emit('toggleTasks', this.group.id);
    },
    toggleAllTasks() {
      this.$emit('toggleAllTasks');
    },
    toggleGroupMenu() {
      this.showGroupMenu = !this.showGroupMenu;
    },
    toggleColorPalette() {
      this.showColorPalette = !this.showColorPalette;
      this.showEdit = true;
    },
  },

  // 	// console.log('EEEEEEEEEEEEEEEEEEEEEEEEEE');
  // 	// const headerHeight = this.$refs.header.getBoundingClientRect().height;
  // 	// const header = this.$refs.header;
  // 	// const stickyHeader = function (entries) {
  // 	// 	const [entry] = entries;
  // 	// 	if (!entry.isIntersecting) this.isSticky = true;
  // 	// 	else this.isSticky = false;
  // 	// 	console.log(this.isSticky);
  // 	// };
  // 	// const headerObserver = new IntersectionObserver(stickyHeader, {
  // 	// 	root: null,
  // 	// 	threshold: 0,
  // 	// 	rootMargin: `-${headerHeight}px`,
  // 	// });
  // 	// headerObserver.observe(this.$refs.header);
  // }
  computed: {
    clrs() {
      return this.$store.getters.clrs;
    },
    stickyStyle() {
      return { sticky: this.isSticky };
    },
    toggleGroupBtnIcon() {
      return this.isCollapsed
        ? `<ion-icon name="chevron-up-outline"></ion-icon><ion-icon name="chevron-down-outline"></ion-icon>`
        : `<ion-icon name="chevron-down-outline"></ion-icon><ion-icon name="chevron-up-outline"></ion-icon>`;
    },
    currGroup() {
      return this.group;
    },
    color() {
      return this.group.style.clr;
    },
  },
  components: {
    groupMenu,
    groupColorPalette,
    columnMenu,
  },
};
</script>
<!--

		<input
						:style="{ color: color }"
						type="text"
						ref="titleInput"
						v-model="groupToEdit.title"
						@blur="editTitle"
						@keyup.enter="$event.target.blur()"
					/>-->
