"use client";
import React from "react";
import Image from "next/image";

export interface ShipLine {
  logo: string;
  name: string;
}

export interface Ship {
  name: string;
  rating: number;
  reviews: number;
  image: string;
  line: ShipLine;
}

export interface Sailing {
  price: number;
  name: string;
  ship: Ship;
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
}

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const month = startDate.toLocaleString("default", { month: "short" });
  const year = startDate.getFullYear();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  return sameMonth
    ? `${month} ${startDay}-${endDay}, ${year}`
    : `${startDate.toLocaleString("default", { month: "short" })} ${startDay} - ${endDate.toLocaleString("default", { month: "short" })} ${endDay}, ${year}`;
}

export default function SailingsList({ sailings }: { sailings: Sailing[] }) {
  if (!sailings || sailings.length === 0) {
    return <div>No sailings found.</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      {sailings.map((sailing, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
          {/* Ship Image + Date Badge */}
          <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
            {sailing.ship.image ? (
              <Image
                src={sailing.ship.image}
                alt={sailing.ship.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 256px"
                className="sm:rounded-l-2xl"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
            <div className="absolute top-3 left-3 bg-gray-900/90 text-white text-xs font-medium px-3 py-1 rounded-md shadow">
              {formatDateRange(sailing.departureDate, sailing.returnDate)}
            </div>
          </div>

          {/* Main Content + Price/Button */}
          <div className="flex flex-col justify-between flex-1">
            <div className="px-4 pt-4 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  {sailing.name}
                </div>
                <div className="flex flex-col items-end gap-1 min-w-[120px]">
                  {sailing.ship.line.logo ? (
                    <Image
                      src={sailing.ship.line.logo}
                      alt={sailing.ship.line.name}
                      width={64}
                      height={32}
                      className="object-contain h-8 w-auto"
                    />
                  ) : (
                    <div className="bg-gray-200 w-16 h-8 flex items-center justify-center text-gray-400 text-xs">
                      No logo
                    </div>
                  )}
                  <span className="text-xs text-gray-500 font-medium mt-1">{sailing.ship.name}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mt-1">
                <span className="font-medium text-gray-900">{sailing.region}</span>
                <span className="text-gray-500">{sailing.duration} nights</span>
                <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                  <span>★</span>
                  <span>{sailing.ship.rating}</span>
                  <span className="text-gray-400 font-normal ml-1">{sailing.ship.reviews} reviews</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-700 mt-1">
                {sailing.itinerary.map((port, i) => (
                  <React.Fragment key={i}>
                    <span className="font-medium text-gray-900">{port}</span>
                    {i < sailing.itinerary.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center justify-end bg-gray-50 px-6 py-4 border-t border-gray-100 gap-x-6">
              <div className="text-right">
                <div className="text-xs text-gray-500">Interior from</div>
                <div className="text-2xl font-bold text-gray-900">${sailing.price}</div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow text-base hover:cursor-pointer">
                See sailings
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 