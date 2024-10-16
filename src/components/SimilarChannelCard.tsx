import {
  useGetChannelHistoryQuery,
  useGetNameStationQuery,
} from "../store/audioaddict/audioaddict.api";
import { Image } from "antd";
import { Link } from "react-router-dom";

export function SimilarChannelCard(similar_channel_id: any) {
  const { data } = useGetChannelHistoryQuery({
    site: "di",
    channel_id: similar_channel_id.channelId,
  });
  const item = data && data[0];
  // console.log(item);

  const siteName = localStorage.getItem("site");
  const { data: stationData } = useGetNameStationQuery(siteName);
  //   console.log(stationData);
  //   const items = data && Object.values(data);

  let nameChannel: string = "Station";
  const items = stationData && Object.values(stationData);
  //   console.log(items);
  const track = item;

  items?.map((item: { id: unknown; name: string }) => {
    if (item.id === similar_channel_id.channelId) {
      nameChannel = item.name;
      //   const track = item.id;
      //   console.log(similar_channel_id);
    }
  });

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4">
      <Link to="/item" state={{ track, siteName, nameChannel }}>
        <span className="before:block before:absolute before:-inset-1 before:bg-blue-100 relative inline-block">
          <span className="relative">{nameChannel}</span>
        </span>
        <p className="sm:text-xl text-center text-slate-600 decoration-solid p-2 hover:underline text-sm">
          {item?.track}
        </p>
      </Link>
      <Image className="rounded-xl" src={"https:" + item?.art_url} />
    </div>
  );
}
