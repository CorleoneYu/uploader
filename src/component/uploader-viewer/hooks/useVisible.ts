import { useState } from 'react';

function useVisible() {
  const [visible, setVisible] = useState<boolean>(false);

  return {
    visible,
    setVisible,
  };
}

export default useVisible;
