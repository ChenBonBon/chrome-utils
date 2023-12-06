import clsx from "clsx";
import dayjs from "dayjs";
import { JSX, createSignal } from "solid-js";
import { toast } from "solid-toast";
import NumberInput from "../components/number-input";

const MEN_CLOTHING = [
  {
    value: "35208",
    label: "shirt",
  },
  { value: "35212", label: "polo" },
  { value: "35211", label: "tee" },
  { value: "5610", label: "pants" },
  { value: "113188", label: "shorts" },
];

export default function NameGenerator() {
  const [minAge, setMinAge] = createSignal("25");
  const [maxAge, setMaxAge] = createSignal("65");
  const [clothId, setClothId] = createSignal("35208");
  const [minAgeHasError, setMinAgeHasError] = createSignal(false);
  const [maxAgeHasError, setMaxAgeHasError] = createSignal(false);
  const [clothIdHasError, setClothIdHasError] = createSignal(false);

  function handleChangeMinAge(value: string) {
    setMinAge(value);
  }

  function handleChangeMaxAge(value: string) {
    setMaxAge(value);
  }

  const handleChange: JSX.ChangeEventHandler<HTMLSelectElement, Event> = (
    event
  ) => {
    setClothId(event.currentTarget.value);
  };

  async function generateCampaign() {
    if (minAge().length === 0) {
      setMinAgeHasError(true);
      return;
    } else {
      setMinAgeHasError(false);
    }

    if (maxAge().length === 0) {
      setMaxAgeHasError(true);
      return;
    } else {
      setMaxAgeHasError(false);
    }

    if (clothId().length === 0) {
      setClothIdHasError(true);
      return;
    } else {
      setClothIdHasError(false);
    }

    const date = dayjs().format("YYYY-M-D");

    const label = MEN_CLOTHING.find((item) => item.value === clothId())!.label;

    const result = `[NEWLITB][EN]<Male><${minAge()}-${maxAge()}><${label}>[ALL]<MIX>[C${clothId()}]<team_fb1_wangyuting>[C5585]<${date}>`;

    try {
      await navigator.clipboard.writeText(result);
      toast.success("复制成功");
    } catch (error: any) {
      toast.error(error.toString());
    }
  }

  async function generateAdSet() {
    if (minAge().length === 0) {
      setMinAgeHasError(true);
      return;
    } else {
      setMinAgeHasError(false);
    }

    if (maxAge().length === 0) {
      setMaxAgeHasError(true);
      return;
    } else {
      setMaxAgeHasError(false);
    }

    if (clothId().length === 0) {
      setClothIdHasError(true);
      return;
    } else {
      setClothIdHasError(false);
    }

    const date = dayjs().format("YYYY-M-D");

    const label = MEN_CLOTHING.find((item) => item.value === clothId())!.label;

    const result = `[NEWLITB][MIX]<Male><${minAge()}-${maxAge()}><${label}>[C${clothId()}][IMG][${date}]<team_fb1_wangyuting>[C5585]`;

    try {
      await navigator.clipboard.writeText(result);
      toast.success("复制成功");
    } catch (error: any) {
      toast.error(error.toString());
    }
  }

  return (
    <form class="w-full max-w-sm mx-auto">
      <div class="mb-5">
        <div class="flex justify-around items-center gap-[8px]">
          <div>
            <label
              for="min"
              class={clsx("block mb-2 text-sm font-medium", {
                ["text-red-700 dark:text-red-500"]: minAgeHasError(),
                ["text-gray-900 dark:text-white"]: !minAgeHasError(),
              })}
            >
              最小年龄
            </label>
            <NumberInput
              name="min"
              value={minAge}
              placeholder="最小年龄"
              onChange={handleChangeMinAge}
              hasError={minAgeHasError()}
            />
          </div>
          <div class="self-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            至
          </div>
          <div>
            <label
              for="max"
              class={clsx("block mb-2 text-sm font-medium", {
                ["text-red-700 dark:text-red-500"]: maxAgeHasError(),
                ["text-gray-900 dark:text-white"]: !maxAgeHasError(),
              })}
            >
              最大年龄
            </label>
            <NumberInput
              name="max"
              value={maxAge}
              placeholder="最大年龄"
              onChange={handleChangeMaxAge}
              hasError={maxAgeHasError()}
            />
          </div>
        </div>
        {minAgeHasError() && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            最小年龄不能为空
          </p>
        )}
        {maxAgeHasError() && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            最大年龄不能为空
          </p>
        )}
      </div>
      <div class="mb-5">
        <label
          for="cloth"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          子品类
        </label>
        <select
          id="cloth"
          class={clsx(
            "border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            {
              ["bg-red-50 border-red-500 text-red-900 placeholder-red-700"]:
                clothIdHasError(),
              ["bg-gray-50 border-gray-300 text-gray-900"]: !clothIdHasError(),
            }
          )}
          onChange={handleChange}
        >
          {MEN_CLOTHING.map(({ label, value }) => (
            <option value={value}>{label}</option>
          ))}
        </select>
        {clothIdHasError() && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            子品类不能为空
          </p>
        )}
      </div>
      <div class="flex justify-center items-center gap-[16px]">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={generateCampaign}
        >
          生成Campaign
        </button>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={generateAdSet}
        >
          生成AdSet
        </button>
      </div>
    </form>
  );
}
