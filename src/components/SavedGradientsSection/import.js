export function importSavedGradientsHandler() {
	if (confirmImport()) {
		handleFileSelection();
	}
}

function confirmImport() {
	const message = 'Are you sure you want to import saved gradients? This will overwrite the current saved gradients.';
	return confirm(message);
}

function handleFileSelection() {
	const importSavedGradientsInput = document.createElement('input');
	importSavedGradientsInput.type = 'file';
	importSavedGradientsInput.accept = '.json';
	importSavedGradientsInput.addEventListener('change', handleFileRead);
	importSavedGradientsInput.click();
}

function handleFileRead(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = handleFileLoad;
	reader.onerror = handleFileError;
	reader.readAsText(file);
}

function handleFileLoad(event) {
	try {
		const savedGradientsArray = JSON.parse(event.target.result);
		localStorage.setItem('gradient_generator_saved_gradients', JSON.stringify(savedGradientsArray));
		window.location.reload();
	} catch (error) {
		console.error('Error parsing JSON', error);
	}
}

function handleFileError(event) {
	console.error('Error reading file', event.target.error);
}