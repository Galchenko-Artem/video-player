import React from 'react';
import { useMachine } from '@xstate/react';
import { Button } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ReactPlayer from 'react-player';
import { videoPlayerMachine } from './videoPlayerMachine';
import './App.css';

const App: React.FC = () => {
  const [state, send] = useMachine(videoPlayerMachine);
  const { isPlaying, isMinimized } = state.context;

  return (
    <div className="app-container">
      {state.matches('idle') && (
        <div className="play-container" onClick={() => send('OPEN')}>
          <div className="play-icon">
            <PlayCircleOutlined style={{ fontSize: '32px', color: '#8b58ff' }} />
          </div>
        </div>
      )}

      {(state.matches('open') || state.matches('minimized')) && (
        <div
          className={`player-wrapper ${
            isMinimized ? 'minimized-player-wrapper' : ''
          }`}
        >
          <div className="player-header">
            <span className="player-title">PLAYER</span>
            <CloseOutlined
              className="close-button"
              onClick={() => send('CLOSE')}
            />
          </div>
          <ReactPlayer
            url="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
            playing={isPlaying}
            controls={false}
            width="100%"
            height={isMinimized ? '200px' : '400px'}
          />
          <div className="controls">
            {isPlaying ? (
              <Button
                shape="circle"
                icon={<PauseCircleOutlined />}
                onClick={() => send('PAUSE')}
              />
            ) : (
              <Button
                shape="circle"
                icon={<PlayCircleOutlined />}
                onClick={() => send('PLAY')}
              />
            )}
            {isMinimized ? (
              <Button
                shape="circle"
                icon={<ArrowsAltOutlined />}
                onClick={() => send('RESTORE')}
              />
            ) : (
              <Button
                shape="circle"
                icon={<ShrinkOutlined />}
                onClick={() => send('MINIMIZE')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
