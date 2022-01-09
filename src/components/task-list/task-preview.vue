<template>
  <section class="grid-row-component task-preview flex align-center" @mouseleave="showTaskMenu = false">
    <div class="sticky-feature">
      <div class="floating-cell-menu">
        <div class="menu-edit-task-container" :class="{ 'dropdown-open': showTaskMenu }">
          <button class="btn" @click="toggleShowTaskMenu">
            <font-awesome-icon icon="caret-down" />
          </button>
          <task-menu v-if="showTaskMenu" :task="task" @remove="deleteTask" @duplicate="saveTask" @selected="saveTask" />
        </div>
      </div>
      <div class="grid-cell-row-component-header name-cell flex align-center floating-cell" :class="{ selected: isCellSelected }" @click="togglePostPanel">
        <div class="pulse-left-indicator" :style="{ backgroundColor: styleObj.clr, color: styleObj.clr }" @click.stop="toggleSelected">
          <div class="left-indicator-inner flex align-center" :class="{ selected: isTaskSelected }">
            <div class="left-indicator-checkbox">
              <span v-if="isTaskSelected" class="flex align-center">
                <font-awesome-icon icon="check" />
              </span>
            </div>
          </div>
        </div>
        <div class="task-title flex align-center space-between">
          <div class="task-title-inner flex align-center" v-if="!showEditTask">
            <div class="flex align-center">
              <span class="ds-text-component">{{ task.title }}</span>
            </div>
            <button class="btn btn-edit" @click.stop="toggleEdit">Edit</button>
          </div>
          <input v-else type="text" ref="taskTitle" v-model="taskToEdit.title" @blur="saveTitle" @keyup.enter="$event.target.blur()" />
        </div>

        <div class="conversation-indicator-component">
          <div class="conversation-indicator-icon" :class="{ 'recently-updated': isRecentlyUpdated }">
            <svg v-if="!isRecentlyUpdated" viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true" class="icon_component chat-without-update icon_component--no-focus-style">
              <path
                d="M10.4339 1.94996C11.5976 1.94797 12.7458 2.21616 13.7882 2.7334C14.8309 3.25083 15.7393 4.00335 16.4416 4.93167C17.144 5.85999 17.6211 6.93874 17.8355 8.08291C18.0498 9.22707 17.9956 10.4054 17.6769 11.525C17.3583 12.6446 16.7839 13.6749 15.9992 14.5347C15.2145 15.3945 14.2408 16.0604 13.1549 16.4797C12.069 16.8991 10.9005 17.0605 9.7416 16.9513C8.72154 16.8552 7.7334 16.5518 6.83723 16.0612L4.29494 17.2723C3.23222 17.7785 2.12271 16.6692 2.62876 15.6064L3.83948 13.0636C3.26488 12.0144 2.94833 10.8411 2.91898 9.64114C2.88622 8.30169 3.21251 6.97789 3.86399 5.8071C4.51547 4.63631 5.4684 3.66119 6.62389 2.98294C7.77902 2.30491 9.09451 1.94825 10.4339 1.94996ZM10.4339 1.94996C10.4343 1.94996 10.4348 1.94996 10.4352 1.94996L10.4341 2.69996L10.4327 1.94996C10.4331 1.94996 10.4335 1.94996 10.4339 1.94996ZM13.1214 4.07707C12.2868 3.66289 11.3673 3.44821 10.4355 3.44996L10.433 3.44996C9.36086 3.44842 8.30784 3.73382 7.38321 4.27655C6.45858 4.81929 5.69605 5.59958 5.17473 6.53645C4.65341 7.47332 4.39232 8.53263 4.41853 9.60446C4.44475 10.6763 4.75732 11.7216 5.32382 12.6318C5.45888 12.8489 5.47411 13.1197 5.36422 13.3505L4.28601 15.615L6.55002 14.5365C6.78078 14.4266 7.05164 14.4418 7.26869 14.5768C8.05992 15.0689 8.95463 15.3706 9.88231 15.458C10.81 15.5454 11.7453 15.4161 12.6145 15.0805C13.4838 14.7448 14.2631 14.2118 14.8913 13.5236C15.5194 12.8353 15.9791 12.0106 16.2342 11.1144C16.4893 10.2182 16.5327 9.27499 16.3611 8.35913C16.1895 7.44328 15.8076 6.57978 15.2454 5.8367C14.6832 5.09362 13.9561 4.49125 13.1214 4.07707Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
              <path
                d="M11.25 6.5C11.25 6.08579 10.9142 5.75 10.5 5.75C10.0858 5.75 9.75 6.08579 9.75 6.5V8.75H7.5C7.08579 8.75 6.75 9.08579 6.75 9.5C6.75 9.91421 7.08579 10.25 7.5 10.25H9.75V12.5C9.75 12.9142 10.0858 13.25 10.5 13.25C10.9142 13.25 11.25 12.9142 11.25 12.5V10.25H13.5C13.9142 10.25 14.25 9.91421 14.25 9.5C14.25 9.08579 13.9142 8.75 13.5 8.75H11.25V6.5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg v-if="isRecentlyUpdated" viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true" class="icon_component chat-with-update icon_component--no-focus-style">
              <path
                d="M10.4339 1.95001C11.5975 1.94802 12.7457 2.2162 13.7881 2.73345C14.8309 3.25087 15.7392 4.0034 16.4416 4.93172C17.1439 5.86004 17.6211 6.93879 17.8354 8.08295C18.0498 9.22712 17.9955 10.4054 17.6769 11.525C17.3582 12.6447 16.7839 13.675 15.9992 14.5348C15.2144 15.3946 14.2408 16.0604 13.1549 16.4798C12.0689 16.8991 10.9005 17.0606 9.74154 16.9514C8.72148 16.8553 7.73334 16.5518 6.83716 16.0612L4.29488 17.2723C3.23215 17.7786 2.12265 16.6693 2.6287 15.6064L3.83941 13.0637C3.26482 12.0144 2.94827 10.8411 2.91892 9.64118C2.88616 8.30174 3.21245 6.97794 3.86393 5.80714C4.51541 4.63635 5.46834 3.66124 6.62383 2.98299C7.77896 2.30495 9.09445 1.9483 10.4339 1.95001ZM10.4339 1.95001C10.4343 1.95001 10.4347 1.95001 10.4351 1.95001L10.434 2.70001L10.4326 1.95001C10.433 1.95001 10.4334 1.95001 10.4339 1.95001ZM13.1214 4.07712C12.2867 3.66294 11.3672 3.44826 10.4354 3.45001L10.4329 3.45001C9.3608 3.44846 8.30778 3.73387 7.38315 4.2766C6.45852 4.81934 5.69598 5.59963 5.17467 6.5365C4.65335 7.47337 4.39226 8.53268 4.41847 9.6045C4.44469 10.6763 4.75726 11.7216 5.32376 12.6319C5.45882 12.8489 5.47405 13.1198 5.36416 13.3506L4.28595 15.6151L6.54996 14.5366C6.78072 14.4266 7.05158 14.4418 7.26863 14.5768C8.05985 15.0689 8.95456 15.3706 9.88225 15.458C10.8099 15.5454 11.7452 15.4162 12.6145 15.0805C13.4837 14.7448 14.2631 14.2119 14.8912 13.5236C15.5194 12.8354 15.9791 12.0106 16.2341 11.1144C16.4892 10.2182 16.5327 9.27504 16.3611 8.35918C16.1895 7.44332 15.8075 6.57983 15.2453 5.83674C14.6831 5.09366 13.9561 4.49129 13.1214 4.07712Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span v-if="isRecentlyUpdated" class="updates-count" style="left: 13px">{{ task.comments.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-cells-row-component">
      <component v-for="(col, idx) in cols" :key="idx" :is="col.type" :info="getCmpInfo(col)" @update="updateTask($event, col.type)" @saveBoardCol="saveBoardCol($event, col.type)" />
    </div>
    <task-update v-if="showPostPanel" :task="taskToEdit" :board="activeBoard" @saveComment="saveComment" @closePanel="togglePostPanel" v-click-outside="togglePostPanel" />
    <div class="space-item"></div>
    <div class="indicator"></div>
  </section>
</template>

<script>
import statusPicker from '../task-cmps/status/status-picker.vue';
import priorityPicker from '../task-cmps/priority/priority-picker';
import datePicker from '../task-cmps/date/date-picker';
import timelinePicker from '../task-cmps/timeline/timeline-picker';
import memberPicker from '../task-cmps/member/member-picker';
import tagPicker from '../task-cmps/tag/tag-picker';
import taskMenu from './task-menu';
import taskUpdate from './task-update';
export default {
  name: 'taskPreview',
  props: {
    task: {
      type: Object,
      required: true,
    },
    styleObj: {
      type: Object,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      cols: null,
      countCheckBox: null,
      activeBoard: null,
      showEditTask: false,
      isTaskSelected: false,
      isCellSelected: false,
      showPostPanel: false,
      isRecentlyUpdated: false,
      showTaskMenu: false,
    };
  },

  created() {
    this.activeBoard = this.$store.getters.activeBoard;
    this.cols = this.$store.getters.cols;
    this.isRecentlyUpdated = this.task.comments?.length > 0;
  },

  computed: {
    taskToEdit() {
      return JSON.parse(JSON.stringify(this.task));
    },
  },
  methods: {
    togglePostPanel() {
      if (this.showEditTask && !this.showPostPanel) return;
      this.showPostPanel = !this.showPostPanel;
    },
    toggleCellSelected() {
      this.isCellSelected = !this.isCellSelected;
    },
    async toggleEdit() {
      this.toggleCellSelected();
      await (this.showEditTask = !this.showEditTask);
      if (this.$refs.taskTitle) this.$refs.taskTitle.focus();
    },
    saveTitle() {
      this.toggleEdit();
      this.$emit('saveTask', this.taskToEdit);
    },
    saveTask(task) {
      this.$emit('saveTask', task);
    },
    deleteTask() {
      this.$emit('deleteTask', this.taskToEdit);
    },
    saveComment(details) {
      this.$emit('saveComment', details);
    },
    getCmpInfo(col) {
      return {
        selected: this.task?.[col.type] ? this.task[col.type] : col.data.default,
        data: col.data,
        groupStyle: this.styleObj,
      };
    },

    updateTask(ev, type) {
      const copyTask = JSON.parse(JSON.stringify(this.task));
      copyTask[type] = ev;
      this.saveTask(copyTask);
    },
    saveBoardCol(ev, type) {
      const details = { type, item: ev };
      this.$emit('saveBoardCol', details);
    },

    toggleSelected() {
      this.isTaskSelected = !this.isTaskSelected;
      this.$emit('setSelected', this.task, this.isTaskSelected);
    },
    toggleShowTaskMenu() {
      this.showTaskMenu = !this.showTaskMenu;
    },
  },
  components: {
    statusPicker,
    datePicker,
    timelinePicker,
    memberPicker,
    taskMenu,
    taskUpdate,
    tagPicker,
    priorityPicker,
  },
  // <!-- @blur="saveTitle" -->
};
</script>
