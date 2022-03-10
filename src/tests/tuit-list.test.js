import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    {username: "alice", password: "abcde", email: "alice@wonderland.com", _id: "123"},
  {username: "bob", password: "bob123", email: "bob@hope.com", _id: "234"},
  {username: "charlie", password: "charlie321", email: "charlie@peanuts.com", _id: "345"}
]

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: MOCKED_USERS[0]},
  {tuit: "bob's tuit", postedBy: MOCKED_USERS[1]},
  {tuit: "charlie's tuit", postedBy: MOCKED_USERS[2]}]

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  MOCKED_TUITS.forEach(mockedTuit => {
    const tuitLinkElement = screen.getByText(mockedTuit.tuit);
    expect(tuitLinkElement).toBeInTheDocument();
  })
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const existingTuitsText = [
      "In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight. Two asteroid missions launched to the skies, and another began its journey home to Earth. A look back at highlights for our #NASAScience planetary missions: https://go.nasa.gov/32zX2fE",
      "@SpaceX Dragon spacecraft returns to Earth with @ISS_Research that could help us better understand neurodegenerative diseases, gene expression, & muscle atrophy. Undocking from the @Space_Station is at 9:05am ET (13:05 UT). Watch:"
  ]
  existingTuitsText.forEach(tuitText => {
    const tuitTextElement = screen.getByText(tuitText);
    expect(tuitTextElement).toBeInTheDocument();
  })
})

test('tuit list renders mocked', async () => {
  const getSpy = jest.spyOn(axios, "get");
  getSpy.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  MOCKED_TUITS.forEach(mockedTuit => {
    const tuitLinkElement = screen.getByText(mockedTuit.tuit);
    expect(tuitLinkElement).toBeInTheDocument();
  })
  getSpy.mockRestore();
});
