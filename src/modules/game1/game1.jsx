import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { missingWords, bibleText } from "./gameData";

function Game1() {
  function shuffleArray(array) {
    array.forEach((_, index) => {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    });
    return array;
  }
  const [randomWordOrder, setRandomWordOrder] = useState(shuffleArray(missingWords));
  const [textObjects, setTextObjects] = useState(bibleText);

  const draggables = randomWordOrder.map((draggable) => {
    return <Draggable id={draggable}>{draggable}</Draggable>;
  });

  function handleDragEnd(e) {
    if (!e.over) return;
    if (e.active.id === e.over.id) {
      const updatedTextObjects = textObjects.map((obj) => {});

      setTextObjects(updatedTextObjects);
      const updateWords = randomWordOrder.filter((word) => word !== e.over.id);
      setRandomWordOrder(updateWords);
      if (randomWordOrder.length === 0) {
        return console.log("Game is finished tank you for playing");
      }
    }
    const updatedTextObjects = textObjects.map((obj) => {
      if (e.active.id === e.over.id) {
        if (obj.droppableId === e.over.id || obj.correctAnswer === true) {
          return { ...obj, correctAnswer: true };
        }
        return { ...obj, correctAnswer: false };
      }
      if (obj.droppableId === e.active.id) {
        if (obj.droppableId === e.over.id) {
          return { ...obj, wrongAnswer: false };
        }
        return { ...obj, wrongAnswer: true };
      }
      return { ...obj, wrongAnswer: false };
    });
    setTextObjects(updatedTextObjects);

    console.log(e);
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-3 overflow-hidden rounded-[25px] mb-4 bg-master-green w-screen sm:w-10/12 max-w-[780px] pt-4 px-4 pb-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold text-master-blue text-left">Oppgave/utforskning</h1>
          <span className="text-[1.25rem] text-master-blue">Slå opp i bibelen og finn ordene som mangler</span>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-wrap justify-center max-w-6xl gap-y-3 gap-x-3 bg-white p-5 border-solid border-[3px]  border-[#27dea6] rounded-[25px]  h-[100%]">{draggables}</div>
          <span className="text-[1.25rem] text-master-blue w-full">!!Dra ordene på plass!!</span>
          <div className="p-4 border-solid border-[3px] border-[#27dea6] rounded-[25px] bg-white">
            {textObjects.map((obj, index) =>
              obj.droppableId === undefined ? (
                <span> {obj.text} </span>
              ) : (
                <span>
                  {obj.text}
                  <Droppable id={obj.droppableId} dropt={obj.correctAnswer} wrongAnswer={obj.wrongAnswer}>
                    {obj.correctAnswer === true ? ` ${obj.droppableId} ` : "_ _ _ _ _ _"}
                  </Droppable>
                </span>
              )
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default Game1;
