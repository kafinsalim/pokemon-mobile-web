import history from "./history";

const capitalizeFirstLetter = string => {
  if (string) return string.charAt(0).toUpperCase() + string.substring(1);
  return null;
};

export { capitalizeFirstLetter, history };
