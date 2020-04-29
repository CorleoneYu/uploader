import { useState } from 'react';

function useVisible() {
  const [visible, setVisible] = useState<boolean>(true);

  return {
    visible,
    setVisible,
  };
}

export default useVisible;
