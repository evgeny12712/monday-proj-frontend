<template>
  <section class="group-menu-container">
    <div class="menu-item" @click="collapseThis">
      <div class="menu-icon-wrapper">
        <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true" class="icon_component menu-icon-svg icon_component--no-focus-style">
          <path
            d="M6.16376 4.22C5.99557 4.0151 5.68881 3.99367 5.48773 4.17497C5.28705 4.35499 5.26518 4.66771 5.43096 4.8775L5.4353 4.88299L7.63897 7.22958C7.72516 7.33476 7.85958 7.39844 8.00004 7.39844C8.14365 7.39844 8.27703 7.33229 8.36756 7.22211L10.5575 4.89136L10.5617 4.88617C10.6403 4.78767 10.6797 4.67416 10.6797 4.55638C10.6797 4.41287 10.6212 4.27286 10.5119 4.17474C10.3079 3.99078 10.0016 4.01836 9.82898 4.2282L8.00006 6.1483L6.16376 4.22Z"
            fill="currentColor"
          ></path>
          <path
            d="M9.83624 11.78C10.0044 11.9849 10.3112 12.0063 10.5123 11.825C10.713 11.645 10.7348 11.3323 10.569 11.1225L10.5647 11.117L8.36103 8.77042C8.27484 8.66524 8.14042 8.60156 7.99997 8.60156C7.85635 8.60156 7.72297 8.6677 7.63244 8.77788L5.44247 11.1086L5.43833 11.1138C5.35974 11.2123 5.32031 11.3258 5.32031 11.4436C5.32031 11.5871 5.37883 11.7271 5.48811 11.8253C5.69211 12.0092 5.99842 11.9816 6.17102 11.7718L7.99994 9.8517L9.83624 11.78Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14.125 8C14.125 11.3827 11.3827 14.125 8 14.125C4.61726 14.125 1.875 11.3827 1.875 8C1.875 4.61726 4.61726 1.875 8 1.875C11.3827 1.875 14.125 4.61726 14.125 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {{ collapseItemText }}
    </div>
    <div class="menu-item" @click="collapseAll">
      <div class="menu-icon-wrapper">
        <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true" class="icon_component menu-icon-svg icon_component--no-focus-style">
          <path
            d="M6.16376 4.22C5.99557 4.0151 5.68881 3.99367 5.48773 4.17497C5.28705 4.35499 5.26518 4.66771 5.43096 4.8775L5.4353 4.88299L7.63897 7.22958C7.72516 7.33476 7.85958 7.39844 8.00004 7.39844C8.14365 7.39844 8.27703 7.33229 8.36756 7.22211L10.5575 4.89136L10.5617 4.88617C10.6403 4.78767 10.6797 4.67416 10.6797 4.55638C10.6797 4.41287 10.6212 4.27286 10.5119 4.17474C10.3079 3.99078 10.0016 4.01836 9.82898 4.2282L8.00006 6.1483L6.16376 4.22Z"
            fill="currentColor"
          ></path>
          <path
            d="M9.83624 11.78C10.0044 11.9849 10.3112 12.0063 10.5123 11.825C10.713 11.645 10.7348 11.3323 10.569 11.1225L10.5647 11.117L8.36103 8.77042C8.27484 8.66524 8.14042 8.60156 7.99997 8.60156C7.85635 8.60156 7.72297 8.6677 7.63244 8.77788L5.44247 11.1086L5.43833 11.1138C5.35974 11.2123 5.32031 11.3258 5.32031 11.4436C5.32031 11.5871 5.37883 11.7271 5.48811 11.8253C5.69211 12.0092 5.99842 11.9816 6.17102 11.7718L7.99994 9.8517L9.83624 11.78Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14.125 8C14.125 11.3827 11.3827 14.125 8 14.125C4.61726 14.125 1.875 11.3827 1.875 8C1.875 4.61726 4.61726 1.875 8 1.875C11.3827 1.875 14.125 4.61726 14.125 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      Collapse all groups
    </div>
    <div class="menu-item" @click="addGroup">
      <div class="menu-icon-wrapper">
        <ion-icon name="add-circle-outline"></ion-icon>
      </div>
      Add group
    </div>
    <div class="menu-item" @click="duplicateGroup">
      <div class="menu-icon-wrapper">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Duplicate Board" class="icon_component icon_component--no-focus-style">
          <path
            d="M7.82576 3.7273C7.82576 3.58922 7.93769 3.47729 8.07576 3.47729H9.76937H13.1567C13.2184 3.47729 13.278 3.50016 13.3239 3.54147L15.94 5.89592C15.9927 5.94334 16.0227 6.01088 16.0227 6.08175V13.3637C16.0227 13.5017 15.9108 13.6137 15.7727 13.6137H8.07576C7.93769 13.6137 7.82576 13.5017 7.82576 13.3637V3.7273ZM8.07576 1.97729C7.10926 1.97729 6.32576 2.7608 6.32576 3.7273V4.88639H5.16667C4.20017 4.88639 3.41667 5.66989 3.41667 6.63639V16.2727C3.41667 17.2392 4.20018 18.0228 5.16667 18.0228H11.8939C12.8604 18.0228 13.6439 17.2392 13.6439 16.2727V15.1137H15.7727C16.7392 15.1137 17.5227 14.3302 17.5227 13.3637V6.08175C17.5227 5.58565 17.3122 5.11286 16.9434 4.78098L14.3274 2.42653C14.006 2.13732 13.589 1.97729 13.1567 1.97729H9.76937H8.07576ZM12.1439 15.1137H8.07576C7.10927 15.1137 6.32576 14.3302 6.32576 13.3637V6.38639H5.16667C5.0286 6.38639 4.91667 6.49831 4.91667 6.63639V16.2727C4.91667 16.4108 5.0286 16.5227 5.16667 16.5227H11.8939C12.032 16.5227 12.1439 16.4108 12.1439 16.2727V15.1137Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      Duplicate this group
    </div>
    <div class="menu-item move-to-dropdown-clickable" @click="moveTo" v-if="boards.length > 1">
      <div class="menu-icon-wrapper">
        <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true" class="icon_component menu-icon-svg icon_component--no-focus-style">
          <path
            d="M6.16376 4.22C5.99557 4.0151 5.68881 3.99367 5.48773 4.17497C5.28705 4.35499 5.26518 4.66771 5.43096 4.8775L5.4353 4.88299L7.63897 7.22958C7.72516 7.33476 7.85958 7.39844 8.00004 7.39844C8.14365 7.39844 8.27703 7.33229 8.36756 7.22211L10.5575 4.89136L10.5617 4.88617C10.6403 4.78767 10.6797 4.67416 10.6797 4.55638C10.6797 4.41287 10.6212 4.27286 10.5119 4.17474C10.3079 3.99078 10.0016 4.01836 9.82898 4.2282L8.00006 6.1483L6.16376 4.22Z"
            fill="currentColor"
          ></path>
          <path
            d="M9.83624 11.78C10.0044 11.9849 10.3112 12.0063 10.5123 11.825C10.713 11.645 10.7348 11.3323 10.569 11.1225L10.5647 11.117L8.36103 8.77042C8.27484 8.66524 8.14042 8.60156 7.99997 8.60156C7.85635 8.60156 7.72297 8.6677 7.63244 8.77788L5.44247 11.1086L5.43833 11.1138C5.35974 11.2123 5.32031 11.3258 5.32031 11.4436C5.32031 11.5871 5.37883 11.7271 5.48811 11.8253C5.69211 12.0092 5.99842 11.9816 6.17102 11.7718L7.99994 9.8517L9.83624 11.78Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14.125 8C14.125 11.3827 11.3827 14.125 8 14.125C4.61726 14.125 1.875 11.3827 1.875 8C1.875 4.61726 4.61726 1.875 8 1.875C11.3827 1.875 14.125 4.61726 14.125 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div class="group-moveto-dropdown-icon-wrapper">
        Move to
        <group-menu-moveto-menu :boards="boards" :board="board" @moveToBoard="moveToBoard" v-if="isShowMovetoMenu" />
      </div>
    </div>
    <div class="menu-item" @click="changeColor">
      <div class="menu-icon-wrapper">
        <div class="menu-item-color-pick" :style="{ backgroundColor: groupColor }" />
      </div>
      Change color
    </div>
    <div class="menu-item" @click="removeGroup">
      <div class="menu-icon-wrapper">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Delete" class="icon_component icon_component--no-focus-style">
          <path
            d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      Delete group
    </div>
  </section>
</template>

<script>
import groupMenuMovetoMenu from './group-menu-moveto-menu.vue';
export default {
  name: 'groupMenu',
  props: {
    boards: {
      type: Array,
    },
    board: {
      type: Object,
    },
    groupColor: {
      type: String,
    },
    isCollapsed: {
      type: Boolean,
    },
  },
  data() {
    return {
      isShowMenu: false,
      isShowMovetoMenu: false,
    };
  },
  created() {},
  computed: {
    collapseItemText() {
      return this.isCollapsed ? 'Expand this group' : 'Collapse this group';
    },
  },
  methods: {
    collapseThis() {
      this.$emit('toggleTasks');
    },
    collapseAll() {
      this.$emit('toggleAllTasks');
    },
    addGroup() {
      this.$emit('addGroup');
    },
    duplicateGroup() {
      this.$emit('duplicateGroup');
    },
    moveTo() {
      this.$emit('moveTo');
    },
    changeColor() {
      this.$emit('changeColor');
    },
    removeGroup() {
      this.$emit('removeGroup');
    },
    moveToBoard(board) {
      this.$emit('moveToBoard', board);
    },
  },
  components: {
    groupMenuMovetoMenu,
  },
};
</script>
