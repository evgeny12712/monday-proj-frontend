<template>
  <section class="group-list-container">
    <ul v-if="groups && groups.length" class="group-list clean-list flex column">
      <draggable @end="handleChange()" :list="groups" group="groups">
        <li class="group" v-for="group in groups" :key="group.id">
          <group-header
            :group="group"
            :boards="boards"
            :board="board"
            :isCollapsed="isIncludesGroupIds(group.id)"
            :isControlContent="isControlContent"
            @saveGroup="saveGroup"
            @removeGroup="removeGroup"
            @toggleTasks="toggleTasks"
            @toggleAllTasks="toggleAllTasks"
            @moveToBoard="moveToBoard"
            @addColumn="addColumn"
          />
          <task-list
            :isSelected="isSelected"
            v-if="!isIncludesGroupIds(group.id)"
            :group="group"
            @saveTask="saveTask"
            @deleteTask="deleteTask"
            @saveComment="saveComment"
            @setSelected="setSelected"
            @saveBoardCol="saveBoardCol"
          />
          <!-- <group-task-summary :group="group" /> -->
        </li>
      </draggable>
    </ul>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import taskList from '@/components/task-list/task-list';
import groupHeader from '@/components/group-header/group-header';
// import groupTaskSummary from '@/components/task-cmps/group-task-summary';

export default {
  name: 'groupList',
  props: {
    board: {
      type: Object,
      required: true,
    },
    boards: {
      type: Array,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    isControlContent: {
      type: Boolean,
    },
  },
  data() {
    return {
      groupsToCollapse: [],
      activeBoard: null,
    };
  },
  created() {
    this.activeBoard = this.$store.getters.activeBoard;
  },
  methods: {
    handleChange() {
      return this.$store.dispatch({
        type: 'saveBoard',
        board: this.activeBoard,
      });
    },
    saveBoardCol(details) {
      console.log('details from GROUP LIST!!!!!!', details);
      this.$emit('saveBoardCol', details);
    },
    saveGroup(group) {
      this.$emit('saveGroup', group);
    },
    removeGroup(group) {
      this.$emit('removeGroup', group);
    },
    moveToBoard(moveDetails) {
      this.$emit('moveToBoard', moveDetails);
    },
    saveTask(task, groupId) {
      const details = { task, groupId };
      this.$emit('saveTask', details);
    },
    deleteTask(task, groupId) {
      this.$emit('deleteTask', task, groupId);
    },
    saveComment(details) {
      this.$emit('saveComment', details);
    },
    toggleTasks(id) {
      if (this.groupsToCollapse.includes(id)) {
        const foundIdx = this.groupsToCollapse.findIndex((idx) => idx === id);
        if (foundIdx >= 0) this.groupsToCollapse.splice(foundIdx, 1);
      } else this.groupsToCollapse.push(id);
    },
    toggleAllTasks() {
      this.groupsToCollapse = this.board.groups.map(({ id }) => id);
    },
    isIncludesGroupIds(id) {
      return this.groupsToCollapse.includes(id);
    },
    setSelected(task, boolean) {
      this.$emit('setSelected', task, boolean);
    },
    addColumn(columnType) {
      this.$emit('addColumn', columnType);
    },
  },
  computed: {
    groups() {
      return this.board.groups;
    },
  },
  components: {
    taskList,
    groupHeader,
    // groupTaskSummary,
    draggable,
  },
};
</script>
