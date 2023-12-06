import clsx from "clsx";
import { JSX, createSignal } from "solid-js";
import toast from "solid-toast";

export default function ExcelConverter() {
  const [data, setData] = createSignal("");
  const [seperator, setSeperator] = createSignal(",");
  const [hasError, setHasError] = createSignal(false);

  async function handleClick() {
    if (data().length > 0) {
      setHasError(false);
      let seperatorValue = seperator().length > 0 ? seperator() : ",";
      let result = "";

      if (data().includes("\n")) {
        result = data().split("\n").join(seperatorValue);
      } else if (data().includes("\t")) {
        result = data().split("\t").join(seperatorValue);
      }

      try {
        await navigator.clipboard.writeText(result);
        toast.success("复制成功");
      } catch (error: any) {
        toast.error(error.toString());
      }
    } else {
      setHasError(true);
    }
  }

  const handleChangeData: JSX.ChangeEventHandler<HTMLTextAreaElement, Event> = (
    event
  ) => {
    setData(event.currentTarget.value);
  };

  const handleChangeSeperator: JSX.ChangeEventHandler<
    HTMLInputElement,
    Event
  > = (event) => {
    setSeperator(event.currentTarget.value);
  };

  return (
    <form class="w-full max-w-sm mx-auto">
      <div class="mb-5">
        <label
          for="data"
          class={clsx("block mb-2 text-sm font-medium", {
            ["text-red-700 dark:text-red-500"]: hasError(),
            ["text-gray-900 dark:text-white"]: !hasError(),
          })}
        >
          Excel列数据
        </label>
        <textarea
          id="data"
          rows="4"
          class={clsx(
            "block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            {
              ["bg-red-50 border-red-500 text-red-900 placeholder-red-700"]:
                hasError(),
              ["bg-gray-50 border-gray-300 text-gray-900"]: !hasError(),
            }
          )}
          placeholder="请粘贴Excel的列数据，支持换行符或空格分隔"
          onChange={handleChangeData}
          required
        ></textarea>
        {hasError() && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            Excel列数据不能为空
          </p>
        )}
      </div>
      <div class="mb-5">
        <label
          for="seperator"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          分隔符
        </label>
        <input
          type="password"
          id="seperator"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeSeperator}
          placeholder="请输入转换后的分隔符，默认为,"
        />
      </div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}
      >
        转换并复制
      </button>
    </form>
  );
}
