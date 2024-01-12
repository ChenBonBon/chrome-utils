export type Coupon = {
  title: string;
  src: string;
};

interface ICouponCard {
  coupon: Coupon;
}

export default function CouponCard(props: ICouponCard) {
  const { coupon } = props;

  return (
    <a
      href="#"
      class="flex flex-col gap-[8px] text-center flex-shrink-0 w-[300px] h-[200px] bg-white rounded-lg shadow"
    >
      <p class="text-[18px] text-red-500">{coupon.title}</p>
      <img src={coupon.src} class="h-[calc(100%-35px)]" />
    </a>
  );
}
