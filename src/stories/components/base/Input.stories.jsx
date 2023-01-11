import { Input } from '@/components/base';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      defaultValue: 'Label',
      control: 'text',
    },
    invalid: {
      defaultValue: false,
      control: 'boolean',
    },
    block: {
      defaultValue: false,
      control: 'boolean',
    },
    required: {
      defaultValue: false,
      control: 'boolean',
    },
    disabled: {
      defaultValue: false,
      control: 'boolean',
    },
    readonly: {
      defaultValue: false,
      control: 'boolean',
    },
  },
};

export const Default = (args) => {
  return <Input {...args} />;
};
