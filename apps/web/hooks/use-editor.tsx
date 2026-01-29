'use client';

import type {
  AnalysisResult,
  EditorMode,
  RenderResult,
  RendererStatus,
} from '@email-renderer/types';
import { ALL_CLIENTS, DEFAULT_EMAIL, DEFAULT_REACT_EMAIL } from '@/lib/constants';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { renderReactEmail } from '@/app/actions/react-email';
import { analyseEmailAction } from '@/app/actions/analyse';
import { useCheckRenderer } from './use-check-renderer';
import { renderHtml } from '@/app/actions/render';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

type EditorContextValue = {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
  html: string;
  setHtml: (html: string) => void;
  reactEmailCode: string;
  setReactEmailCode: (code: string) => void;
  results: RenderResult[];
  analyses: AnalysisResult[];
  isLoading: boolean;
  showAnalysis: boolean;
  setShowAnalysis: (show: boolean) => void;
  rendererStatus: RendererStatus;
  totalWarnings: number;
  totalErrors: number;
  handleRender: () => void;
  retryConnection: () => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [editorMode, setEditorMode] = useState<EditorMode>('html');
  const [html, setHtml] = useState(DEFAULT_EMAIL);
  const [reactEmailCode, setReactEmailCode] = useState(DEFAULT_REACT_EMAIL);
  const [results, setResults] = useState<RenderResult[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { status: rendererStatus, retry: retryConnection } = useCheckRenderer();

  const totalWarnings = analyses.reduce(
    (sum, a) => sum + a.warnings.filter((w) => w.severity === 'warning').length,
    0,
  );
  const totalErrors = analyses.reduce(
    (sum, a) => sum + a.warnings.filter((w) => w.severity === 'error').length,
    0,
  );

  const handleRender = async () => {
    setIsLoading(true);

    try {
      let renderData;

      if (editorMode === 'react-email') {
        renderData = await renderReactEmail(reactEmailCode, [...ALL_CLIENTS]);
      } else {
        renderData = await renderHtml(html, [...ALL_CLIENTS]);
      }

      setResults(renderData.results);

      const htmlToAnalyse = editorMode === 'react-email' ? renderData.convertedHtml || html : html;

      try {
        const analyseData = await analyseEmailAction(htmlToAnalyse, renderData.results);
        setAnalyses(analyseData.analyses);
      } catch (analyseErr) {
        console.error('Analysis error:', analyseErr);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
      console.error('Render error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        editorMode,
        setEditorMode,
        html,
        setHtml,
        reactEmailCode,
        setReactEmailCode,
        results,
        analyses,
        isLoading,
        showAnalysis,
        setShowAnalysis,
        rendererStatus,
        totalWarnings,
        totalErrors,
        handleRender,
        retryConnection,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
