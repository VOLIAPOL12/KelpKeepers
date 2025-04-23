import { Avatar, Container, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React from "react";


function LoginPage() {

    return(
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </Paper>
        </Container>
    )
}

export default LoginPage