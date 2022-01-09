<template>
  <section class="label-color-palette-container">
    <div class="label-color-palette-btns">
      <button
        v-for="(clr, idx) in clrs"
        :key="idx"
        @mouseover="setClr(clr)"
        @mouseleave="setClr('')"
        class="btn btn-round btn-color-label"
        @click.stop="selectColor(clr)"
        :style="{ backgroundColor: clr }"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'labelColorPalette',
  props: ['value'],
  data() {
    return {
      clrs: null,
    };
  },
  created() {
    this.clrs = this.$store.getters.labelClrs;
  },
  methods: {
    selectColor(clr) {
      this.$emit('selectColor', clr);
    },
    setClr(clr) {
      this.$emit('changeClr', clr);
    },
  },
};
</script>
