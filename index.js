const request = require("request-promise")
const terminalImage = require("terminal-image")

async function printPokemonSprite(pokemonId) {
  let responseBody = await request(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
  let pokemon = JSON.parse(responseBody)
  let spriteResponse = await request({
    uri: pokemon.sprites.front_default,
    encoding: null
  })
  let imageString = await terminalImage.buffer(spriteResponse)
  console.log(pokemon.name)
  console.log(imageString)
}


function main() {
  const pokemonId = process.argv[2]
  printPokemonSprite(pokemonId)
}

main()