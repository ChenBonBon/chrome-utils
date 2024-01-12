import clsx from "clsx";
import { createSignal } from "solid-js";
import CouponCard, { Coupon } from "../components/coupon-card";

const couponList: Coupon[] = [
  { title: "谢谢惠顾", src: "/images/thanks.jpeg" },
  { title: "捏脚1分钟", src: "/images/feet.jpeg" },
  { title: "唱歌1首", src: "/images/ktv.jpeg" },
  { title: "捏背1分钟", src: "/images/spa.jpeg" },
  { title: "捏脚2分钟", src: "/images/feet.jpeg" },
  { title: "唱歌2首", src: "/images/ktv.jpeg" },
  { title: "捏背2分钟", src: "/images/spa.jpeg" },
  { title: "捏脚3分钟", src: "/images/feet.jpeg" },
  { title: "唱歌3首", src: "/images/ktv.jpeg" },
  { title: "捏背3分钟", src: "/images/spa.jpeg" },
  { title: "谢谢惠顾", src: "/images/thanks.jpeg" },
];

export default function CouponGenerator() {
  const [running, setRunning] = createSignal(false);
  const [couponIndex, setCouponIndex] = createSignal(-1);

  function getRandomNumber() {
    return Math.floor(Math.random() * 20);
  }

  function handleClick() {
    setCouponIndex(-1);
    const luckyNumber = getRandomNumber();

    setRunning(true);

    if (luckyNumber > 10 || luckyNumber % 10 === 0) {
      setTimeout(() => {
        setCouponIndex(0);
        setRunning(false);
      }, 5000);
    } else {
      setTimeout(() => {
        setCouponIndex(luckyNumber % 10);
        setRunning(false);
      }, 5000);
    }
  }

  return (
    <div class="flex flex-col gap-4 items-center">
      <div class="flex w-[300px] h-[200px] overflow-hidden">
        {couponIndex() === -1 && (
          <div class={clsx("flex", { ["animate-swiper"]: running() })}>
            {couponList.map((coupon) => (
              <CouponCard coupon={coupon} />
            ))}
          </div>
        )}
        {couponIndex() > -1 && (
          <CouponCard coupon={couponList[couponIndex()]} />
        )}
      </div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleClick}
        disabled={running()}
      >
        开始抽奖
      </button>
    </div>
  );
}
