let type = "";

document.getElementById("addSplit").addEventListener("click", () => {
  type = "addSplit";
  renderUtil();
});

document.getElementById("back").addEventListener("click", () => {
  type = "back";
  renderUtil();
});

function copyResult() {
  const result = document.getElementById("result");
  navigator.clipboard.writeText(result.innerHTML);
}

function onOk() {
  switch (type) {
    case "addSplit":
      const textarea = document.getElementById("textarea");
      const input2 = document.getElementById("input2");
      const result = document.getElementById("result");
      const copyBtn = document.getElementById("copyBtn");

      const res = textarea.value
        .split("\n")
        .join(input2.value ? input2.value : ",");
      result.innerHTML = res;
      document.getElementById("resultContainer").classList.remove("hide");
      copyBtn.addEventListener("click", copyResult);
      break;
  }
}

function renderUtil() {
  const okBtn = document.getElementById("okBtn");
  if (type !== "back") {
    document.getElementById("utils").classList.add("hide");
    document.getElementById("back").classList.remove("hide");
    document.getElementById("controls").classList.remove("hide");
  } else {
    document.getElementById("utils").classList.remove("hide");
    document.getElementById("back").classList.add("hide");
    document.getElementById("controls").classList.add("hide");
    document.getElementById("resultContainer").classList.add("hide");
  }

  switch (type) {
    case "addSplit":
      const fragment = document.createDocumentFragment();
      const textarea = document.createElement("textarea");
      const input2 = document.createElement("input");

      textarea.setAttribute("placeholder", "请粘贴需要转换的Excel列");
      textarea.setAttribute("id", "textarea");
      textarea.setAttribute("rows", 5);
      input2.setAttribute("placeholder", "请输入转换后的分隔符，默认为,");
      input2.setAttribute("id", "input2");

      fragment.appendChild(textarea);
      fragment.appendChild(input2);

      document.getElementById("util").appendChild(fragment);
      okBtn.addEventListener("click", onOk);
      break;
    case "back":
      document.getElementById("util").innerHTML = "";
      okBtn.removeEventListener("click", onOk);
      break;
  }
}
