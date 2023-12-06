import "@fontsource-variable/noto-sans-sc";
import "flowbite";
import { createSignal } from "solid-js";
import { Toaster } from "solid-toast";
import Layout from "./components/layout";
import MenuList from "./components/menu-list";
import ExcelConverter from "./routes/excel-converter";
import NameGenerator from "./routes/name-generator";

function App() {
  const [selectedId, setSelectedId] = createSignal(-1);

  function handleBack() {
    setSelectedId(-1);
  }

  return (
    <div class="font-main w-[500px] h-[400px] px-[24px] py-[16px]">
      <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        皮果儿小工具
      </h1>
      {selectedId() === -1 && <MenuList onChange={setSelectedId} />}
      {selectedId() > -1 && (
        <Layout onBack={handleBack}>
          {selectedId() === 0 && <ExcelConverter />}
          {selectedId() === 1 && <NameGenerator />}
        </Layout>
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
