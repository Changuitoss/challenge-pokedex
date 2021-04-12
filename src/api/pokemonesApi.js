import axios from 'axios';

class PokemonesApi {
	baseUrl = 'https://pokeapi.co/api/v2/pokemon';
	porPagina = 5;

	async getPokemones(offset = 0) {
		let response = await axios.get(`${this.baseUrl}/?limit=${this.porPagina}&offset=${offset}`);

		return response;
	}

	calcularTotalPaginas = (totalPokemones) => {
		const totalPaginas = totalPokemones / this.porPagina;

		return totalPaginas;
	}

	// Pedimos un pokemon
	getPokemon = async (id =1, idioma = 'en') => {
		const basePokemon = await axios.get(`${this.baseUrl}/${id}`);

		const habilidades = await Promise.all(basePokemon.data.abilities.map(async hab => {
			const habilidad = await axios.get(hab.ability.url);

			return habilidad;
			})
		)

		return [basePokemon.data, habilidades];
	}
}

export default PokemonesApi;