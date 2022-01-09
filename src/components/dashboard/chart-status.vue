<script>
import { Bar } from 'vue-chartjs';
export default {
  name: 'chartStatus',
  extends: Bar,
  data() {
    return {
      groups: null,
      dataStatus: null,
      taskPerGroupCount: null,
      labels: null,
    };
  },
  created() {
    const board = this.$store.getters.activeBoard;
    // const cols = this.$store.getters.cols;
    // const keys = cols
    //   .find(({ type }) => type === 'statusPicker')
    //   ?.data.opts.flatMap(({ display }) => display);
    this.groups = board.groups;
    this.dataStatus = this.groups
      .flatMap(({ tasks }) => tasks)
      .reduce((acc, task) => {
        if (task?.statusPicker) {
          const keyName = task.statusPicker.display;
          if (!acc[keyName]) acc[keyName] = 0;
          acc[keyName]++;
        } else {
          if (!acc.empty) acc.empty = 0;
          acc.empty++;
        }
        return acc;
      }, {});
    this.taskPerGroupCount = this.groups.reduce((acc, group) => {
      acc[group.id] = group.tasks.length;
      return acc;
    }, {});
    console.log(
      this.dataStatus.Done,
      this.dataStatus.empty,
      this.dataStatus.Stuck
    );
    // this.labels = this.groups.flatMap(({ tasks }) => tasks);
    // const temp = this.labels.flatMap(({ statusPicker }) => statusPicker);
    // console.log(temp.forEach(({ display }) => display));
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Working on it', 'Done', 'Stuck', 'No status'],
      datasets: [
        {
          label: 'Status',
          backgroundColor: ['#fdab3d', '#00c875', '#e2445c', '#c3c3c3'],
          data: [
            this.dataStatus,
            this.dataStatus.Done,
            this.dataStatus.Stuck,
            this.dataStatus.empty,
          ],
        },
      ],
    });
  },
};
</script>
