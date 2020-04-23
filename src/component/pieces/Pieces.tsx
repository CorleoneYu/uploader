import React, { useMemo, useCallback } from 'react';
import { Button } from 'antd';
import config from './config';
import useCurrent from './useCurrent';
import { PiecesBox, Piece } from './style';

export default function Pieces() {
  const { current, setCurrent } = useCurrent();
  const currentConfig = useMemo(() => {
    return config[current];
  }, [current]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.target;
      // @ts-ignore
      const index = target.getAttribute('data-index');
      console.log('index: ', index);
      if (index || index === 0) {
        setCurrent(index);
      }
    },
    [setCurrent]
  );

  return (
    <PiecesBox>
      <div className="container">
        {currentConfig.pieces.map((piece, index) => {
          return <Piece key={index} polygon={piece.polygon} fill={piece.fill} />;
        })}
        <div className="shadow" />
      </div>
      <div className="btn-group" onClick={handleClick}>
        {config.map((item, index) => {
          return (
            <Button key={item.name} data-index={index}>
              {item.name}
            </Button>
          );
        })}
      </div>
    </PiecesBox>
  );
}
