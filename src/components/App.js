import { React, Component } from 'react';
import PokemonesApi from '../api/pokemonesApi';
import Pagination from './pagination';
import Sidenav from './sidenav';
import Info from './info';

class App extends Component {

  constructor() {
    super();
    this.state = {
      totalPaginas: 0,
      paginaActual: 0,
      paginaAnterior: null,
      paginaSiguiente: 1,
      pokemonesSide: [],
      pokemonCargado: {},
      habilidades: [],
      idioma: 'es'
    }

    // Instancia de la clase Pokemones
    this.pokemonesApi = new PokemonesApi();
    this.setup();
  };

  // Inicializamos la pagination, sidenav y un pokemon por default.
  setup = async () => {
    // Pedimos todos los pokemones
    const response = await this.pokemonesApi.getPokemones();
    const totalPaginas = this.pokemonesApi.calcularTotalPaginas(response.data.count);

    // Cargamos un pokemon
    this.cargarPokemon();

    this.setState({ 
      totalPaginas: totalPaginas,
      pokemonesSide: response.data.results,
    })
  }

  cargarPokemon = async (id) => {
    const data = await this.pokemonesApi.getPokemon(id, this.state.idioma);
    const pokemonBase = data[0];
    const habilidades = data[1];

    this.setState({ 
      pokemonCargado: pokemonBase,
      habilidades: habilidades
    })
  }

  onClickPagination = async (e) => {
    e.preventDefault();

    // Chequeamos que se haya clickeado en un numero de pagina y no un "siguiente"/"anterior"
    const clickedNum = parseInt(e.target.dataset.pagina);
    this.setState({ paginaActual:  clickedNum});

    const nuevosPokemones = await this.pokemonesApi.getPokemones(clickedNum * this.pokemonesApi.porPagina);
    const paginaAnterior = nuevosPokemones.data.previous;
    const paginaSiguiente = nuevosPokemones.data.next;

    this.setState((state) => ({ 
      pokemonesSide:  nuevosPokemones.data.results,
      paginaAnterior: paginaAnterior !== null || paginaAnterior === 0 ? state.paginaActual - 1 : null,
      paginaSiguiente: paginaSiguiente ? state.paginaActual + 1 : null
    }));
  };

  onClickSidenav = async (e) => {
    e.preventDefault();
    this.cargarPokemon(e.target.dataset.id);
  }

  onClickIdioma = (e) => {
    this.setState({ idioma: e.target.value })
  }
  
  render() {
    const { 
      totalPaginas, 
      pokemonesSide, 
      pokemonCargado, 
      habilidades, 
      paginaAnterior, 
      paginaActual, 
      paginaSiguiente,
      idioma } = this.state;

    return (
      <div className="app">
        <Pagination 
          totalPaginas={totalPaginas} 
          paginaAnterior={paginaAnterior}
          paginaActual={paginaActual}
          paginaSiguiente={paginaSiguiente}
          idioma={idioma}
          onClickPagination={this.onClickPagination}
          onClickIdioma={this.onClickIdioma}
          />
        <main>
          <Sidenav pokemonesSide={pokemonesSide} onClickSidenav={this.onClickSidenav} />
          {
            Object.keys(pokemonCargado).length !== 0 ?
            <Info 
              pokemonCargado={pokemonCargado} 
              habilidadesCargadas={habilidades} 
              idioma={idioma}
            /> :
              <span className="app__loading-container"> <i className="app__loading nes-pokeball"></i> Loading...</span>
          }
        </main>
      </div>
    )
  };
}

export default App;
