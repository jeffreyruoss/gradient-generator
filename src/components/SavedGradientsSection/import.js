export function importSavedGradientsHandler() {
	importSavedGradientsConfirmation();
}

function importSavedGradients() {
	const file = this.files[0];
	const reader = new FileReader();
	reader.onload = function () {
		const savedGradientsArray = JSON.parse(reader.result);
		localStorage.setItem('gradient_generator_saved_gradients', JSON.stringify(savedGradientsArray));
		window.location.reload();
	}
	reader.readAsText(file);
}

function importSavedGradientsConfirmation() {
	const message = 'Are you sure you want to import saved gradients? This will overwrite the current saved gradients.';
	const confirmImport = confirm(message);
	if (confirmImport) {
		const importSavedGradientsInput = document.createElement('input');
		importSavedGradientsInput.type = 'file';
		importSavedGradientsInput.accept = '.json';
		importSavedGradientsInput.addEventListener('change', importSavedGradients);
		importSavedGradientsInput.click();
	}
}