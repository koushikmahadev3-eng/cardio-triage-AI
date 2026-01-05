"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle, Siren, FileText, Share2, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ECGChart } from "@/components/dashboard/ecg-chart"
import { ReferralModal } from "@/components/dashboard/referral-modal"

import { useLanguage } from "@/components/language-provider"

export function TriageDashboard() {
    const { t } = useLanguage()
    // Mock Logic for Demo - defaulting to CRITICAL
    const riskScore = 9
    const riskLevel = "CRITICAL" // CRITICAL, ELEVATED, STABLE

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'CRITICAL': return 'bg-red-500 text-red-500 border-red-500';
            case 'ELEVATED': return 'bg-yellow-500 text-yellow-500 border-yellow-500';
            default: return 'bg-green-500 text-green-500 border-green-500';
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Top Alert Banner */}
            {riskLevel === 'CRITICAL' && (
                <div className="grid gap-4 md:grid-cols-4">
                    <Alert variant="destructive" className="md:col-span-3 border-2 border-red-500 bg-red-500/10 animate-pulse">
                        <Siren className="h-6 w-6" />
                        <AlertTitle className="text-lg font-bold uppercase tracking-widest ml-2">{t('dash.stemi.title')}</AlertTitle>
                        <AlertDescription className="ml-2">
                            {t('dash.stemi.desc')}
                        </AlertDescription>
                    </Alert>

                    {/* Golden Hour Timer */}
                    <GoldenHourTimer />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Risk Score & Actions */}
                <div className="space-y-6">
                    <Card className={`border-2 ${getRiskColor(riskLevel).split(' ')[2]}`}>
                        <CardHeader>
                            <CardTitle className=" text-muted-foreground uppercase text-sm">{t('dash.ai.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center relative group cursor-help">
                            {/* Reasoning Tooltip */}
                            <div className="absolute top-0 right-0 bg-black/90 text-white text-xs p-3 rounded opacity-0 group-hover:opacity-100 transition-opacity w-48 pointer-events-none z-10 border border-white/10 shadow-xl backdrop-blur-md">
                                <p className="font-bold mb-1 border-b pb-1 border-white/20">AI Reasoning</p>
                                <ul className="space-y-1">
                                    <li className="flex justify-between"><span>ST Elevation</span> <span className="text-red-400 font-mono">+4</span></li>
                                    <li className="flex justify-between"><span>Age &gt; 55</span> <span className="text-red-400 font-mono">+3</span></li>
                                    <li className="flex justify-between"><span>Troponin</span> <span className="text-red-400 font-mono">+2</span></li>
                                </ul>
                            </div>

                            <div className={`text-6xl font-black mb-2 ${getRiskColor(riskLevel).split(' ')[1]}`}>
                                {riskScore}/10
                            </div>
                            <div className={`px-4 py-1 rounded-full font-bold text-sm text-white ${getRiskColor(riskLevel).split(' ')[0]}`}>
                                {riskLevel} {t('dash.priority')}
                            </div>
                            <Progress value={90} className="mt-6 h-2" color="red" />
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                                {t('dash.confidence')}: 98.4%
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground uppercase">{t('dash.clinical.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button className="w-full bg-red-600 hover:bg-red-700 font-bold" suppressHydrationWarning>
                                <Phone className="mr-2 h-4 w-4" />
                                {t('dash.action.page')}
                            </Button>
                            <Button variant="outline" className="w-full" suppressHydrationWarning>
                                <Share2 className="mr-2 h-4 w-4" />
                                {t('dash.action.cath')}
                            </Button>

                            {/* Jayadeva Referral Integration */}
                            <ReferralModal />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Visualization & Details */}
                <div className="lg:col-span-2 space-y-6">
                    <ECGChart />

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                {t('dash.handover.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted p-4 rounded-md font-mono text-sm leading-relaxed">
                                <span className="font-bold text-primary">{t('dash.summary')}:</span> 58yo Male presenting with acute retrosternal chest pain (8/10).<br />
                                <span className="font-bold text-primary">{t('dash.ecg')}:</span> Significant ST elevation &gt; 2mm in leads V2-V4 indicating Anterior STEMI.<br />
                                <span className="font-bold text-primary">{t('dash.vitals')}:</span> HR 88 regular, BP 145/90, SpO2 96% RA.<br />
                                <br />
                                <span className="bg-yellow-500/20 text-yellow-500 px-1 rounded">{t('dash.rec')}:</span> ASA 300mg, load Brilinta, immediate transfer for PCI.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function GoldenHourTimer() {
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        // Mock start time: 35 minutes ago
        const startTime = Date.now() - (35 * 60 * 1000)

        const interval = setInterval(() => {
            const now = Date.now()
            setTime(Math.floor((now - startTime) / 1000))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return (
        <Card className="bg-black border-red-500/50 flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10 animate-pulse" />
            <span className="text-[10px] text-red-500 uppercase font-bold tracking-widest z-10">Door-to-Balloon</span>
            <div className="text-3xl font-mono font-black text-white z-10 tabular-nums">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] text-muted-foreground z-10">Target: &lt; 90m</span>
        </Card>
    )
}
