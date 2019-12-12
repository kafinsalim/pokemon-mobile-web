import * as React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Icon, Button, ActivityIndicator } from "antd-mobile";
import { Modal } from "antd";
import { capitalizeFirstLetter } from "../../utils";

export default function Detail(): React.Node {
  const [fetching, setFetching] = React.useState(false);
  const [data, setData] = React.useState({});
  const [imgHeight, setImgHeight] = React.useState(0);
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
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 42,
          paddingTop: 12,
          paddingLeft: 32,
          boxShadow: "1px 1px 4px #9E9E9E",
          backgroundColor: "white",
          // color: "#2eac0d",
          fontWeight: "bold"
        }}
      >
        <Link to="/">
          <Icon type="left" style={{ flex: "0" }} />
        </Link>
        <b
          style={{
            flex: "1",
            textAlign: "center",
            marginRight: 48
          }}
        >
          {name && capitalizeFirstLetter(name)}
        </b>
      </div>
      {fetching ? (
        <ActivityIndicator
          text="Loading..."
          style={{ width: "50%", padding: "25%" }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }}
        >
          {sprites &&
            Object.keys(sprites).map((uri, index) => (
              <img
                key={index}
                alt={sprites[uri]}
                src={sprites[uri]}
                style={{
                  width: "25%",
                  flex: "0.25 1"
                }}
              />
            ))}
        </div>
      )}
      <Card style={{ padding: 16 }}>
        <h4>#{id}</h4>
        <p>
          Types:
          {types && types.map(({ type }) => ` ${type.name} `)}
        </p>
        <p>
          Abilities:
          {abilities && abilities.map(({ ability }) => ` ${ability.name} `)}
        </p>
        <p>
          Moves:
          {moves && moves.map(({ move }) => ` ${move.name} `)}
        </p>

        <Button onClick={() => handleCatch({ id, name })}>CATCH</Button>
        <br />
      </Card>
    </div>
  );
}
