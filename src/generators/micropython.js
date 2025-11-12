import { pythonGenerator, Order } from 'blockly/python';
import * as Blockly from 'blockly/core';
import * as HardwareConstants from '../r32d32_constants.js'

export const mpyGen = new Blockly.Generator("MicroPython");

pythonGenerator.addReservedWords('npxl')
pythonGenerator.addReservedWords('dhtPin')
pythonGenerator.addReservedWords('builtInLEDPin')
pythonGenerator.addReservedWords('btnA')
pythonGenerator.addReservedWords('btnB')
pythonGenerator.addReservedWords('lightSensorPin')
pythonGenerator.addReservedWords('servoHeadPin')
pythonGenerator.addReservedWords('servoFrontPin')
Object.assign(mpyGen, pythonGenerator);

mpyGen.init = function(workspace) {
	pythonGenerator.init.call(this, workspace);


	this.definitions_ = Object.create(null);
	this.imports_ = new Set([
		'import machine', 
		'import time', 
		'import esp32', 
		'import network', 
		'import dht', 
		'import neopixel', 
		'', 
		`npxl = neopixel.NeoPixel(machine.Pin(${HardwareConstants.PINOUT_LIGHTS}, machine.Pin.OUT), 25)`,
		`dhtPin = dht.DHT11(machine.Pin(${HardwareConstants.PININ_DHT}, machine.Pin.IN))`,
		`builtInLEDPin = machine.Pin(${HardwareConstants.PINOUT_ON_BOARD_LED}, machine.Pin.OUT)`,
		`btnA = machine.Pin(${HardwareConstants.PININ_BTN_A}, machine.Pin.IN)`,
		`btnB = machine.Pin(${HardwareConstants.PININ_BTN_B}, machine.Pin.IN)`,
		`lightSensorPin = machine.ADC(machine.Pin(${HardwareConstants.PININ_PHOTORESISTOR}))`,
		`servoHeadPin = machine.PWM(machine.Pin(${HardwareConstants.PINOUT_HEAD_SERVO}))`,
		//`servoFrontPin = machine.PWM(machine.Pin(${HardwareConstants.PINOUT_FRONT_SERVO}))`,
		`servoHeadPin.freq(50)`,
		//`servoFrontPin.freq(50)`,
	]);
}

mpyGen.finish = function(code) {
	const importLines = Array.from(this.imports_).join('\n');

	const definitions = Object.values(this.definitions_).join('\n');

	return `${importLines}\n\n${definitions}\n${code}`;
};

// scrub: stacked blocks for some reason there's no default behaviour?
mpyGen.scrub_ = function(block, code, opt_thisOnly) {
	// Get the next block in the stack
	const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

	// If there is a next block and we should include subsequent blocks
	if (nextBlock && !opt_thisOnly) {
		const nextCode = this.blockToCode(nextBlock);
		return code + '\n' + nextCode;
	}

	return code;
};

// blocks: fix string escaping thing
mpyGen.quote_ = function(str) {
	str = String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
	return `'${str}'`;
};
mpyGen.forBlock['text'] = function(block) {
	const text = block.getFieldValue('TEXT') || '';
	return [mpyGen.quote_(text), Order.ATOMIC];
};

// --- blocks ---

mpyGen.forBlock['python_print'] = function(block, generator) {
	const txt = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
	return `print(${txt})\n`;
};

mpyGen.forBlock['python_sleep'] = function(block, generator) {
	const sec = generator.valueToCode(block, 'NUM', Order.ATOMIC);
	return `time.sleep(${sec})\n`;
};

mpyGen.forBlock['controls_forever'] = function(block, generator) {
	let branch = generator.statementToCode(block, 'DO');
	branch = generator.addLoopTrap(branch, block) || generator.PASS;
	return 'while True:\n' + branch;
}

mpyGen.forBlock['controls_main'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['lights_board_light'] = function(block, generator) {
	const state = generator.valueToCode(block, 'STATE', Order.ATOMIC);
	if (state == "True") { return `builtInLEDPin.on()\n` }
	else { return `builtInLEDPin.off()\n` }
}

mpyGen.forBlock['lights_set_light'] = function(block, generator) {
	const state = block.getFieldValue('STATE');
	const pixel = generator.valueToCode(block, 'NUM', Order.ATOMIC);

	if (state == 'TRUE') { return `npxl[${pixel}] = (255, 255, 255)\nnpxl.write()\n` }
	else { return `npxl[${pixel}] = (0, 0, 0)\nnpxl.write()\n` }
}

mpyGen.forBlock['lights_set_light_colour'] = function(block, generator) {
	const col = generator.valueToCode(block, 'COLOUR', Order.ATOMIC);
	const pixel = generator.valueToCode(block, 'NUM', Order.ATOMIC);

	return `npxl[${pixel}] = ${col}\nnpxl.write()\n`;
}

mpyGen.forBlock['lights_variable_colour'] = function(block, generator) {
	const col = block.getFieldValue('COLOUR');

	return [`${hexToRGB(col)}`, Order.ATOMIC];
}

mpyGen.forBlock['sensors_startmeasureth'] = function(block, generator) {
	return `dhtPin.measure()\n`;
}

mpyGen.forBlock['sensors_temperature'] = function(block, generator) {
	return [`dhtPin.temperature()`, Order.ATOMIC];
}

mpyGen.forBlock['sensors_humidity'] = function(block, generator) {
	return [`dhtPin.humidity()`, Order.ATOMIC];
}

mpyGen.forBlock['sensors_light'] = function(block, generator) {
	return [`(4095 - lightSensorPin.read())`, Order.ATOMIC];
}

mpyGen.forBlock['sensors_buttonA'] = function(block, generator) {
	return [`btnA.value() == 1`, Order.ATOMIC];
}

mpyGen.forBlock['sensors_buttonB'] = function(block, generator) {
	return [`btnB.value() == 1`, Order.ATOMIC];
}

mpyGen.forBlock['movement_main_move'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['movement_main_backward'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['movement_head_rotate'] = function(block, generator) {
	const deg = generator.valueToCode(block, 'NUM', Order.ATOMIC);

	return `servoHeadPin.duty(${calculateDuty(deg)})\ntime.sleep(.5)\n`;
}

mpyGen.forBlock['movement_front_turnright'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['movement_front_turnright'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['movement_front_turnleft'] = function(block, generator) {
	return ``;
}

mpyGen.forBlock['movement_front_rotate'] = function(block, generator) {
	const deg = generator.valueToCode(block, 'NUM', Order.ATOMIC);

	return `servoHeadPin.duty(${calculateDuty(deg)})\ntime.sleep(${HardwareConstants.HARDWARE_SERVO_BLOCKING_TIME})\n`;
}

function hexToRGB(hexstr) {
	hexstr = hexstr.replace('#', '');
	const r = parseInt(hexstr.slice(0,2), 16);
	const g = parseInt(hexstr.slice(2,4), 16);
	const b = parseInt(hexstr.slice(4,6), 16);
	return `(${g}, ${r}, ${b})`;
}

function calculateDuty(angle, minDuty = HardwareConstants.HARDWARE_SERVO_MINDUTY, maxDuty = HardwareConstants.HARDWARE_SERVO_MAXDUTY) {
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;
    return Math.round(minDuty + (angle / 180) * (maxDuty - minDuty));
}
