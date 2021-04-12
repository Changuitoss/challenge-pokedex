import React, { Component } from 'react';
import Idioma from '../components/idioma';

class Pagination extends Component {

 render() {
	const { paginaActual, onClickPagination, paginaAnterior, paginaSiguiente, idioma, onClickIdioma } = this.props;
	const paginas = [];
	const iniciarEn = paginaActual <= 5 ? 1 : paginaActual - 4;
	
	for(let i = iniciarEn; i <= iniciarEn + 10; i++) {
		const estaPagina = i === paginaActual + 1;
		paginas.push(
			<li key={i}>
				<button 
					className={estaPagina ? 'pagination__btn active' : 'pagination__btn'}
					onClick={onClickPagination} 
					data-pagina={i - 1}
					disabled={estaPagina ? true : false}
				>
					{i}
				</button>
			</li>
		);
	}

	 return (
		 <div className="pagination nes-container">
			<ul className='pagination__list'>
				<li>
					<button 
					className='pagination__btn' 
					data-pagina={paginaAnterior}
					onClick={onClickPagination}
					disabled={paginaAnterior == null || paginaAnterior < 0 ? true : false}
					>
						&lt;
					</button>
				</li>
					{paginas}
				<li>
					<button 
						className='pagination__btn' 
						data-pagina={paginaSiguiente}
						onClick={onClickPagination}
						disabled={!paginaSiguiente ? true : false}
					>
						&gt;
					</button>
				</li>
			 </ul>
		 	<Idioma idioma={idioma} onClickIdioma={onClickIdioma} />
		 </div>
	 )
 }
}

export default Pagination;