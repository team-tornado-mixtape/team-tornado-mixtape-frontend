import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EachMixtape from "./EachMixtape";
import { flexbox } from "@mui/system";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import AddMixtapeButton from "./AddMixtape";
import WizardContainer from "../NewMixtape/WizardContainer.jsx"

import PlayerContainer from "../Player/PlayerContainer.jsx"

export default function Rack({ token }) {

  const [addMixtapeButtonClicked, setAddMixtapeButtonClicked] = useState(false)

  const [selectedMix, setSelectedMix] = useState('none')

  const [pageDidLoad, setPageDidLoad] = useState(false);
  const [myMixtapesDidLoad, setMyMixtapesDidLoad] = useState(false);
  const [myFavoritesDidLoad, setMyFavoritesDidLoad] = useState(false);
  const [allMixtapesDidLoad, setAllMixtapesDidLoad] = useState(false);
  const [myMixtapesIsSelected, setMyMixtapesIsSelected] = useState(false);
  const [myMixtapesDisplayed, setMyMixtapesDisplayed] = useState([]);
  const [myFavoritesIsSelected, setMyFavoritesIsSelected] = useState(false);
  const [myFavoritesDisplayed, setMyFavoritesDisplayed] = useState([]);
  const [allMixtapesIsSelected, setAllMixtapesIsSelected] = useState(false);
  const [allMixtapesDisplayed, setAllMixtapesDisplayed] = useState([]);
  const [error, setError] = useState("");
  const [favoriteClicked, setFavoriteClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  // what needs doing:
  // - use lodash to add delay to showing if set is loading (api is working a bit too well...)
  // - wrap each of these in a column and arrange them side by side
  // - create a mixtape spine component that displays this data nicely :)

  useEffect(() => {
    setMyFavoritesDidLoad(true);
    setAllMixtapesDidLoad(true);
    setMyMixtapesIsSelected(true);

    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setPageDidLoad(true);
        setMyMixtapesDidLoad(true);
        setMyMixtapesDisplayed(res.data);
      })
      .catch((e) => {
        setError(e.message);
      });
    console.log(error);
  }, [token, error, favoriteClicked]);

  function ShowMyMixtapes(e) {
    e.preventDefault();
    setMyMixtapesIsSelected(true);
    setMyMixtapesDidLoad(false);
    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(`here is the res.data my mixtapes ${res.data}`);
        setMyMixtapesDidLoad(true);
        setMyMixtapesDisplayed(res.data);
      })
      .catch((e) => {
        setError(e.message);
        console.log(
          "ERROR! This did not work. Please check that the body of the request is formatted properly."
        );
      });
    console.log(error);
  }

  function HideMyMixtapes(e) {
    e.preventDefault();
    myFavoritesIsSelected === false && allMixtapesIsSelected === false
      ? setError("You must have at least one view selected.")
      : setMyMixtapesDisplayed([])(setMyMixtapesIsSelected(false));
  }

  function ShowMyFavoriteMixtapes(e) {
    e.preventDefault();
    setMyFavoritesIsSelected(true);
    setMyFavoritesDidLoad(false);
    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/favorites/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(`here is the res.data for favorites ${res.data}`);
        setMyFavoritesDidLoad(true);
        setMyFavoritesDisplayed(res.data);
      })
      .catch((e) => {
        setError(e.message);
        console.log(
          "ERROR! This did not work. Please check that the body of the request is formatted properly."
        );
      });
    console.log(error);
  }

  function HideMyFavoriteMixtapes(e) {
    e.preventDefault();
    myMixtapesIsSelected === false && allMixtapesIsSelected === false
      ? setError("You must have at least one view selected.")
      : setMyFavoritesDisplayed([])(setMyFavoritesIsSelected(false));
  }

  function ShowAllMixtapes(e) {
    e.preventDefault();
    setAllMixtapesIsSelected(true);
    setAllMixtapesDidLoad(false);
    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(`here is the res.data all mixtapes ${res.data}`);
        setAllMixtapesDidLoad(true);
        setAllMixtapesDisplayed(res.data);
      })
      .catch((e) => {
        setError(e.message);
        console.log(
          "ERROR! This did not work. Please check that the body of the request is formatted properly."
        );
      });
    console.log(error);
  }

  function HideAllMixtapes(e) {
    e.preventDefault();
    myMixtapesIsSelected === false && myFavoritesIsSelected === false
      ? setError("You must have at least one view selected.")
      : setAllMixtapesDisplayed([])(setAllMixtapesIsSelected(false));
  }

  // function MixSelect({ mixId }) {
  //   const result = mixId
  //   this.setState({ mixId });
  //   this.setSelectedMix({ result });
  //   console.log(selectedMix)

  //   // const putEachMixInState = mixId
  //   // console.log(`here is the variable: ${putEachMixInState}`)
  //   // setSelectedMix(putEachMixInState);
  //   // console.log(selectedMix)
  // };

  // const MixSelect = ({ mixId }) => {
  //   const result = mixId
  //   console.log(result)
  //   // even if you comment this back in, it still won't work
  //   // setSelectedMix(result)
  //   console.log(selectedMix)
  // }

  return (
    <>
      <div>
        {addMixtapeButtonClicked === false && (
          <AddMixtapeButton addMixtape={() => setAddMixtapeButtonClicked(true)} />
        )}
        {addMixtapeButtonClicked === true && <WizardContainer token={token} addMixtapeButtonClicked={addMixtapeButtonClicked} setAddMixtapeButtonClicked={setAddMixtapeButtonClicked} />}
      </div>
      <Box sx={{ display: "flexbox", alignContent: "center" }}>
        <Stack spacing={2} direction="column">
          <Card
            sx={{
              display: "flex",
              width: "28vw",
              alignContent: "center",
              backgroundColor: "#8F4F6A",
              border: "2px solid #E2E2DF",
            }}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h3">The Rack</Typography>
            </CardContent>
          </Card>
          <br></br>
          <Stack spacing={2} direction="row">
            {myMixtapesIsSelected ? (
              <Chip
                label="Created by me"
                color="secondary"
                onClick={HideMyMixtapes}
              />
            ) : (
              <Chip
                label="Created by me"
                variant="outlined"
                onClick={ShowMyMixtapes}
              />
            )}
            {myFavoritesIsSelected ? (
              <Chip
                label="My favorites"
                color="primary"
                onClick={HideMyFavoriteMixtapes}
              />
            ) : (
              <Chip
                label="My favorites"
                variant="outlined"
                onClick={ShowMyFavoriteMixtapes}
              />
            )}
            {allMixtapesIsSelected ? (
              <Chip
                label="All mixtapes"
                color="secondary"
                onClick={HideAllMixtapes}
              />
            ) : (
              <Chip
                label="All mixtapes"
                variant="outlined"
                onClick={ShowAllMixtapes}
              />
            )}
          </Stack>
          <br></br>
        </Stack>
        <Stack spacing={2} direction="row">
          {pageDidLoad === false ? (
            <CircularProgress />
          ) : (
            <>
              {myMixtapesDidLoad === false ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <>
                  {myMixtapesDisplayed ? (
                    <Stack spacing={1} direction="column">
                      <>
                        {myMixtapesDisplayed.map((eachMix, index) => {
                          const mixId = eachMix.id
                          return (
                            <>
                              <EachMixtape
                                eachMix={eachMix}
                                favoriteClicked={favoriteClicked}
                                setFavoriteClicked={setFavoriteClicked}
                                deleteClicked={deleteClicked}
                                setDeleteClicked={setDeleteClicked}
                                index={index}
                                token={token}
                              />
                            </>
                          );
                        })}
                      </>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {myFavoritesDidLoad === false ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <>
                  {myFavoritesDisplayed ? (
                    <Stack spacing={1} direction="column">
                      <>
                        <>
                          {myFavoritesDisplayed.map((eachMix, index) => {
                            return (
                              <EachMixtape
                                eachMix={eachMix}
                                favoriteClicked={favoriteClicked}
                                setFavoriteClicked={setFavoriteClicked}
                                deleteClicked={deleteClicked}
                                setDeleteClicked={setDeleteClicked}
                                index={index}
                                token={token}
                              />
                            );
                          })}
                        </>
                      </>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {allMixtapesDidLoad === false ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <>
                  {allMixtapesDisplayed ? (
                    <Stack spacing={1} direction="column">
                      <>
                        {allMixtapesDisplayed.map((eachMix, index) => {
                          return (
                            <EachMixtape
                              eachMix={eachMix}
                              favoriteClicked={favoriteClicked}
                              setFavoriteClicked={setFavoriteClicked}
                              deleteClicked={deleteClicked}
                              setDeleteClicked={setDeleteClicked}
                              index={index}
                              token={token}
                            />
                          );
                        })}
                      </>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}
