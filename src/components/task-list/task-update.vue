<template>
  <section class="task-update slide-panel-updates">
    <header class="header-task-update flex column">
      <button class="btn btn-icon btn-close-panel" @click="closePanel">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="task-title-update" v-click-outside="() => (showEditTitle = false)">
        <div v-if="!showEditTitle" @click="toggleEditTitle">{{ task.title }}</div>
        <input v-else ref="editTitle" type="text" v-model="task.title" />
      </div>
      <div class="monday-board-subsets-tabs flex align-center">
        <div class="monday-board-subset-item">
          <button class="btn tab-btn" @click="openUpdate">Updates</button>
          <div class="board-subset-item__active-strip transition-enter-done"></div>
        </div>
        <!-- <div class="monday-board-subset-item">
          <button class="btn tab-btn" @click="openActivityLog">Activity Log</button>
        </div> -->
      </div>
    </header>
    <div v-if="isUpdate" class="update-container">
      <div class="post-top">
        <button v-if="!showTextarea" class="btn new-post-placeholder" @click="toggleTextarea">Write an update...</button>
        <div v-if="showTextarea" class="flex column">
          <textarea ref="updateTextarea" cols="30" rows="10" v-model="comment.txt" v-click-outside="() => (this.showTextarea = false)" />
          <button class="btn btn-update-panel" @click="saveComment">Update</button>
        </div>
      </div>
      <updates :user="user" :comments="taskCopy.comments" />
    </div>

    <!-- <div v-if="isActivityLog" class="activity-log-container">
      <div class="activity-log-navigation">
        <div><span>Other activities</span></div>
        <div class="activity-log-navigation-buttons">
          <button class="btn activity-log-btn">Integrations Activity</button>
          <button class="btn activity-log-btn">Automations Activity</button>
        </div>
      </div>
      <div class="board-log-filter">
        <div class="log-drop-down-filter">
          <button class="btn btn-blue">Filter Log</button>
        </div>
        <div class="log-person-filter">
          <div class="log-person-item">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span class="item-title">Person</span>
          </div>
        </div>
      </div>
      <ul v-if="board.activities">
        <li v-for="activity in board.activities" :key="activity.id">
          <div class="activity-box">
            <div class="time">
              <span>Time </span>
            </div>
            <div class="activity-and-user">
              <div class="user">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div class="task-title">
                <span>{{ task.title }}</span>
              </div>
            </div>
            <div class="additional-values">
              <div class="separator"></div>
              <div class="change-action">
                <div class="action">
                  <span>{{ activity.txt }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </section>
</template>

<script>
import Vue from 'vue';
// import userCircle from '../../components/surface-control/user-circle.vue';
import moment from 'moment';
import updates from '../panels/updates.vue';
import { utilService } from '../../services/util.service';
export default {
  name: 'taskUpdate',
  props: {
    task: {
      type: Object,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showTextarea: false,
      comment: null,
      showEditTitle: false,
      isUpdate: true,
      isActivityLog: false,
      user: this.$store.getters.user,
      moment: moment,
    };
  },
  created() {
    this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
  },
  computed: {
    taskCopy() {
      console.log('this.task', this.task);
      return JSON.parse(JSON.stringify(this.task));
    },
    createdAt() {
      return moment(this.comment.createdAt).fromNow('LT');
    },
  },
  methods: {
    saveComment() {
      this.showTextarea = false;
      if (!this.comment.txt) return;
      this.comment.byMember = { id: this.user._id, username: this.user.username };
      this.comment.createdAt = Date.now();
      this.comment.id = utilService.makeId();
      const details = { comment: this.comment, taskId: this.task.id };
      this.$emit('saveComment', details);
      if (!this.task.comments) this.task.comments = [];
      this.task.comments.push(this.comment);
      this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
    },
    toggleTextarea() {
      this.showTextarea = !this.showTextarea;
      if (this.showTextarea) {
        Vue.nextTick(() => this.$refs.updateTextarea.focus());
      }
    },
    closePanel() {
      this.$emit('closePanel');
    },
    toggleEditTitle() {
      this.showEditTitle = !this.showEditTitle;
      if (this.showEditTitle) {
        Vue.nextTick(() => this.$refs.editTitle.focus());
      }
    },
    openActivityLog() {
      this.isActivityLog = true;
      this.isUpdate = false;
    },
    openUpdate() {
      this.isActivityLog = false;
      this.isUpdate = true;
    },
  },
  components: {
    // userCircle,
    updates,
  },
};
</script>
