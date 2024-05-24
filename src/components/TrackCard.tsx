import { UITrack } from "../models/models";
import { Link } from "react-router-dom";
import { useGetNameStationQuery } from "../store/audioaddict/audioaddict.api";
import { Image } from "antd";

export function TrackCard({
  track,
  siteName,
}: {
  track: UITrack;
  siteName: string;
}) {
  const { isLoading, data } = useGetNameStationQuery(
    siteName || localStorage.getItem("site") || ""
  );

  // console.log("TRACK!", track);

  let nameChannel: string = "";
  const items = data && Object.values(data);

  items?.map((item) => {
    if (item.id === track.channel_id) {
      nameChannel = item.name;
      // console.log(item.description_long);
    }
  });

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4">
      {isLoading && <p>Station</p>}
      <Link
        to="/item"
        key={track.channel_id}
        state={{ track, siteName, nameChannel }}
      >
        <span className="before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block">
          <span className="relative leading-normal">{nameChannel}</span>
        </span>

        <h2 className="sm:text-xl text-center text-slate-600 decoration-solid p-2 hover:underline text-sm">
          {track.track}
        </h2>
      </Link>
      {/* <p>{track.duration}</p> */}
      <p className="mt-2 text-sm text-slate-600">{track.release}</p>
      <Image className="w-full rounded-xl" src={"https:" + track.art_url} />

      <button className="m-4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        Кнопка просто так
      </button>
    </div>
  );
}
