"use client"

import { useMemo } from "react"
import { PreviewCard } from "./preview-card"
import type { RenderResult, ClientId } from "@email-renderer/types"
import { ALL_CLIENTS } from "../lib/constants"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface PreviewPanelProps {
  results: RenderResult[]
  isLoading: boolean
  totalWarnings: number
  totalErrors: number
  onToggleAnalysis: () => void
}

export function PreviewPanel({ results, isLoading, totalWarnings, totalErrors, onToggleAnalysis }: PreviewPanelProps) {
  const resultMap = useMemo(() => {
    const map = new Map<ClientId, RenderResult>()
    for (const result of results) {
      map.set(result.clientId, result)
    }
    return map
  }, [results])

  return (
    <div className="flex flex-col bg-zinc-900 overflow-hidden h-full">
      <div className="shrink-0 h-9 bg-zinc-800 border-b border-zinc-800 flex items-center justify-between pl-4 pr-1">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm text-zinc-300 font-medium">Preview</span>
        </div>
        <Button
          onClick={onToggleAnalysis}
          size="sm"
          className="hidden md:flex"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Analysis
          <div className="flex items-center gap-1 ml-1">
            {totalErrors > 0 && (
              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-0">
                {totalErrors}
              </Badge>
            )}
            {totalWarnings > 0 && (
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-0">
                {totalWarnings}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {(ALL_CLIENTS as readonly ClientId[]).map((clientId) => (
            <PreviewCard
              key={clientId}
              clientId={clientId}
              result={resultMap.get(clientId)}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
