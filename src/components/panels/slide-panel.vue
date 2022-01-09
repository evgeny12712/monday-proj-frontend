<template>
  <section class="slide-panel">
    <header class="header-slide-panel flex column">
      <el-tooltip class="item" effect="dark" content="Escape" placement="left">
        <button class="btn-close-panel" @click="closePanel">X</button>
      </el-tooltip>
      <div class="slide-panel-title-wrapper">
        <span class="slide-panel-title">{{ board.title }}</span>
        <span v-if="tabs.isActivity" class="slide-panel-title-log"> Log</span>
        <span v-if="tabs.isUpdate" class="slide-panel-title-log"> Updates</span>
      </div>
      <nav class="tabs-wrapper flex align-center">
        <ul class="tabs-list flex align-items">
          <!-- <li>
            <span class="tab-title" :class="{ 'is-selected': tabs.isActivity }" @click="toggleSection('activity')"> Activity </span>
          </li> -->
          <li>
            <span class="tab-title" :class="{ 'is-selected': tabs.isUpdate }" @click="toggleSection('update')"> Updates </span>
          </li>
        </ul>
      </nav>
    </header>
    <!-- <section v-if="tabs.isActivity" class="board-log-container flex">
      <ul v-if="board.activities">
        <li v-for="activity in board.activities" :key="activity.id">
          <div class="activity-row-wrapper">
            <div class="activity-row">
              <div class="time-wrapper flex">
                <span class="icon-wrapper flex">
                  <ion-icon name="time-outline"></ion-icon>
                </span>
                <span>
                  {{ creationTime(activity.createdAt) }}
                </span>
              </div>
              <div class="by-user flex align-center gap">
                <div class="user-icon">
                  <user-circle :isFromSurface="false" :user="activity.byUser" />
                </div>
                <div v-if="activity.byUser">
                  {{ activity.byUser.username }}
                </div>
                <div v-else>Guest</div>
              </div>
              <div v-if="activity.updatedData">
                {{ activity.updatedData.title }}
              </div>
              <div v-else>Data removed</div>
              <div class="additional-values">
                <div class="separator"></div>
                <div class="change-action">
                  <div class="action">
                    <span>{{ activity.txt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section> -->
    <section v-if="tabs.isUpdate" class="update-container">
      <updates :user="user" :comments="comments" />
    </section>
  </section>
</template>

<script>
// import userCircle from '../surface-control/user-circle.vue';
import moment from 'moment';
import updates from '../panels/updates.vue';
export default {
  name: 'slide-panel',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updateMsg: '',
      showTextarea: false,
      comment: null,
      showEditTitle: false,
      tabs: {
        isActivity: false,
        isUpdate: true,
      },
      user: this.$store.getters.user,
    };
  },
  created() {
    console.log('board.activities', this.board.activities);
    this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
  },
  computed: {
    boardCopy() {
      console.log('this.board', this.board);
      return JSON.parse(JSON.stringify(this.board));
    },
    comments() {
      let comments = [];
      if (this.board.groups.length) {
        let groups = this.board.groups.map((group) => group);
        console.log('groups', groups);
        let tasks = groups
          .map((group) => {
            if (group.tasks && group.tasks.length) {
              return group.tasks;
            }
          })
          .flat();
        console.log('tasks', tasks);
        comments = tasks
          .map((task) => {
            if (task) {
              if (task.comments && task.comments.length) {
                return task.comments;
              }
            }
          })
          .flat()
          .filter((comment) => comment);
      }
      return comments;
    },
  },
  methods: {
    closePanel() {
      this.$emit('closeSlidePanel');
    },
    toggleSection(type) {
      switch (type) {
        case 'activity':
          this.tabs.isActivity = true;
          this.tabs.isUpdate = false;
          this.tabs.isLastViewed = false;
          break;
        case 'last-viewed':
          this.tabs.isActivity = false;
          this.tabs.isUpdate = false;
          this.tabs.isLastViewed = true;
          break;
        case 'update':
          this.tabs.isActivity = false;
          this.tabs.isUpdate = true;
          this.tabs.isLastViewed = false;
          break;
      }
    },
    creationTime(createdAt) {
      return moment(createdAt).fromNow('LT');
    },
  },
  components: {
    // userCircle,
    updates,
  },
};
</script>
