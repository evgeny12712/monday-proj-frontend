<template>
  <div class="grid-cell-component-wrapper status-summary-container" :style="{ width: info.data.style.maxWidth }">
    <div class="col-cell flex summary-container align-center">
      <div class="battery-container flex align-center">
        <div
          class="summary-cell"
          v-if="!taskLen"
          :style="{
            width: '100%',
            backgroundColor: defaultStyle.backgroundColor,
          }"
        ></div>
        <custom-tool-tip v-else v-for="(key, value, idx) in statusPickerLabelCount" :key="idx" class="summary-cell" :style="getStyle(key, value)" :info="getToolTipInfo(getContentToolTip(key, value))">
          <div class="summary-cell"></div>
        </custom-tool-tip>
      </div>
    </div>
  </div>
</template>

<script>
import customToolTip from '../../custom-components/custom-tool-tip';
export default {
  name: 'statusSummary',
  props: ['info'],
  data() {
    return {
      statusPickerLabelCount: null,
      taskLen: this.info.group.tasks.length,
      defaultStyle: null,
    };
  },
  watch: {
    info: {
      handler() {
        this.opts = this.info.data.opts;
        this.statusPickerLabelCount = this.info.group.tasks.reduce((acc, task) => {
          if (task.statusPicker) {
            if (acc[task.statusPicker.id]) acc[task.statusPicker.id].count++;
            else {
              acc[task.statusPicker.id] = {
                count: 1,
                name: task.statusPicker.name,
                backgroundColor: task.statusPicker.style.backgroundColor,
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
    getStyle(key, id = '') {
      const width = (key.count * 100) / this.taskLen + '%';
      let backgroundColor;
      if (!id || id === 'default') backgroundColor = this.defaultStyle.backgroundColor;
      else backgroundColor = this.opts.find((opt) => opt.id === id)?.style?.backgroundColor;

      return { width, backgroundColor };
    },
    getContentToolTip({ count, name }) {
      const percentage = (count * 100) / this.taskLen;
      const [beforeDot, afterDot] = `${percentage}`.split('.');
      let disPercentage = `${beforeDot}${!afterDot ? '' : `.${afterDot[0]}`}`;
      return `${name} ${count}/${this.taskLen} ${disPercentage}%`;
    },
    getPerc(count) {
      return (count * 100) / this.taskLen;
    },
    getToolTipInfo(content = '', placement = 'top') {
      return { orientation: 'top', content, placement };
    },
  },
  components: { customToolTip },
};
</script>
