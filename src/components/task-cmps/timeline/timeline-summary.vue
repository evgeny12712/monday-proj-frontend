<template>
  <div class="grid-cell-component-wrapper timeline-summary-container" :style="{ width: info.data.style.maxWidth }">
    <div class="col-cell summary-container" :hovercontents="hoverContent" :style="info.data.style">
      <div class="date-box timeline-bar-component" :class="{ filled: isFilled }" @click="toggleOptions" :style="timelineStyle">
        <span class="timeline-value" :hovercontents="hoverContent" :contents="dateForDisplay"> </span>
      </div>
      <!-- modal -->
      <!-- <div v-if="showOptions" class="dropdown-modal">
				<div v-for="(opt, idx) in dropdownOpts" :key="idx" class="input-wrapper">
					<label for="">{{ opt }}</label>
					<input type="radio" />
				</div>
			</div> -->
    </div>
  </div>
</template>

<script>
import { utilService } from '../../../services/util.service.js';
// import customDropdown from '@/components/custom-components/custom-dropdown';
export default {
  name: 'timelineSummary',
  props: ['info'],
  data() {
    return {
      selected: {},
      showOptions: false,
      isFilled: false,
      datesSorted: null,
      hoverContent: '',
      showBy: '',
      dropdownOpts: ['Earliest to Latest', 'Earliest', 'Latest'],
      timelineStyle: null,
    };
  },
  created() {
    this.datesSorted = this.info.group.tasks
      .reduce((acc, task) => {
        if (task?.timelinePicker) acc.push(...task.timelinePicker.dates);
        return acc;
      }, [])
      .sort((a, b) => a - b);
    const dayCount = Math.floor(Math.abs(this.datesSorted[0] - this.datesSorted[this.datesSorted.length - 1]) / (1000 * 60 * 60 * 24));
    this.hoverContent = dayCount ? `${dayCount}d` : '-';
    this.isFilled = dayCount ? true : false;
    if (dayCount) {
      const now = Date.now();

      const earliestDate = Math.min(this.datesSorted[0], this.datesSorted[this.datesSorted.length - 1]);
      const diff = earliestDate - now;
      if (diff < 0) {
        const daysPassed = Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));
        const pers = (daysPassed * 100) / dayCount;
        const groupColor = this.info.group.style.clr;
        this.timelineStyle = {
          background: `linear-gradient(to right, ${groupColor} ${pers}%, rgb(28, 31, 59) ${pers}%)`,
        };
      }
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
  computed: {
    dateForDisplay() {
      if (!this.datesSorted || !this.datesSorted.length) return '-';
      const dates = this.datesSorted;
      const [date1, date2] = [new Date(dates[0]), new Date(dates[dates.length - 1])];

      const date1MonthStr = utilService.months[date1.getMonth()];
      const date2MonthStr = utilService.months[date2.getMonth()];
      return `${date1MonthStr.substring(0, 3)} ${date1.getDate()} - ${date1.getMonth() === date2.getMonth() ? '' : date2MonthStr.substring(0, 3)}${date2.getDate()}`;
    },
  },
  components: {
    // customDropdown,
  },
};
</script>
