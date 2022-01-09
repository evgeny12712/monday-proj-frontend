<template>
  <div class="dropdown-modal picker-dropdown-component flex" @keyup.esc="closePopup">
    <div class="picker-dropdown-inner-container flex column space-between" v-click-outside="closePopup">
      <div v-if="!showEditModal" class="status-list" v-click-outside="closePopup">
        <div v-for="(opt, idx) in optsCopy" :key="idx" :style="getOptStyle(opt)" class="dropdown-inner-container" @click="update(opt)">
          <div class="picker-opt-container flex align-center">
            <span>{{ opt.display }}</span>
          </div>
        </div>
      </div>
      <div v-else class="dropdown-inner-container label-picker-colors-editing flex column align-center">
        <div class="labels-list">
          <div v-for="(opt, idx) in optsCopy" :key="idx" class="color-opt-editing flex align-center">
            <div class="icon-box drag-box-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-hero-drag" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div class="input-wrapper flex align-center">
              <div class="color-box btn" :style="getOptStyle(opt)"></div>
              <div class="label-input text-cmp">
                <input type="text" v-model="opt.display" @change="saveLabel(opt)" @keyup.enter="saveLabel(opt)" />
              </div>
            </div>
            <div class="btn btn-delete-status" @click="deleteLabel(opt)">
              <button class="btn btn-icon">
                <font-awesome-icon icon="times-circle" />
              </button>
            </div>
          </div>
        </div>

        <div class="new-label-container" @click="addNewLabel" :style="newLabelStyle">
          <span class="">New Label</span>
        </div>
        <label-color-palette v-model="clr" @selectColor="selectColor" @changeClr="changeClr" />
      </div>
      <div class="picker-dropdown-footer flex align-center" :class="{ editing: showEditModal }">
        <button v-if="!showEditModal" class="btn" @click="toggleEditModal">Add/Edit Labels</button>
        <button v-else class="btn" @click="apply">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../../services/util.service.js';
import labelColorPalette from '../../group-header/color-platte/label-color-palette';
export default {
  name: 'labelsPopup',
  props: {
    opts: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      showEditModal: false,
      clr: null,
      labelToEdit: null,
      optsCopy: null,
    };
  },
  watch: {
    opts: {
      handler() {
        this.labelToEdit = JSON.parse(JSON.stringify(this.$store.getters.labelToEdit));
        this.optsCopy = JSON.parse(JSON.stringify(this.opts));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closePopup() {
      console.log('close');
      this.$emit('close');
    },
    addNewLabel() {
      console.log('new label');
      const clrs = this.$store.getters.labelClrs;
      const clr = clrs[utilService.getRandomInt(0, clrs.length - 1)];
      this.selectColor(clr);
    },
    apply(opt) {
      this.$emit('apply', opt);
      this.$emit('close');
    },
    getOptStyle(opt) {
      return opt.style;
    },
    update(opt) {
      this.$emit('update', opt);
    },
    toggleEditModal() {
      this.showEditModal = !this.showEditModal;
    },
    selectColor(color) {
      this.labelToEdit.style.backgroundColor = color;
      this.$emit('saveLabel', this.labelToEdit);
      this.optsCopy.push(this.labelToEdit);
      this.labelToEdit = JSON.parse(JSON.stringify(this.$store.getters.labelToEdit));
    },
    changeClr(clr) {
      this.clr = clr;
    },
    deleteLabel(opt) {
      console.log('delete !!', opt);
      this.$emit('delete', opt);
    },
    saveLabel(label) {
      this.$emit('saveLabel', label);
    },
  },
  computed: {
    newLabelStyle() {
      return this.clr ? { backgroundColor: this.clr, color: '#fff', border: '0px' } : { 'transition-duration': '0s' };
    },
  },
  components: { labelColorPalette },
};
</script>
