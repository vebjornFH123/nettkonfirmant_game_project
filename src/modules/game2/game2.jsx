import React, { useState, useEffect, useRef } from "react";
import { DndContext, MouseSensor, TouchSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Sortable from "./sortable";
import Droppable from "./droppable";
import MosesImgBig from "../../assets/img/Moses-Posed.svg";
import MosesImgSmall from "../../assets/img/Moses-Posed-Straight.svg";
import MosesImgSad from "../../assets/img/Moses-Sad.svg";

function Game2() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const stoneRef = useRef();

  const correctOrder = ["Du skal ikke ha andre guder enn meg", "Du skal ikke misbruke Guds navn", "Du skal holde hviledagen hellig", "Du skal ære din far og din mor", "Du skal ikke slå i hjel", "Du skal ikke bryte ekteskapet", "Du skal ikke stjele", "Du skal ikke tale usant om din neste", "Du skal ikke begjære din nestes eiendom", "Du skal ikke begjære din nestes ektefelle, eller hans arbeidsfolk eller andre som hører til hos din neste"];

  function shuffleArray(array) {
    let match = true;
    let newArray = [];

    // Continue shuffling until match is false
    while (match) {
      newArray = [...array]; // Create a copy of the original array
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
        // Swap elements with indices i and j
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      match = checkArrayMatch(newArray);
    }
    return newArray;
  }

  const checkArrayMatch = (array) => {
    let match = true;

    // Check if each element at corresponding indices is equal
    array.forEach((item, index) => {
      if (item !== correctOrder[index]) {
        match = false;
      }
    });
    // Return the result
    return match;
  };

  const [items, setItems] = useState(shuffleArray(correctOrder));

  const [success, setSuccess] = useState(false);

  const [tryAgainView, setTryAgainView] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.over) return;
    const { active, over } = result;

    console.log(active, over);

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);

      const match = checkArrayMatch(newArray);
      if (match) {
        setSuccess(true);
        setIsRunning(false);
      }
    }
  };

  const [time, setTime] = useState(59);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            failed();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  function failed() {
    setIsRunning(false); // Stop the timer
    setItems(shuffleArray(correctOrder));
    stoneRef.current.style.transform = "translateY(100vh)";
    setTimeout(() => {
      setTryAgainView(true);
    }, 1000);
  }

  const handleStart = () => {
    setTime(59);
    setIsRunning(true);
  };

  const handleRetry = () => {
    stoneRef.current.style.transform = "";
    setTryAgainView(false);
    setItems(shuffleArray(correctOrder));
  };

  const handleMoveOn = () => {};

  return (
    <div>
      <div style={{ display: tryAgainView ? "flex" : "none" }} className=" w-screen h-screen flex flex-col items-center justify-center gap-20">
        <img className="max-w-[576px]" alt="img-moses" src={MosesImgSad} />
        <div className="z-50 top-20 bg-opacity-30  bg-blue-500 p-4 rounded-xl shadow-2xl">
          <h2 className=" text-xl font-semibold">
            Uffda <br />
          </h2>
          <h3 className="mt-2">Tiden er ute...</h3>
          <button onClick={handleRetry} className=" mt-4 cursor-pointer bg-master-green-2 text-white font-semibold text-xl p-2 rounded-lg">
            Prøv på nytt
          </button>
        </div>
      </div>
      <div style={{ display: tryAgainView ? "none" : "flex" }} className="flex flex-col items-center h-screen w-screen">
        <div className=" z-20 fixed bottom-0 sm:bottom-6 left-1/2 -translate-x-1/2 bg-master-lightblue flex items-center justify-center gap-6 mt-4 m-auto w-screen sm:w-max rounded-t-lg sm:rounded-lg p-5 shadow-2xl">
          <div className="flex gap-2 ">
            <button onClick={handleStart} style={{ pointerEvents: isRunning ? "none" : "auto", opacity: isRunning ? 0.4 : 1 }} className=" cursor-pointer bg-master-green-2 text-white font-semibold text-xl p-2 rounded-lg">
              Start
            </button>
          </div>
          <span className=" text-3xl font-semibold text-master-blue">{isRunning ? (success ? "0:" + time : "0:" + time) : success ? "0:" + time : "1:00"}</span>
        </div>
        <div className="z-50 top-1/2 -translate-y-1/2 absolute bg-master-lightblue p-10 rounded-xl shadow-2xl" style={{ display: success ? "block" : "none" }}>
          <h2 className=" text-xl font-semibold">
            Bra jobbet! <br />
          </h2>
          <h3 className="mt-2">Du klarte det med {time} sekunder til gode.</h3>
          <button onClick={handleMoveOn} className=" mt-4 cursor-pointer bg-master-green-2 text-white font-semibold text-xl p-3 rounded-lg">
            Trykk for å gå videre
          </button>
        </div>
        <div className="w-full sm:w-10/12 max-w-[576px] max-h-[40vh] relative ">
          <img className=" block sm:hidden -z-10 absolute w-full mt-20" alt="img-moses" src={MosesImgSmall} />
          <img className=" hidden sm:block -z-10 absolute w-full max-w-[800px] left-1/2 -translate-x-[5%]" alt="img-moses" src={MosesImgBig} />

          <div ref={stoneRef} className=" transition-transform duration-1000 mt-64 sm:mt-32 mb-32 sm:mb-24 m-auto w-[95%] flex flex-col justify-center items-start rounded-t-full  bg-neutral-300 pt-10 sm:pt-20 px-4 pb-6 z-10">
            <h1 className="text-[1.5rem] font-semibold  text-center w-full">De 10 Bud</h1>
            <span className=" text-[1rem] sm:text-[1.25rem] text-center w-[80%] m-auto sm:w-full mt-4">Flytt budene i riktig rekkefølge, før tiden er ute</span>
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
              <Droppable isRunning={isRunning} id={"list"}>
                <SortableContext items={items}>
                  {items.map((item, index) => (
                    <Sortable id={item} key={item}>
                      {item}
                    </Sortable>
                  ))}
                </SortableContext>
              </Droppable>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game2;
