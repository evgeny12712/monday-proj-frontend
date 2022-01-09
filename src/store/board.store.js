// import { showMsg } from '../services/event-bus.service.js';
// import { connectSockets } from '../../../backend/services/socket.service.js';
import { boardService } from '../services/board.service.js';
import { utilService } from '../services/util.service.js';

export const boardStore = {
	state: {
		boards: [],
		boardToEdit: boardService.getEmptyBoard(),
		activeBoard: null,
		groupClrs: {
			clrs: [
				'rgb(3, 127, 76)',
				'rgb(0, 200, 117)',
				'rgb(156, 211, 38)',
				'rgb(202, 182, 65)',
				'rgb(255, 203, 0)',
				'rgb(120, 75, 209)',
				'rgb(162, 93, 220)',
				'rgb(0, 134, 192)',
				'rgb(102, 204, 255)',
				'rgb(187, 51, 84)',
				'rgb(226, 68, 92)',
				'rgb(255, 21, 138)',
				'rgb(255, 90, 196)',
				'rgb(255, 100, 46)',
				'rgb(253, 171, 61)',
				'rgb(127, 83, 71)',
				'rgb(196, 196, 196)',
				'rgb(128, 128, 128)',
			],
			curClrIdx: 0,
		},
		groupToEdit: boardService.getEmptyGroup(),
		taskToEdit: boardService.getEmptyTask(),
		commentToEdit: boardService.getEmptyComment(),
		labelToEdit: {
			name: '',
			id: '',
			display: '',
			style: { backgroundColor: '' },
		},
		labelClrs:
			`#ff158a,#bb3354,#7f5347,#ffcb00,#9cd326,#037f4c,#579bfc,#66ccff,#784bd1,
		#808080,#333,#ff7575,#faa1f1,#ffadad,#7e3b8a,#9aadbd,#68a1bd,#225091,#4eccc6,#5559df,
		#401694,#563e3e,#bda8f9,#2b76e5,#a9bee8,#d974b0,#9d99b9,#ad967a,#a1e3f6,#175a63,#bd816e`.split(
				','
			),
		filterBy: null,
	},
	getters: {
		boards: (state) => state.boards,
		activeBoard: (state) => state.activeBoard,
		boardToEdit: (state) => state.boardToEdit,
		cmpsOrder: (state) => state.activeBoard.cmpsOrder,
		cols: (state) => state.activeBoard.cols,
		cmps: (state) => state.activeBoard?.cmp,
		groupToEdit: (state) => state.groupToEdit,
		commentToEdit: (state) => state.commentToEdit,
		taskToEdit: (state) => state.taskToEdit,
		clrs: (state) => state.groupClrs.clrs,
		labelToEdit: (state) => state.labelToEdit,
		labelClrs: (state) => state.labelClrs,
		filterBy: (state) => state.filterBy,
	},
	mutations: {
		//----------BOARD----------//
		setBoards(state, { boards }) {
			state.boards = boards;
			state.activeBoard = state.boards[0];
		},
		saveBoard(state, { board }) {
			const idx = state.boards.findIndex(
				(currBoard) => currBoard._id === board._id
			);
			if (idx === -1) state.boards.push(board);
			else state.boards.splice(idx, 1, board);
		},
		removeBoard(state, { boardId }) {
			const idx = state.boards.findIndex((board) => board._id === boardId);
			state.boards.splice(idx, 1);
		},
		setActiveBoard(state, { activeBoard }) {
			state.activeBoard = activeBoard;
		},
		setFilter(state, { filterBy }) {
			state.filterBy = filterBy;
		},
		//----------GROUP----------//
		saveGroup(state, { group }) {
			const idx = state.activeBoard.groups.findIndex(
				({ id }) => id === group.id
			);
			// Add a new Group
			if (idx === -1) {
				state.activeBoard.groups.unshift(group);
				state.groupClrs.curClrIdx++;
				if (state.groupClrs.curClrIdx >= state.groupClrs.clrs.length)
					state.groupClrs.curClrIdx = 0;

				state.groupToEdit = boardService.getEmptyGroup(
					state.groupClrs.clrs[state.groupClrs.curClrIdx]
				);
			}
			// Update Group
			else state.activeBoard.groups.splice(idx, 1, group);
		},
		moveGroupToBoard(state, { moveDetails }) {
			const { group } = moveDetails; //group
			const { board } = moveDetails; //from board
			const toBoard = state.boards.find(
				(currBoard) => currBoard._id === board._id
			);
			toBoard.groups.push(group);
			const idx = state.activeBoard.groups.findIndex(
				(currGroup) => currGroup.id === group.id
			);
			state.activeBoard.groups.splice(idx, 1);
		},
		//----------TASK----------//
		saveTask(state, { boardId, task, groupId }) {
			console.log('task', boardId, task, groupId);
			let board = state.boards.find((board) => board._id === boardId);
			let group = board.groups.find(({ id }) => id === groupId);
			const idx = group.tasks.findIndex(({ id }) => id === task.id);
			if (idx >= 0) group.tasks.splice(idx, 1, task);
			else if (task.title === 'New Task') group.tasks.unshift(task);
			else group.tasks.push(task);
		},
		deleteTask(state, { boardId, groupId, task }) {
			const board = state.boards.find((board) => board._id === boardId);
			const group = board.groups.find(({ id }) => id === groupId);
			const idx = group.tasks.findIndex(({ id }) => id === task.id);
			group.tasks.splice(idx, 1);
		},
		saveComment(state, { details }) {
			const board = state.boards.find(({ _id }) => _id === details.boardId);
			const group = board.groups.find(({ id }) => id === details.groupId);
			const task = group.tasks.find(({ id }) => id === details.taskId);
			if (!task.comments) task.comments = [];
			task.comments.unshift(details.comment);
			console.log('state.activeBoard', state.activeBoard);
			state.commentToEdit = boardService.getEmptyComment();
		},
		saveLabel(state, { details }) {
			const col = state.activeBoard.cols.find(
				({ type }) => type === details.type
			);
			const idx = col.data.opts.findIndex(({ id }) => id === details.label.id);
			if (idx === -1) col.data.opts.push(details.label);
			else col.data.opts.splice(idx, 1, details.label);
		},
		deleteLabel(state, { details }) {
			const col = state.activeBoard.cols.find(
				({ type }) => type === details.type
			);
			const idx = col.data.opts.findIndex(({ id }) => id === details.label.id);
			col.data.opts.splice(idx, 1);
		},
	},
	actions: {
		//----------BOARD----------//
		async loadBoards(context) {
			context.commit({ type: 'setLoading', isLoading: true });
			try {
				let boards = await boardService.query();
				boards = JSON.parse(JSON.stringify(boards));
				if (!context.state.activeBoard) {
					context.commit({ type: 'setActiveBoard', activeBoard: boards[0] });
				}
				context.commit({ type: 'setBoards', boards });
			} catch (err) {
				return err;
			} finally {
				context.commit({ type: 'setLoading', isLoading: false });
			}
		},
		async removeBoard(context, { board }) {
			try {
				await boardService.removeBoard(board._id);
				context.commit({ type: 'removeBoard', boardId: board._id });
				if (context.state.activeBoard._id === board._id) {
					context.commit({
						type: 'setActiveBoard',
						activeBoard: context.state.boards[0],
					});
				}
			} catch (error) {
				console.log('error', error);
			}
		},
		async saveBoard(context, { board }) {
			try {
				const savedBoard = await boardService.saveBoard(board);
				context.commit({ type: 'setActiveBoard', activeBoard: savedBoard });
				context.commit({ type: 'saveBoard', board: savedBoard });
				return board;
			} catch (err) {
				return err;
			}
		},
		async addLastViewed(context) {
			if (!context.getters.user) return;
			if (!context.state.activeBoard.lastViewed)
				context.state.activeBoard.lastViewed = [];
			const idx = context.state.activeBoard.lastViewed.findIndex(
				(viewedUser) => viewedUser.user._id === context.getters.user._id
			);
			if (idx >= 0) return;
			context.state.activeBoard.lastViewed.unshift({
				user: context.getters.user,
				viewedAt: Date.now(),
			});
			context.dispatch({ type: 'saveBoard', board: context.state.activeBoard });
		},

		//----------GROUP----------//
		async moveGroupToBoard(context, { moveDetails }) {
			try {
				await boardService.moveGroupToBoard(
					moveDetails,
					context.state.activeBoard
				);
				context.commit({ type: 'moveGroupToBoard', moveDetails });
			} catch (error) {
				console.log(error);
			}
		},
		async removeGroup(context, { group }) {
			const activeBoard = context.getters.activeBoard;
			try {
				await boardService.removeGroup(group, activeBoard);
			} catch (error) {
				console.log('error', error);
			}
		},
		async saveGroup(context, { group }) {
			if (!group) {
				const groupColorId = utilService.getRandomInt(
					0,
					context.state.groupClrs.clrs.length - 1
				);
				group = boardService.getEmptyGroup(
					context.state.groupClrs.clrs[groupColorId]
				);
			}
			try {
				const addedGroup = await boardService.saveGroup(
					group,
					context.state.activeBoard._id
				);
				context.commit({ type: 'saveGroup', group: addedGroup });
				return addedGroup;
			} catch (err) {
				return err;
			}
		},
		async duplicateGroup(context, { group }) {
			let groupToAdd = JSON.parse(JSON.stringify(group));
			groupToAdd.id = utilService.makeId();
			const duplicateDetails = { groupToAdd, group };
			try {
				await boardService.duplicateGroup(
					group,
					groupToAdd,
					context.state.activeBoard
				);
				context.commit({ type: 'duplicateGroup', duplicateDetails });
			} catch (err) {
				console.log('err', err);
			}
		},
		//----------TASK----------//
		async saveTask(context, { details }) {
			if (!details) {
				details = {};
				details.groupId = context.state.activeBoard.groups[0].id;
				details.task = { title: 'New Task' };
			}
			details.task = JSON.parse(JSON.stringify(details.task));
			try {
				const newBoard = await boardService.saveTask(
					details.task,
					details.groupId,
					context.state.activeBoard._id,
				);
				context.commit({
					type: 'saveTask',
					boardId: context.state.activeBoard._id,
					task: details.task,
					groupId: details.groupId,
				});
				return newBoard;
			} catch (err) {
				return err;
			}
		},
		async deleteTask(context, { details }) {
			const task = JSON.parse(JSON.stringify(details.task));
			try {
				const newBoard = await boardService.deleteTask(
					context.state.activeBoard._id,
					task,
					details.groupId
				);

				context.commit({
					type: 'deleteTask',
					boardId: context.state.activeBoard._id,
					task,
					groupId: details.groupId,
				});
				return newBoard;
			} catch (err) {
				return err;
			}
		},
		async saveComment(context, { details }) {
			try {
				const detailsToSend = {
					...details,
					boardId: context.state.activeBoard._id,
				};
				console.log(details, 'details')
				const newBoard = await boardService.saveComment(detailsToSend);
				context.commit({ type: 'saveComment', details: detailsToSend });
				context.commit({ type: 'saveBoard', details: newBoard });
				return newBoard;
			} catch (err) {
				return err;
			}
		},
		async saveBoardCol(context, { details }) {
			try {
				console.log('Details from STORE!!!!!!!', details);
				const newBoard = await boardService.saveBoardCol(
					context.state.activeBoard._id,
					details
				);
				console.log('new board from STORE!!!', newBoard);
				context.commit({ type: 'saveBoard', details: newBoard });
			} catch (err) {
				return err;
			}
		},
		async saveLabel(context, { details }) {
			try {
				const savedDetails = await boardService.saveLabel(
					context.state.activeBoard._id,
					details
				);
				context.commit({ type: 'saveLabel', details: savedDetails });
				return savedDetails;
			} catch (err) {
				return err;
			}
		},
		async deleteLabel(context, { details }) {
			try {
				const opts = JSON.parse(
					JSON.stringify(
						await boardService.deleteLabel(
							context.state.activeBoard._id,
							details
						)
					)
				);
				context.commit({ type: 'deleteLabel', details: details });
				return opts;
			} catch (err) {
				return err;
			}
		},
	},
};
