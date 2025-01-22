"use client";
import React, { useState, useTransition } from "react";
import { Box, Flex, Heading, Stack, Text, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { addFeedback } from "../services/feedback";

const MAX_CHARS = 1000;

interface CharacterCountSlider {
  feedback: string;
}

const CharacterCountSlider: React.FC<CharacterCountSlider> = ({ feedback }) => {
  return (
    <Flex
      alignItems="center"
      gap={2}
    >
      <Slider
        readOnly
        hideThumb
        width="100%"
        my={6}
        max={MAX_CHARS}
        colorPalette="blue"
        size={{ base: "sm", md: "md" }}
        value={[feedback.length]}
      />
      <Text
        color="gray.600"
        flexShrink={0}
        minW={20}
        textAlign="right"
      >
        {`${feedback.length}/${MAX_CHARS}`}
      </Text>
    </Flex>
  );
};

interface FormProps {
  feedback: string;
  error: string;
  loading: boolean;
  onFeedbackChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ feedback, error, loading, onFeedbackChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        <Stack gap={2}>
          <Textarea
            autoFocus
            value={feedback}
            onChange={onFeedbackChange}
            placeholder="Write your feedback here..."
            size="lg"
            resize="vertical"
            focusRingColor={error ? "red.500" : "blue.500"}
            rows={5}
          />
          <Text
            color="red.500"
            h={5}
            fontSize="sm"
          >
            {error}
          </Text>
        </Stack>

        <Button
          type="submit"
          disabled={!feedback.trim()}
          w="full"
          mt={4}
          loading={loading}
        >
          Submit Feedback
        </Button>
      </Stack>
    </form>
  );
};

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loading, startTransition] = useTransition();

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setFeedback(value);

      if (error) setError("");
    } else {
      setFeedback(value.slice(0, MAX_CHARS));
      setError(`Max ${MAX_CHARS} characters allowed`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (feedback.length > MAX_CHARS || loading) return;

    startTransition(async () => {
      const res = await addFeedback(feedback);

      if (res?.error) {
        setError(res?.message);
        return;
      }

      setFeedback("");
      if (error) setError("");
    });
  };

  return (
    <Flex
      minH={{ base: "calc(100vh - 120px)", md: "calc(100vh - 136px)" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w={{ base: "100%", md: "550px", lg: "650px", xl: "750px" }}
        bg="white"
        p={{ base: 4, md: 8 }}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading
          size="lg"
          textAlign="center"
          mb={1}
        >
          Share Your Feedback
        </Heading>

        <Text
          textAlign="center"
          color="gray.600"
          fontSize="sm"
          mb={6}
        >
          Your feedback matters! Share your thoughts to help us improve and serve you better.
        </Text>

        <CharacterCountSlider feedback={feedback} />
        <Form
          error={error}
          feedback={feedback}
          onFeedbackChange={handleFeedbackChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Box>
    </Flex>
  );
};

FeedbackForm.displayName = "FeedbackForm";
export default FeedbackForm;
