import React from "react";
import { ConfigProvider } from "antd";

function Theme({ children }: { children: React.ReactNode }) {
  const primaryColor = "#531785";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          controlOutline: "none",
          borderRadius: 2,
        },
        components: {
          Input: {
            controlHeight: 45,
            colorBorder: "#8a8a8a",
          },
          Button: {
            controlHeight: 40,
            defaultBg : '#DDDDDD',
            defaultActiveBg: '#DDDDDD',
          },
          Select: {
            controlHeight: 45,
            colorBorder: "#8a8a8a",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default Theme;
