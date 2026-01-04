"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle, Siren, FileText, Share2, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ECGChart } from "@/components/dashboard/ecg-chart"

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
                <Alert variant="destructive" className="border-2 border-red-500 bg-red-500/10 animate-pulse">
                    <Siren className="h-6 w-6" />
                    <AlertTitle className="text-lg font-bold uppercase tracking-widest ml-2">{t('dash.stemi.title')}</AlertTitle>
                    <AlertDescription className="ml-2">
                        {t('dash.stemi.desc')}
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Risk Score & Actions */}
                <div className="space-y-6">
                    <Card className={`border-2 ${getRiskColor(riskLevel).split(' ')[2]}`}>
                        <CardHeader>
                            <CardTitle className=" text-muted-foreground uppercase text-sm">{t('dash.ai.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
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
