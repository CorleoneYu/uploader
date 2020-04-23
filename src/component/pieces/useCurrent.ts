import { useState } from 'react';

function useCurrent() {
  const [current, setCurrent] = useState(0);

  return {
    current,
    setCurrent,
  };
}

export default useCurrent;
