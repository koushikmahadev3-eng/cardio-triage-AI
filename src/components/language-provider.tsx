"use client"

import * as React from "react"

export type Language = 'en' | 'kn' | 'hi'

interface LanguageProviderProps {
    children: React.ReactNode
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        "app.title": "CardioTriage AI",
        "live.feed": "Live Feed",
        "intake.form": "Clinical Intake Form",
        "chief.complaint": "Chief Complaint",
        "run.analysis": "Run Triage Analysis",
        "status.online": "ONLINE",
        "status.offline": "OFFLINE",
        "cases": "Cases"
    },
    kn: {
        "app.title": "ಕಾರ್ಡಿಯೋ ಟ್ರೈಯೇಜ್ ಎಐ",
        "live.feed": "ನೇರ ಪ್ರಸಾರ",
        "intake.form": "ದವಾಖಾನೆ ನೋಂದಣಿ ನಮೂನೆ",
        "chief.complaint": "ಮುಖ್ಯ ದೂರು",
        "run.analysis": "ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ",
        "status.online": "ಆನ್‌ಲೈನ್",
        "status.offline": "ಆಫ್‌ಲೈನ್",
        "cases": "ಪ್ರಕರಣಗಳು"
    },
    hi: {
        "app.title": "कार्डियो ट्राइएज एआई",
        "live.feed": "सीधा प्रसारण",
        "intake.form": "नैदानिक सेवन प्रपत्र",
        "chief.complaint": "मुख्य शिकायत",
        "run.analysis": "विश्लेषण चलाएं",
        "status.online": "ऑनलाइन",
        "status.offline": "ऑफ़लाइन",
        "cases": "मामले"
    }
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = React.useState<Language>('en')

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = React.useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
