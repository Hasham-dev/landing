// pages/index.js
import styles from "/styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import Image from "next/legacy/image";
import data from "../json/data.json";
import backgroundData from "../json/background.json";
import shirtData from "../json/shirt.json";
import furData from "../json/fur.json";
import headData from "../json/head.json";
import faceData from "../json/face.json";
import Canvas from "canvas";

export default function CanvasComponent() {
  //
  // ORIGINAL npm Canvas Code Image Generation #1
  let image2;
  const canvas = Canvas.createCanvas(500, 500);
  const ctx = canvas.getContext("2d");
  const [canvasImage, setCanvasImage] = useState();

  //Traits to Swap//
  const [shirtSwaps, setShirt] = useState(shirtData);
  const [furSwaps, setFur] = useState(furData);
  const [headSwaps, setHead] = useState(headData);
  const [faceSwaps, setFace] = useState(faceData);
  //Background//
  const [backTests, setBackTest] = useState(backgroundData);
  const rndBck = Math.floor(Math.random() * 6) + 1;
  let [backImg, setBackground] = useState(rndBck);
  const backPic = `/Background/${backImg}.png`;
  //SquatchNumber//

  let [squaNum, setSquatch] = useState("1");

  let squatchUse = data.filter(function (data) {
    return data.name == `SolSquatch #${squaNum}`;
  });

  const addSquatch = (squatchAdd) => {
    setSquatch(squatchAdd);
    setPlaceHolder(`/PlaceHold/traitSwap.png`);
    setButtonText(`...Go!`);
  };
  ///PlaceHolder Image//
  const [placeHolder, setPlaceHolder] = useState(`/PlaceHold/traitSwap.png`);
  ///Button Text///
  const [buttonText, setButtonText] = useState(`...Go!`);
  //LayerGeneration
  const fur = `/Fur/${squatchUse[0].attributes[0].value}.png`;
  const shirt = `/Shirt/${squatchUse[0].attributes[1].value}.png`;
  const face = `/Face/${squatchUse[0].attributes[3].value}.png`;
  const head = `/Head/${squatchUse[0].attributes[2].value}.png`;
  //Choose Trait//
  const [usedShirtImg, setUsedShirt] = useState(`/PlaceHold/blank.png`);
  const [usedFurImg, setUsedFur] = useState(`/PlaceHold/blank.png`);
  const [usedHeadImg, setUsedHead] = useState(`/PlaceHold/blank.png`);
  const [usedFaceImg, setUsedFace] = useState(`/PlaceHold/blank.png`);
  ///
  const addShirt = (addShirts) => {
    setUsedShirt(addShirts);
    setButtonText(`Reset`);
  };
  //
  const addFur = (addFurs) => {
    setUsedFur(addFurs);
    setButtonText(`Reset`);
  };
  ///
  const addHead = (addHeads) => {
    setUsedHead(addHeads);
    setButtonText(`Reset`);
  };
  ////
  const addFace = (addFaces) => {
    setUsedFace(addFaces);
    setButtonText(`Reset`);
  };
  ////
  function clearSquatch() {
    setUsedShirt(shirt);
    setUsedFur(fur);
    setUsedHead(head);
    setUsedFace(face);
    setPlaceHolder(`/PlaceHold/blank.png`);
  }
  ///ORIGINAL npm Canvas Code Image Generation #2
  let generateImage = async function () {
    const backGen = await Canvas.loadImage(backPic);
    ctx.drawImage(backGen, 0, 0, 500, 500);
    const shirtGen = await Canvas.loadImage(usedShirtImg);
    ctx.drawImage(shirtGen, 0, 0, 500, 500);
    const faceGen = await Canvas.loadImage(usedFaceImg);
    ctx.drawImage(faceGen, 0, 0, 500, 500);
    const headGen = await Canvas.loadImage(usedHeadImg);
    ctx.drawImage(headGen, 0, 0, 500, 500);
    return (image2 = canvas.toDataURL()), setCanvasImage(image2);
  };

  // NEW Canvas Image Generation Without using npm + <Canvas> element below //
  const myCanvas = useRef();
  const imageShirt = new Image(usedShirtImg, 100, 100);

  useEffect(() => {
    myCanvas.current.getContext("2d");
  });

  useEffect(() => {
    generateImage();
  }, [Canvas, backPic, usedShirtImg, usedFaceImg, usedHeadImg, image2]);

  //
  return (
    <div>
      <div className={styles.headBox}>
        <h1 className={styles.header}>Squatch Trait Swap!</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.overlayGrid}>
          <Image
            src={backPic}
            alt="Fur Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
          <Image
            src={usedFurImg}
            alt="Fur Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
          <Image
            src={usedShirtImg}
            alt="Shirt Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
          <Image
            src={usedFaceImg}
            alt="Face Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
          <Image
            src={usedHeadImg}
            alt="Head Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
          <Image
            src={placeHolder}
            alt="PlaceHolder Can't Be Found"
            width="500"
            height="500"
            layout="responsive"
          />
        </div>

        <div className={styles.components}>
          <label>Choose your Squatch Number</label>
          <br />
          <select
            className={styles.select}
            type="number"
            min="1"
            max="3333"
            required
            value={squaNum}
            onChange={(e) => {
              addSquatch(e.target.value);
            }}
          >
            {data.map((data) => (
              <option key={data.name} value={data.name.slice(12)}>
                {data.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button className={styles.button} onClick={clearSquatch}>
            {buttonText}
          </button>
          <div>
            <a href={canvasImage} target="_blank" rel="noreferrer noopener">
              Save Your Squatch
            </a>
          </div>
        </div>

        <div className={styles.shirtsGridContainer}>
          <div className={styles.shirtsGrid}>
            {shirtSwaps.map((shirtSwap) => {
              return (
                <Image
                  className={styles.shirt}
                  onClick={() => addShirt(shirtSwap.img)}
                  id={shirtSwap.id}
                  key={shirtSwap.id}
                  src={shirtSwap.img}
                  width="75"
                  height="75"
                />
              );
            })}
          </div>
        </div>

        <div className={styles.shirtsGridContainer}>
          <div className={styles.shirtsGrid}>
            {headSwaps.map((headSwap) => {
              return (
                <Image
                  className={styles.shirt}
                  onClick={() => addHead(headSwap.img)}
                  id={headSwap.id}
                  key={headSwap.id}
                  src={headSwap.img}
                  width="75"
                  height="75"
                />
              );
            })}
          </div>
        </div>

        <div className={styles.shirtsGridContainer}>
          <div className={styles.shirtsGrid}>
            {furSwaps.map((furSwap) => {
              return (
                <Image
                  className={styles.shirt}
                  onClick={() => addFur(furSwap.img)}
                  id={furSwap.id}
                  key={furSwap.id}
                  src={furSwap.img}
                  width="75"
                  height="75"
                />
              );
            })}
          </div>
        </div>

        <div className={styles.shirtsGridContainer}>
          <div className={styles.shirtsGrid}>
            {faceSwaps.map((faceSwap) => {
              return (
                <Image
                  className={styles.shirt}
                  onClick={() => addFace(faceSwap.img)}
                  id={faceSwap.id}
                  key={faceSwap.id}
                  src={faceSwap.img}
                  width="100"
                  height="100"
                />
              );
            })}
          </div>
        </div>

        <div className={styles.backgroundToggle}>
          {backTests.map((backTest) => {
            return (
              <Image
                className={styles.backgroundImage}
                onClick={() => setBackground(backTest.id)}
                id={backTest.id}
                key={backTest.id}
                src={backTest.img}
                width="50"
                height="50"
              />
            );
          })}
        </div>

        <div>
          <canvas
            ref={myCanvas}
            width="200"
            height="100"
            style={{ border: "1px solid #d3d3d3" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
}
