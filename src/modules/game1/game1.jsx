import { useEffect, useState } from "react";
import { DndContext, MouseSensor, TouchSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { missingWords, bibleText } from "./gameData";
import bibleImg from "../../assets/img/bible.png";
import correctSound from "../../assets/sound/correct_sfx.wav";
import errorSound from "../../assets/sound/error_sfx.mp3";

function Game1() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  function shuffleArray(array) {
    array.forEach((_, index) => {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    });
    return array;
  }
  const [randomWordOrder, setRandomWordOrder] = useState([]);
  useEffect(() => {
    const shuffled = shuffleArray(missingWords);
    setRandomWordOrder(shuffled);
  }, []);
  const [gameDone, setGameDone] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [textObjects, setTextObjects] = useState(bibleText);

  function onDrag(e) {
    setActiveElement(e.active.id);
  }

  const draggables = randomWordOrder.map((draggable) => {
    return (
      <Draggable id={draggable} activeElement={activeElement}>
        {draggable}
      </Draggable>
    );
  });

  function handleDragEnd(e) {
    if (!e.over) return;
    if (e.active.id === e.over.id) {
      const updateWords = randomWordOrder.filter((word) => word !== e.over.id);
      setRandomWordOrder(updateWords);
      const correctAudio = new Audio(correctSound);
      correctAudio.play();
      if (updateWords.length === 0) {
        setGameDone(true);
      }
    } else {
      const errorAudio = new Audio(errorSound);
      errorAudio.play();
    }
    const updatedTextObjects = textObjects.map((obj) => {
      if (e.active.id === e.over.id) {
        if (obj.droppableId === e.over.id || obj.correctAnswer === true) {
          return { ...obj, correctAnswer: true };
        }
        return { ...obj, correctAnswer: false };
      }
      return { ...obj };
    });
    setTextObjects(updatedTextObjects);
  }

  return (
    <div className="  h-screen block sm:flex items-center" style={{ overflow: gameDone ? "none" : "none" }}>
      <div className=" relative m-auto gap-3 rounded-[25px] mb-4 bg-master-green w-[95%] sm:w-10/12 max-w-[780px] pt-4 px-4 pb-4 mt-[75px]">
        <div className="flex flex-col">
          <h1 className="text-[1.5rem] font-semibold text-master-blue">Oppgave/utforskning</h1>
          <span className="text-[1.25rem] text-master-blue">Dra ordene som mangler til rett plass</span>
          <span className="text-[1rem] text-master-blue">
            Vanskelig? Rett svar finner du i Bibelen{" "}
            <a className="border-b-[1px] border-[#103a61]" href="https://bibel.no/nettbibelen/les/" target="_blank" rel="noopener noreferrer">
              bibelen.no
            </a>
            , så slå gjerne opp der før du løser oppgaven
          </span>
        </div>
        <DndContext onDragEnd={handleDragEnd} onDragMove={onDrag} sensors={sensors}>
          <div className="flex flex-wrap justify-center max-w-6xl gap-y-3 gap-x-3 bg-master-green p-5  rounded-[25px] h-[100%] w-full">{draggables}</div>
          <div className="p-4 border-solid border-[3px] border-[#27dea6] rounded-[25px] bg-white text-left">
            {textObjects.map((obj, index) =>
              obj.droppableId === undefined ? (
                <span key={index}> {obj.text} </span>
              ) : (
                <span key={index}>
                  {obj.lineBrake ? <div className="h-[15px]"></div> : ""}
                  {obj.text}
                  <Droppable id={obj.droppableId} dropt={obj.correctAnswer} key={index}>
                    {obj.correctAnswer === true ? ` ${obj.droppableId} ` : "_ _ _ _ _ _"}
                  </Droppable>
                </span>
              )
            )}
          </div>
        </DndContext>
        <div style={{ display: gameDone ? "flex" : "none" }} className="absolute left-0 top-0 w-full h-full z-[50] justify-center items-center">
          <div className="absolute w-full h-full rounded-[25px] bg-black opacity-50"></div>
          <div className="relative h-[300px] sm:h-[300px] w-[215px] sm:w-[215px] bg-cover flex  flex-col justify-center items-center rounded-[10px]" style={{ backgroundImage: `url(${bibleImg})` }}>
            <span className="text-white text-[1.5rem] mt-4">Bra jobba!</span>
            {/* <div className="h-[15px]"></div>
            <button className="bg-master-green-2 h-[50px] w-[130px] rounded-[18px] text-[1.1rem] text-white">Neste</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game1;
