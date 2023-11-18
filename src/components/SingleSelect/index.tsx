import { FC } from "react";
import { Box, MenuItem, Select, SelectProps } from "@mui/material";
import ChevronDown from "../../assets/images/svg/chevron-down.svg";

const SingleSelect: FC<SelectProps> = (props) => {
    return (
        <Select
            {...props}
            IconComponent={() => (
                <Box component="img" src={ChevronDown} alt="Arrow down" sx={{ position: "absolute", right: "10px" }} />
            )}
            sx={{
                width: "110px",
                height: "29px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px 2px",
                "& .MuiSelect-select": { padding: "5px 15px", fontSize: "13px", color: "black" },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#585292",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#585292",
                },
            }}
            MenuProps={{
                anchorOrigin: {
                    vertical: 35,
                    horizontal: "center",
                },
                sx: {
                    "& .MuiPaper-root": {
                        borderRadius: "10px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    },
                    "& .MuiList-root": {
                        padding: "12px 8px",
                    },
                    "& .MuiMenuItem-root": {
                        fontSize: "0.875rem",
                        borderRadius: "8px",
                        color: "#2E2E2E",
                        padding: "5px 8px",
                        minHeight: "unset",
                        marginBottom: "5px",
                    },
                    "& .MuiMenuItem-root:last-child": {
                        marginBottom: "0",
                    },
                    "& .MuiMenuItem-root.Mui-selected": {
                        color: "white",
                        backgroundColor: "#585292 !important",
                    },
                    "& .MuiMenuItem-root.Mui-selected:hover": {
                        color: "white",
                        backgroundColor: "#585292",
                    },
                },
            }}
        >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="undone">Undone</MenuItem>
        </Select>
    );
};

export default SingleSelect;
