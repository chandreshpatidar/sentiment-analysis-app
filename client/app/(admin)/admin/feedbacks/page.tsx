import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function FeedbacksPage() {
  return (
    <>
      <Heading size="lg">User Feedbacks</Heading>
      <Text fontSize="sm">
        Review user feedback to ensure continuous improvement. Use this dashboard to analyze suggestions and address
        user concerns effectively.
      </Text>
      <Box mt={6}>Feedback Table</Box>
    </>
  );
}
