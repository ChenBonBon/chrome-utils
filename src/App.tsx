import { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import styled from "styled-components";

type Type = "EXCEL" | "BUDGET";

type Excel = {
  origin: HTMLTextAreaElement | null;
  seperator: HTMLInputElement | null;
};

const TOAST_OPTIONS = {
  autoClose: 500,
  hideProgressBar: true,
};

const Container = styled("div")`
  width: 500px;
  height: 400px;
  margin: 16px 24px;
`;

const Title = styled("h1")``;

const List = styled("ol")`
  margin: 0;
  padding: 0;
`;

const ListItem = styled("li")`
  padding: 8px 0;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
`;

const UnstyledListItem = styled(ListItem)`
  list-style: none;
`;

const Link = styled("span")`
  cursor: pointer;
`;

const Content = styled("div")`
  width: 100%;
  height: calc(100% - 100px);
`;

const Label = styled("label")`
  font-size: 14px;
  height: 18px;
  line-height: 18px;
`;

const Textarea = styled("textarea")`
  width: 100%;
  resize: none;
`;

const Input = styled("input")`
  width: 100%;
`;

function App() {
  const excelRef = useRef<Excel>({
    origin: null,
    seperator: null,
  });
  const [showDetail, setShowDetail] = useState(false);
  const [type, setType] = useState<Type>();

  async function handleExcel() {
    const { origin, seperator } = excelRef.current;
    if (origin?.value && origin.value.length > 0) {
      const originValue = origin.value;
      let seperatorValue = ",";
      if (seperator?.value && seperator.value.length > 0) {
        seperatorValue = seperator.value;
      }

      let result = "";
      if (originValue.includes("\n")) {
        result = originValue.split("\n").join(seperatorValue);
      } else if (originValue.includes("\t")) {
        result = originValue.split("\t").join(seperatorValue);
      }
      await navigator.clipboard.writeText(result);
      toast("复制成功", {
        type: "success",
        ...TOAST_OPTIONS,
      });
    } else {
      toast("Excel列数据不能为空", {
        type: "error",
        ...TOAST_OPTIONS,
      });
    }
  }

  const renderContent = useCallback(() => {
    switch (type) {
      case "EXCEL":
        return (
          <form className="pure-form pure-form-stacked">
            <fieldset>
              <Label>Excel列数据</Label>
              <Textarea
                placeholder="请粘贴Excel的列数据，支持换行符或空格分隔"
                rows={5}
                ref={(ref) => {
                  excelRef.current.origin = ref;
                }}
              />
              <Label>Excel列数据</Label>
              <Input
                placeholder="请输入转换后的分隔符，默认为,"
                ref={(ref) => {
                  excelRef.current.seperator = ref;
                }}
              />
              <button
                type="button"
                className="pure-button pure-button-primary"
                onClick={handleExcel}
              >
                转换并复制
              </button>
            </fieldset>
          </form>
        );
      case "BUDGET":
        return <div></div>;
      default:
        return <></>;
    }
  }, [type]);

  return (
    <Container>
      <Title>皮果儿小工具</Title>
      <List>
        {!showDetail && (
          <>
            <ListItem>
              <Link
                onClick={() => {
                  setShowDetail(true);
                  setType("EXCEL");
                }}
              >
                Excel列转行
              </Link>
            </ListItem>
            <ListItem>
              <Link
                onClick={() => {
                  setShowDetail(true);
                  setType("BUDGET");
                }}
              >
                预算统计
              </Link>
            </ListItem>
          </>
        )}
        {showDetail && (
          <UnstyledListItem>
            <Link
              onClick={() => {
                setShowDetail(false);
                setType(undefined);
              }}
            >
              返回
            </Link>
          </UnstyledListItem>
        )}
      </List>

      {showDetail && <Content>{renderContent()}</Content>}
      <ToastContainer />
    </Container>
  );
}

export default App;
