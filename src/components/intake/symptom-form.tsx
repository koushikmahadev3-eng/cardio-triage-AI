"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface SymptomFormProps {
    onSubmit: (data: any) => void
    isProcessing: boolean
}

export function SymptomForm({ onSubmit, isProcessing }: SymptomFormProps) {
    const [symptoms, setSymptoms] = React.useState<string[]>([])

    const commonSymptoms = [
        "Chest Pain", "Shortness of Breath", "Palpitations",
        "Dizziness", "Nausea", "Diaphoresis (Sweating)",
        "Left Arm Pain", "Jaw Pain"
    ]

    const toggleSymptom = (symptom: string) => {
        setSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Gather form data - simplified for demo
        onSubmit({
            symptoms,
            timestamp: new Date().toISOString()
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Clinical Intake Form</CardTitle>
                <CardDescription>Enter patient reported symptoms and vital signs if available.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="complaint">Chief Complaint</Label>
                    <Input id="complaint" placeholder="e.g. Severe retrosternal chest pain..." />
                </div>

                <div className="space-y-3">
                    <Label>Associated Symptoms</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {commonSymptoms.map((s) => (
                            <div key={s} className="flex items-center space-x-2">
                                <Checkbox
                                    id={s}
                                    checked={symptoms.includes(s)}
                                    onCheckedChange={() => toggleSymptom(s)}
                                />
                                <Label htmlFor={s} className="font-normal text-sm cursor-pointer">{s}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="hr">Heart Rate</Label>
                        <div className="relative">
                            <Input id="hr" placeholder="--" className="pr-8" />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">bpm</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bp">BP</Label>
                        <div className="relative">
                            <Input id="bp" placeholder="--/--" className="pr-8" />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">mmHg</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="spo2">SpO2</Label>
                        <div className="relative">
                            <Input id="spo2" placeholder="--" className="pr-8" />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-0">
                <Button className="w-full" size="lg" onClick={handleSubmit} disabled={isProcessing}>
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing Vitals...
                        </>
                    ) : (
                        "Run Triage Analysis"
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
