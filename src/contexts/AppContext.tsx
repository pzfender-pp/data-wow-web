import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";
import { TodoItemType } from "../types/todoTypes";
import { getTodosAPI } from "../api/todosAPI";
import { AxiosResponse } from "axios";

interface IAppContext {
    todos: TodoItemType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
    fetchTodos: () => Promise<void>;
}

export const AppContext = createContext<IAppContext | null>(null);

const AppContextProvider: FC<PropsWithChildren> = (props) => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);

    const fetchTodos = async () => {
        try {
            const response = await getTodosAPI();

            if (response) {
                const todos: AxiosResponse<TodoItemType[]> = response;
                setTodos(todos.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const contextValue: IAppContext = {
        todos,
        setTodos,
        fetchTodos,
    };

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
