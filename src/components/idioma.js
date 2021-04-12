import { React, Component } from 'react';

class Idioma extends Component {
	
	handleClick = (e) => {
		this.props.onClickIdioma(e);
	}

	render() {
		const { idioma } = this.props;

		return (
			<div className="idioma">
				<div id="radios" className="item">
					<label className="idioma__opcion">
						<input type="radio" className="nes-radio" value="es" onChange={this.handleClick} checked={idioma === 'es'} />
						<span>Español</span>
					</label>
					
					<label>
						<input type="radio" className="nes-radio" value="en" onChange={this.handleClick} checked={idioma === 'en'}/>
						<span>English</span>
					</label>
				</div>
			</div>
		)
	}
}

export default Idioma;