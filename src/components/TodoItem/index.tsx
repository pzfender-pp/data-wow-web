import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { deleteTodosAPI, updateTodosAPI } from "../../api/todosAPI";
import { useAppContext } from "../../hooks/useAppContext";
import SingleCheckbox from "../SingleCheckbox";
import EditIcon from "../../assets/images/svg/edit.svg";
import Input from "../Input";

interface ITodoItem {
    id: string;
    title: string;
    completed: boolean;
}

const TodoItem: FC<ITodoItem> = (props) => {
    const { id, title, completed } = props;
    const appCtx = useAppContext();
    const anchorRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [todoTitle, setTodoTitle] = useState(title);
    const [isCompleted, setIsCompleted] = useState(completed);
    const [actionOpen, setActionOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const updateTodoItem = useCallback(async (id: string, title: string, status: boolean) => {
        try {
            await updateTodosAPI(id, title, status);
            await appCtx?.fetchTodos();
        } catch (e) {
            console.error(e);
        }
    }, [appCtx]);

    const deleteTodoItem = useCallback(async (id: string) => {
        try {
            const response = await deleteTodosAPI(id);
            if (response?.status === 200) {
                await appCtx?.fetchTodos();
            }
        } catch (e) {
            console.error(e);
        }
    }, [appCtx]);

    const onEditTodoItemClick = () => {
        setIsEdit(true);
        setActionOpen(false);
    };

    const onDeleteItemClick = () => {
        deleteTodoItem(id);
    };

    const onTodoItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        updateTodoItem(id, todoTitle, checked);
        setIsCompleted(checked);
    };

    const onSaveTodoClick = () => {
        updateTodoItem(id, todoTitle, isCompleted);
        setIsEdit(false);
    };

    useEffect(() => {
        if (isEdit) {
            inputRef.current?.focus();
        }
    }, [isEdit]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "46px",
                padding: "0 .5rem",
                display: "grid",
                gridTemplateColumns: "40px 1fr 40px",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "white",
                borderRadius: "999px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 2px",
                position: "relative",
            }}
        >
            {!isEdit && (
                <>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <SingleCheckbox id={id} checked={isCompleted} onChange={onTodoItemChange} />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                        <Typography
                            component="p"
                            title={title}
                            sx={{
                                display: "inline-block",
                                width: "100%",
                                overflow: "hidden",
                                fontSize: "1rem",
                                lineHeight: "1.25rem",
                                color: isCompleted ? "#A9A9A9" : "#2E2E2E",
                                textDecoration: isCompleted ? "line-through" : "unset",
                                textOverflow: "ellipsis",
                                lineClamp: "1",
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button
                            id="todo-action-btn"
                            aria-haspopup="true"
                            aria-expanded={actionOpen ? "true" : undefined}
                            ref={anchorRef}
                            onClick={() => setActionOpen(true)}
                            sx={{ width: "30px", minWidth: "unset", backgroundColor: "white" }}
                        >
                            <Box component="img" src={EditIcon} alt="Edit Icon" />
                        </Button>
                        <Menu
                            id="todo-action-menu"
                            aria-labelledby="todo-action-btn"
                            open={actionOpen}
                            anchorEl={anchorRef.current}
                            onClose={() => setActionOpen(false)}
                            anchorOrigin={{
                                vertical: 12,
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: -12,
                                horizontal: 100,
                            }}
                            sx={{
                                "& .MuiPaper-root": {
                                    width: "111px",
                                    borderRadius: "10px",
                                },
                                "& .MuiList-root": {
                                    padding: ".5rem 0",
                                },
                                "& .MuiMenuItem-root": {
                                    padding: ".5rem 1.25rem",
                                    minHeight: "unset",
                                },
                            }}
                        >
                            <MenuItem onClick={onEditTodoItemClick} sx={{ color: "#2E2E2E" }}>
                                Edit
                            </MenuItem>
                            <MenuItem onClick={onDeleteItemClick} sx={{ color: "#E07C7C" }}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            )}

            {isEdit && (
                <>
                    <Box>
                        <Input
                            inputRef={inputRef}
                            value={todoTitle}
                            onChange={(e) => setTodoTitle(e.target.value)}
                            sx={{
                                width: "calc(100% - 79px)",
                                position: "absolute",
                                top: "50%",
                                left: "5px",
                                transform: "translateY(-50%)",
                                boxShadow: "none",
                                "& .MuiInputBase-root": {
                                    height: "36px",
                                    borderRadius: "999px",
                                },
                                "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            }}
                        />
                        <Button
                            onClick={onSaveTodoClick}
                            sx={{
                                fontSize: ".875rem",
                                fontWeight: "400",
                                color: "white",
                                backgroundColor: "#585292",
                                borderRadius: "999px",
                                width: "64px",
                                height: "36px",
                                position: "absolute",
                                top: "50%",
                                right: "5px",
                                transform: "translateY(-50%)",
                                textTransform: "capitalize",
                                "&:hover": {
                                    color: "#585292",
                                    backgroundColor: "white",
                                    border: "2px solid #585292",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TodoItem;
