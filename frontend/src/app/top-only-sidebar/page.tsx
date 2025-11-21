"use client";

import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/components/theme/theme";
import { Sidebar } from "@/components/top-only-sidebar/Sidebar";

const Top = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", backgroundColor: "#E7FFFF", minHeight: "100vh" }}>
        <Sidebar />
      </Box>
    </ThemeProvider>
  );
};

export default Top;
