import { Box, TextField, Typography, Paper,Button  } from "@mui/material";
import { useState, useRef, useContext, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

    axios.defaults.withCredentials = true;
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const navigate = useNavigate();

    const { backendUri, getUserData, userData, isLoggedin } = useContext(AppContent);

    const handleChange = (element, index) => {
        const val = element.target.value;
        if (!isNaN(val) && val.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = val;
            setOtp(newOtp);

            // Move to next input
            if (val && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').slice(0, 6);
        const pasteArray = paste.split('');
        const newOtp = [...otp];

        pasteArray.forEach((char, index) => {
        if (index < 6 && !isNaN(char)) {
            newOtp[index] = char;
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        }
        });

        setOtp(newOtp);
    };

    useEffect(() => {
        isLoggedin && userData, userData.isAccountVerified && navigate('/dashboard');
    }, [isLoggedin, userData])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const code = otp.join('');

            const {data} = await axios.post(backendUri + '/api/auth/verify-account', {otp: code});
            if(data.success) {
                toast.success(data.message);
                getUserData();
                navigate('/dashboard');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: "linear-gradient(to right, #c2e9fb, #a1c4fd)" }}
        >
            <Paper elevation={10} sx={{ p: 5, borderRadius: 3, textAlign: "center", bgcolor: "#0f172a", color: "white" }}>
                <Typography variant="h5" mb={2}>Email Verify OTP</Typography>
                <Typography variant="body2" mb={4}>Enter the 6-digit code sent to your email id.</Typography>
                
                <Box display="flex" gap={2} justifyContent="center" onPaste={handlePaste}> 
                {otp.map((data, index) => (
                    <TextField
                    key={index}
                    inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "20px", color: "white" },
                    }}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    sx={{
                        width: 50,
                        "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#1e293b",
                        '& fieldset': {
                            borderColor: '#334155',
                        },
                        '&:hover fieldset': {
                            borderColor: '#60a5fa',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                        },
                        },
                    }}
                    />
                ))}
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={handleSubmit}
                >
                    Verify
                </Button>
            </Paper>
        </Box>
    );
};

export default EmailVerify;
