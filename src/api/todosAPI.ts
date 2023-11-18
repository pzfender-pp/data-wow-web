import axios, { AxiosResponse } from "axios";
import { TodoItemType } from "../types/todoTypes";

export const getTodosAPI = async (): Promise<AxiosResponse<TodoItemType[]> | undefined> => {
    try {
        const response = await axios.get("http://localhost:3001/todos");
        return response;
    } catch (e) {
        console.error(e);
    }
};

export const createTodosAPI = async (
    title: string,
    completed: boolean
): Promise<AxiosResponse<TodoItemType[]> | undefined> => {
    try {
        const response = await axios.post(
            `http://localhost:3001/todos`,
            { title, completed },
            { headers: { "Content-Type": "Application/json" } }
        );
        return response;
    } catch (e) {
        console.error(e);
    }
};

export const updateTodosAPI = async (
    todoId: string,
    title: string,
    completed: boolean
): Promise<AxiosResponse<TodoItemType[]> | undefined> => {
    try {
        const response = await axios.put(
            `http://localhost:3001/todos/${todoId}`,
            { title, completed },
            { headers: { "Content-Type": "Application/json" } }
        );
        return response;
    } catch (e) {
        console.error(e);
    }
};

export const deleteTodosAPI = async (todoId: string): Promise<AxiosResponse<TodoItemType[]> | undefined> => {
    try {
        const response = await axios.delete(`http://localhost:3001/todos/${todoId}`);
        return response;
    } catch (e) {
        console.error(e);
    }
};
