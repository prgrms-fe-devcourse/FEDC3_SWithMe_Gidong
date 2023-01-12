import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (v) => {
    setValue(v);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
