// import React from "react";
import { useAppSelector } from "../hooks/redux.js";

export function FavouritesPage() {
  const { favourites } = useAppSelector(
    (state: { github: any }) => state.github
  );

  if (favourites.length === 0) return <p className="text-center">None...</p>;

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map((f: any) => (
          <li key={f}>
            <a href={f} target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
