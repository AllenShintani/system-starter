"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ZodError } from "zod";

import type { FormEvent } from "react";
import type { ZodIssue } from "zod";

import { userSchema } from "@/schemas";
import { trpc } from "@/utils/trpc";

const translateZodError = (error: ZodIssue) => {
  switch (error.code) {
    case "too_small":
      if (error.path.includes("password")) {
        return "パスワードは8文字以上でなければなりません。";
      }
      return "入力値が短すぎます。";
    case "invalid_type":
      return "値が不正です";
    default:
      return "無効な入力が含まれています。";
  }
};

export default function SignUp() {
  const [error, setError] = useState("");
  const router = useRouter();
  const utils = trpc.useUtils();
  const signupMutation = trpc.signupRouter.signup.useMutation({
    onSuccess: async (data) => {
      if (data.redirect) {
        await utils.signinRouter.checkAuth.invalidate();
        router.push(data.redirect);
      }
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.data?.code === "CONFLICT") {
          setError("このメールアドレスは既に使用されています");
        } else if (error.data?.code === "BAD_REQUEST") {
          setError("入力情報が不正です。すべての必須項目を入力してください。");
        } else {
          setError("登録に失敗しました。もう一度お試しください。");
        }
      } else {
        console.error(error);
        setError("登録に失敗しました。もう一度お試しください。");
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
    };

    try {
      userSchema.parse(userData);
      signupMutation.mutate({ userData });
    } catch (error) {
      if (error instanceof ZodError) {
        const translatedError = translateZodError(error.errors[0]);
        setError(translatedError);
      } else {
        console.error(error);
        setError("登録に失敗しました。もう一度お試しください。");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          新規登録
        </Typography>
        {error && (
          <Typography
            color="error"
            variant="body2"
          >
            {error}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                autoComplete="given-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="姓"
                autoFocus
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id="firstName"
                label="名"
                name="firstName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                  />
                }
                label="メールマガジンを受け取りますか？"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={signupMutation.isLoading}
          >
            {signupMutation.isLoading ? "登録中..." : "登録"}
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                href="/signin"
                variant="body2"
              >
                既にアカウントをお持ちの方
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
