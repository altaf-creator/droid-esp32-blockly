/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const moveForw = {
	type: 'movement_main_move',
	message0: 'move forward %1',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};
const moveBack = {
	type: 'movement_main_backward',
	message0: 'move backward %1',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};
const headRotate = {
	type: 'movement_head_rotate',
	message0: 'rotate head %1',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};
const turnRight = {
	type: 'movement_front_turnright',
	message0: 'turn front wheel right',
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};
const turnLeft = {
	type: 'movement_front_turnleft',
	message0: 'turn front wheel left',
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};
const turn = {
	type: 'movement_front_rotate',
	message0: 'turn front wheel %1 degrees',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 4,
	tooltip: '',
	helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
	moveForw, moveBack, headRotate, turnRight, turnLeft, turn
]);
