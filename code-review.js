// groupsToCollapse: []

//     <task-list v-if="!isCollapse(group.id)" />

//     isCollapse(id) {
//         return this.groupsToCollapse.includes(id);
//     }

//     toggleGroup(groupId) {
//         if (this.groupsToCollapse.includes(groupId)) {
//             const idx = this.groupsToCollapse.findIndex(id => id === groupId);
//             if (idx >= 0) this.groupsToCollapse.splice(idx, 1);
//         } else this.groupsToCollapse.push(groupId);
//     }

//     toggleAllGroups() {
//         this.groupsToCollapse = this.board.groups.map(({ id }) => id);
//     }

//
