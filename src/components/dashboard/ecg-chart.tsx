"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ECGChart() {
    const [data, setData] = React.useState<any[]>([])

    React.useEffect(() => {
        // Generate mock ECG-like waveform
        const generateData = () => {
            const points = []
            for (let i = 0; i < 100; i++) {
                // Simple mock of P-QRS-T complex
                const t = i % 20
                let val = Math.sin(i / 5) * 0.2

                if (t === 10) val = 1.5 // R wave
                if (t === 9) val = -0.3 // Q wave
                if (t === 11) val = -0.5 // S wave

                // Add random noise
                val += (Math.random() - 0.5) * 0.1

                points.push({ time: i, value: val })
            }
            return points
        }
        setData(generateData())
    }, [])

    return (
        <Card className="col-span-2 bg-background/50 backdrop-blur border-primary/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                    <span>Lead II Rhythm Strip</span>
                    <span className="text-xs font-mono text-green-500 animate-pulse">LIVE CAPTURE</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <YAxis domain={['-1', '2']} hide />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={true}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4 text-center text-xs font-mono text-muted-foreground">
                    <div>
                        <span className="block text-lg font-bold text-foreground">88</span>
                        BPM
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-foreground">0.08</span>
                        PR INT
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-foreground">0.09</span>
                        QRS DUR
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-foreground">0.42</span>
                        QTc
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
