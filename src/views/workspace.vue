<template>
  <div class="workspace" :class="getWorkspaceTeam">
    <!-- { 'dark-app-theme': isDarkMode }, -->
    <div class="surface-control-fake"></div>
    <slide-panel v-if="isSlidePanel" @closeSlidePanel="toggleSlidePanel" :board="activeBoard" v-click-outside="() => (isSlidePanel = false)" />
    <div class="workspace-content" :class="[{ 'control-open': showControlContent }, { selected: isTaskSelected }]">
      <div class="control-content-fake" />
      <control-content @toggleOpen="toggleOpenControl" @add="addBoard" @showBoard="showBoard" @removeBoard="removeBoard" @saveBoard="saveBoard" :boards="boards" :activeBoard="activeBoard" />
      <div v-if="isLoading" class="loading-img">
        <img src="https://cdn.monday.com/images/loader/loader.gif" />
      </div>
      <div v-else class="workspace-details">
        <boardHeader
          :activeBoard="activeBoard"
          @addTask="saveTask"
          @saveBoard="saveBoard"
          @addGroup="saveGroup"
          @openDashBoard="openDashBoard"
          @openMainTable="openMainTable"
          @openSlidePanel="toggleSlidePanel"
          @filterBy="filter"
        />
        <div v-if="isMainTable">
          <group-list
            :board="boardToShow"
            :boards="boards"
            :isSelected="isSelected"
            :isControlContent="showControlContent"
            @removeGroup="openModal"
            @moveToBoard="moveGroupToBoard"
            @saveTask="saveTask"
            @deleteTask="openModal"
            @saveGroup="saveGroup"
            @saveComment="saveComment"
            @setSelected="setSelected"
            @addColumn="addColumn"
            @saveBoardCol="saveBoardCol"
          />
          <user-msg v-if="msg" :msg="msg" @closeUserMsg="closeUserMsg" @undo="undo" />
          <selected-task v-if="tasks.length" :tasks="tasks" @close="closeTaskSelected" @deleteTaskSelected="deleteTaskSelected" @duplicateTaskSelected="duplicateTaskSelected" />
          <confirm-modal :modal="modal" v-if="modal.isOpen" @closeModal="modal.isOpen = false" @deleteAction="deleteAction" />
        </div>
        <dashboard v-if="isDashboard" />
      </div>
    </div>
    <surface-control @toggleDarkMode="toggleDarkMode" />
  </div>
</template>

<script>
import socketService from '../services/socket.service.js';
import surfaceControl from '@/components/surface-control/surface-control';
import controlContent from '@/components/control-content/control-content';
import boardHeader from '@/components/board-header/board-header';
import groupList from '@/components/group-list/group-list';
import selectedTask from '@/components/task-list/selected-task.vue';
import userMsg from '@/components/modals/user-msg.vue';
import confirmModal from '@/components/modals/confirm-modal.vue';
import dashboard from '@/components/dashboard/dashboard';
import slidePanel from '@/components/panels/slide-panel';
export default {
  name: 'workspace',
  data() {
    return {
      showControlContent: false,
      tasks: [],
      task: null,
      group: null,
      groupId: null,
      msg: '',
      isTaskSelected: false,
      modal: { txt: '', isOpen: false },
      isDashboard: false,
      isSelected: false,
      isUndo: false,
      isDarkMode: false,
      isMainTable: true,
      isSlidePanel: false,
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'loadBoards' });
    window.socketService.setup();
    window.socketService.emit('board topic', this.activeBoard._id);
    window.socketService.on('board saved', (board) => {
      console.log('hey from socket');
      this.saveBoard(board);
    });
    // await this.$store.dispatch({ type: 'loadUsers' });
    // const usersIds = users.map((user) => user._id);
    // this.activeBoard.members = usersIds;
    // await this.$store.dispatch({ type: 'saveBoard', board: this.activeBoard });
    // this.$store.dispatch({ type: 'addLastViewed' });
  },
  computed: {
    boardToShow() {
      if (this.filterBy && this.filterBy.length) {
        let boardToShow = JSON.parse(JSON.stringify(this.$store.getters.activeBoard));
        let filteredTasksData = [];
        boardToShow.groups.forEach((group, groupIdx) => {
          console.log(group, groupIdx);
          group.tasks.forEach((task) => {
            if (task.title.toLowerCase().includes(this.filterBy.toLowerCase())) {
              filteredTasksData.push({ groupIdx, task });
            }
          });
        });
        boardToShow.groups.forEach((group) => (group.tasks = []));
        filteredTasksData.forEach((dataItem) => boardToShow.groups[dataItem.groupIdx].tasks.push(dataItem.task));
        console.log(boardToShow.groups);
        return boardToShow;
      }
      return this.activeBoard;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    boards() {
      return this.$store.getters.boards;
    },
    activeBoard() {
      return this.$store.getters.activeBoard;
    },
    loggedinUser() {
      return this.$store.getters.user;
    },
    getWorkspaceTeam() {
      if (this.isDarkMode) return { 'dark-app-theme': true };
      return { 'light-app-theme': true };
    },
    filterBy() {
      return this.$store.getters.filterBy;
    },
    boardsToShow() {
      return this.$store.getters.boardToShow;
    },
  },
  methods: {
    toggleDarkMode() {
      console.log(this.isDarkMode);
      this.isDarkMode = !this.isDarkMode;
    },
    saveBoardCol(details) {
      this.$store.dispatch({ type: 'saveBoardCol', details });
      // this.sendSocket(this.activeBoard);
    },
    addColumn(columnType) {
      this.$store.dispatch({ type: 'addColumn', columnType });
      // this.sendSocket(this.activeBoard);
    },
    async saveTask(details = null) {
      await this.$store.dispatch({ type: 'saveTask', details });
      this.sendSocket(this.activeBoard);
    },
    removeGroup(group) {
      this.showMsg('We successfully deleted group');
      this.$store.dispatch({ type: 'removeGroup', group });
      // this.sendSocket(this.activeBoard);
    },
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board });
      // this.sendSocket(this.activeBoard);
    },
    async deleteTask(task, groupId) {
      this.showMsg('We successfully deleted task');
      await this.$store.dispatch({
        type: 'deleteTask',
        details: { task, groupId },
      });
      // this.sendSocket(this.activeBoard);
    },
    saveGroup(group) {
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    moveGroupToBoard(moveDetails) {
      this.$store.dispatch({ type: 'moveGroupToBoard', moveDetails });
      // this.sendSocket(this.activeBoard);
    },
    toggleOpenControl() {
      this.showControlContent = !this.showControlContent;
    },
    toggleSlidePanel() {
      this.isSlidePanel = !this.isSlidePanel;
    },
    addBoard() {
      this.$store.dispatch({ type: 'saveBoard' });
    },
    saveComment(details) {
      this.$store.dispatch({ type: 'saveComment', details });
      // this.sendSocket(this.activeBoard);
    },
    showBoard(board) {
      this.$store.commit({ type: 'setActiveBoard', activeBoard: board });
    },
    removeBoard(board) {
      this.$store.dispatch({ type: 'removeBoard', board });
      // this.sendSocket(this.activeBoard);
    },
    setSelected(task, boolean) {
      if (boolean) this.tasks.push(task);
      else {
        const idx = this.tasks.findIndex(({ id }) => id === task.id);
        this.tasks.splice(idx, 1);
      }
      if (this.tasks.length) this.isTaskSelected = true;
      else this.isTaskSelected = false;
    },
    closeTaskSelected() {
      this.tasks = [];
      this.isTaskSelected = false;
    },
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 8000);
    },
    sendSocket(board) {
      window.socketService.emit('save board', board);
    },
    closeUserMsg() {
      this.msg = null;
    },
    async deleteTaskSelected(tasks) {
      for (let i = 0; i < tasks.length; i++) {
        const group = this.activeBoard.groups.find((group) => {
          return group.tasks.find((task) => task.id === tasks[i].id);
        });
        await this.deleteTask(tasks[i], group.id);
      }
      this.tasks = [];
    },
    async duplicateTaskSelected(tasks) {
      for (let i = 0; i < tasks.length; i++) {
        const group = this.activeBoard.groups.find((group) => {
          return group.tasks.find(({ id }) => id === tasks[i].id);
        });
        let taskCopy = JSON.parse(JSON.stringify(tasks[i]));
        taskCopy.id = '';
        taskCopy.title = taskCopy.title + '(copy)';
        const details = { task: taskCopy, groupId: group.id };
        await this.saveTask(details);
      }
      this.tasks = [];
    },
    openModal(details, groupId = null) {
      this.modal.isOpen = true;
      if (details.tasks) {
        this.modal.txt = 'Delete this group?';
        this.group = details;
      } else {
        this.modal.txt = 'Delete this task?';
        this.task = details;
        this.groupId = groupId;
      }
    },
    deleteAction() {
      if (this.group) this.removeGroup(this.group);
      else this.deleteTask(this.task, this.groupId);
      this.modal.isOpen = false;
      setTimeout(() => {
        this.task = null;
        this.groupId = null;
        this.group = null;
      }, 8100);
    },
    undo() {
      this.isUndo = true;
      if (this.isUndo && this.group) {
        this.msg = null;
        this.saveGroup(this.group);
        setTimeout(() => {
          this.showMsg('We successfully restored the group');
        }, 1500);
      } else if (this.isUndo && !this.group) {
        const details = { task: this.task, groupId: this.groupId };
        this.msg = null;
        setTimeout(() => {
          this.showMsg('We successfully restored the task');
        }, 1500);
        this.saveTask(details);
      }
      this.isUndo = false;
    },
    openDashBoard() {
      this.isDashboard = true;
      this.isMainTable = false;
    },
    openMainTable() {
      this.isDashboard = false;
      this.isMainTable = true;
    },
    filter(filterBy) {
      this.$store.commit({ type: 'setFilter', filterBy });
    },
  },

  destroyed() {
    socketService.off('board saved', this.saveBoard);
    socketService.terminate();
  },
  components: {
    groupList,
    boardHeader,
    controlContent,
    selectedTask,
    userMsg,
    confirmModal,
    surfaceControl,
    dashboard,
    slidePanel,
  },
};
</script>
