const menuList = ["Excel列转行", "生成Name", "抽奖"];

interface IMenuList {
  onChange?: (id: number) => void;
}

export default function MenuList(props: IMenuList) {
  const { onChange } = props;

  return (
    <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      {menuList.map((menu, index) => (
        <li>
          <a
            href="#"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => {
              onChange && onChange(index);
            }}
          >
            {menu}
          </a>
        </li>
      ))}
    </ul>
  );
}
