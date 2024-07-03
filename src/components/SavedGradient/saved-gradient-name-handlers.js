import { saveSavedGradientsToLocalStorage } from "../SavedGradientsSection/save-gradient";
import lottie from 'lottie-web';

export function editSavedGradientNameHandler() {
	const savedGradient = this.closest('.saved-gradient');
	const gradientName = savedGradient.querySelector('.gradient-name');
	gradientName.focus();
	gradientName.select();
}

export function saveSavedGradientNameHandler(e) {
	e.target.blur();
	saveSavedGradientsToLocalStorage();
	const lottieContainer = e.target.closest('.saved-gradient-name').querySelector('.checkmark-lottie-save-gradient-name');
	checkmarkAnimation(lottieContainer);
}

export function savedGradientNameNumber() {
	const savedGradients = document.querySelectorAll('.saved-gradient');
	return savedGradients.length + 1;
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