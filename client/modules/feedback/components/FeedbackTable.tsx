"use client";
import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Box, Spinner, Table, Text } from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { getFeedbacks } from "../services/feedback";
import { FeedbackType } from "../types";
import { SentimentType } from "../types/feedback";
import { formatDateWithTime } from "../../../utils/date";

const sentimentColorMapping: Record<SentimentType, string> = {
  Bad: "red",
  Good: "green",
  Neutral: "purple",
};

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, startTransition] = useTransition();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useRef<HTMLDivElement | null>(null);

  const fetchFeedbacks = useCallback(
    async (cursor?: string | null) => {
      if (loading) return;

      startTransition(async () => {
        const res = await getFeedbacks({ limit: 1, cursor });

        if (res?.error) {
          return;
        }

        setFeedbacks((prev) => [...prev, ...(res?.data || [])]);
        setHasNextPage(res?.hasNextPage);
        setCursor(res?.nextCursor);
      });
    },
    [loading]
  );

  useEffect(() => {
    if (loading || !hasNextPage) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchFeedbacks(cursor);
        }
      },
      { rootMargin: "100px" }
    );

    if (lastRowRef.current) observer.current.observe(lastRowRef.current);

    return () => observer.current?.disconnect();
  }, [loading, hasNextPage, cursor, fetchFeedbacks]);

  return (
    <Table.ScrollArea
      borderWidth="1px"
      rounded="md"
      maxH={{ base: "calc(100vh - 150px)", md: "calc(100vh - 197px)" }}
    >
      <Table.Root
        size="md"
        stickyHeader
        interactive
      >
        <Table.Header>
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader
              w={"70%"}
              minW={"250px"}
              maxW={"500px"}
            >
              Feedback{" "}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              w={"15%"}
              minW={"150px"}
            >
              Sentiment
            </Table.ColumnHeader>
            <Table.ColumnHeader
              w={"15%"}
              minW={"150px"}
            >
              Created At
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {feedbacks.map((feedback) => (
            <Table.Row key={feedback.id}>
              <Table.Cell>
                <Text
                  maxWidth={{ base: "300px", md: "500px", lg: "600px", xl: "900px", "2xl": "1500px" }}
                  whiteSpace="normal"
                >
                  {feedback.text}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Tag
                  size="lg"
                  colorPalette={sentimentColorMapping[feedback.sentiment]}
                >
                  {feedback.sentiment}
                </Tag>
              </Table.Cell>
              <Table.Cell>{formatDateWithTime(new Date(feedback.createdAt))}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {hasNextPage && (
        <Box
          ref={lastRowRef}
          textAlign="center"
          w={"100%"}
          py={4}
        >
          {loading && <Spinner />}
        </Box>
      )}
      {!hasNextPage && !!feedbacks.length && (
        <Box
          textAlign="center"
          py={4}
          w={"100%"}
        >
          <Text color="gray.500">No more feedbacks to load...</Text>
        </Box>
      )}
      {!feedbacks.length && !loading && (
        <Box
          textAlign="center"
          py={4}
          w={"100%"}
        >
          <Text color="gray.500">No feedbacks available.</Text>
        </Box>
      )}
    </Table.ScrollArea>
  );
};

FeedbackTable.displayName = "FeedbackTable";
export default FeedbackTable;
