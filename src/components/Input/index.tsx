import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const Input: FC<TextFieldProps> = (props) => {
    return (
        <TextField
            {...props}
            autoComplete="off"
            sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "999px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 2px",
                "& .MuiInputBase-root": {
                    height: "46px",
                    borderRadius: "999px",
                    fontSize: "1rem",
                    color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                    opacity: "1",
                    color: "#BCBCBC",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                },
                "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#585292"
                },
                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#585292"
                },
                ...props.sx,
            }}
        />
    );
};

export default Input;
