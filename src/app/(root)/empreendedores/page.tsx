import { SearchForm } from "@/features/entrepreneurs/components/search-form";

const EmpreendedoresPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <div>
      <section className="flex min-h-[530px] w-full flex-col items-center justify-center bg-primary px-6 py-10 text-center text-primary-foreground">
        <h1 className="heading">
          Apresente Sua Empresa, Conecte-se com Empreendedores!
        </h1>
        <p className="sub-heading">
          Excepteur dolor ad tempor velit nisi commodo irure minim ut ad anim
          Lorem sunt id.
        </p>
        <SearchForm query={query} />
      </section>
    </div>
  );
};

export default EmpreendedoresPage;
