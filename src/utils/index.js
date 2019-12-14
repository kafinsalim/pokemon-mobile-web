const capitalizeFirstLetter = string => {
  if (string) return string.charAt(0).toUpperCase() + string.substring(1);
  return null;
};

const colorizeByType = type => {
  switch (type) {
    case "normal":
      return ["#A4ACAF", "#000"];
    case "fighting":
      return ["#D66723", "#FFF"];
    case "flying":
      return ["#3DC7EE", "#000"];
    case "poison":
      return ["#B87EC8", "#000"];
    case "ground":
      return ["#AA9742", "#000"];
    case "rock":
      return ["#A38B21", "#FFF"];
    case "bug":
      return ["#729F40", "#FFF"];
    case "ghost":
      return ["#7C62A3", "#FFF"];
    case "steel":
      return ["#9EB8B8", "#000"];
    case "fire":
      return ["#FA7D24", "#FFF"];
    case "water":
      return ["#4592C4", "#fff"];
    case "grass":
      return ["#9CCC50", "#000"];
    case "electric":
      return ["#EDD534", "#000"];
    case "psychic":
      return ["#F265B9", "#FFF"];
    case "ice":
      return ["#51C4E7", "#000"];
    case "dragon":
      return ["#F16E57", "#FFF"];
    case "dark":
      return ["#717171", "#FFF"];
    case "fairy":
      return ["#FBB9E9", "#FFF"];
    case "unknown":
      return ["#000000", "#FFF"];
    case "shadow":
      return ["#5C5A56", "#000"];
    default:
      return ["transparent", "#000"];
  }
};

const getPokemonImage = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export { capitalizeFirstLetter, colorizeByType, getPokemonImage };
