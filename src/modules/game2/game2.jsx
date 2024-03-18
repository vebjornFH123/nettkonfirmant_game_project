import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const initialData = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

function Game2() {
	const [items, setItems] = useState(initialData);

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const newItems = Array.from(items);
		const [reorderedItem] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, reorderedItem);

		setItems(newItems);
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-bold mt-8">Drag and Drop Reordering</h1>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="list">
					{(provided) => (
						<ul className="mt-8 space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
							{items.map((item, index) => (
								<Draggable key={index} draggableId={`item-${index}`} index={index}>
									{(provided) => (
										<li
											className="px-4 py-2 bg-gray-200 border border-gray-300 rounded cursor-move hover:bg-gray-300 active:bg-gray-400"
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
											id={`Item-${index}`} // Add this line to match the id with draggableId
										>
											{item}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default Game2;
