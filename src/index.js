/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import * as PythonBlocks from './blocks/python';
import * as LightsBlocks from './blocks/lights';
import * as MotorBlocks from './blocks/motor';
import * as SensorBlocks from './blocks/sensors';
import {forBlock} from './generators/javascript';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

import { mpyGen } from './generators/micropython';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(PythonBlocks.blocks);
Blockly.common.defineBlocks(LightsBlocks.blocks);
Blockly.common.defineBlocks(MotorBlocks.blocks);
Blockly.common.defineBlocks(SensorBlocks.blocks);
Object.assign(mpyGen.forBlock, forBlock);

// uh theme

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const runCodeBtn = document.getElementById('runCode');
const ws = Blockly.inject(blocklyDiv, {
	toolbox,
	theme: 'zelos',
	renderer: 'zelos',
});

let currentCode = "";

const defaultBlock = ws.newBlock('controls_main');
defaultBlock.initSvg();
defaultBlock.render();
defaultBlock.moveBy(20, 20); // optional, adjust position

runCodeBtn.addEventListener('click', function () {
	sendToESP32(currentCode);
});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
	mpyGen.init(ws);
	const code = mpyGen.workspaceToCode(ws);
	const codeLines = code.split('\n')
	codeDiv.innerText = '';

	const lineCount = codeLines.length;
	const maxDigits = lineCount.toString().length;
	for (let i = 0; i < codeLines.length; i++) {
		const lineNumber = (i+1).toString().padStart(maxDigits, ' ');
		codeDiv.innerText += `${lineNumber} | ${codeLines[i]}\n`;
	}

	outputDiv.innerHTML = '';

	currentCode = code;
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
	// UI events are things like scrolling, zooming, etc.
	// No need to save after one of these.
	if (e.isUiEvent) return;
	save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
	// Don't run the code when the workspace finishes loading; we're
	// already running it once when the application starts.
	// Don't run the code during drags; we might have invalid state.
	if (
		e.isUiEvent ||
		e.type == Blockly.Events.FINISHED_LOADING ||
		ws.isDragging()
	) {
		return;
	}
	runCode();

	Blockly.Events.disableOrphans(e);
});

//async function sendToESP32(code) {
//	// Ask for the serial port
//	const port = await navigator.serial.requestPort();
//	await port.open({ baudRate: 115200 });
//
//	const encoder = new TextEncoder();
//	const decoder = new TextDecoder();
//	const writer = port.writable.getWriter();
//	const reader = port.readable.getReader();
//	await new Promise(res => setTimeout(res, 500));
//
//	// Enter raw REPL mode
//	await writer.write(encoder.encode('\r\x03\x03')); // interrupt any running code
//	await writer.write(encoder.encode('\r\x01'));		 // enter raw REPL
//	
//	// Write to main.py
//	const writeCodeCode = `with open('main.py', 'w') as f:\n	f.write("""${code}""")`;
//	await writer.write(encoder.encode(writeCodeCode + '\r\n'))
//
//	// Send code
//	await writer.write(encoder.encode('\x04')); // Ctrl-D to run
//
//	const timeout = 3000
//		const startTime2 = Date.now();
//		while (Date.now() - startTime2 < timeout) {
//				const { value, done } = await reader.read();
//				if (done) break;
//				if (value) {
//						console.log(decoder.decode(value));
//				}
//		}
//
//	// Exit raw REPL
//	await writer.write(encoder.encode('\r\x02')); 
//
//	writer.releaseLock();
//	reader.releaseLock();
//	await port.close();
//	console.log("written to ", port.toString());
//}

// chatgpt generated code why does this work and mine doesn't???
// am i getting replaced chat?


async function readWithTimeout(reader, timeoutMs) {
	return Promise.race([
		reader.read(),
		new Promise(resolve => setTimeout(() => resolve({ value: null, done: true }), timeoutMs))
	]);
}

async function sendToESP32(code) {
	// Ask for the serial port
	const port = await navigator.serial.requestPort();
	runCodeBtn.innerHTML = "Flashing..."
	try { await port.open({ baudRate: 115200 }); } catch {}

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	const writer = port.writable.getWriter();
	const reader = port.readable.getReader();

	// Wait a short delay for ESP32 to boot
	await new Promise(res => setTimeout(res, 2000));

	// Flush any boot output

	// Enter raw REPL mode
	await writer.write(encoder.encode('\r\x03\x03')); // Ctrl-C twice
	await new Promise(res => setTimeout(res, 100)); // short delay
	await writer.write(encoder.encode('\r\x01')); // Ctrl-A
	await new Promise(res => setTimeout(res, 100));

	// Prepare Python code to write to main.py
	const writeCodeCode = `with open('main.py', 'w') as f:\n	f.write("""${code}""")\n`;

	// Send code
	await writer.write(encoder.encode(writeCodeCode));
	await new Promise(res => setTimeout(res, 100));

	// Execute buffer (Ctrl-D)
	await writer.write(encoder.encode('\x04'));
	console.log("code sent, reading ESP32 output for 3 sec...");

	const startTime = Date.now();
	const overallTimeout = 3000; // total max wait for reading
	const readTimeout = 50;	  // per-read timeout
	
	while (Date.now() - startTime < overallTimeout) {
		const { value, done } = await readWithTimeout(reader, readTimeout);
		if (done) break;
		if (value) {
			const str = decoder.decode(value);
			console.log("ESP32:", str);
		}
	}

	console.log("closing connection");

	// Release locks and close port
	writer.releaseLock();
	reader.releaseLock();
	await port.close();
	console.log("conn closed.")
	
	runCodeBtn.innerHTML = "Flash to ESP32"
	document.getElementById("successAlert").style.display = "inherit";
	await new Promise(res => setTimeout(res, 4000));
	document.getElementById("successAlert").style.display = "none";
}
