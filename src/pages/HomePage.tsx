import { useTrackHistoryQuery } from "../store/audioaddict/audioaddict.api.js";
import { TrackCard } from "../components/TrackCard.js";
import { useEffect } from "react";
import { UITrack } from "../models/models.ts";

export function HomePage({ siteName }: { siteName: string }) {
  const { isLoading, isError, data } = useTrackHistoryQuery(
    siteName || localStorage.getItem("site") || "di"
  );

  const items = data && Object.values(data);

  useEffect(() => {
    document.title = `${siteName}`;
  }, [siteName]);

  return (
    <div className="pt-10 container lg mx-auto ">
      {isError && <p>Loading error...</p>}
      {isLoading && (
        <>
          <p className="p-4">Loading... Wait a minute</p>
          <svg
            className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      )}
      {items ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-6 sm:grid-cols-4">
          {items.map((item: UITrack) => (
            <TrackCard track={item} key={item.channel_id} siteName={siteName} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
