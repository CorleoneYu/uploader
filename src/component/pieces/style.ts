import styled from 'styled-components';

export const PiecesBox = styled.div`
  padding: 20px;

  .container {
    position: relative;
    width: 960px;
    height: 730px;
    background: #a4c5ea;
  }

  .btn-group {
    margin-top: 10px;
    display: flex;

    > button {
      margin-right: 10px;
    }
  }
`;

interface IPieceStyle {
  polygon: string;
  fill: string;
  transition: string;
}
export const Piece = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: ${(props: IPieceStyle) => props.polygon};
  background: ${(props: IPieceStyle) => props.fill};
  transition: ${(props: IPieceStyle) => props.transition};
`;
