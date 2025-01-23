"use client";
import React, { useMemo } from "react";
import { FiLogOut } from "react-icons/fi";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { decodeJwt } from "jose";
import { ACCESS_TOKEN_KEY, IS_PRODUCTION, USER_ROLE_KEY } from "@/config";
import { Avatar } from "../ui/avatar";
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export const ProfileMenu = () => {
  const router = useRouter();

  const username = useMemo(() => {
    const token = cookie.get(ACCESS_TOKEN_KEY);

    if (!token) {
      return null;
    }

    return (decodeJwt(token)?.username as string) || "";
  }, []);

  const handleLogout = () => {
    const cookieOptions: Cookies.CookieAttributes = {
      path: "/",
      secure: IS_PRODUCTION,
      httpOnly: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? "Strict" : "Lax",
    };

    cookie.remove(ACCESS_TOKEN_KEY, cookieOptions);
    cookie.remove(USER_ROLE_KEY, cookieOptions);
    router.replace("/signin");
  };

  return (
    <PopoverRoot>
      <PopoverTrigger cursor="pointer">
        <Avatar size="lg" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Flex
            alignItems="center"
            gap={3}
            mb={6}
          >
            <Avatar size="lg" />
            <Box
              flex="1"
              textAlign="left"
            >
              <PopoverTitle
                fontWeight="medium"
                textTransform="capitalize"
              >
                {username}
              </PopoverTitle>
            </Box>
          </Flex>

          <hr />

          <Button
            mt={2}
            variant="ghost"
            width="100%"
            onClick={handleLogout}
          >
            <FiLogOut />
            <Box
              flex="1"
              textAlign="left"
            >
              Logout
            </Box>
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
