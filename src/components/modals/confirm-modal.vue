<template>
  <div class="modal-bootbox">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <button class="btn btn-close-modal" @click="closeModal">×</button>
          <div class="bootbox-body">
            <p>
              <strong>{{ modal.txt }}</strong>
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-cancel-modal" @click="closeModal">
            Cancel
          </button>
          <button class="btn btn-delete-modal" @click="deleteAction">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board-header-filter-search',
  props: {
    modal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    deleteAction() {
      this.$emit('deleteAction');
    },
  },
};
</script>
