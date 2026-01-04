"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, CheckCircle2, Siren, User } from "lucide-react"
import { MOCK_PATIENTS, Patient } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function Sidebar() {
    return (
        <div className="w-80 h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed left-0 top-0 flex flex-col">
            <div className="p-4 border-b flex items-center gap-2">
                <Activity className="h-6 w-6 text-red-500 animate-pulse" />
                <h2 className="font-bold text-lg tracking-tight">CardioTriage AI</h2>
            </div>

            <div className="p-4 border-b bg-muted/20">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Live Emergency Feed
                </h3>
                <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    System Online & Listening
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {MOCK_PATIENTS.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t text-xs text-muted-foreground text-center">
                Use FAST protocol for all inputs.
            </div>
        </div>
    )
}

function PatientCard({ patient }: { patient: Patient }) {
    const getStatusColor = (status: Patient['status']) => {
        switch (status) {
            case 'critical': return 'border-red-500 bg-red-500/10 text-red-500';
            case 'elevated': return 'border-yellow-500 bg-yellow-500/10 text-yellow-500';
            case 'stable': return 'border-green-500 bg-green-500/10 text-green-500';
            case 'processing': return 'border-blue-500 bg-blue-500/10 text-blue-500';
            default: return 'border-gray-500 bg-gray-500/10 text-gray-500';
        }
    }

    const getIcon = (status: Patient['status']) => {
        switch (status) {
            case 'critical': return <Siren className="h-4 w-4" />;
            case 'elevated': return <AlertCircle className="h-4 w-4" />;
            case 'stable': return <CheckCircle2 className="h-4 w-4" />;
            default: return <User className="h-4 w-4" />;
        }
    }

    return (
        <div className={cn(
            "relative flex flex-col gap-2 rounded-lg border p-3 text-sm transition-all hover:bg-accent",
            getStatusColor(patient.status).split(' ')[0] // use border color
        )}>
            <div className="flex items-center justify-between">
                <span className="font-semibold">{patient.name}</span>
                <span className="text-xs text-muted-foreground">{patient.arrivalTime}</span>
            </div>
            <div className="flex flex-wrap gap-1">
                {patient.symptoms.map(s => (
                    <Badge key={s} variant="secondary" className="text-[10px] px-1 py-0 h-5">
                        {s}
                    </Badge>
                ))}
            </div>
            <div className={cn("flex items-center gap-2 text-xs font-medium uppercase mt-1", getStatusColor(patient.status).split(' ').pop())}>
                {getIcon(patient.status)}
                {patient.status}
            </div>
        </div>
    )
}
