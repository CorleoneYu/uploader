import React, { useCallback, } from 'react';
import { FileTextOutlined, SearchOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { ITaskUI } from './hooks/useUploader/reducer/reducer';
import { ListBox } from './style';
import { formatSize } from '../../utils';
import { EVENTS, eventEmitter } from '../../event';

interface HeaderProps {
  tasks: ITaskUI[];
}

function List(props: HeaderProps) {
  const { tasks } = props;

  // TODO 策略模式改造
  const handleClick = useCallback((task: ITaskUI) => {
    switch(task.status) {
      case 'uploading':
        return () => eventEmitter.emit(EVENTS.UI_PAUSE_TASK, task.taskId);
      case 'paused':
        return () => eventEmitter.emit(EVENTS.UI_START_TASK, task.taskId);
      case 'success':
        return () => {};
    }
  }, []);

  // TODO 策略模式改造
  const renderOperateBtn = useCallback((task: ITaskUI) => {
    let btn: JSX.Element | string;
    switch(task.status) {
      case 'uploading':
        btn = <PauseOutlined />;
        break;
      case 'paused':
        btn = <CaretRightOutlined />;
        break;
      case 'success':
        btn = <SearchOutlined />;
        break;
      default:
        btn = 'error';
    }

    return <div className="operate-btn" onClick={handleClick(task)}>
      {btn}
    </div>
  }, [handleClick]);

  const renderTask = useCallback((task: ITaskUI) => {
    return (
      <div className="task-item" key={task.taskId}>
        <div className="task-info">
          <FileTextOutlined className="file-icon" />
          <div className="task-desc">
            <div className="task-name">{task.name}</div>
            <div className="task-size">{formatSize(task.size)}</div>
          </div>
        </div>
        <div className="task-detail">
          <div className="task-progress">
            {Math.round((task.uploadedSize / task.size) * 10000) / 100}%
          </div>
          {renderOperateBtn(task)}
        </div>
        
      </div>
    );
  }, [renderOperateBtn]);

  return <ListBox>{tasks.map((task) => renderTask(task))}</ListBox>;
}

export default List;
