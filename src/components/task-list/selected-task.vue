<template>
  <section class="selected-menu flex align-center">
    <div class="num-of-selected">
      <span>{{ tasks.length }}</span>
    </div>
    <div class="title-section flex column">
      <div class="title-selected"><span>Task selected</span></div>
      <div class="pulses-dots flex align-center">
        <div v-for="task in tasks" :key="task.id" class="dot-num">
          <span>.</span>
        </div>
      </div>
    </div>
    <div class="duplicate-action">
      <div class="task-action" @click="duplicateTaskSelected">
        <button class="btn btn-icon icon-selected">
          <!-- <font-awesome-icon icon="copy" /> -->
          <i class="el-icon-copy-document"></i>
          <span class="task-action-name">Duplicate</span>
        </button>
      </div>
    </div>
    <div class="task-action">
      <button class="btn btn-icon icon-selected" @click="deleteTaskSelected">
        <!-- <font-awesome-icon icon="trash" /> -->
        <i class="el-icon-delete"></i>

        <span class="task-action-name">Delete</span>
      </button>
    </div>
    <div class="exit-action flex" @click="close">
      <button class="btn btn-icon exit-btn">
        <i class="el-icon-close"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'selectedTask',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showMoveToOptions: false,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    deleteTaskSelected() {
      this.$emit('deleteTaskSelected', this.tasks);
    },
    duplicateTaskSelected() {
      this.$emit('duplicateTaskSelected', this.tasks);
    },
  },
};
</script>
