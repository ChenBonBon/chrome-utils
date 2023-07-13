import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import styled from "styled-components";

type Type = "EXCEL" | "TEMPLATE";

type Excel = {
  origin: HTMLTextAreaElement | null;
  seperator: HTMLInputElement | null;
};

type Name = {
  min: HTMLInputElement | null;
  max: HTMLInputElement | null;
  cloth: HTMLSelectElement | null;
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

const InputNumber = styled("input")`
  width: 100px;
  height: 18px;
`;

const AgeWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MEN_CLOTHING = [
  {
    key: 35208,
    value: "shirt",
  },
  { key: 35212, value: "polo" },
  { key: 35211, value: "tee" },
  { key: 5610, value: "pants" },
  { key: 113188, value: "shorts" },
];

function App() {
  const excelRef = useRef<Excel>({
    origin: null,
    seperator: null,
  });
  const nameRef = useRef<Name>({
    min: null,
    max: null,
    cloth: null,
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

  async function campaign() {
    const { min, max, cloth } = nameRef.current;
    const date = dayjs().format("YYYY-M-D");
    const clothKey = MEN_CLOTHING.find(
      (item) => item.value === cloth!.value
    )!.key;

    const result = `[NEWLITB][EN]<Male><${min!.value}-${max!.value}><${
      cloth!.value
    }>[ALL]<MIX>[C${clothKey}]<team_fb1_wangyuting>[C5585]<${date}>`;

    await navigator.clipboard.writeText(result);
    toast("复制成功", {
      type: "success",
      ...TOAST_OPTIONS,
    });
  }

  async function adSet() {
    const { min, max, cloth } = nameRef.current;
    const date = dayjs().format("YYYY-M-D");
    const clothKey = MEN_CLOTHING.find(
      (item) => item.value === cloth!.value
    )!.key;

    const result = `[NEWLITB][MIX]<Male><${min!.value}-${max!.value}><${
      cloth!.value
    }>[C${clothKey}][IMG][${date}]<team_fb1_wangyuting>[C5585]`;

    await navigator.clipboard.writeText(result);
    toast("复制成功", {
      type: "success",
      ...TOAST_OPTIONS,
    });
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
              <Label>分隔符</Label>
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
      case "TEMPLATE":
        return (
          <form className="pure-form pure-form-stacked">
            <fieldset>
              <Label>年龄段</Label>
              <AgeWrapper>
                <InputNumber
                  type="number"
                  defaultValue={25}
                  placeholder="请输入最小年龄"
                  ref={(ref) => {
                    nameRef.current.min = ref;
                  }}
                />{" "}
                至{" "}
                <InputNumber
                  type="number"
                  defaultValue={65}
                  placeholder="请输入最大年龄"
                  ref={(ref) => {
                    nameRef.current.max = ref;
                  }}
                />
              </AgeWrapper>
              <Label>子品类</Label>
              <select
                ref={(ref) => {
                  nameRef.current.cloth = ref;
                }}
              >
                {MEN_CLOTHING.map(({ key, value }) => (
                  <option key={key}>{value}</option>
                ))}
              </select>
              <AgeWrapper>
                <button
                  type="button"
                  className="pure-button pure-button-primary"
                  onClick={campaign}
                >
                  Campaign
                </button>
                <button
                  type="button"
                  className="pure-button pure-button-primary"
                  onClick={adSet}
                >
                  ad set
                </button>
              </AgeWrapper>
            </fieldset>
          </form>
        );
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
                  setType("TEMPLATE");
                }}
              >
                Name 生成
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
