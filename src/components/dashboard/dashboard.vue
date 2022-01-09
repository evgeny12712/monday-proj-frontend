<template>
  <div class="dashboard flex align-center column">
    <div class="data-container flex">
      <div class="group-data box flex align-center">
        <div class="group-icon icon flex">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="icon-svg">
            <path
              d="M16 4.5H7.5L7.5 15.5H16C16.2761 15.5 16.5 15.2761 16.5 15V5C16.5 4.72386 16.2761 4.5 16 4.5ZM4 4.5H6L6 15.5H4C3.72386 15.5 3.5 15.2761 3.5 15V5C3.5 4.72386 3.72386 4.5 4 4.5ZM4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM15 14V9H9V14H15Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="header-chart header flex column">
          <p class="data-nums">{{ activeBoard.groups.length }}</p>
          <p>Groups</p>
        </div>
      </div>
      <div class="person-data box flex align-center">
        <div class="person-icon icon flex">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="icon-svg">
            <path
              d="M9.81628 2C8.63228 2 7.49677 2.47034 6.65955 3.30756C5.82234 4.14477 5.352 5.28028 5.352 6.46429C5.352 7.64829 5.82234 8.7838 6.65955 9.62101C7.49677 10.4582 8.63228 10.9286 9.81628 10.9286C11.0003 10.9286 12.1358 10.4582 12.973 9.62101C13.8102 8.7838 14.2806 7.64829 14.2806 6.46429C14.2806 5.28028 13.8102 4.14477 12.973 3.30756C12.1358 2.47034 11.0003 2 9.81628 2ZM7.72021 4.36822C8.27613 3.81231 9.0301 3.5 9.81628 3.5C10.6025 3.5 11.3564 3.81231 11.9123 4.36822C12.4683 4.92413 12.7806 5.67811 12.7806 6.46429C12.7806 7.25046 12.4683 8.00444 11.9123 8.56035C11.3564 9.11626 10.6025 9.42857 9.81628 9.42857C9.0301 9.42857 8.27613 9.11626 7.72021 8.56035C7.1643 8.00444 6.852 7.25046 6.852 6.46429C6.852 5.67811 7.1643 4.92413 7.72021 4.36822ZM9.81629 11.7202C8.08836 11.7202 6.40482 12.2674 5.00718 13.2835C3.60954 14.2995 2.56962 15.7321 2.03658 17.3758C1.96255 17.6041 2.00224 17.854 2.14337 18.0482C2.28449 18.2423 2.51 18.3572 2.75001 18.3572H16.8826C17.1226 18.3572 17.3481 18.2423 17.4892 18.0482C17.6303 17.854 17.67 17.6041 17.596 17.3758C17.063 15.7321 16.023 14.2995 14.6254 13.2835C13.2278 12.2674 11.5442 11.7202 9.81629 11.7202ZM5.8892 14.4968C7.03051 13.6671 8.40527 13.2202 9.81629 13.2202C11.2273 13.2202 12.6021 13.6671 13.7434 14.4968C14.5964 15.1169 15.2863 15.927 15.7621 16.8572H3.87051C4.34632 15.927 5.03617 15.1169 5.8892 14.4968Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="header-chart header flex column">
          <p class="data-nums">3</p>
          <p>Persons</p>
        </div>
      </div>
      <div class="tasks-data box flex align-center">
        <div class="item-icon icon flex">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="icon-svg">
            <path
              d="M16 4.5H7.5L7.5 15.5H16C16.2761 15.5 16.5 15.2761 16.5 15V5C16.5 4.72386 16.2761 4.5 16 4.5ZM4 4.5H6L6 15.5H4C3.72386 15.5 3.5 15.2761 3.5 15V5C3.5 4.72386 3.72386 4.5 4 4.5ZM4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM15 9V7L9 7V9H15Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="header-chart header flex column">
          <p class="data-nums">{{ tasks.length }}</p>
          <p>Tasks</p>
        </div>
      </div>
      <div class="update-data box flex align-center">
        <div class="update-icon icon flex">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="icon-svg">
            <path
              d="M9.98296 1.97614C7.85942 1.97614 5.82285 2.81971 4.32128 4.32128C2.81971 5.82285 1.97614 7.85942 1.97614 9.98296C1.97614 12.1065 2.81971 14.1431 4.32128 15.6446C5.82285 17.1462 7.85942 17.9898 9.98296 17.9898C12.1065 17.9898 14.1431 17.1462 15.6446 15.6446C17.1462 14.1431 17.9898 12.1065 17.9898 9.98296C17.9898 7.85942 17.1462 5.82285 15.6446 4.32128C14.1431 2.81971 12.1065 1.97614 9.98296 1.97614ZM5.38194 5.38194C6.6022 4.16167 8.25724 3.47614 9.98296 3.47614C11.7087 3.47614 13.3637 4.16167 14.584 5.38194C15.8042 6.6022 16.4898 8.25724 16.4898 9.98296C16.4898 11.7087 15.8042 13.3637 14.584 14.584C13.3637 15.8042 11.7087 16.4898 9.98296 16.4898C8.25724 16.4898 6.6022 15.8042 5.38194 14.584C4.16167 13.3637 3.47614 11.7087 3.47614 9.98296C3.47614 8.25724 4.16167 6.6022 5.38194 5.38194ZM7.29283 10.7453L8.48668 7.76067L10.3736 13.1057L10.3737 13.1058C10.4523 13.3285 10.5933 13.524 10.7798 13.669C10.9663 13.814 11.1905 13.9024 11.4257 13.9237C11.661 13.945 11.8974 13.8983 12.1069 13.7892C12.3165 13.6801 12.4902 13.5131 12.6076 13.3081L12.6078 13.3079L13.8044 11.2168H15.3047C15.7189 11.2168 16.0547 10.881 16.0547 10.4668C16.0547 10.0526 15.7189 9.71676 15.3047 9.71676H13.3695C13.1005 9.71676 12.8521 9.8608 12.7185 10.0943L11.5946 12.0583L9.66458 6.59126L9.66381 6.58909C9.57982 6.35351 9.4262 6.14904 9.2233 6.0028C9.02041 5.85656 8.77785 5.77547 8.5278 5.77029C8.27775 5.76511 8.03204 5.83609 7.82327 5.9738C7.61449 6.11151 7.45253 6.30945 7.35887 6.54134L7.35886 6.54134L7.35793 6.54368L6.08869 9.71676H4.66132C4.2471 9.71676 3.91132 10.0526 3.91132 10.4668C3.91132 10.881 4.2471 11.2168 4.66132 11.2168H6.59647C6.90315 11.2168 7.17893 11.0301 7.29283 10.7453Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="header-chart header flex column">
          <p class="data-nums">{{ activeBoard.activities.length }}</p>
          <p>Activities</p>
        </div>
      </div>
    </div>
    <div class="charts-container flex align-center">
      <div class="chart-box flex column">
        <chartStatus class="chart" />
      </div>
      <div class="chart-box flex column">
        <chartTask class="chart" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import chartStatus from '@/components/dashboard/chart-status.vue';
import chartTask from '@/components/dashboard/chart-task.vue';

export default {
  name: 'dashboard',
  props: {
    activeBoard: {
      type: Object,
      requierd: true,
    },
  },
  data() {
    return {
      tasks: this.activeBoard.groups.flatMap(({ tasks }) => tasks),
      //   activities: this.activeBoard.activites,
    };
  },
  components: {
    chartStatus,
    chartTask,
  },
};
</script>
<style scoped></style>
