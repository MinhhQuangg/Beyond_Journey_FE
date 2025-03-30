import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toursquare } from "../assets";
import axios from "axios";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
        data
      );
      if (response.data.status === "success") {
        showToastSuccess(response.data.success);
        navigate("/login");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An error occurred.");
      showToastError(err.response?.data?.message);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f2",
      }}
    >
      {/* Logo on the top-left corner */}
      <Box
        sx={{
          position: "absolute",
          top: "40px",
          left: "40px",
        }}
      >
        <img
          src={toursquare}
          alt="Logo"
          style={{ cursor: "pointer" }}
          className="w-[170px] h-[150px]"
          onClick={() => navigate("/")}
        />
      </Box>
      {/* Main Content Box */}
      <Box
        sx={{
          width: "25%",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{ mb: "18px", fontSize: "36px" }}
        >
          Reset account password
        </Typography>

        {/* Instructions */}
        <Box sx={{ mb: "36px" }}>
          <Typography variant="body1" color="textSecondary" textAlign="left">
            Please enter a new password for your account.
          </Typography>
        </Box>
        {errorMessage && (
          <Typography
            sx={{
              color: "red",
              fontSize: "14px",
              textAlign: "left",
              mb: 2,
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ mb: "24px" }}>
          <Typography
            sx={{
              pb: "12px",
              textAlign: "left",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Password
          </Typography>
          <TextField
            variant="standard"
            type="password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            onBlur={() => trigger("password")}
          />
        </Box>
        <Box sx={{ mb: "24px" }}>
          <Typography
            sx={{
              pb: "12px",
              textAlign: "left",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Confirm Password
          </Typography>
          <TextField
            variant="standard"
            type="password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            {...register("passwordConfirm", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            onBlur={() => trigger("confirmPassword")}
          />
        </Box>

        {/* Reset Password Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#15919B",
              ":hover": { bgcolor: "#0C6478" },
              borderRadius: "20px",
              textAlign: "center",
              fontSize: "16px",
              padding: "5px 30px",
              marginLeft: "5%",
            }}
            disabled={!isValid}
          >
            Reset Password
          </Button>

          {/* Return to Login Link */}
          <Link
            href="#"
            underline="always"
            sx={{
              mt: 1,
              color: "#3991cd",
              fontSize: "16px",
              marginRight: "5%",
            }}
            onClick={() => navigate("/login")}
          >
            Return to login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
