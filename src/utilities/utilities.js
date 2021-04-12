// Cambia la primera letra de un string a mayuscula.
export function mayuscula(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function traducirStat(stat) {
	let statEsp = '';

	switch(true){
		case stat === 'hp':
			statEsp = 'energia';
			break;
		case stat === 'attack':
			statEsp = 'ataque';
			break;
		case stat === 'defense':
			statEsp = 'defensa';
			break;
		case stat === 'special-attack':
			statEsp = 'ataque-especial';
			break;
		case stat === 'special-defense':
			statEsp = 'defensa-especial';
			break;
		default:
			statEsp = 'velocidad'
	}

	return statEsp;
}