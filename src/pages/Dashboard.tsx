import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HardDrive,
  Network,
  SlidersHorizontal,
  FlaskConical,
  ArrowRight,
  BookOpen,
  Play,
  Layers,
  Sparkles,
  ArrowDown,
  Server,
  Table,
  Monitor,
  CheckCircle2,
  Activity,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useSimulation } from '../context/useSimulation'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { history } = useSimulation()

  const totalRuns = history.length
  const maintained = history.filter((e) => e.result.independenceStatus === 'MAINTAINED').length
  const affected = history.filter((e) => e.result.independenceStatus === 'AFFECTED').length
  const experimentsRun = new Set(history.map((e) => e.experimentId).filter(Boolean)).size

  const featureCards = [
    {
      title: 'Physical Data Independence',
      badge: 'Physical Level',
      badgeVariant: 'info' as const,
      icon: HardDrive,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
      description:
        'Change physical storage structures without changing the logical schema.',
      linkText: 'Explore Storage Changes',
      target: '/simulator',
    },
    {
      title: 'Logical Data Independence',
      badge: 'Logical Level',
      badgeVariant: 'purple' as const,
      icon: Network,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20',
      description:
        'Change the logical schema while minimizing impact on external views and applications.',
      linkText: 'Explore Schema Changes',
      target: '/simulator',
    },
    {
      title: 'Interactive Simulation',
      badge: 'Execution Engine',
      badgeVariant: 'success' as const,
      icon: SlidersHorizontal,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
      description:
        'Experiment with schema and storage changes and observe their effects.',
      linkText: 'Launch Simulator',
      target: '/simulator',
    },
    {
      title: 'Experiment Mode',
      badge: 'Analysis Lab',
      badgeVariant: 'warning' as const,
      icon: FlaskConical,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-500/10 border-amber-500/20',
      description:
        'Create database scenarios and analyze whether data independence is preserved.',
      linkText: 'View Experiments',
      target: '/experiments',
    },
  ]

  const schemaLevels = [
    {
      level: 'EXTERNAL LEVEL',
      role: 'User Views & Interfaces',
      color: 'border-sky-300 dark:border-sky-500/40 bg-sky-50 dark:bg-sky-950/20',
      accent: 'text-sky-600 dark:text-sky-400',
      icon: Monitor,
      items: 'User views, query outputs, external application schemas, tailored perspectives',
      independenceType: 'Logical Data Independence separates External from Conceptual',
      independenceBadge: 'Logical Independence Mapping',
    },
    {
      level: 'CONCEPTUAL / LOGICAL LEVEL',
      role: 'Community Database View',
      color: 'border-indigo-300 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-950/20',
      accent: 'text-indigo-600 dark:text-indigo-400',
      icon: Table,
      items: 'Tables, relations, entities, attributes, primary/foreign keys, business constraints',
      independenceType: 'Physical Data Independence separates Conceptual from Internal',
      independenceBadge: 'Physical Independence Mapping',
    },
    {
      level: 'INTERNAL / PHYSICAL LEVEL',
      role: 'Storage Architecture',
      color: 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20',
      accent: 'text-emerald-600 dark:text-emerald-400',
      icon: Server,
      items: 'Files, data pages, B-tree indexes, record ordering, block allocations, hashing',
      independenceType: 'Hardware & OS filesystem abstraction layer',
      independenceBadge: 'Storage Engine Abstraction',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Live Session Stats Bar */}
      {totalRuns > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Simulation Runs', value: totalRuns, icon: Activity, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20' },
            { label: 'Independence Maintained', value: maintained, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
            { label: 'Independence Affected', value: affected, icon: SlidersHorizontal, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-500/10 border-amber-500/20' },
            { label: 'Experiments Run', value: experimentsRun, icon: FlaskConical, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-500/10 border-amber-500/20' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                glass
                hover
                className="px-5 py-4 flex items-center gap-3 cursor-pointer"
                onClick={() => navigate('/history')}
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{stat.label}</p>
                </div>
              </Card>
            )
          })}
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 p-8 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl">
        {/* Glow decoration */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-blue-200/40 dark:bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>ANSI / SPARC Three-Schema Framework</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight uppercase">
            Data Independence Simulator
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
            Understand how database schema changes can occur without unnecessarily
            affecting higher levels of the database architecture.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={<Play className="w-4 h-4 fill-white" />}
              onClick={() => navigate('/simulator')}
            >
              Start Simulation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
              onClick={() => navigate('/learn')}
            >
              Learn Concepts
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Simulator Capabilities
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Core concepts and experimental tools for testing schema autonomy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featureCards.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                hover
                glass
                className="cursor-pointer group flex flex-col justify-between"
                onClick={() => navigate(feature.target)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feature.iconBg} ${feature.iconColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={feature.badgeVariant} size="sm">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-base font-semibold group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:text-indigo-400 transition-colors">
                    <span>{feature.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Database Architecture Visual (Three-Schema Model) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Interactive Educational Diagram</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Three-Schema Architecture Model
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            The foundation of data independence: isolating external user views, conceptual logical tables, and internal storage structures.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-md relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            {schemaLevels.map((lvl, index) => {
              const Icon = lvl.icon
              return (
                <React.Fragment key={lvl.level}>
                  {/* Schema Level Card */}
                  <div
                    className={`rounded-2xl border ${lvl.color} p-5 transition-all duration-200 hover:scale-[1.01] shadow-lg`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 ${lvl.accent}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400 block">
                            Level {index + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            {lvl.level}
                          </h3>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm" className="self-start sm:self-auto">
                        {lvl.role}
                      </Badge>
                    </div>

                    <div className="pt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>{lvl.items}</span>
                    </div>
                  </div>

                  {/* Connecting Arrow & Independence Badge */}
                  {index < schemaLevels.length - 1 && (
                    <div className="flex items-center justify-center py-2 relative">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 shadow-sm">
                          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                          <span>{schemaLevels[index].independenceBadge}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {schemaLevels[index].independenceType}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
