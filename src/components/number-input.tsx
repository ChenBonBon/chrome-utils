import clsx from "clsx";
import { Accessor, JSX } from "solid-js";

interface INumberInput {
  name: string;
  value: Accessor<string>;
  placeholder?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}

export default function NumberInput(props: INumberInput) {
  const { name, value, placeholder, hasError, onChange } = props;

  function handleDecrement() {
    const _value = Number(value());
    onChange && onChange((_value - 1).toString());
  }

  function handleIncrement() {
    const _value = Number(value());
    onChange && onChange((_value + 1).toString());
  }

  const handleChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (
    event
  ) => {
    const _value = event.currentTarget.value;
    onChange && onChange(_value);
  };

  return (
    <div class="relative flex items-center">
      <button
        type="button"
        data-input-counter-decrement="counter-input"
        class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        onClick={handleDecrement}
      >
        <svg
          class="w-2.5 h-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        id={name}
        data-input-counter
        class={clsx(
          "flex-shrink-0 dark:text-white border text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center",
          {
            ["bg-red-50 border-red-500 text-red-900 placeholder-red-700"]:
              hasError,
            ["bg-gray-50 border-gray-300 text-gray-900"]: !hasError,
          }
        )}
        placeholder={placeholder}
        value={value()}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        data-input-counter-increment="counter-input"
        class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        onClick={handleIncrement}
      >
        <svg
          class="w-2.5 h-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
