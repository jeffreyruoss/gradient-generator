export function exportSavedGradientsHandler() {
	const savedGradientsArray = JSON.parse(localStorage.getItem('gradient_generator_saved_gradients'));
	const savedGradientsString = JSON.stringify(savedGradientsArray);
	const savedGradientsBlob = new Blob([savedGradientsString], { type: 'application/json' });
	const savedGradientsBlobURL = URL.createObjectURL(savedGradientsBlob);
	const savedGradientsBlobLink = document.createElement('a');
	savedGradientsBlobLink.href = savedGradientsBlobURL;
	savedGradientsBlobLink.download = 'saved-gradients.json';
	savedGradientsBlobLink.click();
	URL.revokeObjectURL(savedGradientsBlobURL);
}