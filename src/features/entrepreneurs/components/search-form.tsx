import { Search } from "lucide-react";
import Form from "next/form";

import { SearchFormReset } from "./search-form-reset";

interface SearchFormProps {
  query?: string;
}

export const SearchForm = ({ query }: SearchFormProps) => {
  return (
    <Form
      id="search-form"
      action="/empreendedores"
      scroll={false}
      className="mt-8 flex min-h-[80px] w-full max-w-3xl flex-row items-center gap-5 rounded-[80px] border-[5px] border-foreground bg-primary-foreground pl-5 pr-3 text-[24px] text-foreground"
    >
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Pesquisar Empresas..."
        className="h-auto w-full flex-1 outline-none placeholder:font-medium placeholder:text-foreground"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button
          type="submit"
          className="flex size-[50px] items-center justify-center rounded-full bg-foreground text-background"
        >
          <Search />
        </button>
      </div>
    </Form>
  );
};
