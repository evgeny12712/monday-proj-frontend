<template>
  <div class="grid-cell-component-wrapper priority-summary-container" :style="{ width: info.data.style.maxWidth }">
    <div class="col-cell flex summary-container align-center" :style="info.data.style">
      <div class="battery-container">
        <div
          class="summary-cell"
          v-if="!taskLen"
          :style="{
            width: '100%',
            backgroundColor: defaultStyle.backgroundColor,
          }"
        ></div>

        <custom-tool-tip
          v-else
          v-for="(key, value, idx) in priorityPickerLabelCount"
          :key="idx"
          class="summary-cell"
          :style="getStyle(key.count, value)"
          :info="getToolTipInfo(getContentToolTip(key, value))"
        >
          <div class="summary-cell"></div>
        </custom-tool-tip>
      </div>
    </div>
  </div>
</template>

<script>
import customToolTip from '../../custom-components/custom-tool-tip';

export default {
  name: 'prioritySummary',
  props: ['info'],
  data() {
    return {
      priorityPickerLabelCount: null,
      taskLen: this.info.group.tasks.length,
      defaultStyle: null,
    };
  },
  watch: {
    info: {
      handler() {
        this.opts = this.info.data.opts;
        this.priorityPickerLabelCount = this.info.group.tasks.reduce((acc, task) => {
          if (task.priorityPicker) {
            if (acc[task.priorityPicker.id]) acc[task.priorityPicker.id].count++;
            else {
              acc[task.priorityPicker.id] = {
                count: 1,
                name: task.priorityPicker.name,
              };
            }
          } else {
            if (acc.default) acc.default.count++;
            else acc.default = { count: 1, name: '' };
          }
          return acc;
        }, {});
        this.defaultStyle = this.info.data.default.style;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getStyle(count, id = '') {
      const width = (count * 100) / this.taskLen + '%';
      let backgroundColor;
      if (!id || id === 'default') backgroundColor = this.defaultStyle.backgroundColor;
      else backgroundColor = this.opts.find((opt) => opt.id === id)?.style?.backgroundColor;
      return { width, backgroundColor };
    },
    getContentToolTip({ count, name }) {
      const percentage = (count * 100) / this.taskLen;
      const [beforeDot, afterDot] = `${percentage}`.split('.');
      const disPercentage = `${beforeDot}${!afterDot ? '' : `.${afterDot[0]}`}`;
      return `${name} ${count}/${this.taskLen} ${disPercentage}%`;
    },
    getToolTipInfo(content = '', placement = 'top') {
      return { orientation: 'top', content, placement };
    },
  },
  computed: {},
  components: { customToolTip },
};
</script>
