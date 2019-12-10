import * as React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Modal, Card, Button, Spin } from "antd";

export default function Detail(): React.Node {
  const [fetching, setFetching] = React.useState(false);
  const [data, setData] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function getData() {
      setFetching(true);
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setFetching(false);
        });
    }
    console.log("fetching");
    getData();
  }, []);

  console.log("rendering");

  const handleCatch = ({ id, name }) => {
    const catchResult = Math.random();
    confirm({
      title: `Catching ${name}`,
      content:
        catchResult > 0.5
          ? `"GOT IT (${catchResult})`
          : `TRY AGAIN (${catchResult})`,
      onOk() {},
      onCancel() {}
    });
  };

  const { confirm } = Modal;

  const { name, sprites, abilities, moves, types } = data;
  return (
    <div>
      <Link to={"/"}>Back to Home</Link>
      <br />
      <br />
      {fetching ? (
        <Spin tip="Loading..." />
      ) : (
        <Card title={name}>
          {sprites &&
            Object.keys(sprites).map((uri, index) => (
              <img key={index} src={sprites[uri]} />
            ))}
          <h4>#{id}</h4>
          <p>
            Abilities:
            {abilities && abilities.map(({ ability }) => ability.name + ",")}
          </p>
          <p>
            Moves:
            {moves && moves.map(({ move }) => move.name + ",")}
          </p>
          <p>
            Types:
            {types && types.map(({ type }) => type.name + ",")}
          </p>
          <Button onClick={() => handleCatch({ id, name })}>CATCH</Button>
        </Card>
      )}
    </div>
  );
}
