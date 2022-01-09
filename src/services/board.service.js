import { httpService } from './http.service';
// import { storageService } from './async-storage.service';
import { utilService } from './util.service';
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
// import { userService } from './user.service.js';
// import { util } from 'vue/types/umd';
// const STORAGE_KEY_BOARDS = 'boards';

export const boardService = {
	query,
	removeBoard,
	getEmptyBoard,
	getEmptyGroup,
	getEmptyTask,
	getEmptyActivity,
	getEmptyComment,
	saveGroup,
	saveTask,

	deleteTask,
	saveComment,
	saveBoard,
	removeGroup,
	moveGroupToBoard,
	saveBoardCol,
	saveLabel,
	deleteLabel,
};

async function query(filterBy = {}) {
	try {
		let queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`;
		return await httpService.get(`board${queryStr}`);
		// const boards = await storageService.query(STORAGE_KEY_BOARDS);
		// if (!boards.length) {
		// 	const board = _createBoard();
		// 	boards.push(board);
		// 	saveBoard(board);
		// }
		// return boards;
	} catch (error) {
		console.log('error', error);
	}
}

/////////-----------------BOARD-----------------/////////

async function removeBoard(boardId) {
	try {
		return httpService.delete(`board/${boardId}`);
		// await storageService.remove('boards', boardId);
	} catch (error) {
		console.log('error', error);
	}
}

async function saveBoard(board) {
	// const addedBoard = await httpService.post(`board`, board)
	let savedBoard;
	try {
		if (!board) board = getEmptyBoard();
		if (board._id) savedBoard = await httpService.put('board', board);
		else savedBoard = await httpService.post('board', board);
		return savedBoard;
	} catch (error) {
		console.log('error', error);
	}
}

async function getById(boardId) {
	const boards = await query();
	const board = boards.find(({ _id }) => _id === boardId);
	return board;
}

/////////-----------------GROUP-----------------/////////

async function saveGroup(group, activeBoardId) {
	const board = await getById(activeBoardId);
	// let activityTxt = group.id ? 'Edit group' : 'Add group';
	if (!group.id) {
		group.id = utilService.makeId();
		board.groups.unshift(group);
	} else {
		const idx = board.groups.findIndex(({ id }) => id === group.id);
		board.groups.splice(idx, 1, group);
	}
	// board.activities.unshift(createActivity(activityTxt, userService.getLoggedinUser(), group));
	await saveBoard(board);
	return group;
}

async function moveGroupToBoard(moveDetails, activeBoard) {
	const toBoard = moveDetails.board;
	const { group } = moveDetails;
	const fromBoard = await getById(activeBoard._id);
	const groupIdx = fromBoard.groups.findIndex(({ id }) => id === group.id);
	toBoard.groups.push(group);
	fromBoard.groups.splice(groupIdx, 1);
	await saveBoard(fromBoard);
	await saveBoard(toBoard);
}

async function removeGroup(group, activeBoard) {
	const idx = activeBoard.groups.findIndex(({ id }) => id === group.id);
	activeBoard.groups.splice(idx, 1);
	// activeBoard.activities.unshift(createActivity('Remove group', userService.getLoggedinUser(), group));
	await saveBoard(activeBoard);
}

/////////-----------------TASK-----------------/////////

async function saveTask(task, groupId, boardId) {
	const board = await getById(boardId);
	// let activityTxt = task.id ? 'Edit task' : 'Add task';
	const group = board.groups.find(({ id }) => id === groupId);
	if (!task.id) {
		task.id = utilService.makeId();
		if (task.title === 'New Task') group.tasks.unshift(task);
		else group.tasks.push(task);
	} else {
		const idx = group.tasks.findIndex(({ id }) => id === task.id);
		group.tasks.splice(idx, 1, task);
	}
	// board.activities.unshift(createActivity(activityTxt, userService.getLoggedinUser(), task));
	console.log('board', board);
	await saveBoard(board);
	return board;
}

async function deleteTask(boardId, task, groupId) {
	const board = await getById(boardId);
	const group = board.groups.find(({ id }) => id === groupId);
	const idx = group.tasks.findIndex(({ id }) => id === task.id);
	group.tasks.splice(idx, 1);
	// board.activities.unshift(createActivity('activityTxt', userService.getLoggedinUser(), task));
	saveBoard(board);
	return board;
}

async function saveComment({ comment, boardId, groupId, taskId }) {
	const board = await getById(boardId);
	const group = board.groups.find(({ id }) => id === groupId);
	const task = group.tasks.find(({ id }) => id === taskId);
	const copyComment = JSON.parse(JSON.stringify(comment));
	copyComment.id = utilService.makeId();
	copyComment.createdAt = new Date(Date.now()).toLocaleString();

	if (!task.comments) task.comments = [];
	task.comments.unshift(copyComment);

	// let activity = getEmptyActivity();
	// activity.txt = 'Add comment';
	// activity.id = utilService.makeId();
	// board.activities.unshift(activity);
	saveBoard(board);
	return board;
}

// COLUMNS

async function saveBoardCol(boardId, details) {
	const board = await getById(boardId);
	const col = board.cols.find(({ type }) => type === details.type);
	const itemCopy = JSON.parse(JSON.stringify(details.item));
	if (!itemCopy?.id) {
		itemCopy.id = utilService.makeId();
	}
	col.data.opts.push(itemCopy);
	saveBoard(board);
	return board;
}
// LABEL

// Save label

async function saveLabel(boardId, details) {
	const board = await getById(boardId);
	const col = board.cols.find(({ type }) => type === details.type);
	if (!details.label.id) {
		details.label.id = utilService.makeId();
		col.data.opts.push(details.label);
	} else {
		const idx = col.data.opts.findIndex(({ id }) => id === details.label.id);
		col.data.opts.splice(idx, 1, details.label);
	}
	console.log('details', details)
	await saveBoard(board);
	return details;
}

// Delete label
async function deleteLabel(boardId, details) {
	const board = await getById(boardId);
	const col = board.cols.find(({ type }) => type === details.type);
	const idx = col.data.opts.findIndex(({ id }) => id === details.label.id);
	col.data.opts.splice(idx, 1);
	await saveBoard(board);
	return col.data.opts;
}
// async function saveColumns(boardId, columnType) {
// 	const board = await getById(boardId);
// 	return board;
// }

// GET EMPTY

function getEmptyGroup(clr) {
	return { title: 'New Group', id: '', tasks: [], style: { clr } };
}

function getEmptyTask() {
	return { title: '', id: '', cmps: {} };
}

function getEmptyActivity() {
	return {
		txt: '',
		id: utilService.makeId(),
		createdAt: Date.now(),
		byUser: {},
		on: {},
	};
}

function getEmptyComment() {
	return { txt: '', id: '', createdAt: '', byMember: {} };
}

function getEmptyBoard() {
	const group1 = getEmptyGroup('rgb(87, 155, 252)');
	const group2 = getEmptyGroup('rgb(162, 93, 220)');
	group1.id = utilService.makeId();
	group2.id = utilService.makeId();
	return {
		title: 'New Board',
		createdAt: new Date(Date.now()).toLocaleString(),
		createdBy: {},
		members: [],
		groups: [group1, group2],
		activities: [],
		isFavorite: false,
		cmpsOrder: [
			'status-picker',
			'priority-picker',
			'member-picker',
			'date-picker',
			'timeline-picker',
			'tag-picker',
		],
		cols: [
			{
				type: 'statusPicker',
				data: {
					opts: _getStatusOptions(),
					default: {
						display: '',
						style: {
							backgroundColor: 'rgb(196, 196, 196)',
						},
					},
					style: {
						flexBasis: '140px',
						maxWidth: '140px',
					},
				},
			},
			{
				type: 'priorityPicker',
				data: {
					opts: _getPriorityOptions(),
					default: {
						display: '',
						style: {
							backgroundColor: 'rgb(196, 196, 196)',
						},
					},
					style: {
						flexBasis: '140px',
						maxWidth: '140px',
					},
				},
			},
			{
				type: 'memberPicker',
				data: {
					opts: [],
					default: { members: [] },
					style: {
						flexBasis: '98px',
						maxWidth: '98px',
					},
				},
			},
			{
				type: 'datePicker',
				data: {
					opts: [],
					default: { dueDate: null },
					style: {
						flexBasis: '140px',
						maxWidth: '140px',
					},
				},
			},
			{
				type: 'timelinePicker',
				data: {
					opts: [],
					default: { dates: [], dayCount: 0 },
					style: {
						flexBasis: '140px',
						maxWidth: '140px',
					},
				},
			},
			{
				type: 'tagPicker',
				data: {
					opts: [],
					default: [],
					style: {
						flexBasis: '140px',
						maxWidth: '140px',
					},
				},
			},
		],
		description: '',
	};
}

// Auxiliary functions

function _getStatusOptions() {
	return [
		{
			name: 'stuck',
			display: 'Stuck',
			style: {
				backgroundColor: 'rgb(226, 68, 92)',
			},
		},
		{
			name: 'done',
			display: 'Done',
			style: {
				backgroundColor: 'rgb(0, 200, 117)',
			},
		},
		{
			name: 'working on it',
			display: 'Working on it',
			style: {
				backgroundColor: 'rgb(253, 171, 61)',
			},
		},
	];
}

function _getPriorityOptions() {
	return [
		{
			name: 'critical',
			display: 'Critical',
			style: {
				backgroundColor: 'rgb(226, 68, 92)',
			},
		},
		{
			name: 'high',
			display: 'High',
			style: {
				backgroundColor: 'rgb(255, 203, 0)',
			},
		},
		{
			name: 'medium',
			display: 'Medium',
			style: {
				backgroundColor: 'rgb(87, 155, 252)',
			},
		},
		{
			name: 'low',
			display: 'Low',
			style: {
				backgroundColor: 'rgb(0, 200, 117)',
			},
		},
		{
			name: 'best effort',
			display: 'Best Effort',
			style: {
				backgroundColor: 'rgb(128, 128, 128)',
			},
		},
	];
}

// function createActivity(txt, user, updatedData) {
// 	let activity = getEmptyActivity();
// 	activity.txt = txt;
// 	activity.byUser = user;
// 	activity.updatedData = updatedData;
// 	return activity;
// }

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balance:13}})
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   let boards = await storageService.query('board');

// Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshBoards = await storageService.query('board');
//     if (freshBoards.length === boards.length + 1) {
//       console.log('Board Added - localStorage updated from another browser');
//       socketService.emit(
//         SOCKET_EVENT_REVIEW_ADDED,
//         freshBoards[freshBoards.length - 1]
//       );
//     }
//     boards = freshBoards;
//   });
// })();
