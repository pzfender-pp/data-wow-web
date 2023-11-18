import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";
import { TodoItemType } from "./types/todoTypes";
import { createTodosAPI } from "./api/todosAPI";
import ProgressBar from "./components/ProgressBar";
import SingleSelect from "./components/SingleSelect";
import Input from "./components/Input";
import TodoItem from "./components/TodoItem";
import "./assets/scss/global.scss";

const App: FC = () => {
    const appCtx = useAppContext();
    const [filteredTodos, setFilteredTodos] = useState<TodoItemType[]>([]);
    const [sorting, setSorting] = useState("all");
    const [todoTitle, setTodoTitle] = useState("");

    const createTodoItem = useCallback(
        async (title: string, status: boolean = false) => {
            try {
                const response = await createTodosAPI(title, status);
                if (response?.status === 201) {
                    appCtx?.fetchTodos();
                    setTodoTitle("");
                }
            } catch (e) {
                console.error(e);
            }
        },
        [appCtx]
    );

    const onSortingChange = async (e: SelectChangeEvent<unknown>) => {
        const value = e.target.value as string;
        setSorting(value);
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (todoTitle) {
            createTodoItem(todoTitle);
        }
    };

    useEffect(() => {
        if (appCtx?.todos && appCtx?.todos.length > 0) {
            switch (sorting) {
                case "done": {
                    const todosDone = appCtx?.todos.filter((todo) => todo.completed);
                    setFilteredTodos(todosDone);
                    break;
                }
                case "undone": {
                    const todosUndone = appCtx?.todos.filter((todo) => !todo.completed);
                    setFilteredTodos(todosUndone);
                    break;
                }
                default:
                    setFilteredTodos(appCtx?.todos);
            }
        }
    }, [appCtx?.todos, sorting]);

    return (
        <>
            <Box className="wrapper" component="main">
                <Box className="card" component="section">
                    <Box className="header">
                        <h1 className="title">Progress</h1>
                        <ProgressBar
                            total={filteredTodos.length || 0}
                            current={filteredTodos.filter((item) => item.completed).length || 0}
                        />
                        <h3 className="completed">
                            {filteredTodos.filter((todo) => todo.completed).length || 0} completed
                        </h3>
                    </Box>
                    <Box className="filter">
                        <h2 className="title">Tasks</h2>
                        <SingleSelect value={sorting} onChange={onSortingChange} />
                    </Box>
                    <Box className="body">
                        {filteredTodos?.length > 0 &&
                            filteredTodos.map((item) => (
                                <TodoItem key={item.id} id={item.id} title={item.title} completed={item.completed} />
                            ))}
                    </Box>
                    <Box className="footer">
                        <Box component="form" onSubmit={onSubmit}>
                            <Input
                                placeholder="Add your todo..."
                                value={todoTitle}
                                onChange={(e) => setTodoTitle(e.target.value)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default App;
