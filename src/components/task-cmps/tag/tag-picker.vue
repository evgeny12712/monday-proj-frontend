<template>
  <div class="grid-cell-component-wrapper tag-picker-container" :class="{ 'dropdown-open': showOptions }" :style="{ width: info.data.style.maxWidth }">
    <div class="col-cell" @click="toggleOptions" :style="info.data.style">
      <div v-if="selectedCopy && selectedCopy.length && !showOptions" class="tags-container">
        <div v-for="(tag, idx) in selectedCopyTrimed" :key="idx" :style="tag.style" class="tag-txt-box">
          <span>
            {{ tagForDisplay(tag.txt) }}
          </span>
        </div>
        <div v-if="isMoreThan3" class="tags-counter-component">
          <span class="tags-counter-txt">+{{ tagsLeftCount }}</span>
        </div>
        <button class="btn btn-icon btn-add">
          <!-- <ion-icon name="plus-circle" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
          <!-- + -->
        </button>
      </div>
      <div v-if="showOptions" class="tags-editing-list-container">
        <div class="tag-item flex align-center" v-for="(tag, idx) in selectedCopy" :key="idx" :style="tag.style">
          <span class="tag">
            {{ tagForDisplay(tag.txt) }}
          </span>
          <button class="btn btn-icon btn-delete-tag" :style="tag.style" @click="remove(tag)">
            <i class="icon el-icon-error"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Edit/add dropdown-modal -->
    <div v-if="showOptions" class="dropdown-modal picker-dropdown-component" v-click-outside="closeOptions">
      <div class="picker-dropdown-inner-container flex space-between column">
        <div class="member-input-container">
          <input type="text" v-model="tagToEdit.txt" placeholder="Add tags" />
        </div>
        <div v-if="selectedCopy" class="tag-list">
          <div v-for="(tag, idx) in selectedCopy" :key="idx" :style="tag.style" class="dropdown-inner-container" @click="update(opt)">
            <span class="tag">
              {{ tagForDisplay(tag.txt) }}
            </span>
            <!-- <div class="picker-opt-container flex align-center">
							<span>{{ opt.txt }}</span>
						</div> -->
          </div>
        </div>
        <div class="picker-dropdown-footer flex align-center">
          <button class="btn" @click="saveBoardCol">+Create new tag</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../../../services/util.service';
export default {
  name: 'tagPicker',
  props: ['info'],
  data() {
    return {
      selectedCopy: null,
      opts: null,
      selectedCopyTrimed: null,
      showOptions: false,
      tagToEdit: { txt: '', style: { color: 'rgb(51,52,56)' }, id: '' },
      isMoreThan3: false,
      tagsLeftCount: 0,
    };
  },
  watch: {
    info: {
      handler() {
        this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
        let deleteCount = Math.min(3, this.selectedCopy.length);
        if (this.selectedCopy.length > 3) {
          deleteCount = 2;
          this.isMoreThan3 = true;
          this.tagsLeftCount = this.selectedCopy.length - deleteCount;
        }
        this.selectedCopyTrimed = this.selectedCopy.slice(0, deleteCount);
        const clrs = this.$store.getters.clrs;
        this.tagToEdit.style.color = clrs[utilService.getRandomInt(0, clrs.length - 1)];
        this.opts = JSON.parse(JSON.stringify(this.info.data.opts));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    update() {
      if (!this.tagToEdit.txt) return;
      const isTagExists = this.opts.some(({ txt }) => txt === this.tagToEdit.txt);
      if (isTagExists) return;
      this.selectedCopy.unshift(this.tagToEdit);
      this.$emit('update', this.selectedCopy);
      this.toggleOptions();
    },
    remove(tag) {
      console.log('remove tag:', tag);
    },
    saveBoardCol() {
      this.update();
      this.$emit('saveBoardCol', this.tagToEdit);
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    tagForDisplay(txt) {
      return `#${txt}`;
    },
    closeOptions() {
      this.showOptions = false;
    },
  },
};
</script>
