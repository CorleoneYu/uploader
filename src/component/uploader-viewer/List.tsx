import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { ITaskUI } from './hooks/useUploader/reducer/reducer';
import { ListBox } from './style';
import { formatSize } from '../../utils';

interface HeaderProps {
  tasks: ITaskUI[];
}

function List(props: HeaderProps) {
  const { tasks } = props;

  return (
    <ListBox>
      {tasks.map((task) => (
        <div className="task-item" key={task.taskId}>
          <div className="task-info">
            <FileTextOutlined className="file-icon" />
            <div className="task-desc">
              <div className="task-name">{task.name}</div>
              <div className="task-size">{formatSize(task.size)}</div>
            </div>
          </div>
          <div className="task-progress">
              {Math.round((task.uploadedSize / task.size) * 10000) / 100}%
            </div>
        </div>
      ))}
    </ListBox>
  );
}

export default List;
