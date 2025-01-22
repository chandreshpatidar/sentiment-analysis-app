"use client";
import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Header } from "../Header";
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { AUTH_ROUTES } from "@/config";

interface AppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayout> = ({ children }) => {
  const isAuthenticated = useAuth();
  const pathname = usePathname();

  // If the user is not authenticated and the current page is related to auth routes, render the children
  if (!isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return children;
  }

  // If the user is authenticated, render the app layout
  return (
    <Stack
      minH={"100vh"}
      gap={0}
    >
      <Header />
      <Box
        p={{ base: 4, md: 6 }}
        flex={1}
        bg="gray.50"
      >
        {children}
      </Box>
    </Stack>
  );
};

AppLayout.displayName = "AppLayout";
export default AppLayout;
