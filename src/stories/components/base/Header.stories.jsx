import Header from '@/components/base/Header';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 } },
    size: { control: 'number' },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export const Default = (args) => {
  return <Header {...args}>Header</Header>;
};
