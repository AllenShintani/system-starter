"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { trpc } from "@/utils/trpc";

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();
  const utils = trpc.useUtils();
  const signinMutation = trpc.signinRouter.signin.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.signinRouter.checkAuth.invalidate();
        router.push("/");
      }
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.data?.code === "UNAUTHORIZED") {
          setError("パスワードが間違っています");
        } else if (error.data?.code === "TOO_MANY_REQUESTS") {
          setError("パスワードを間違えすぎました。しばらくしてから再試行してください。");
        } else {
          setError("ログインに失敗しました。もう一度お試しください。");
        }
      } else {
        setError("ログインに失敗しました。もう一度お試しください。");
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    signinMutation.mutate({ signinData: { email, password } });
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
          ログイン
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
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={signinMutation.isLoading}
          >
            {signinMutation.isLoading ? "ログイン中..." : "ログイン"}
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                パスワードを忘れましたか？
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/signup"
                variant="body2"
              >
                {"アカウントをお持ちでない方はこちら"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
