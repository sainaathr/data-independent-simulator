import { jsPDF } from 'jspdf'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
} from 'docx'
import type { HistoryEntry, SimulationResult, SimulationState } from '../types/simulation'
import { formatStorageMethod, formatIndexType } from './simulationEngine'

export interface ReportData {
  runIndex: number
  timestamp: number
  experimentTitle?: string
  changeType: 'physical' | 'logical'
  userInputs: {
    simulationType: string
    storageMethod?: string
    indexStructure?: string
    logicalOperation?: string
    targetColumn?: string
    newColumnName?: string
  }
  processingSteps: string[]
  intermediateResults: {
    step: string
    detail: string
  }[]
  finalResult: {
    title: string
    independenceType: string
    independenceStatus: string
    externalImpact: string
    logicalImpact: string
    physicalImpact: string
    explanation: string
    whyPoints: string[]
  }
  schemasBefore: {
    external: string[]
    logical: string[]
    physical: { storage: string; index: string; pages: number; records: number }
  }
  schemasAfter: {
    external: string[]
    logical: string[]
    physical: { storage: string; index: string; pages: number; records: number }
  }
}

/**
 * Extracts normalized ReportData from either a HistoryEntry or current SimulationState
 */
export function buildReportData(
  stateOrEntry: { simState: SimulationState; historyEntry?: HistoryEntry }
): ReportData | null {
  const { simState, historyEntry } = stateOrEntry
  const result: SimulationResult | null = historyEntry ? historyEntry.result : simState.simulationResult
  if (!result) return null

  const isHistory = !!historyEntry
  const change = isHistory ? historyEntry.change : simState.selectedChange

  const beforeExternal = isHistory
    ? historyEntry.snapshotBefore.externalSchema.fields
    : simState.previousSchemas?.externalSchema.fields ?? simState.externalSchema.fields
  const beforeLogical = isHistory
    ? historyEntry.snapshotBefore.logicalSchema.columns
    : simState.previousSchemas?.logicalSchema.columns ?? simState.logicalSchema.columns
  const beforePhysical = isHistory
    ? {
        storage: formatStorageMethod(historyEntry.snapshotBefore.physicalSchema.storageMethod),
        index: formatIndexType(historyEntry.snapshotBefore.physicalSchema.indexType),
        pages: historyEntry.snapshotBefore.physicalSchema.pages,
        records: historyEntry.snapshotBefore.physicalSchema.records,
      }
    : {
        storage: formatStorageMethod(simState.previousSchemas?.physicalSchema.storageMethod ?? simState.physicalSchema.storageMethod),
        index: formatIndexType(simState.previousSchemas?.physicalSchema.indexType ?? simState.physicalSchema.indexType),
        pages: simState.previousSchemas?.physicalSchema.pages ?? simState.physicalSchema.pages,
        records: simState.previousSchemas?.physicalSchema.records ?? simState.physicalSchema.records,
      }

  const afterExternal = isHistory
    ? historyEntry.snapshotAfter.externalSchema.fields
    : simState.externalSchema.fields
  const afterLogical = isHistory
    ? historyEntry.snapshotAfter.logicalSchema.columns
    : simState.logicalSchema.columns
  const afterPhysical = {
    storage: formatStorageMethod(isHistory ? historyEntry.snapshotAfter.physicalSchema.storageMethod : simState.physicalSchema.storageMethod),
    index: formatIndexType(isHistory ? historyEntry.snapshotAfter.physicalSchema.indexType : simState.physicalSchema.indexType),
    pages: isHistory ? historyEntry.snapshotAfter.physicalSchema.pages : simState.physicalSchema.pages,
    records: isHistory ? historyEntry.snapshotAfter.physicalSchema.records : simState.physicalSchema.records,
  }

  const isPhysical = result.independenceType === 'physical'

  const userInputs = isPhysical
    ? {
        simulationType: 'Physical Data Independence',
        storageMethod: formatStorageMethod(
          change?.type === 'physical' ? change.storageMethod : simState.storageMethod
        ),
        indexStructure: formatIndexType(
          change?.type === 'physical' ? change.indexType : simState.indexType
        ),
      }
    : {
        simulationType: 'Logical Data Independence',
        logicalOperation:
          change?.type === 'logical'
            ? change.operation.toUpperCase() + ' COLUMN'
            : 'LOGICAL ALTERATION',
        targetColumn: change?.type === 'logical' ? change.column : undefined,
        newColumnName: change?.type === 'logical' ? change.newColumnName : undefined,
      }

  const defaultProcessingSteps = isPhysical
    ? [
        `1. User selected Physical Data Independence simulation.`,
        `2. Target Storage Method set to "${userInputs.storageMethod}" with Index Structure "${userInputs.indexStructure}".`,
        `3. Physical Schema updated: internal block allocation recalculated (${afterPhysical.pages} pages for ${afterPhysical.records} records).`,
        `4. Conceptual / Logical Schema inspected: Table STUDENT columns (${afterLogical.join(', ')}) remained intact.`,
        `5. External Schema verified: Student View (${afterExternal.join(', ')}) required zero modifications.`,
        `6. DBMS Conceptual-to-Internal mapping adjusted transparently.`,
        `7. Impact Analysis: Physical Layer = CHANGED, Logical Layer = UNCHANGED, External Layer = UNCHANGED.`,
        `8. Final Result: Physical Data Independence MAINTAINED.`,
      ]
    : [
        `1. User selected Logical Data Independence simulation (${userInputs.logicalOperation}).`,
        `2. Catalog inspected for attribute "${userInputs.targetColumn || 'column'}".`,
        `3. Logical Schema updated: Table STUDENT columns updated to [${afterLogical.join(', ')}].`,
        `4. Physical Schema adapted: tuple width modified, page allocation updated to ${afterPhysical.pages} pages.`,
        `5. External Schema checked: Student View evaluated for attribute dependencies.`,
        `6. DBMS External-to-Conceptual mapping evaluated: ${result.independenceStatus === 'MAINTAINED' ? 'View insulated from schema changes' : 'Projected view broken by column drop'}.`,
        `7. Final Result: Logical Data Independence ${result.independenceStatus}.`,
      ]

  const processingSteps = result.processingSteps && result.processingSteps.length > 0
    ? result.processingSteps
    : defaultProcessingSteps

  const intermediateResults = result.intermediateState && result.intermediateState.length > 0
    ? result.intermediateState
    : [
        { step: 'Initial Configuration', detail: `Physical: ${beforePhysical.storage} (${beforePhysical.index}), Logical: ${beforeLogical.length} columns, External: ${beforeExternal.length} fields` },
        { step: 'Target Modification Applied', detail: result.changeSummary },
        { step: 'Storage & Schema Adaptation', detail: `Allocated ${afterPhysical.pages} pages across internal storage layout` },
        { step: 'Three-Schema Impact Evaluation', detail: `External: ${result.externalImpact}, Logical: ${result.logicalImpact}, Physical: ${result.physicalImpact}` },
      ]

  return {
    runIndex: isHistory ? historyEntry.runIndex : 1,
    timestamp: result.timestamp,
    experimentTitle: historyEntry?.experimentTitle,
    changeType: isPhysical ? 'physical' : 'logical',
    userInputs,
    processingSteps,
    intermediateResults,
    finalResult: {
      title: result.title,
      independenceType: result.independenceType.toUpperCase() + ' INDEPENDENCE',
      independenceStatus: result.independenceStatus,
      externalImpact: result.externalImpact,
      logicalImpact: result.logicalImpact,
      physicalImpact: result.physicalImpact,
      explanation: result.explanation,
      whyPoints: result.whyPoints,
    },
    schemasBefore: {
      external: beforeExternal,
      logical: beforeLogical,
      physical: beforePhysical,
    },
    schemasAfter: {
      external: afterExternal,
      logical: afterLogical,
      physical: afterPhysical,
    },
  }
}

// ─── 1. TXT REPORT GENERATOR ───────────────────────────────────────────────────

export function generateTxtReport(data: ReportData): string {
  const dateStr = new Date(data.timestamp).toLocaleString()
  const sep = '='.repeat(78)
  const thinSep = '-'.repeat(78)

  return `${sep}
DATA INDEPENDENCE SIMULATOR — EXECUTION REPORT
Course: Database Management Systems (DBMS)
ANSI/SPARC Three-Schema Architecture Evaluation
${sep}

PROJECT & ACADEMIC INFORMATION:
Project Title:  Data Independence Simulator (DA1 Final Upgrade)
Report Date:    ${dateStr}
Run Number:     #${data.runIndex} ${data.experimentTitle ? `(Experiment: ${data.experimentTitle})` : ''}

TEAM MEMBERS:
1. R. SAINAATH          (Reg. No: 25BCE1960)
2. NAVEENA PRIYAN S     (Reg. No: 25BCE1778)
3. NIVESH S             (Reg. No: 25BCE1583)

GUIDED BY:
Dr. Swaminathan A (Assistant Professor)

${thinSep}
1. USER INPUTS (SIMULATION PARAMETERS)
${thinSep}
Simulation Mode:     ${data.userInputs.simulationType}
${data.userInputs.storageMethod ? `Storage Method:      ${data.userInputs.storageMethod}` : ''}
${data.userInputs.indexStructure ? `Index Structure:     ${data.userInputs.indexStructure}` : ''}
${data.userInputs.logicalOperation ? `Logical Operation:   ${data.userInputs.logicalOperation}` : ''}
${data.userInputs.targetColumn ? `Target Column:       ${data.userInputs.targetColumn}` : ''}
${data.userInputs.newColumnName ? `New Column Name:     ${data.userInputs.newColumnName}` : ''}

${thinSep}
2. DYNAMIC PROCESSING STEPS (EXECUTION TRACE)
${thinSep}
${data.processingSteps.map((step) => `  ${step}`).join('\n')}

${thinSep}
3. INTERMEDIATE RESULTS & STATE TRANSITIONS
${thinSep}
${data.intermediateResults.map((r, i) => `  [Phase ${i + 1}] ${r.step}:\n           ${r.detail}`).join('\n\n')}

${thinSep}
4. THREE-SCHEMA ARCHITECTURE: BEFORE vs AFTER COMPARISON
${thinSep}

+-------------------------+-----------------------------------+-----------------------------------+
| Architecture Layer      | State BEFORE Simulation           | State AFTER Simulation            |
+-------------------------+-----------------------------------+-----------------------------------+
| Level 1: EXTERNAL VIEW  | Fields: ${data.schemasBefore.external.join(', ').padEnd(25)} | Fields: ${data.schemasAfter.external.join(', ').padEnd(25)} |
| Level 2: LOGICAL SCHEMA | Columns: ${data.schemasBefore.logical.join(', ').padEnd(24)} | Columns: ${data.schemasAfter.logical.join(', ').padEnd(24)} |
| Level 3: PHYSICAL LEVEL | Storage: ${data.schemasBefore.physical.storage.padEnd(24)} | Storage: ${data.schemasAfter.physical.storage.padEnd(24)} |
|                         | Index:   ${data.schemasBefore.physical.index.padEnd(24)} | Index:   ${data.schemasAfter.physical.index.padEnd(24)} |
|                         | Pages:   ${String(data.schemasBefore.physical.pages).padEnd(24)} | Pages:   ${String(data.schemasAfter.physical.pages).padEnd(24)} |
+-------------------------+-----------------------------------+-----------------------------------+

${thinSep}
5. FINAL SIMULATION OUTPUT & IMPACT EVALUATION
${thinSep}
Status:               ${data.finalResult.independenceStatus}
Classification:       ${data.finalResult.independenceType}
Title:                ${data.finalResult.title}

IMPACT BREAKDOWN:
  - External / View Level:       ${data.finalResult.externalImpact}
  - Logical / Conceptual Level:  ${data.finalResult.logicalImpact}
  - Physical / Internal Level:   ${data.finalResult.physicalImpact}

THEORETICAL EXPLANATION:
${data.finalResult.explanation}

ARCHITECTURAL TRACE POINTS:
${data.finalResult.whyPoints.map((pt) => `  * ${pt}`).join('\n')}

${thinSep}
6. CONCLUSION & PEDAGOGICAL TAKEAWAY
${thinSep}
${data.changeType === 'physical'
  ? 'Physical Data Independence successfully demonstrated that physical file storage and index access paths can be modified, optimized, or reorganized without forcing any modifications on the conceptual relational schema or higher-level external user queries.'
  : data.finalResult.independenceStatus === 'MAINTAINED'
  ? 'Logical Data Independence successfully demonstrated that the conceptual schema can be modified (e.g., adding an attribute) while insulating existing external views and queries through the DBMS external-to-conceptual mapping layer.'
  : 'The simulation demonstrated the fundamental boundary of Logical Data Independence: when a column directly projected by an external view is dropped from the conceptual table, the mapping is broken and external applications require updating.'}

${sep}
End of Execution Report — Data Independence Simulator
${sep}
`
}

export function downloadTxtReport(data: ReportData, filename?: string) {
  const content = generateTxtReport(data)
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || `Data_Independence_Report_Run_${data.runIndex}_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── 2. PDF REPORT GENERATOR ───────────────────────────────────────────────────

export function downloadPdfReport(data: ReportData, filename?: string) {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 16
  const maxLineWidth = pageWidth - margin * 2
  let y = 18

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 280) {
      doc.addPage()
      y = 18
    }
  }

  // Header banner
  doc.setFillColor(79, 70, 229) // Indigo 600
  doc.rect(margin, y, maxLineWidth, 14, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('DATA INDEPENDENCE SIMULATOR — EXECUTION REPORT', margin + 4, y + 9)
  y += 20

  // Subtitle & metadata
  doc.setTextColor(51, 65, 85)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const dateStr = new Date(data.timestamp).toLocaleString()
  doc.text(`Run #${data.runIndex} | Generated: ${dateStr} | ANSI/SPARC Three-Schema Framework`, margin, y)
  y += 6

  // Team & Guide info box
  doc.setDrawColor(203, 213, 225)
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin, y, maxLineWidth, 18, 2, 2, 'FD')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 41, 59)
  doc.text('Students: R. Sainaath (25BCE1960), Naveena Priyan S (25BCE1778), Nivesh S (25BCE1583)', margin + 3, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Guided By: Dr. Swaminathan A (Assistant Professor) | DBMS Academic Evaluation DA1', margin + 3, y + 12)
  y += 24

  // Section 1: User Inputs
  checkPageBreak(25)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(79, 70, 229)
  doc.text('1. SIMULATION INPUTS & CONFIGURATION', margin, y)
  y += 5

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(30, 41, 59)
  doc.text(`Simulation Type: ${data.userInputs.simulationType}`, margin + 3, y)
  y += 5
  if (data.userInputs.storageMethod) {
    doc.text(`Target Storage: ${data.userInputs.storageMethod} | Index Structure: ${data.userInputs.indexStructure}`, margin + 3, y)
    y += 5
  }
  if (data.userInputs.logicalOperation) {
    doc.text(`Operation: ${data.userInputs.logicalOperation} | Column: ${data.userInputs.targetColumn || 'N/A'}${data.userInputs.newColumnName ? ` -> ${data.userInputs.newColumnName}` : ''}`, margin + 3, y)
    y += 5
  }
  y += 3

  // Section 2: Processing Steps
  checkPageBreak(40)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(79, 70, 229)
  doc.text('2. DYNAMIC PROCESSING STEPS (EXECUTION TRACE)', margin, y)
  y += 5

  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(51, 65, 85)
  data.processingSteps.forEach((step) => {
    checkPageBreak(6)
    const lines = doc.splitTextToSize(step, maxLineWidth - 6)
    doc.text(lines, margin + 3, y)
    y += lines.length * 4.5
  })
  y += 4

  // Section 3: Before vs After Table
  checkPageBreak(45)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(79, 70, 229)
  doc.text('3. THREE-SCHEMA ARCHITECTURE COMPARISON', margin, y)
  y += 5

  // Table header
  doc.setFillColor(241, 245, 249)
  doc.rect(margin, y, maxLineWidth, 7, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 41, 59)
  doc.text('Architecture Level', margin + 2, y + 5)
  doc.text('State BEFORE Simulation', margin + 55, y + 5)
  doc.text('State AFTER Simulation', margin + 115, y + 5)
  y += 8

  const rows = [
    {
      level: 'External View',
      before: data.schemasBefore.external.join(', '),
      after: data.schemasAfter.external.join(', '),
    },
    {
      level: 'Logical Schema',
      before: data.schemasBefore.logical.join(', '),
      after: data.schemasAfter.logical.join(', '),
    },
    {
      level: 'Physical Level',
      before: `${data.schemasBefore.physical.storage} / ${data.schemasBefore.physical.index} (${data.schemasBefore.physical.pages} p)`,
      after: `${data.schemasAfter.physical.storage} / ${data.schemasAfter.physical.index} (${data.schemasAfter.physical.pages} p)`,
    },
  ]

  doc.setFont('helvetica', 'normal')
  rows.forEach((r) => {
    checkPageBreak(9)
    doc.text(r.level, margin + 2, y + 4)
    const beforeLines = doc.splitTextToSize(r.before, 55)
    const afterLines = doc.splitTextToSize(r.after, 55)
    doc.text(beforeLines, margin + 55, y + 4)
    doc.text(afterLines, margin + 115, y + 4)
    const rowHeight = Math.max(beforeLines.length, afterLines.length) * 4.5 + 2
    y += rowHeight
    doc.setDrawColor(226, 232, 240)
    doc.line(margin, y - 1, margin + maxLineWidth, y - 1)
  })
  y += 4

  // Section 4: Final Output & Impact
  checkPageBreak(40)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(79, 70, 229)
  doc.text('4. SIMULATION RESULT & IMPACT EVALUATION', margin, y)
  y += 5

  const isMaintained = data.finalResult.independenceStatus === 'MAINTAINED'
  doc.setFillColor(isMaintained ? 236 : 254, isMaintained ? 253 : 243, isMaintained ? 245 : 199)
  doc.roundedRect(margin, y, maxLineWidth, 12, 2, 2, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(isMaintained ? 22 : 180, isMaintained ? 101 : 83, isMaintained ? 52 : 9)
  doc.text(`Result: ${data.finalResult.title} (${data.finalResult.independenceStatus})`, margin + 3, y + 5)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`Impact: External = ${data.finalResult.externalImpact} | Logical = ${data.finalResult.logicalImpact} | Physical = ${data.finalResult.physicalImpact}`, margin + 3, y + 9.5)
  y += 16

  checkPageBreak(25)
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(51, 65, 85)
  const expLines = doc.splitTextToSize(data.finalResult.explanation, maxLineWidth - 6)
  doc.text(expLines, margin + 3, y)
  y += expLines.length * 4.5 + 4

  // Architectural trace points
  data.finalResult.whyPoints.forEach((pt) => {
    checkPageBreak(7)
    const ptLines = doc.splitTextToSize(`• ${pt}`, maxLineWidth - 8)
    doc.text(ptLines, margin + 4, y)
    y += ptLines.length * 4.2
  })
  y += 5

  // Section 5: Conclusion
  checkPageBreak(20)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(79, 70, 229)
  doc.text('5. CONCLUSION', margin, y)
  y += 4

  const conclusionText = data.changeType === 'physical'
    ? 'Physical Data Independence successfully demonstrated that physical file storage and index access paths can be modified, optimized, or reorganized without forcing any modifications on the conceptual relational schema or higher-level external user queries.'
    : data.finalResult.independenceStatus === 'MAINTAINED'
    ? 'Logical Data Independence successfully demonstrated that the conceptual schema can be modified (e.g., adding an attribute) while insulating existing external views and queries through the DBMS external-to-conceptual mapping layer.'
    : 'The simulation demonstrated the fundamental boundary of Logical Data Independence: when a column directly projected by an external view is dropped from the conceptual table, the mapping is broken and external applications require updating.'

  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(51, 65, 85)
  const concLines = doc.splitTextToSize(conclusionText, maxLineWidth - 6)
  doc.text(concLines, margin + 3, y)

  doc.save(filename || `Data_Independence_Report_Run_${data.runIndex}_${Date.now()}.pdf`)
}

// ─── 3. DOCX REPORT GENERATOR ──────────────────────────────────────────────────

export async function downloadDocxReport(data: ReportData, filename?: string) {
  const dateStr = new Date(data.timestamp).toLocaleString()

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'DATA INDEPENDENCE SIMULATOR — EXECUTION REPORT',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Run #${data.runIndex} | Generated: ${dateStr} | ANSI/SPARC Three-Schema Framework`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [
              new TextRun({ text: 'Project Information & Academic Details', bold: true }),
            ],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: 'Project: Data Independence Simulator (DBMS Educational Evaluation DA1)',
          }),
          new Paragraph({
            text: 'Team Members: R. Sainaath (25BCE1960), Naveena Priyan S (25BCE1778), Nivesh S (25BCE1583)',
          }),
          new Paragraph({
            text: 'Guided By: Dr. Swaminathan A (Assistant Professor)',
          }),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '1. User Inputs & Configuration', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Simulation Type: ${data.userInputs.simulationType}`,
          }),
          ...(data.userInputs.storageMethod
            ? [
                new Paragraph({
                  text: `Storage Method: ${data.userInputs.storageMethod}`,
                }),
                new Paragraph({
                  text: `Index Structure: ${data.userInputs.indexStructure}`,
                }),
              ]
            : []),
          ...(data.userInputs.logicalOperation
            ? [
                new Paragraph({
                  text: `Logical Operation: ${data.userInputs.logicalOperation}`,
                }),
                new Paragraph({
                  text: `Target Column: ${data.userInputs.targetColumn || 'N/A'}${data.userInputs.newColumnName ? ` -> ${data.userInputs.newColumnName}` : ''}`,
                }),
              ]
            : []),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '2. Dynamic Processing Steps (Execution Trace)', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          ...data.processingSteps.map((step) => new Paragraph({ text: `• ${step}` })),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '3. Intermediate Results & Transitions', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          ...data.intermediateResults.map(
            (r, i) => new Paragraph({ text: `Phase ${i + 1} (${r.step}): ${r.detail}` })
          ),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '4. Three-Schema Architecture: Before vs After Comparison', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Architecture Layer', bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'State BEFORE Simulation', bold: true })] })],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'State AFTER Simulation', bold: true })] })],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Level 1: External View' })] }),
                  new TableCell({ children: [new Paragraph({ text: data.schemasBefore.external.join(', ') })] }),
                  new TableCell({ children: [new Paragraph({ text: data.schemasAfter.external.join(', ') })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Level 2: Logical Schema' })] }),
                  new TableCell({ children: [new Paragraph({ text: data.schemasBefore.logical.join(', ') })] }),
                  new TableCell({ children: [new Paragraph({ text: data.schemasAfter.logical.join(', ') })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Level 3: Physical Level' })] }),
                  new TableCell({ children: [new Paragraph({ text: `${data.schemasBefore.physical.storage} / ${data.schemasBefore.physical.index} (${data.schemasBefore.physical.pages} pages)` })] }),
                  new TableCell({ children: [new Paragraph({ text: `${data.schemasAfter.physical.storage} / ${data.schemasAfter.physical.index} (${data.schemasAfter.physical.pages} pages)` })] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '5. Final Simulation Output & Impact Analysis', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Status: ', bold: true }),
              new TextRun({ text: `${data.finalResult.independenceStatus} (${data.finalResult.title})` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'External Impact: ', bold: true }),
              new TextRun({ text: data.finalResult.externalImpact }),
              new TextRun({ text: ' | Logical Impact: ', bold: true }),
              new TextRun({ text: data.finalResult.logicalImpact }),
              new TextRun({ text: ' | Physical Impact: ', bold: true }),
              new TextRun({ text: data.finalResult.physicalImpact }),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [new TextRun({ text: 'Explanation: ', bold: true }), new TextRun({ text: data.finalResult.explanation })],
          }),
          new Paragraph({ text: '' }),
          ...data.finalResult.whyPoints.map((pt) => new Paragraph({ text: `• ${pt}` })),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '6. Pedagogical Conclusion', bold: true })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text:
              data.changeType === 'physical'
                ? 'Physical Data Independence successfully demonstrated that physical file storage and index access paths can be modified, optimized, or reorganized without forcing any modifications on the conceptual relational schema or higher-level external user queries.'
                : data.finalResult.independenceStatus === 'MAINTAINED'
                ? 'Logical Data Independence successfully demonstrated that the conceptual schema can be modified (e.g., adding an attribute) while insulating existing external views and queries through the DBMS external-to-conceptual mapping layer.'
                : 'The simulation demonstrated the fundamental boundary of Logical Data Independence: when a column directly projected by an external view is dropped from the conceptual table, the mapping is broken and external applications require updating.',
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || `Data_Independence_Report_Run_${data.runIndex}_${Date.now()}.docx`
  a.click()
  URL.revokeObjectURL(url)
}
