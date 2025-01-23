"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { Box, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN_KEY, IS_PRODUCTION, USER_ROLE_KEY } from "@/config";
import { signIn } from "../services/signin";
import { UserRole } from "@/modules/user/types";
import { toaster } from "@/components/ui/toaster";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const res = await signIn(username, password);

    setLoading(false);

    if (res?.error) {
      setError(res?.message);
      return;
    }

    if (res) {
      const cookieOptions: Cookies.CookieAttributes = {
        path: "/",
        secure: IS_PRODUCTION,
        sameSite: IS_PRODUCTION ? "Strict" : "Lax",
        expires: new Date(Date.now() + 60 * 60 * 1000),
      };

      cookie.set(ACCESS_TOKEN_KEY, res?.token, cookieOptions);
      cookie.set(USER_ROLE_KEY, res?.isAdmin ? UserRole.ADMIN : UserRole.USER, cookieOptions);

      toaster.create({ type: "success", title: "Authenticated successfully" });
      router.replace("/");
    }
  };

  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        w={{ base: "100%", md: "400px" }}
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading
          size="lg"
          textAlign="center"
          mb={1}
        >
          Sign In
        </Heading>

        <Text
          textAlign="center"
          color="gray.600"
          fontSize="sm"
          mb={6}
        >
          Welcome back! Please sign to continue
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Field
              required
              id="username"
              label="Username"
            >
              <Input
                variant="outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </Field>
            <Field
              required
              id="password"
              label="Password"
            >
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Field>

            <Box mt={4}>
              <Text
                color={"red.500"}
                fontSize="sm"
              >
                {error}
              </Text>
              <Button
                type="submit"
                w="full"
                mt={1}
                loading={loading}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

SignInForm.displayName = "SignInForm";
export default SignInForm;
