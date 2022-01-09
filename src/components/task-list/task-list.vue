<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list">
      <draggable @end="handleChange()" :list="tasks" group="tasks">
        <li v-for="task in tasks" :key="task.id" class="task-row flex align-center">
          <task-preview
            :isSelected="isSelected"
            :task="task"
            :styleObj="group.style"
            @saveTask="saveTask"
            @deleteTask="deleteTask"
            @saveComment="saveComment"
            @setSelected="setSelected"
            @saveBoardCol="saveBoardCol"
          />
        </li>
      </draggable>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import taskPreview from '@/components/task-list/task-preview';
import addTask from '@/components/task-list/add-task';
export default {
  name: 'taskList',
  props: {
    group: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      taskToEdit: null,
      showDialogNode: false,
      isEdit: false,
      showTaskMenu: false,
    };
  },
  methods: {
    showToConsole() {
      console.log('out');
    },
    handleChange() {
      return this.$store.dispatch({
        type: 'saveBoard',
        board: this.activeBoard,
      });
    },
    toggleDialogNode() {
      this.showDialogNode = !this.showDialogNode;
    },
    saveTask(task) {
      this.$emit('saveTask', task, this.group.id);
    },
    saveBoardCol(details) {
      this.$emit('saveBoardCol', details);
    },
    toggleShowTaskMenu() {
      this.showTaskMenu = !this.showTaskMenu;
    },
    setSelected(task, boolean) {
      this.$emit('setSelected', task, boolean);
    },
    deleteTask(task) {
      this.$emit('deleteTask', task, this.group.id);
    },
    saveComment(details) {
      details.groupId = this.group.id;
      this.$emit('saveComment', details);
    },
  },
  computed: {
    tasks() {
      return this.group.tasks;
    },
    activeBoard() {
      return this.$store.getters.activeBoard;
    },
  },
  watch: {},
  components: {
    taskPreview,
    addTask,
    draggable,
  },
};
</script>
