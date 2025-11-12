/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

export const toolbox = {
	kind: 'categoryToolbox',
	contents: [
		{
			kind: 'category',
			name: 'Lights',
			categorystyle: 'lights_category',
			contents: [
				{
					kind: 'block',
					type: 'lights_board_light',
					inputs: {
						STATE: {
							shadow: {
								type: 'logic_boolean',
								fields: {
									BOOL: 'TRUE',
								},
							},
						}
					},
				},
				{
					kind: 'block',
					type: 'lights_set_light',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lights_set_light_colour',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 0,
								},
							},
						},
						COLOUR: {
							shadow: {
								type: 'lights_variable_colour',
								fields: {
									COLOUR: '#ff0000',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lights_variable_colour',
				},
			],
		},
		{
			kind: 'category',
			name: 'Movement',
			categorystyle: 'motor_category',
			contents: [
				{
					kind: 'block',
					type: 'movement_main_move',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
						SPEED: {
							shadow: {
								type: 'math_range_100',
								fields: {
									NUM: 50,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'movement_main_backward',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
						SPEED: {
							shadow: {
								type: 'math_range_100',
								fields: {
									NUM: 50,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'movement_turnon_move',
					inputs: {
						SPEED: {
							shadow: {
								type: 'math_range_100',
								fields: {
									NUM: 50,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'movement_stop_move',
				},
				{
					kind: 'block',
					type: 'movement_head_rotate',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_degree_180',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'movement_front_turnright',
				},
				{
					kind: 'block',
					type: 'movement_front_turnleft',
				},
				{
					kind: 'block',
					type: 'movement_front_turnfront',
				},
				{
					kind: 'block',
					type: 'movement_front_rotate',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_degree_180',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_degree_180',
				},
			],
		},
		{
			kind: 'category',
			name: 'Inputs',
			categorystyle: 'sensors_category',
			contents: [
				{
					kind: 'block',
					type: 'sensors_startmeasureth',
				},
				{
					kind: 'block',
					type: 'sensors_temperature',
				},
				{
					kind: 'block',
					type: 'sensors_humidity',
				},
				{
					kind: 'block',
					type: 'sensors_light',
				},
				{
					kind: 'block',
					type: 'sensors_buttonA',
				},
				{
					kind: 'block',
					type: 'sensors_buttonB',
				},
				{
					kind: 'block',
					type: 'math_analog_input',
				},
			],
		},
		{
			kind: 'sep',
		},
		{
			kind: 'category',
			name: 'Code',
			categorystyle: 'python_category',
			contents: [
				{
					kind: 'block',
					type: 'python_print',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'Hello, world!',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'python_sleep',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				}
			],
		},
		{
			kind: 'category',
			name: 'Logic',
			categorystyle: 'logic_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_if',
				},
				{
					kind: 'block',
					type: 'logic_compare',
				},
				{
					kind: 'block',
					type: 'logic_operation',
				},
				{
					kind: 'block',
					type: 'logic_negate',
				},
				{
					kind: 'block',
					type: 'logic_boolean',
				},
				{
					kind: 'block',
					type: 'logic_null',
				},
				{
					kind: 'block',
					type: 'logic_ternary',
				},
			],
		},
		{
			kind: 'category',
			name: 'Controls',
			categorystyle: 'loop_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_repeat_ext',
					inputs: {
						TIMES: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'controls_whileUntil',
				},
				{
					kind: 'block',
					type: 'controls_forever',
				},
				{
					kind: 'block',
					type: 'controls_for',
					inputs: {
						FROM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						TO: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
						BY: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'controls_forEach',
				},
				{
					kind: 'block',
					type: 'controls_flow_statements',
				},
			],
		},
		{
			kind: 'category',
			name: 'Math',
			categorystyle: 'math_category',
			contents: [
				{
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 123,
					},
				},
				{
					kind: 'block',
					type: 'math_arithmetic',
					inputs: {
						A: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						B: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_single',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 9,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_trig',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 45,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_constant',
				},
				{
					kind: 'block',
					type: 'math_number_property',
					inputs: {
						NUMBER_TO_CHECK: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_round',
					fields: {
						OP: 'ROUND',
					},
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 3.1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_on_list',
					fields: {
						OP: 'SUM',
					},
				},
				{
					kind: 'block',
					type: 'math_modulo',
					inputs: {
						DIVIDEND: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 64,
								},
							},
						},
						DIVISOR: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_constrain',
					inputs: {
						VALUE: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 50,
								},
							},
						},
						LOW: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						HIGH: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 100,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_random_int',
					inputs: {
						FROM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						TO: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 100,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_random_float',
				},
				{
					kind: 'block',
					type: 'math_atan2',
					inputs: {
						X: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						Y: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_degree',
				},
				{
					kind: 'block',
					type: 'math_degree_180',
				},
				{
					kind: 'block',
					type: 'math_analog_input',
				},
				{
					kind: 'block',
					type: 'math_range_100',
				},
			],
		},
		{
			kind: 'category',
			name: 'Text',
			categorystyle: 'text_category',
			contents: [
				{
					kind: 'block',
					type: 'text',
				},
				{
					kind: 'block',
					type: 'text_join',
				},
				{
					kind: 'block',
					type: 'text_append',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: '',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_length',
					inputs: {
						VALUE: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_isEmpty',
					inputs: {
						VALUE: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: '',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_indexOf',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
						FIND: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_charAt',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_getSubstring',
					inputs: {
						STRING: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_changeCase',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_trim',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_count',
					inputs: {
						SUB: {
							shadow: {
								type: 'text',
							},
						},
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_replace',
					inputs: {
						FROM: {
							shadow: {
								type: 'text',
							},
						},
						TO: {
							shadow: {
								type: 'text',
							},
						},
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_reverse',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
			],
		},
		{
			kind: 'category',
			name: 'Lists',
			categorystyle: 'list_category',
			contents: [
				{
					kind: 'block',
					type: 'lists_create_with',
				},
				{
					kind: 'block',
					type: 'lists_create_with',
				},
				{
					kind: 'block',
					type: 'lists_repeat',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 5,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_length',
				},
				{
					kind: 'block',
					type: 'lists_isEmpty',
				},
				{
					kind: 'block',
					type: 'lists_indexOf',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_getIndex',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_setIndex',
					inputs: {
						LIST: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_getSublist',
					inputs: {
						LIST: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_split',
					inputs: {
						DELIM: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: ',',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_sort',
				},
				{
					kind: 'block',
					type: 'lists_reverse',
				},
			],
		},
		{
			kind: 'sep',
		},
		{
			kind: 'category',
			name: 'Variables',
			categorystyle: 'variable_category',
			custom: 'VARIABLE',
		},
		{
			kind: 'category',
			name: 'Functions',
			categorystyle: 'procedure_category',
			custom: 'PROCEDURE',
		},
	],
};
