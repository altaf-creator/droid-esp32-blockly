/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
import {registerFieldColour} from '@blockly/field-colour';

registerFieldColour();

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const lightsOnBoard = {
	type: 'lights_board_light',
	message0: 'set built-in board light to %1',
	args0: [
		{
			type: 'input_value',
			name: 'STATE',
			check: 'Boolean',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 90,
	tooltip: '',
	helpUrl: '',
};
const setLight = {
	type: 'lights_set_light',
	message0: 'turn light %1 to on: %2',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
		{
			type: 'field_checkbox',
			name: 'STATE',
			checked: true,
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 90,
	tooltip: '',
	helpUrl: '',
};
const setLightCol = {
	type: 'lights_set_light_colour',
	message0: 'turn light %1 to on with colour %2',
	args0: [
		{
			type: 'input_value',
			name: 'NUM',
			check: 'Number',
		},
		{
			type: 'field_colour',
			name: 'COLOUR',
		},
	],
	previousStatement: null,
	nextStatement: null,
	colour: 90,
	tooltip: '',
	helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
	lightsOnBoard, setLight, setLightCol
]);

Blockly.Extensions.register('default_bool', function() {
	const input = this.getInput('STATE');
	if (input && !input.connection.targetBlock()) {
		const block = this.workspace.newBlock('logic_boolean');
		block.setFieldValue('True', 'BOOL');
		block.initSvg();
		block.render();
		block.outputConnection.connect(input.connection);
	}
});

Blockly.Extensions.register('default_num', function() {
	const input = this.getInput('NUM');
	if (input && !input.connection.targetBlock()) {
		const block = this.workspace.newBlock('math_number');
		block.setFieldValue('0', 'NUM');
		block.initSvg();
		block.render();
		block.outputConnection.connect(input.connection);
	}
});
