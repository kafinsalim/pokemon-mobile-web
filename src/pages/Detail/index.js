import * as React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Card, Icon, Button, ActivityIndicator, Modal } from "antd-mobile";
import { capitalizeFirstLetter, history } from "../../utils";

export default function Detail(props): React.Node {
  console.log("props", props);
  console.log("props", props);
  const [fetching, setFetching] = React.useState(false);
  const [data, setData] = React.useState({});
  const [imgHeight, setImgHeight] = React.useState(0);

  const { myPokemon, catchRate } = useStoreState(state => state);
  const catchRateAction = useStoreActions(action => action.catchRate);
  const myPokemonAction = useStoreActions(action => action.myPokemon);

  const { name, sprites, abilities, moves, types } = data;
  const { pokemons } = myPokemon;
  const { success, failed } = catchRate;
  const { id } = useParams(); // used in many functs
  const { prompt, alert } = Modal;

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

  const handleCatch = () => {
    const { success, failed } = catchRate;
    const { catchSuccess, catchFailed } = catchRateAction;
    console.log("data", data);
    if (Math.random() >= 0.5) {
      catchSuccess(success + 1);
      prompt(
        "You Got It !",
        "give a nickname",
        [
          { text: "Release" },
          {
            text: "Catch",
            onPress: value =>
              handleTamePokemon({ id, pokemon: name, nickname: value }) // get name from state
          }
        ],
        "default",
        name
      );
    } else {
      catchFailed(failed + 1);
      prompt(`Oops ${name} too Strong`, "Try Again");
      alert(`Oops ${name} too Strong`, "Try Again", [
        { text: "Okay", onPress: () => {}, style: "default" }
      ]);
    }
  };

  const handleTamePokemon = newPokemon => {
    const { pokemons } = myPokemon;
    const { catchPokemon } = myPokemonAction;
    catchPokemon(newPokemon);
    console.log(`cathed `, newPokemon);
  };

  console.log("render", props, data);

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
        {/* <a onClick={() => history.back()}> */}
        <Link to="/">
          <Icon type="left" style={{ flex: "0" }} />
        </Link>
        {/* </a> */}
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

        <Button type="primary" onClick={handleCatch}>
          CATCH
        </Button>
        <br />
      </Card>
    </div>
  );
}
