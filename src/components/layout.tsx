import { JSXElement } from "solid-js";

interface ILayout {
  onBack?: () => void;
  children: JSXElement;
}

export default function Layout(props: ILayout) {
  const { onBack, children } = props;

  return (
    <div class="flex flex-col gap-[16px]">
      <div>
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={onBack}
        >
          {"< 返回"}
        </a>
      </div>
      {children}
    </div>
  );
}
