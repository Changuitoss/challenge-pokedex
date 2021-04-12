import { React, Component } from 'react';
import { mayuscula, traducirStat } from '../utilities/utilities';
import aplicaColorStat from '../styles/helpers';

class Info extends Component {
	
	render() {
		const { pokemonCargado, habilidadesCargadas, idioma } = this.props;
		const name = mayuscula(pokemonCargado.name);

		// Mapeamos las stats, devolvemos el nombre y el puntaje
		const stats = pokemonCargado.stats.map(stat => {
			const { base_stat } = stat;
			let statColorClass = aplicaColorStat(base_stat);

			return (
				<li key={stat.stat.name}>
					<span>{idioma === 'en' ? stat.stat.name : traducirStat(stat.stat.name)}: </span>
					<progress className={`nes-progress ${statColorClass}`} value={stat.base_stat} max='100'></progress>
				</li>
			)
		})

		// Mapeamos las habilidades
		const habilidades = habilidadesCargadas.map((hab, i) => {

			// Generamos un array con descripciones de la habilidad en el idioma elegido
			const habilidadEnIdioma = hab.data.flavor_text_entries.filter(entry => {
				return entry.language.name === idioma;
			})

			return (
				<li className='info__habilidad' key={i}>
					<span>{(hab.data.name).toUpperCase()}</span>
					<p className='info__habilidad-descripcion'>{habilidadEnIdioma[0].flavor_text}</p>
				</li>
			)
		})

		return (
			<div className='info'>
				<div className='info__top nes-container with-title'>
					<h3 className='info__name title'>{name}</h3>
					<div className="info__container-top">
						<div className="info__imagenes">
							<img className='info__imagen' src={pokemonCargado.sprites.front_default} alt=""/>
							<img className='info__imagen' src={pokemonCargado.sprites.back_default} alt=""/>
						</div>
						<div className="info__stats">
							{stats}
						</div>
					</div>
				</div>
				<div className="info__habilidades nes-container with-title">
				<h4 className='title'>{idioma === 'en' ? 'Abilities' : 'Habilidades'}</h4>
				<ul>
					{habilidades}
				</ul>
				</div>

			</div>
		)
	}
}

export default Info;