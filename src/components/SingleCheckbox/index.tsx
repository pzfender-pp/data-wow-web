import { FC } from "react";
import { Box, Checkbox, CheckboxProps } from "@mui/material";
import CheckMark from "../../assets/images/svg/check-mark.svg";

const SingleCheckbox: FC<CheckboxProps> = (props) => {
    return (
        <Checkbox
            {...props}
            icon={
                <Box
                    sx={{
                        width: "22px",
                        height: "22px",
                        backgroundColor: "white",
                        border: "2px solid #585292",
                        borderRadius: "6px",
                    }}
                />
            }
            checkedIcon={
                <Box
                    sx={{
                        width: "22px",
                        height: "22px",
                        backgroundColor: "#585292",
                        border: "2px solid #585292",
                        borderRadius: "6px",
                        position: "relative",
                    }}
                >
                    <Box
                        component="img"
                        src={CheckMark}
                        alt="Check mark"
                        sx={{
                            width: "80%",
                            height: "80%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </Box>
            }
        />
    );
};

export default SingleCheckbox;
