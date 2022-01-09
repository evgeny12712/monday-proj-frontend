<script>
import { Line } from 'vue-chartjs';
export default {
  extends: Line,
  name: 'chartTask',
  data() {
    return {
      groups: null,
      taskPerGroupCount: null,
      labels: null,
    };
  },
  created() {
    const board = this.$store.getters.activeBoard;
    this.groups = board.groups;
    this.taskPerGroupCount = this.groups.reduce((acc, group) => {
      acc[group.id] = group.tasks.length;
      return acc;
    }, {});
    this.labels = this.groups.map(({ title }) => title);
    // const data = this.taskPerGroupCount.map(({ id }) => id);
    // console.log(data);
    console.log(this.taskPerGroupCount);
  },
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'tasks per group',
          backgroundColor: '#c3c3c3',
          data: [this.taskPerGroupCount[0], this.taskPerGroupCount[1]],
        },
      ],
    });
  },
};
</script>
