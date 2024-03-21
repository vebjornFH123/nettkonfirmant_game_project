import {useState} from "react";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import {missingWords, bibleText} from "./gameData";

function Game1() {
	const mouseSensor = useSensor(MouseSensor);
	const touchSensor = useSensor(TouchSensor);

	const sensors = useSensors(mouseSensor, touchSensor);
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
					return {...obj, correctAnswer: true};
				}
				return {...obj, correctAnswer: false};
			}
			if (obj.droppableId === e.active.id) {
				if (obj.droppableId === e.over.id) {
					return {...obj, wrongAnswer: false};
				}
				return {...obj, wrongAnswer: true};
			}
			return {...obj, wrongAnswer: false};
		});
		setTextObjects(updatedTextObjects);
	}

	return (
		<div className=" h-screen block sm:flex items-center">
			<div className=" m-auto gap-3 rounded-[25px] mb-4 bg-master-green w-[95%] sm:w-10/12 max-w-[780px] pt-4 px-4 pb-4 mt-[75px]">
				<div>
					<h1 className="text-[1.5rem] font-semibold text-master-blue text-left">Oppgave/utforskning</h1>
					<span className="text-[1.25rem] text-master-blue">Slå opp i bibelen og finn ordene som mangler</span>
				</div>
				<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
					<div className="flex flex-wrap justify-center max-w-6xl gap-y-3 gap-x-3 bg-master-green p-5  rounded-[25px] h-[100%] w-full">
						{draggables}
					</div>
					<span className="text-[1.25rem] text-master-blue w-full">!!Dra ordene på plass!!</span>
					<div className="p-4 border-solid border-[3px] border-[#27dea6] rounded-[25px] bg-white">
						{textObjects.map((obj, index) =>
							obj.droppableId === undefined ? (
								<span key={index}> {obj.text} </span>
							) : (
								<span key={index}>
									{obj.text}
									<Droppable id={obj.droppableId} dropt={obj.correctAnswer} wrongAnswer={obj.wrongAnswer} key={index}>
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
