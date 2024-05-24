import { Image } from "antd";

export function PreviousTrackCard({ item }) {
  const addZero = (num: string | number) => {
    if (String(num).length === 1) {
      num = "0" + String(num);
    }
    return num;
  };

  const splitSeconds = (sec: number) => {
    return `${Math.floor(sec / 60)}:${addZero(sec % 60)}`;
  };

  return (
    <>
      <div className="flex pt-4">
        <div className="">
          <Image
            className="rounded-xl flex-none bg-slate-100"
            width={160}
            src={"https:" + item?.art_url}
          />
        </div>
        <div className="pl-4">
          <h2 className="font-semibold text-slate-900 hover:text-cyan-400 cursor-pointer">
            {item?.track}
          </h2>
          <div className="text-slate-400">{splitSeconds(item?.duration)}</div>
        </div>
      </div>
    </>
  );
}
