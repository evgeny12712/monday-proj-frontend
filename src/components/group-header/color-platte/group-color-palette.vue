<template>
  <section class="group-color-palette dropdowm-modal">
    <button
      v-for="(color, idx) in colors"
      :key="idx"
      class="btn btn-round"
      :style="{ backgroundColor: color }"
      @click.stop="selectColor(color)"
    ></button>
  </section>
</template>

<script>
export default {
  name: 'groupColorPalette',
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectColor(color) {
      this.$emit('selected', color);
    },
  },
};
</script>
