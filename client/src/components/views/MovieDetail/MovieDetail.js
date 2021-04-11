import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row, Button } from "antd";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {
  const movieId = props.match.params.movieId; //propsmatch는 api
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });
  }, [movieId]);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "65%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
        </div>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />
        {/* Actors Grid*/}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <Button onClick={toggleActorView}>
            <span style={{ fontSize: "0.7rem" }}>Toggle Actor View</span>
          </Button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]} style={{ width: "100%", margin: "1rem auto" }}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default MovieDetail;
