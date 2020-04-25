import { useCallback, useRef } from 'react';

/**
 * 提取 input 的创建
 * @param handleFileChange input 的 fileChange 事件回调
 */
function useInput(handleFileChange: any) {
  const inputDomRef = useRef<HTMLInputElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  const createInput = useCallback(() => {
    if (inputDomRef.current) {
      return inputDomRef.current;
    }

    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'file');
    inputEl.style.display = 'none';
    inputEl.addEventListener('change', handleFileChange);
    inputDomRef.current = inputEl;
    return inputEl;
  }, [handleFileChange]);

  const handleClick = useCallback(() => {
    if (!inputBoxRef.current) {
      return;
    }

    const inputDom = createInput();
    inputBoxRef.current.appendChild(inputDom);
    inputDom.click();
  }, [createInput]);

  return {
    inputBoxRef,
    handleClick,
  };
}

export default useInput;
