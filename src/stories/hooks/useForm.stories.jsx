import useForm from '@/hooks/useForm';

export default {
  title: 'Hooks/useForm',
};

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const Default = () => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) errors.email = '이메일을 입력해주세요.';
      if (!password) errors.password = '비밀번호를 입력해주세요.';
      if (!/^.+@.+\..+$/.test(email)) errors.email = '올바른 이메일을 입력해주세요.';
      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div>
        <input name='email' type='email' placeholder='Email' onChange={handleChange} />
        {errors.email}
      </div>
      <div>
        <input name='password' type='password' placeholder='Password' onChange={handleChange} />
        {errors.password}
      </div>
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
