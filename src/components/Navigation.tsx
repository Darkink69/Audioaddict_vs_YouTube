import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
// import type { SearchProps } from "antd/es/input/Search.js";
import { Select } from "antd";

const { Search } = Input;
// const onSearch: SearchProps["onSearch"] = (
//   value: unknown,
//   _e: unknown,
//   info: { source: unknown }
// ) => console.log(info?.source, value);

export function Navigation({
  onSiteChanged,
}: {
  onSiteChanged(name: string): void;
}) {
  const [station, setStation] = useState(localStorage.getItem("site") || "");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setStation(value);
    onSiteChanged(value);
  };

  useEffect(() => localStorage.setItem("site", station), [station]);

  return (
    <nav className="fixed z-10 flex justify-start items-center h-[50px] w-full px-5 shadow-md bg-sky-600 text-black">
      <Link to="/">
        <h3 className="font-bold pr-20">Audioaddict</h3>
      </Link>

      <Select
        defaultValue={station}
        style={{ width: 150 }}
        onChange={handleChange}
        options={[
          { value: "di", label: "di" },
          { value: "radiotunes", label: "radiotunes" },
          { value: "rockradio", label: "rockradio" },
          { value: "jazzradio", label: "jazzradio" },
          { value: "zenradio", label: "zenradio" },
          { value: "classicalradio", label: "classicalradio" },
        ]}
      />

      <Search
        className="pl-4"
        placeholder="search radio or track"
        // onSearch={onSearch}
        style={{ width: 200 }}
      />
    </nav>
  );
}
