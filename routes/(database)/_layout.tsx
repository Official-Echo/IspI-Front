import { defineLayout } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import SearchBar from "./(_components)/search-bar.tsx";

export default defineLayout((req, ctx) => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div class="database-layout">
        <h2>Database</h2>
        <SearchBar />
        <div class="filters">
          <p>Filters will be here (interactive via island)</p>
        </div>
        <ctx.Component />
      </div>
    </div>
  );
});
