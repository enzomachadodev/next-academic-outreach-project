import { SearchForm } from "@/features/company/components/search-form";

const EmpreendedoresPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <main className="min-h-screen">
      <section className="section-container">
        <h1 className="heading">
          Apresente Sua Empresa, Conecte-se com Empreendedores!
        </h1>
        <p className="sub-heading">
          Excepteur dolor ad tempor velit nisi commodo irure minim ut ad anim
          Lorem sunt id.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-3xl font-medium text-foreground">
          {query ? `Exibindo resultados para ${query}` : "Empreendedores"}
        </p>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {/* {new Array(5).map((item, index) => (
            <EntrepreneursCard key={index} />
          ))} */}
        </ul>
      </section>
    </main>
  );
};

export default EmpreendedoresPage;
