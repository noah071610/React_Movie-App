import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart , faHeartBroken } from '@fortawesome/free-solid-svg-icons'

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;
  const element = <FontAwesomeIcon icon={faHeart} />
  const elementt = <FontAwesomeIcon icon={faHeartBroken} />

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  };

  useEffect(() => {

    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber)
      if (response.data.success) {
      } else {
        alert("false to get number of like");
      }
    });
    axios.post("/api/favorite/favorited", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited)
      } else {
        alert("false to get the info");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                }
            })
    } else {
        axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                }
            })}
}
  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited? element : elementt}{FavoriteNumber}</Button>
    </div>
  );
}

export default Favorite;
