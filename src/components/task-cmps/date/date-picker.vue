<template>
  <div class="grid-cell-component-wrapper date-picker-container" :style="{ width: info.data.style.maxWidth }" :class="{ 'is-selected': isSelected }">
    <div class="col-cell" @click="toggleSelected">
      <div class="date-box" :style="info.data.style">
        <div class="date-txt-box">
          <span>{{ dateForDisplay }}</span>
        </div>
        <date-picker-table :info="infoToSend" @change="update" v-click-outside="closeSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../../services/util.service';
import datePickerTable from './date-picker-table.vue';

export default {
  name: 'datePicker',
  props: ['info'],

  data() {
    return {
      selectedCopy: {},
      isSelected: false,
    };
  },
  watch: {
    info: {
      handler() {
        this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    toggleSelected() {
      this.isSelected = !this.isSelected;
    },
    closeSelected() {
      this.isSelected = false;
    },
    update(dueDate) {
      this.$emit('update', { dueDate: +dueDate });
    },
  },
  computed: {
    dateForDisplay() {
      if (!this.selectedCopy.dueDate) return '';
      const date = new Date(this.selectedCopy.dueDate);
      const dateMonthStr = utilService.months[date.getMonth()];
      return `${dateMonthStr.substring(0, 3)} ${date.getDate()} `;
    },
    infoToSend() {
      return { date: this.selectedCopy.dueDate, isRange: false };
    },
  },
  components: {
    datePickerTable,
  },
};
</script>
