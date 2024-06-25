import { gradientType } from "./GradientTypeSelector";
import { gradientDegrees } from "./GradientTypeSelector";

export function createCodeBox() {
	return `
		<div class="code-box-container">
			<code class="code-box"></code>
			<button class="code-box-copy">
				Copy
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="hide"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
			</button>
		</div>
	`
}

export function initCodeBox() {
	const codeBox = document.querySelector('.code-box');
	const copyButton = document.querySelector('.code-box-copy');

	copyButton.addEventListener('click', () => {
		navigator.clipboard.writeText(codeBox.textContent);
		showCheckMark();
	});
}

export function updateCodeBox(gradientString) {
	const codeBox = document.querySelector('.code-box');
	const code = `background: ${gradientType}-gradient(${gradientDegrees}deg, ${gradientString});`;
	codeBox.textContent = code;
}

export function showCheckMark() {
	const checkMark = document.querySelector('.code-box-copy svg');
	checkMark.classList.remove('hide');
	setTimeout(() => {
		checkMark.style.opacity = 0;
	}, 3000);
	setTimeout(() => {
		checkMark.classList.add('hide');
		checkMark.style.opacity = 1;
	}, 3300);
}