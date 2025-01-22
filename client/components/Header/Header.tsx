"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProfileMenu } from "./ProfileMenu";

const Header = () => {
  return (
    <Box
      as="header"
      bg="blue.600"
      color="white"
      px={6}
      py={4}
      boxShadow="sm"
    >
      <Flex
        justify="space-between"
        align="center"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
        >
          Sentiment App
        </Text>

        <ProfileMenu />
      </Flex>
    </Box>
  );
};

Header.displayName = "Header";
export default Header;
