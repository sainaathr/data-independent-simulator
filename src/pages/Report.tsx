import React, { useState } from 'react'
import {
  FileText,
  Download,
  FileDown,
  CheckCircle2,
  History,
  Cpu,
} from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useSimulation } from '../context/useSimulation'
import {
  buildReportData,
  downloadPdfReport,
  downloadDocxReport,
  downloadTxtReport,
} from '../lib/reportGenerator'
import { useNavigate } from 'react-router-dom'

export const Report: React.FC = () => {
  const navigate = useNavigate()
  const { simState, history } = useSimulation()
  const [selectedRunId, setSelectedRunId] = useState<string>('current')

  // Pick history entry if selected, otherwise current simulation state
  const selectedHistoryEntry =
    selectedRunId !== 'current' ? history.find((h) => h.id === selectedRunId) : undefined

  const reportData = buildReportData({
    simState,
    historyEntry: selectedHistoryEntry,
  })

  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null)

  const handleDownload = async (format: 'pdf' | 'docx' | 'txt') => {
    if (!reportData) return
    setDownloadingFormat(format)
    try {
      if (format === 'pdf') {
        downloadPdfReport(reportData)
      } else if (format === 'docx') {
        await downloadDocxReport(reportData)
      } else {
        downloadTxtReport(reportData)
      }
    } catch (err) {
      console.error('Failed to generate report:', err)
      alert('Error generating report format. Please check console.')
    } finally {
      setDownloadingFormat(null)
    }
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">
            Lab Evaluation Audit
          </Badge>
          <Badge variant="info" size="sm">
            Multi-Format Export
          </Badge>
          <Badge variant="success" size="sm">
            Live Execution Data
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <FileDown className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Download Execution Report</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
              Generate and download formal academic execution reports based on your ACTUAL simulator runs in PDF, Microsoft Word (DOCX), and Plain Text (TXT) formats.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            icon={<Cpu className="w-4 h-4" />}
            onClick={() => navigate('/simulator')}
          >
            Open Simulator
          </Button>
        </div>
      </div>

      {!reportData ? (
        <Card glass className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Simulation Executed Yet
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Run at least one physical or logical schema change in the Simulator or Experiments section to generate a live execution audit report.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Cpu className="w-4 h-4 fill-white" />}
            onClick={() => navigate('/simulator')}
            className="mx-auto"
          >
            Launch Simulator Now
          </Button>
        </Card>
      ) : (
        <>
          {/* Controls Bar: Select Run & Download Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Run Selector */}
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="space-y-0.5">
                <label htmlFor="select-run" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Select Execution Run
                </label>
                <select
                  id="select-run"
                  value={selectedRunId}
                  onChange={(e) => setSelectedRunId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white outline-none cursor-pointer focus:border-indigo-500"
                >
                  <option value="current">Current Active Simulation Run</option>
                  {history.map((h) => (
                    <option key={h.id} value={h.id}>
                      Run #{h.runIndex} &bull; {h.result.title} (
                      {new Date(h.timestamp).toLocaleTimeString()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Download Buttons for PDF, DOCX, TXT */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="primary"
                size="md"
                disabled={downloadingFormat !== null}
                icon={<Download className="w-4 h-4" />}
                onClick={() => handleDownload('pdf')}
                className="bg-indigo-600 hover:bg-indigo-500"
              >
                {downloadingFormat === 'pdf' ? 'Generating PDF...' : 'Download PDF'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                disabled={downloadingFormat !== null}
                icon={<FileText className="w-4 h-4 text-blue-600" />}
                onClick={() => handleDownload('docx')}
              >
                {downloadingFormat === 'docx' ? 'Generating DOCX...' : 'Download DOCX (Word)'}
              </Button>

              <Button
                variant="outline"
                size="md"
                disabled={downloadingFormat !== null}
                icon={<FileText className="w-4 h-4 text-slate-500" />}
                onClick={() => handleDownload('txt')}
              >
                {downloadingFormat === 'txt' ? 'Generating TXT...' : 'Download TXT'}
              </Button>
            </div>
          </div>

          {/* Interactive Live Report Document Preview */}
          <Card glass className="border-indigo-200 dark:border-indigo-500/30 shadow-xl overflow-hidden">
            {/* Header Document Banner */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs opacity-90">
                <span className="font-mono">Course: DBMS Academic Assessment (DA1)</span>
                <span>Generated: {new Date(reportData.timestamp).toLocaleString()}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                DATA INDEPENDENCE SIMULATOR — EXECUTION REPORT
              </h2>
              <p className="text-xs text-indigo-100 max-w-2xl">
                Audited Three-Schema architectural transition trace verified according to ANSI/X3/SPARC specifications.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* Meta Info Bar: Student Team & Guide */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Student Developers:
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    1. R. SAINAATH (25BCE1960)<br />
                    2. NAVEENA PRIYAN S (25BCE1778)<br />
                    3. NIVESH S (25BCE1583)
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Faculty Guidance:
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Dr. Swaminathan A<br />
                    <span className="font-normal text-slate-600 dark:text-slate-400">Assistant Professor</span>
                  </p>
                </div>
              </div>

              {/* 1. User Inputs */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">1</span>
                  <span>User Inputs & Configuration</span>
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Simulation Mode:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.simulationType}</span>
                  </div>
                  {reportData.userInputs.storageMethod && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Storage Layout:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.storageMethod}</span>
                    </div>
                  )}
                  {reportData.userInputs.indexStructure && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Index Structure:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.indexStructure}</span>
                    </div>
                  )}
                  {reportData.userInputs.logicalOperation && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Operation:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.logicalOperation}</span>
                    </div>
                  )}
                  {reportData.userInputs.targetColumn && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Target Column:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.targetColumn}</span>
                    </div>
                  )}
                  {reportData.userInputs.newColumnName && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Renamed To:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{reportData.userInputs.newColumnName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Processing Steps */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">2</span>
                  <span>Dynamic Processing Steps (Execution Trace)</span>
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  {reportData.processingSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Intermediate Results */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">3</span>
                  <span>Intermediate State Transitions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {reportData.intermediateResults.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-indigo-700 dark:text-indigo-300 block text-[11px] uppercase">
                        Phase {idx + 1}: {item.step}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Three-Schema Comparison Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">4</span>
                  <span>Three-Schema Architecture: Before vs After Comparison</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Architecture Level</th>
                        <th className="p-3">State BEFORE Simulation</th>
                        <th className="p-3">State AFTER Simulation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Level 1: External View</td>
                        <td className="p-3">{reportData.schemasBefore.external.join(', ')}</td>
                        <td className="p-3 font-semibold text-sky-700 dark:text-sky-300">{reportData.schemasAfter.external.join(', ')}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Level 2: Logical Schema</td>
                        <td className="p-3">{reportData.schemasBefore.logical.join(', ')}</td>
                        <td className="p-3 font-semibold text-indigo-700 dark:text-indigo-300">{reportData.schemasAfter.logical.join(', ')}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Level 3: Physical Level</td>
                        <td className="p-3">
                          {reportData.schemasBefore.physical.storage} / {reportData.schemasBefore.physical.index} ({reportData.schemasBefore.physical.pages} pages)
                        </td>
                        <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">
                          {reportData.schemasAfter.physical.storage} / {reportData.schemasAfter.physical.index} ({reportData.schemasAfter.physical.pages} pages)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5. Final Output */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">5</span>
                  <span>Final Result & Impact Evaluation</span>
                </h3>
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    reportData.finalResult.independenceStatus === 'MAINTAINED'
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30'
                      : 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-500/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {reportData.finalResult.title}
                    </span>
                    <Badge
                      variant={reportData.finalResult.independenceStatus === 'MAINTAINED' ? 'success' : 'warning'}
                      size="sm"
                      dot
                    >
                      {reportData.finalResult.independenceStatus}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {reportData.finalResult.explanation}
                  </p>

                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {reportData.finalResult.whyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">&bull;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
export default Report
