<template>
  <div class="grid-cell-component-wrapper picker-component" :class="{ 'dropdown-open': showOptions }" :style="{ width: info.data.style.maxWidth }">
    <div v-if="styleObj" class="col-cell" :style="info.data.style" @mouseover="fold = true" @mouseleave="fold = false">
      <div class="status-picker-txt flex align-center" :style="styleObj" @click="toggleStatusPicker">
        <span class="fold-triangle"></span>
        <span>{{ infoForDisplay }} </span>
      </div>
    </div>
    <labels-popup v-if="showOptions" :opts="optsCopy" @update="update" @saveLabel="saveLabel" @delete="deleteLabel" @close="toggleStatusPicker" />
  </div>
</template>

<script>
import labelsPopup from '../label/labels-popup.vue';
export default {
  name: 'statusPicker',
  props: ['info'],

  data() {
    return {
      styleObj: null,
      showOptions: false,
      selected: {},
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
      this.toggleStatusPicker();
    },
    toggleStatusPicker() {
      this.showOptions = !this.showOptions;
    },
    async saveLabel(label) {
      const details = { type: 'statusPicker', label };
      this.$store.dispatch({ type: 'saveLabel', details });
    },
    async deleteLabel(label) {
      const details = { type: 'statusPicker', label };
      this.$store.dispatch({ type: 'deleteLabel', details });
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
