import { Button, Flex, Input, Select } from "antd";
export default function Home() {
  const options = [
    {
      label: "Option 1",
      value: "option1",
    },
    {
      label: "Option 2",
      value: "option2",
    },
    {
      label: "Option 3",
      value: "option3",
    },
  ];

  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1>SHEY-WORK-EASY</h1>
      <Flex gap="small" wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>

      <Input placeholder="Basic Input" />

      <Select placeholder="Select an option" options={options} />
    </div>
  );
}
