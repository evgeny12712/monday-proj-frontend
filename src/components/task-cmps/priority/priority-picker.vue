<template>
  <div class="grid-cell-component-wrapper picker-component" :class="{ 'dropdown-open': showOptions }" :style="{ width: info.data.style.maxWidth }">
    <div class="col-cell" :style="info.data.style">
      <div v-if="styleObj" class="priority-picker-txt flex align-center" @mouseover="fold = true" @mouseleave="fold = false" :style="styleObj" @click="togglePriorityPicker">
        <span :class="{ 'fold-triangle': fold }"></span>
        <span>{{ infoForDisplay }} </span>
      </div>
    </div>
    <labels-popup v-click-outside="closeOptions" v-if="showOptions" :opts="optsCopy" @update="update" @saveLabel="saveLabel" @delete="deleteLabel" @close="closeOptions" />
  </div>
</template>

<script>
import labelsPopup from '../label/labels-popup.vue';

export default {
  name: 'priorityPicker',
  props: ['info'],

  data() {
    return {
      styleObj: null,
      showOptions: false,
      selected: {},
      opts: null,
      fold: false,
      optsCopy: null,
    };
  },
  watch: {
    info: {
      handler() {
        this.selected = this.info.selected;
        this.styleObj = this.selected.style;
        this.optsCopy = JSON.parse(JSON.stringify(this.info.data.opts));
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    update(opt) {
      this.$emit('update', opt);
      this.togglePriorityPicker();
    },
    togglePriorityPicker() {
      this.showOptions = !this.showOptions;
    },
    closeOptions() {
      this.showOptions = false;
    },
    async saveLabel(label) {
      const details = { type: 'priorityPicker', label };
      this.$store.dispatch({ type: 'saveLabel', details });
    },
    async deleteLabel(label) {
      const details = { type: 'priorityPicker', label };
      await this.$store.dispatch({ type: 'deleteLabel', details });
      const idx = this.optsCopy.findIndex(({ id }) => id === label.id);
      this.optsCopy.splice(1, idx);
    },
  },
  computed: {
    infoForDisplay() {
      return this.selected.display;
    },
  },
  components: {
    labelsPopup,
  },
};
</script>
