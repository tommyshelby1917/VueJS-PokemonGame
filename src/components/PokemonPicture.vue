<template>
    <div class="pokemon-container">
        <img :src="imgSrc" class="hidden-pokemon" alt="pokemon" />

        <img v-if="showPokemon" :src="imgSrc" class="fade-in" alt="pokemon" />
    </div>
</template>

<script>
export default {
	props: {
		pokemonId: {
			type: Number,
			required: true
		},
		showPokemon: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	computed: {
		imgSrc() {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
		}
	}
}
</script>

<style scoped>
/* Si ponemos la palabra scoped, este css solo es para este componente */
.pokemon-container {
    height: 200px;
}

.pokemon-container {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
}

img {
    height: 200px;
    position: absolute;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    display: flex;
    justify-content: center;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>