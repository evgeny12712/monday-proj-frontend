<template>
  <section class="activity-log-container">
    <div class="activity-control-btns">
      <div
        class="filter-log-btn-container"
        :class="{ 'dropdown-open': showFilterMenu }"
      >
        <button
          class="btn btn-blue btn-size-small flex align-center"
          @click="toggleFilterMenu"
        >
          <span> Filter Log </span>
          <!-- <ion-icon name="chevron-down-outline" /> -->
        </button>
        <div v-if="showFilterMenu" class="filter-log-menu-container">
          <div class="filter-log-menu-title">
            <h2>Filter Log</h2>
            <span>Showing 5 activities</span>
          </div>
        </div>
      </div>
      <ul class="activity-log-list">
        <li
          v-for="activity in activities"
          :key="activity.id"
          class="activity-row"
        >
          <span class="">{{ timeForDisplay(activity.createdAt) }}</span>
          <!-- TODO: add user image -->
          <!-- <span class="user-img">{{ activity.byMember }}</span> -->
          <span class="task-title">{{ activity.task.title }}</span>
          <span class="">{{ activity.txt }}</span>
          <div class="flex align-center">
            <span class="">{{ activity.txt }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'activityLog',
  data() {
    return {
      showFilterMenu: false,
    };
  },
  created() {},
  computed: {},
  methods: {
    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu;
    },
    timeForDisplay(time) {
      return '1Day';
    },
  },
};
</script>
