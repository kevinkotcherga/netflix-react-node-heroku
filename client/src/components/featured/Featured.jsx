import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Aventure</option>
            <option value="comedy">Comedie</option>
            <option value="crime">Policier</option>
            <option value="fantasy">Fantastique</option>
            <option value="historical">Historique</option>
            <option value="horror">Horreur</option>
            <option value="romance">Romantique</option>
            <option value="sci-fi">Science-Fiction</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animation</option>
            <option value="documentary">Documentaire</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Lecture</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Plus d'infos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
