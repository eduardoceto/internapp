import SearchResultsPage from "./SearchResultsPage";
import { Sailing } from "./SailingsList";

async function getSailings() {
  const res = await fetch("https://sandbox.cruisebound-qa.com/sailings", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch sailings");
  return res.json();
}

export default async function Home() {
  let sailings;
  try {
    sailings = await getSailings();
  } catch (error) {
    return (
      <div className="p-8 text-red-600">
        <div>Error fetching sailings:</div>
        <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto">{String(error)}</pre>
      </div>
    );
  }

  return <SearchResultsPage sailings={sailings.results as Sailing[]} />;
}
