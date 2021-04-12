
// Elegimos un color segun el nivel de cada stat
export default function aplicaColorStat(stat) {
	let statColorClass = '';
				
	switch(true) {
		case (stat > 40 && stat < 60):
			statColorClass = 'is-warning';
			break;
		case(stat <= 40):
			statColorClass = 'is-error';
			break;
		default:
			statColorClass = 'is-success';
	}

	return statColorClass;
}
