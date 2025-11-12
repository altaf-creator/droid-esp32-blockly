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
const startMeasureTH = {
	type: 'sensors_startmeasureth',
	message0: 'start measuring temperature and humidity',
	colour: 190,
	previousStatement: null,
	nextStatement: null,
	tooltip: '',
	helpUrl: '',
};
const temp = {
	type: 'sensors_temperature',
	message0: 'read temperature in Celcius',
	colour: 190,
	tooltip: '',
	helpUrl: '',
	output: 'Number',
};
const humd = {
	type: 'sensors_humidity',
	message0: 'read humidity%',
	colour: 190,
	tooltip: '',
	helpUrl: '',
	output: 'Number',
};
const light = {
	type: 'sensors_light',
	message0: 'read light sensor (analog)',
	colour: 190,
	tooltip: '',
	helpUrl: '',
	output: 'Number',
};
const btnA = {
	type: 'sensors_buttonA',
	message0: 'is Button A pressed',
	colour: 190,
	tooltip: '',
	helpUrl: '',
	output: 'Boolean',
};
const btnB = {
	type: 'sensors_buttonB',
	message0: 'is Button B pressed',
	colour: 190,
	tooltip: '',
	helpUrl: '',
	output: 'Boolean',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
	startMeasureTH, temp, humd, light, btnA, btnB
]);
