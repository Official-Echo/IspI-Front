import { defineLayout } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import SearchBar from "./(_islands)/search-bar.tsx";
import FilterPanel from "./(_islands)/filter-panel.tsx";

export default defineLayout((req, ctx) => {
  const isMainDatabasePage = req.url.includes("/database") &&
    !req.url.match(/\/database\/\d+/);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div class="database-layout">
        <h2>Database</h2>

        {isMainDatabasePage && (
          <>
            <SearchBar />
            <FilterPanel />
          </>
        )}

        <ctx.Component />
      </div>
    </div>
  );
});
