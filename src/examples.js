import * as Blockly from 'blockly';
import * as project0 from './examples/project0';

const projectsDiv = document.getElementById('projectsDiv');

const projectsList = [
	project0.project,
]

const projectsInfo = [
	{
		name: "Pomodoro Timer",
		imgUrl: "https://raw.githubusercontent.com/altaf-creator/droid-esp32-blockly/refs/heads/main/esp32%20droid%20pinout.png"
	},
]

export function initialiseExampleProjects() {
	for (let i = 0; i < projectsInfo.length; i++) {
		projectsDiv.innerHTML += `
					<button id="loadProject${i}">
						<img src="${projectsInfo[i].imgUrl}" alt="">
						<span>${projectsInfo[i].name}</span>
					</button>
		`;
	
		document.getElementById(`loadProject${i}`).addEventListener('click', () => {
			loadProject(i);
		});
	}
}

async function loadProject(i) {
	const state = JSON.parse(projectsList[i]);
	Blockly.serialization.workspaces.load(state, Blockly.common.getMainWorkspace());
	document.getElementById('exampleProjDiv').style.bottom = '-100px';
	document.getElementById('exampleProj').innerText = "Load Examples";
}
