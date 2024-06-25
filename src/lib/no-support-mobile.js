export function noSupportMobile() {
	if (window.innerWidth < 768) {
		const body = document.querySelector('body');
		const div = document.createElement('div');
		div.classList.add('no-support-mobile');
		div.style.position = 'fixed';
		div.style.top = '0';
		div.style.left = '0';
		div.style.width = '100%';
		div.style.height = '100px';
		div.style.backgroundColor = '#E3A108';
		div.style.display = 'flex';
		div.style.justifyContent = 'center';
		div.style.alignItems = 'center';
		div.style.zIndex = '1000';
		div.style.color = '#fff';
		div.style.fontSize = '19px';
		div.style.fontFamily = 'Arial, sans-serif';
		div.style.textAlign = 'center';
		div.innerHTML = 'For the best experience, please use a desktop browser. (Not supported on mobile yet.)';
		body.appendChild(div);

		const divHeight = div.offsetHeight;
		body.style.paddingTop = `${divHeight}px`;

	}
}