import React, { useState } from "react";
import styled from "styled-components";
import SerchInput from "../SerchInput";
import { Spinner } from "reactstrap";
import { Api } from "../../api/Api";
import { useEffect } from "react";
const Div = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-content: center;
`;
const Img = styled.img`
  height: auto;
  width: 80%;
`;

const Home = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const handleClick = async () => {
    console.log(text);
    try {
      const { data } = await Api.post("/searchVideo", {
        convertedText: text,
      });
      console.log("data from scraper", data);
      const id = data.split("=");
      console.log(id);
      setFetchedData(id[1]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!fetchedData) return;
  }, [fetchedData]);

  return (
    <Div>
      <Img src={"/musiconLogo.png"} alt="Musicon" />
      <SerchInput handleClick={handleClick} setText={setText} text={text} />
      <h3>{text}</h3>
      {isLoading ? (
        <Spinner
          style={{
            height: "4rem",
            width: "4rem",
          }}
          color="primary"
        >
          Loading...
        </Spinner>
      ) : (
        <iframe
          width="600"
          height="400"
          className="video"
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={
            fetchedData
              ? `https://youtube.com/embed/${fetchedData}?autoplay=0`
              : null
          }
        ></iframe>
      )}
    </Div>
  );
};

export default Home;
