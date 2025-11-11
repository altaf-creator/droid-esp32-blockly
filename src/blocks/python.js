/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
import { loops } from 'blockly/blocks';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const print = {
	type: 'python_print',
	message0: 'print to serial %1',
	args0: [
		{
			type: 'input_value',
			name: 'TEXT',
			check: 'String',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 45,
	tooltip: '',
	helpUrl: '',
};
const sleep = {
	type: 'python_sleep',
	message0: 'pause for %1 seconds',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 45,
	tooltip: '',
	helpUrl: '',
};

// --- existing categ custom blocks ---
const forever = {
	type: 'controls_forever',
	message0: 'repeat forever',
	previousStatement: null,
	nextStatement: null,
	style: 'loop_blocks',
	message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
	args1: [
		{
			type: 'input_statement',
			name: 'DO',
		},
	],
	tooltip: '',
	helpUrl: '',
}
loops.loopTypes.add('controls_forever');
const mainStart = {
	type: 'controls_main',
	message0: 'start of main program',
	nextStatement: null,
	style: 'loop_blocks',
	tooltip: '',
	helpUrl: '',

}

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
	sleep, print, forever, mainStart
]);
