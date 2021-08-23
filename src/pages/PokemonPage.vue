<template>
    <h1 v-if="!pokemon">Esperi per favor...</h1>

    <div v-else>
        <h1>Quin és aquest Pokémon?</h1>
        <!-- TODO: Picture -->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

        <!-- $event es la informacion que le enviamos en el segundo parametro de $emit desde el hijo -->
        <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />

        <!-- si este div no es molesta por temas de css podemos cambiarlo por un <template></template> -->
        <div v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame()">Començar de nou</button>
        </div>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rdnInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rdnInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if(selectedId === this.pokemon.id) {
        this.message = `Correcte, és ${this.pokemon.name}!`;
      } else {
        this.message = `Ups, era ${this.pokemon.name}!`;    
      }
    },
    newGame() {
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.mixPokemonArray();

    }
  },
  mounted() {
    this.mixPokemonArray();
  }
}
</script>