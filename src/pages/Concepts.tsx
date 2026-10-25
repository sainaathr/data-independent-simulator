import React from 'react'
import {
  BookOpen,
  Layers,
  Network,
  HardDrive,
  CheckCircle2,
  GitBranch,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export const Concepts: React.FC = () => {
  const concepts = [
    {
      title: 'Logical Data Independence',
      level: 'External ↔ Conceptual',
      badge: 'High Level',
      badgeVariant: 'purple' as const,
      icon: Network,
      definition:
        'The capacity to change the conceptual schema without having to change the external schemas or application programs.',
      examples: [
        'Adding a new attribute to an existing relation (e.g., adding phone_number to Student)',
        'Adding a new entity/table without altering existing queries',
        'Splitting an existing relation (normalization) while providing an external view combining them',
        'Dropping unused attributes that are not referenced in external views',
      ],
      impact:
        'Harder to achieve than physical data independence because application programs depend heavily on logical structures.',
    },
    {
      title: 'Physical Data Independence',
      level: 'Conceptual ↔ Internal',
      badge: 'Low Level',
      badgeVariant: 'info' as const,
      icon: HardDrive,
      definition:
        'The capacity to change the internal/physical schema without having to change the conceptual schema.',
      examples: [
        'Creating or dropping secondary B-Tree or Hash indexes to accelerate queries',
        'Changing file organization (e.g., from Heap to Clustered / Ordered)',
        'Upgrading physical storage devices or migrating to SSD/NVMe partitioning',
        'Modifying block sizes, page allocation, or compression algorithms',
      ],
      impact:
        'Easier to achieve than logical independence because internal changes only affect access performance, not logical semantics.',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="purple" size="sm">
            Theoretical Foundations
          </Badge>
          <Badge variant="outline" size="sm">
            DBMS Curriculum
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>Learn Concepts</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Comprehensive review of the ANSI/SPARC Three-Level Database Architecture and data independence principles.
        </p>
      </div>

      {/* Main Concept Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {concepts.map((concept) => {
          const Icon = concept.icon
          return (
            <Card key={concept.title} glass className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={concept.badgeVariant} size="sm">
                    {concept.level}
                  </Badge>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{concept.badge}</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                </div>
                <CardDescription className="text-sm text-slate-700 dark:text-slate-300 mt-3 font-normal leading-relaxed">
                  {concept.definition}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Typical Scenarios:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    {concept.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Architectural Impact: </span>
                  {concept.impact}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mapping Mechanism Section */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Mapping Mechanism</span>
          </div>
          <CardTitle className="mt-1">Why Schema Mappings Matter</CardTitle>
          <CardDescription>
            Data independence is achieved through two translation layers (mappings) managed by the DBMS.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-0">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-sky-400 mb-1.5 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              External / Conceptual Mapping
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Maps individual external user records into conceptual entities. When the conceptual schema changes, modifying this mapping allows external queries to continue operating without rewriting application code.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Conceptual / Internal Mapping
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Relates conceptual records to stored blocks and access paths on physical storage. When file organizations or indexes change, updating this mapping preserves conceptual relational integrity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
