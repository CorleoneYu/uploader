import styled from 'styled-components';

interface IBoxStyle {
  visible: boolean;
}

export const UploaderViewerBox = styled.div`
  display: ${(props: IBoxStyle) => (props.visible ? 'block' : 'none')};
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 420px;
  box-shadow: 0 6px 24px 0 rgba(31, 35, 41, 0.1);
  border: 1px solid #dee0e3;
  background: white;
`;

export const HeaderBox = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  font-size: 18px;

  .status {
    flex: 1;
  }

  .close-btn {
    cursor: pointer;
  }
`;

export const ListBox = styled.div`
  .task-item {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;

    .task-info {
      display: flex;
      align-items: center;
      flex: 1;

      .file-icon {
        font-size: 22px;
      }

      .task-desc {
        margin-left: 10px;

        .task-name {
          font-size: 14px;
        }

        .task-size {
          font-size: 10px;
        }
      }
    }

    .task-progress {
      font-size: 12px;
      color: #8f959e;
    }
  }
`;

export const BarBox = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #f5f6f7;
  font-size: 14px;
`;
