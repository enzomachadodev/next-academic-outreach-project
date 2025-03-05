import { Metadata } from "next";

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
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            Search results for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <div></div>
    </main>
  );
};

export default Search;
