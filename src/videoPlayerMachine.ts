import { createMachine, assign } from 'xstate';

interface VideoPlayerContext {
  isPlaying: boolean;
  isMinimized: boolean;
}

type VideoPlayerEvent =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'MINIMIZE' }
  | { type: 'RESTORE' };

export const videoPlayerMachine = createMachine<VideoPlayerContext, VideoPlayerEvent>({
  id: 'videoPlayer',
  initial: 'idle',
  context: {
    isPlaying: false,
    isMinimized: false,
  },
  states: {
    idle: {
      on: {
        OPEN: {
          target: 'open',
          actions: assign({ isMinimized: false, isPlaying: false }),
        },
      },
    },
    open: {
      on: {
        CLOSE: {
          target: 'idle',
          actions: assign({ isPlaying: false }),
        },
        PLAY: {
          actions: assign({ isPlaying: true }),
        },
        PAUSE: {
          actions: assign({ isPlaying: false }),
        },
        MINIMIZE: {
          actions: assign({ isMinimized: true }),
          target: 'minimized',
        },
      },
    },
    minimized: {
      on: {
        RESTORE: {
          target: 'open',
          actions: assign({ isMinimized: false }),
        },
        CLOSE: {
          target: 'idle',
          actions: assign({ isPlaying: false }),
        },
        PLAY: {
          actions: assign({ isPlaying: true }),
        },
        PAUSE: {
          actions: assign({ isPlaying: false }),
        },
      },
    },
  },
});
