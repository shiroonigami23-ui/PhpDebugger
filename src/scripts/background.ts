/**
 * Service Worker for PHP Debugger Forensics
 * Coordinates message passing between DevTools panel, popup, and content scripts
 */

interface CaptureEvent {
  type: 'request' | 'response' | 'error'
  timestamp: number
  url: string
  method: string
  status?: number
  headers?: Record<string, string>
  correlationId?: string
}

// Simple in-memory store for current session
let captureSession: CaptureEvent[] = []
let isCapturing = false

// Listen for messages from popup and devtools
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, data } = message

  switch (action) {
    case 'startCapture':
      isCapturing = true
      captureSession = []
      console.log('[PhpDebugger] Capture started')
      sendResponse({ success: true })
      break

    case 'stopCapture':
      isCapturing = false
      console.log(`[PhpDebugger] Capture stopped. Recorded ${captureSession.length} events.`)
      sendResponse({ success: true, events: captureSession })
      break

    case 'getCapture':
      sendResponse({ events: captureSession, isCapturing })
      break

    case 'exportBundle':
      const bundle = {
        version: '0.1.0',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        events: captureSession,
        correlationIds: extractCorrelationIds(captureSession)
      }
      sendResponse({ bundle })
      break

    default:
      sendResponse({ error: 'Unknown action' })
  }
})

// Monitor network activity (high-level; real implementation would use webRequest API)
function extractCorrelationIds(events: CaptureEvent[]): string[] {
  return events
    .map((e) => e.correlationId)
    .filter((id): id is string => !!id)
    .filter((id, idx, arr) => arr.indexOf(id) === idx)
}

console.log('[PhpDebugger] Service worker initialized')
