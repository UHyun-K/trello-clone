import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";
import Board from "./Components/Board";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { draggableId, destination, source } = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            //same board movement
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                // 1) Delete item on source.index
                boardCopy.splice(source.index, 1);
                // 2) Put back the item on the destination.index
                boardCopy.splice(destination?.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const destinationBoard = [
                    ...allBoards[destination.droppableId],
                ];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board
                            boardId={boardId}
                            key={boardId}
                            toDos={toDos[boardId]}
                        />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
