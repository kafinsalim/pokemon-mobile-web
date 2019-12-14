// @flow
import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";
import { Card, Icon, Button, Modal } from "antd-mobile";
import { capitalizeFirstLetter, colorizeByType } from "../../utils";
import LoadingScreen from "../../commons/LoadingScreen";

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  padding-top: 12px;
  padding-left: 32px;
  box-shadow: 1px 1px 4px #9e9e9e;
  background-color: white;
  font-weight: bold;
`;

const Title = styled.b`
  flex: 1;
  text-align: center;
  margin-right: 48px;
`;

const Sprites = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 4px 6px;
  margin: 6px 6px auto auto;
  border-radius: 8px;
  background-color: #a4acaf;
  display: inline-block;
  ${props =>
    props.type &&
    css`
      background-color: ${colorizeByType(props.type)[0]};
      color: ${colorizeByType(props.type)[1]};
    `};
`;

export default function Detail(props): React.Node {
  const [fetching, setFetching] = React.useState(false);
  const [data, setData] = React.useState({});
  const { catchPokemon } = useStoreActions(action => action.myPokemon);

  const { name, sprites, abilities, moves, types, height, weight } = data;
  const { id } = useParams();
  const { prompt, alert } = Modal;

  // fetch data on initial mount
  React.useEffect(() => {
    async function getData() {
      setFetching(true);
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          setData(response.data);
          setFetching(false);
        });
    }
    getData();
  }, [id]);

  // process catch pokemon
  const handleCatch = () => {
    setFetching(true);
    setTimeout(function() {
      // give some loading animation
      setFetching(false);
      if (Math.random() >= 0.5) {
        prompt(
          "You Got It !",
          "give a nickname",
          [
            { text: "Release" },
            {
              text: "Catch",
              onPress: value =>
                catchPokemon({
                  id,
                  pokemon: name,
                  nickname: value
                }) // get name from state
            }
          ],
          "default",
          name
        );
      } else {
        alert(`Oops ${name} too strong`, "Try Again", [{ text: "Okay" }]);
      }
    }, 750);
  };
  return (
    <>
      <Header>
        <a to="/" onClick={() => props.history.goBack()} href>
          <Icon type="left" style={{ flex: "0" }} />
        </a>
        <Title>{name && capitalizeFirstLetter(name)}</Title>
      </Header>
      {fetching ? (
        <LoadingScreen />
      ) : (
        <>
          <Sprites>
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
          </Sprites>
          <Card style={{ padding: 24 }}>
            <h3>#{id}</h3>
            <p>
              <b>Height : </b>
              {height}
              <span style={{ marginLeft: "25%" }}>
                <b>Weight : </b>
                {weight}
              </span>
            </p>
            <p>
              <b>Types :</b>
              <br />
              {types &&
                types.map(({ type }) => (
                  <Badge key={type.name} type={type.name}>
                    {type.name}
                  </Badge>
                ))}
            </p>
            <p>
              <b>Abilities :</b>
              <br />
              {abilities &&
                abilities.map(({ ability }) => (
                  <Badge key={ability.name}>{ability.name}</Badge>
                ))}
            </p>
            <p>
              <b>Moves :</b>
              <br />
              {moves &&
                moves.map(({ move }) => (
                  <Badge key={move.name}>{move.name}</Badge>
                ))}
            </p>

            <Button type="primary" onClick={handleCatch}>
              CATCH
            </Button>
          </Card>
        </>
      )}
    </>
  );
}
