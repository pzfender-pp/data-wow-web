import { FC } from "react";
import { Box } from "@mui/material";

interface IProgressBar {
    total: number;
    current: number;
}

const ProgressBar: FC<IProgressBar> = ({ total, current }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "8px",
                backgroundColor: "#3b3b3b",
                borderRadius: "999px",
                position: "relative",
                marginBottom: "15px",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: `${(current / total) * 100}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: "999px",
                    borderTopRightRadius: current / total === 1 ? "999px" : "0",
                    borderBottomLeftRadius: "999px",
                    borderBottomRightRadius: current / total === 1 ? "999px" : "0",
                }}
            ></Box>
        </Box>
    );
};

export default ProgressBar;
