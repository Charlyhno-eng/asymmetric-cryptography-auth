"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoginMessage(null);
    try {
      const res = await fetch("http://localhost:8080/api/login");
      setLoginMessage(res.ok ? (await res.json()).message : await res.text());
    } catch {
      setLoginMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <AppBar sx={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div" sx={{ color: "white", fontWeight: 700 }}>
          navbar
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogin}>Sign in</Button>
          <Button color="inherit" onClick={() => setOpen(true)}>Sign up</Button>
          <RegisterModal open={open} onClose={() => setOpen(false)} />
        </Box>
      </Toolbar>
      {loginMessage && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>{loginMessage}</Typography>
        </Box>
      )}
    </AppBar>
  );
}
