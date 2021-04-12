import { React, Component } from 'react';
import { mayuscula } from '../utilities/utilities';

class Sidenav extends Component {

	handleClick = (e) => {
		e.preventDefault();

		const buttons = document.querySelectorAll('.sidenav__btn');

		buttons.forEach(btn => {
			if(btn.classList.contains('is-primary')) {
				btn.classList.remove('is-primary');
			}
		});

		e.target.classList.toggle('is-primary');

		this.props.onClickSidenav(e);
	}

	render() {
		const { pokemonesSide } = this.props;

		// Construir los <li>
		const sideItems = 
			pokemonesSide.map(pokemon => {
				// Usamos el id de la url como unique key.
				const urlParams = pokemon.url.split('/');
				const id = urlParams[urlParams.length - 2];
				const name = mayuscula(pokemon.name);

				return (
					<li className='sidenav__item' key={id}>
						<button className='sidenav__btn nes-btn' onClick={this.handleClick} data-id={id}>{name}</button>
					</li>
				)
			});
		
		return (
			<div className="sidenav nes-container with-title">
			<div className="sidenav__title title">
				<i className="sidenav__icon nes-pokeball"></i>
			</div>
				<ul className="sidenav__buttons">
					{sideItems}
				</ul>
			</div>
		)
	}
}

export default Sidenav;