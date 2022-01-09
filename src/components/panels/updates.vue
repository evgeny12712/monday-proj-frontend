<template>
  <section class="post-list-container flex align-center">
    <ul v-if="comments" class="post-list clean-list">
      <li v-for="comment in comments" :key="comment.id" class="post">
        <div class="post-title flex align-center">
          <user-circle :user="user" :isFromSurface="false" />
          <div class="member-name">
            <span v-if="comment.byMember.username">{{ comment.byMember.username }}</span>
            <span v-else>Guest</span>
          </div>
          <span class="task-update-createdAt">
            {{ moment(comment.createdAt).fromNow('LT') }}
          </span>
        </div>
        <div class="post-txt">
          <span>{{ comment.txt }}</span>
        </div>
      </li>
    </ul>
    <div v-else class="post-no-found flex column align-center">
      <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" />
      <span>No updates yet...</span>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import userCircle from '../surface-control/user-circle.vue';
export default {
  name: 'updates',
  props: {
    user: {
      type: Object,
    },
    comments: {
      type: Object,
    },
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    userCircle,
  },
};
</script>
