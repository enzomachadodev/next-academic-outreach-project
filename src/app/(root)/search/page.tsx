import { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
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
    <PageContainer>
      <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
        Search results for &quot;{q}&quot;
      </h1>
      <SearchResults query={q} />
    </PageContainer>
  );
};

export default Search;
