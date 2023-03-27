import { Heading } from '@/components/base';

export default {
  title: 'Component/Heading',
  component: Heading,
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 } },
    size: { control: 'number' },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export const Default = (args) => {
  return <Heading {...args}>Heading</Heading>;
};
