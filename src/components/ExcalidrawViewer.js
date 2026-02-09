import React, { useState, Suspense } from 'react';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Excalidraw = React.lazy(() =>
  import('@excalidraw/excalidraw').then(mod => ({ default: mod.Excalidraw }))
);

function ExcalidrawViewer({ sceneData, height = 500 }) {
  const { theme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const excalidrawProps = {
    initialData: sceneData,
    viewModeEnabled: true,
    zenModeEnabled: true,
    gridModeEnabled: false,
    theme: theme,
    UIOptions: {
      canvasActions: {
        changeViewBackgroundColor: false,
        clearCanvas: false,
        export: false,
        loadScene: false,
        saveToActiveFile: false,
        toggleTheme: false,
      },
    },
  };

  const loadingFallback = (
    <div className="excalidraw-loading">
      <div className="spinner-border spinner-border-sm me-2" role="status" />
      Loading diagram...
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="excalidraw-fullscreen-overlay">
        <button
          className="excalidraw-close-btn"
          onClick={() => setIsFullscreen(false)}
        >
          <FaTimes size={12} /> Close
        </button>
        <Suspense fallback={loadingFallback}>
          <Excalidraw {...excalidrawProps} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="excalidraw-wrapper" style={{ height }}>
      <button
        className="excalidraw-fullscreen-btn"
        onClick={() => setIsFullscreen(true)}
        title="Fullscreen"
      >
        <FaExpand size={14} />
      </button>
      <Suspense fallback={loadingFallback}>
        <Excalidraw {...excalidrawProps} />
      </Suspense>
    </div>
  );
}

export default ExcalidrawViewer;
