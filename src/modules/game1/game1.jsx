import { useEffect, useState } from "react";
import { DndContext, MouseSensor, TouchSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { missingWords, bibleText } from "./gameData";
import bibleImg from "../../assets/img/bible.png";
import correctSound from "../../assets/sound/correct_sfx.wav";

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
      const audio = new Audio(correctSound);
      audio.play();
      if (updateWords.length === 0) {
        setGameDone(true);
      }
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
    <div className=" h-screen block sm:flex items-center" style={{ overflow: gameDone ? "hidden" : "none" }}>
      <div className=" m-auto gap-3 rounded-[25px] mb-4 bg-master-green w-[95%] sm:w-10/12 max-w-[780px] pt-4 px-4 pb-4 mt-[75px]">
        <div>
          <h1 className="text-[1.5rem] font-semibold text-master-blue">Oppgave/utforskning</h1>
          <span className="text-[1.25rem] text-master-blue">Slå opp i Bibelen og dra ordene som mangler til rett plass</span>
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
      </div>
      <div style={{ display: gameDone ? "flex" : "none" }} className="fixed top-0 w-screen h-screen z-[9999] justify-center items-center">
        <div className="absolute w-screen h-screen bg-black opacity-60"></div>
        <div className="relative h-[400px] sm:h-[500px] w-[300px] sm:w-[350px] bg-cover flex  flex-col justify-center items-center rounded-[10px]" style={{ backgroundImage: `url(${bibleImg})` }}>
          <span className="text-white text-[1.5rem] mt-4">Bra jobba!</span>
          <div className="h-[15px]"></div>
          <button className="bg-master-green-2 h-[50px] w-[130px] rounded-[18px] text-[1.1rem] text-white">Neste</button>
        </div>
      </div>
    </div>
  );
}

export default Game1;
