const request = require("request-promise")
const terminalImage = require("terminal-image")

async function printPokemonSprite(pokemonId) {
  let spriteUrl;
  try {
    let responseBody = await request(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    let pokemon = JSON.parse(responseBody)
    spriteUrl = pokemon.sprites.front_default
  } catch (error) {
    console.log("Error finding Pokemon Sprite URL: ", error)
  }

  let spriteResponse
  try {
    spriteResponse = await request({
      uri: spriteUrl,
      encoding: null
    })
  } catch (error) {
    console.log("Error downloading pokemon image: ", error)
  }

  let imageString
  try {
    imageString = await terminalImage.buffer(spriteResponse)
  } catch (error) {
    console.log("Error formatting image: ", error)
  }

  console.log(imageString)
}


function main() {
  const pokemonId = process.argv[2]
  printPokemonSprite(pokemonId)
}

main()