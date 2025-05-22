"use client";
import React, { useState, useMemo } from "react";
import SailingsList from "./SailingsList";
export type { Sailing } from "./SailingsList";

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price (Lowest first)" },
  { value: "price_desc", label: "Price (Highest first)" },
  { value: "date_asc", label: "Departure Date (Earliest first)" },
  { value: "date_desc", label: "Departure Date (Latest first)" },
  { value: "duration_asc", label: "Duration (Shortest first)" },
  { value: "duration_desc", label: "Duration (Longest first)" },
];

import type { Sailing } from "./SailingsList";

function sortSailings(sailings: Sailing[], sort: string) {
  const sorted = [...sailings];
  switch (sort) {
    case "price_asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "date_asc":
      sorted.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
      break;
    case "date_desc":
      sorted.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
      break;
    case "duration_asc":
      sorted.sort((a, b) => a.duration - b.duration);
      break;
    case "duration_desc":
      sorted.sort((a, b) => b.duration - a.duration);
      break;
    default:
      break;
  }
  return sorted;
}

export default function SearchResultsPage({ sailings }: { sailings: Sailing[] }) {
  const [sort, setSort] = useState("price_asc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const sortedSailings = useMemo(() => sortSailings(sailings, sort), [sailings, sort]);
  const totalPages = Math.ceil(sortedSailings.length / perPage);
  const paginatedSailings = sortedSailings.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="text-lg font-semibold">{sortedSailings.length} trips found</div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="border rounded px-2 py-1 text-sm"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <SailingsList sailings={paginatedSailings} />
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded border text-sm hover:cursor-pointer ${page === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50 hover:cursor-pointer"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
} 