import {
  capitalizeFirstLetter,
  colorizeByType,
  getPokemonImage
} from "./index";

describe("Utilities", () => {
  it("capitalizeFirstLetter function", () => {
    const result = capitalizeFirstLetter("pokemon");
    expect(result).toEqual("Pokemon");
  });
  it("colorizeByType function", () => {
    const result = colorizeByType("poison");
    expect(result).toEqual(["#B87EC8", "#000"]);
  });
  it("getPokemonImage function", () => {
    const result = getPokemonImage(1);
    expect(result).toEqual(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });
});
