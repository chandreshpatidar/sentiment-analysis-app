import { Box, Heading, Text } from "@chakra-ui/react";
import { FeedbackTable } from "@/modules/feedback/components";

export default function FeedbacksPage() {
  return (
    <>
      <Heading size="lg">User Feedbacks</Heading>
      <Text fontSize="sm">
        Review user feedback to ensure continuous improvement. Use this dashboard to analyze suggestions and address
        user concerns effectively.
      </Text>
      <Box mt={6}>
        <FeedbackTable />
      </Box>
    </>
  );
}
