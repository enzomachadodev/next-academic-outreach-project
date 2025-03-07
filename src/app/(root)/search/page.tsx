import { Metadata } from "next";

import { TrendsSidebar } from "@/components/trends-sidebar";
import { SearchResults } from "@/features/posts/components/search-results";

interface PageProps {
  searchParams: { q: string };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `Search results for "${q}"`,
  };
}

const Search = async ({ searchParams }: PageProps) => {
  const { q } = await searchParams;

  return (
    <main className="wrapper grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-8 lg:col-span-2">
        <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
          Search results for &quot;{q}&quot;
        </h1>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Search;
