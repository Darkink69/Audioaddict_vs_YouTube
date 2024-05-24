import { useLocation } from "react-router-dom";
import {
  useGetChannelHistoryQuery,
  useGetNameStationQuery,
} from "../store/audioaddict/audioaddict.api";
import { Image } from "antd";
import { SimilarChannelCard } from "../components/SimilarChannelCard";
import { PreviousTrackCard } from "../components/PreviousCard";
import { useState, useEffect, useRef } from "react";
import { Progress } from "antd";

export function ItemStation() {
  const location = useLocation();
  const track = location.state.track;
  const nameChannel = location.state.nameChannel;

  const [sec, setSec] = useState(0);
  const timerCountIdRef = useRef(null);

  const [idYT, setidYT] = useState("dQw4w9WgXcQ");
  const [nameTrack, setNameTrack] = useState(null);

  useEffect(() => {
    timerCountIdRef.current = setInterval(() => {
      setSec((prevCount) => prevCount + 1);
    }, 1000);
    console.log(timerCountIdRef.current);

    return () => {
      timerCountIdRef.current && clearInterval(timerCountIdRef.current);
    };
  }, []);

  const { isLoading, data } = useGetChannelHistoryQuery({
    site: "di",
    channel_id: track.channel_id,
  });
  const items = data && Object.values(data);
  const item = data && data[0];

  const siteName = localStorage.getItem("site");

  const { data: stationData } = useGetNameStationQuery(
    siteName || localStorage.getItem("site") || ""
  );

  const is = stationData && Object.values(stationData);

  let dataChannel;
  is?.map((i) => {
    if (i.id === track.channel_id) {
      dataChannel = i;
      // console.log(item.description_long);
    }
  });

  const addZero = (num: string | number) => {
    if (String(num).length === 1) {
      num = "0" + String(num);
    }
    return num;
  };

  const splitSecondsTimer = () => {
    const timeStamp: number | undefined = item?.started;
    const timeLeft = Math.floor((Date.now() - timeStamp * 1000) / 1000);

    return `${Math.floor(timeLeft / 60)}:${addZero(timeLeft % 60)} 
    / ${Math.floor(item?.duration / 60)}:${addZero(item?.duration % 60)}`;
  };

  const progressPercent = () => {
    const timeLeft = Math.floor((Date.now() - item?.started * 1000) / 1000);
    return (timeLeft * 100) / item?.duration;
  };

  useEffect(() => {
    document.title = `${item?.track}`;
    // localStorage.setItem("channel_id", channel_id);
    // localStorage.setItem('yt_id', state)
  }, [item?.track]);

  const callBackendAPI = async () => {
    // const nameTrack = prop.channel[0].track;
    // console.log(prop.channel[0].track);

    const response = await fetch(`/express_backend/?${nameTrack}`);

    const body = await response.text();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  useEffect(() => {
    setNameTrack(item?.track);
    console.log("new track!", item?.track);
  }, [item?.track, nameTrack]);

  useEffect(() => {
    callBackendAPI()
      .then((res) => setidYT(res))
      .catch((err) => console.log(err));
  }, [nameTrack]);

  // const idYT = "dQw4w9WgXcQ";
  const lnkYt = `https://www.youtube.com/embed/${idYT}?autoplay=1`;
  // console.log();

  return (
    <div className="pt-10 container lg mx-auto ">
      {isLoading && <p className="pt-10 pl-11">Loading... Wait a minute</p>}

      <h1 className=" flex items-center font-bold text-slate-500 m-2 p-2">
        <span className="pr-1">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#FF1100" />
          </svg>
        </span>
        Online
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-1 md:pt-5 md:pb-5">
        <div className="m-2">
          <iframe
            className="aspect-video text-end max-w-[600px] w-full md:float-right"
            // width="500"
            // height="300"
            src={lnkYt}
            title="YouTube video player"
            // frameBorder={0}
            // autoplay={1}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="">
          <div className="columns-1 m-2">
            <div className="">
              <div className="flex">
                <div className="w-full max-w-40 pr-4">
                  <Image
                    className="rounded-xl"
                    src={"https:" + item?.art_url}
                  />
                </div>

                <div className="space-y-1 font-semibold ">
                  <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                    {nameChannel}
                  </h2>
                  <p className="text-slate-900 dark:text-slate-50 text-lg">
                    {item?.track}
                  </p>
                  <p className="text-cyan-500 dark:text-cyan-400">
                    {splitSecondsTimer()}
                  </p>
                  {/* <p>{sec}</p> */}
                  <Progress
                    percent={progressPercent()}
                    showInfo={false}
                    strokeColor="#06b6d4"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-sm text-slate-700 pt-4">
                {dataChannel ? <>{dataChannel.description_short}</> : null}
              </p>
            </div>
            <div className="">
              {dataChannel?.artists.map((nameArtist) => (
                <span className="pr-3 cursor-pointer text-slate-400 hover:text-cyan-400">
                  {nameArtist.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-slate-500 m-2">Similar radio</h1>

      <div className="pt-4">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-6 sm:grid-cols-3">
          {dataChannel?.similar_channels.map((id: any) => (
            <SimilarChannelCard channelId={id.similar_channel_id} />
          ))}
        </div>
      </div>

      <h1 className="font-bold text-slate-500 pt-4 m-2">Previous tracks</h1>

      {items ? (
        <div className="grid gap-4 md:grid-cols-4 grid-cols-1 grid-rows-3 m-2">
          {items.map((item) => (
            <PreviousTrackCard item={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
