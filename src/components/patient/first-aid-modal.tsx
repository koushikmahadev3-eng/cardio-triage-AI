"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HeartPulse, Phone, AlertTriangle, Pill } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function FirstAidModal() {
    const { t } = useLanguage()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="gap-2 animate-pulse font-bold shadow-lg shadow-red-500/20">
                    <HeartPulse className="h-4 w-4" />
                    {t('guide.title')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-l-4 border-l-red-500 bg-background/95 backdrop-blur">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                        {t('guide.title')}
                    </DialogTitle>
                    <DialogDescription>
                        Immediate actions for suspected cardiac events.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Protocol 1: Chest Pain */}
                    <div className="space-y-3 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                        <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                            <HeartPulse className="h-4 w-4" />
                            {t('guide.chestpain')}
                        </h4>
                        <ul className="space-y-2 text-sm text-foreground/90">
                            <li className="flex items-start gap-2">
                                <Phone className="h-4 w-4 text-red-500 mt-0.5" />
                                <span className="font-semibold">{t('guide.action.ambulance')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Pill className="h-4 w-4 text-blue-500 mt-0.5" />
                                <span>{t('guide.action.aspirin')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-4 w-4 text-center font-bold text-green-500">✓</span>
                                <span>{t('guide.action.calm')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Protocol 2: CPR */}
                    <div className="space-y-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20">
                        <h4 className="font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                            <ActivityIcon />
                            {t('guide.cpr')}
                        </h4>
                        <ul className="space-y-2 text-sm text-foreground/90">
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-red-500">!</span>
                                <span className="font-semibold">{t('guide.action.cpr')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-500">⚡</span>
                                <span>{t('guide.action.aed')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function ActivityIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-activity"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
