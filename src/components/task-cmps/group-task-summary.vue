<template>
  <div class="group-task-summary grid-row-component flex align-center space-between">
    <!-- <div class="sticky-feature"> -->
    <!-- sticky-feature -->
    <div class="grid-cell-row-component-header">
      <div class="floating-cell"></div>
    </div>
    <!-- </div> -->
    <div v-if="cmps" class="grid-cells-row-component" :style="{ width: '992px' }">
      <component v-for="(cmp, idx) in cmps" :key="idx" :is="cmp.type" :info="getCmpInfo(cmp)" />
    </div>
    <!-- <div class="space-item"></div> -->
  </div>
</template>
<script>
import statusSummary from './status/status-summary';
import prioritySummary from './priority/priority-summary';
import dateSummary from './date/date-summary';
import timelineSummary from './timeline/timeline-summary';
import memberSummary from './member/member-summary';
import tagSummary from './tag/tag-summary';
export default {
  name: 'groupTaskSummary',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cmps: null,
    };
  },

  created() {
    const cols = JSON.parse(JSON.stringify(this.$store.getters.cols));
    this.cmps = cols.map((cur) => {
      const prevType = cur.type;
      cur.type = prevType.replace('Picker', 'Summary');
      return cur;
    });
  },
  methods: {
    getCmpInfo(cmp) {
      return { group: this.group, data: cmp.data };
    },
  },
  components: {
    statusSummary,
    memberSummary,
    dateSummary,
    tagSummary,
    prioritySummary,
    timelineSummary,
  },
};
</script>
