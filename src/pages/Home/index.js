import * as React from "react";
import axios from "axios";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";

export default function Home(): React.Node {
  const [pokemons, setPokemons] = React.useState([]);
  const [fetchOffset, setFetchOffset] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const limit = 10; // total pokemon per fetch

  function fetchMore() {
    setFetchOffset(fetchOffset + limit);
  }

  const handleScroll = React.useCallback(() => {
    const scrollTop: HTMLElement | number | null =
      document.documentElement && document.documentElement.scrollTop; // html Element
    const offsetHeight: HTMLElement | number | null =
      document.getElementById("root") &&
      document.getElementById("root").offsetHeight; // root Element
    console.log(
      `${window.innerHeight}+${scrollTop} = ${window.innerHeight +
        scrollTop} x ${offsetHeight}`
    );

    // do nothing if scrollY !reach bottom
    if (window.innerHeight + scrollTop !== offsetHeight) return;
    // else do
    fetchMore(); // TODO: throttle fetching
  }, [fetchMore]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  React.useEffect(() => {
    function getPokemons() {
      setFetching(true);
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${fetchOffset}&limit=${limit}`
        )
        .then(response => {
          setPokemons(
            [...pokemons, ...response.data.results],
            console.log(pokemons)
          );
          setFetching(false);
        });
    }

    getPokemons();
  }, [fetchOffset]);

  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <Card
          size="small"
          title={pokemon.name}
          extra={<Link to={`detail/${index + 1}`}>More..</Link>}
          key={pokemon.id}
        >
          {index + 1}-{pokemon.name}-{pokemon.url}
        </Card>
      ))}
      {fetching && (
        <center>
          <Spin tip="Loading..." />
        </center>
      )}
    </div>
  );
}
