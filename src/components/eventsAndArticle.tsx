"use client";

import Articles from "@/components/homeComponents/articlesComponents/Articles/Articles";
import Events from "@/components/homeComponents/eventsComponents/Events/Events";
import useErrorNavigator from "@/hooks/useErrorNavigator";
import { getContent } from "@/services/getService";
import { useQuery } from "@tanstack/react-query";

export default function EventsAndArticles() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getContent,
    retry: false,
  });

  useErrorNavigator(isError, error);
  const events = data?.data?.events || [];
  const articles = data?.data?.articles || [];

  return (
    <>
      <Events events={events} isLoading={isLoading} />
      <Articles articles={articles} isLoading={isLoading} />
    </>
  );
}
