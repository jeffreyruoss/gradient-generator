import { saveSavedGradientsToLocalStorage } from "../SavedGradientsSection/save-gradient";
import lottie from 'lottie-web';

export function createSavedGradientName() {
	return `
		<div class="saved-gradient-name">
			<button class="edit-saved-gradient-name"">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
			</button>
			<label>Name: </label>
			<input type="text" class="gradient-name" value="Gradient #${savedGradientNameNumber()}">
			<div class="checkmark-lottie-save-gradient-name"></div>
			<button class="save-saved-gradient-name">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
			</button>
		</div>
	`
}

function checkmarkAnimation(lottieContainer) {
	lottieContainer.style.display = 'block';
	lottieContainer.style.opacity = '1';

	let checkmarkLottie;

	if (!checkmarkLottie) {
		checkmarkLottie = lottie.loadAnimation({
			container: lottieContainer,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			path: 'lotties/checkmark-lottie.json'
		});
	} else {
		checkmarkLottie.goToAndPlay(0, true);
	}

	setTimeout(() => {
		lottieContainer.style.opacity = '0';
	}, 3000);

	setTimeout(() => {
		lottieContainer.style.display = 'none';
		checkmarkLottie.destroy();
	}, 4000);
}

function savedGradientNameNumber() {
	const savedGradients = document.querySelectorAll('.saved-gradient');
	return savedGradients.length + 1;
}

function editSavedGradientNameHandler() {
	const savedGradient = this.closest('.saved-gradient');
	const gradientName = savedGradient.querySelector('.gradient-name');
	gradientName.focus();
	gradientName.select();
}

function saveSavedGradientNameHandler(e) {
	e.target.blur();
	saveSavedGradientsToLocalStorage();
	const lottieContainer = e.target.closest('.saved-gradient-name').querySelector('.checkmark-lottie-save-gradient-name');
	checkmarkAnimation(lottieContainer);
}

export function saveGradientNameInit(savedGradientElement) {
	const editSavedGradientName = savedGradientElement.querySelector('.edit-saved-gradient-name');
	editSavedGradientName.addEventListener('click', editSavedGradientNameHandler);

	const saveSavedGradientName = savedGradientElement.querySelector('.save-saved-gradient-name');
	saveSavedGradientName.addEventListener('click', saveSavedGradientNameHandler);

	savedGradientElement.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			saveSavedGradientNameHandler(e);
		}
	});

	// show the save button when the input is focused
	const gradientName = savedGradientElement.querySelector('.gradient-name');
	gradientName.addEventListener('focus', () => {
		saveSavedGradientName.style.opacity = '1';
	});

	// hide the save button when the input is blurred
	gradientName.addEventListener('blur', () => {
		saveSavedGradientName.style.opacity = '0';
	});

	// on click inside of the input, select the text
	gradientName.addEventListener('click', () => {
		gradientName.select();
	});
}