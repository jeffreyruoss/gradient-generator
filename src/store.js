export let gradientStops = [
	{ color: '#ADD8E6', position: 0 },
	{ color: '#FFA07A', position: 50 },
	{ color: '#0000FF', position: 100 }
];

export function setGradientStops(newStops) {
	gradientStops = newStops;
}