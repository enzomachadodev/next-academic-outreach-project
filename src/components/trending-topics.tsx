import { unstable_cache } from "next/cache";
import Link from "next/link";

import { db } from "@/lib/db";
import { formatNumber } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const getTrendingTopics = unstable_cache(
  async () => {
    try {
      const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM post
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
          `;

      return result.map((row) => ({
        hashtag: row.hashtag,
        count: Number(row.count),
      }));
    } catch (error) {
      console.error("Failed to fetch trending topics:", error);
      return [];
    }
  },
  ["trending_topics"],
  {
    revalidate: 12 * 60 * 60,
  },
);

export const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();

  return (
    <Card className="h-fit w-full">
      <CardHeader className="border-none pb-0">
        <CardTitle className="text-xl">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {trendingTopics.map(({ hashtag, count }) => {
          const title = hashtag.split("#")[1];

          return (
            <Link key={title} href={`/hashtag/${title}`} className="block">
              <p
                className="line-clamp-1 break-all font-semibold hover:underline"
                title={hashtag}
              >
                {hashtag}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatNumber(count)} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};
