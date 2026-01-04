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
        "cases": "Cases",
        "guide.title": "Emergency First Aid",
        "guide.chestpain": "Chest Pain (Heart Attack?)",
        "guide.action.aspirin": "Chew 325mg Aspirin immediately.",
        "guide.action.ambulance": "Call Ambulance (108/911).",
        "guide.action.calm": "Stay calm, sit down, do not walk.",
        "guide.cpr": "Cardiac Arrest (No Pulse)",
        "guide.action.cpr": "Start CPR: Push hard & fast in center of chest.",
        "guide.action.aed": "Send someone to find an AED."
    },
    kn: {
        "app.title": "ಕಾರ್ಡಿಯೋ ಟ್ರೈಯೇಜ್ ಎಐ",
        "live.feed": "ನೇರ ಪ್ರಸಾರ",
        "intake.form": "ದವಾಖಾನೆ ನೋಂದಣಿ ನಮೂನೆ",
        "chief.complaint": "ಮುಖ್ಯ ದೂರು",
        "run.analysis": "ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ",
        "status.online": "ಆನ್‌ಲೈನ್",
        "status.offline": "ಆಫ್‌ಲೈನ್",
        "cases": "ಪ್ರಕರಣಗಳು",
        "guide.title": "ತುರ್ತು ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ",
        "guide.chestpain": "ಎದೆ ನೋವು (ಹೃದಯಾಘಾತ?)",
        "guide.action.aspirin": "ತಕ್ಷಣ 325mg ಆಸ್ಪಿರಿನ್ ಮಾತ್ರೆ ಅಗಿಯಿರಿ.",
        "guide.action.ambulance": "ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ (108/911).",
        "guide.action.calm": "ಶಾಂತವಾಗಿರಿ, ಕುಳಿತುಕೊಳ್ಳಿ, ನಡೆಯಬೇಡಿ.",
        "guide.cpr": "ಹೃದಯ ಸ್ತಂಭನ (ನಾಡಿ ಇಲ್ಲ)",
        "guide.action.cpr": "ಸಿಪಿಆರ್ ಪ್ರಾರಂಭಿಸಿ: ಎದೆಯ ಮಧ್ಯಭಾಗದಲ್ಲಿ ವೇಗವಾಗಿ ಒತ್ತಿರಿ.",
        "guide.action.aed": "ಯಾರನ್ನಾದರೂ AED ತರಲು ಕಳುಹಿಸಿ."
    },
    hi: {
        "app.title": "कार्डियो ट्राइएज एआई",
        "live.feed": "सीधा प्रसारण",
        "intake.form": "नैदानिक सेवन प्रपत्र",
        "chief.complaint": "मुख्य शिकायत",
        "run.analysis": "विश्लेषण चलाएं",
        "status.online": "ऑनलाइन",
        "status.offline": "ऑफ़लाइन",
        "cases": "मामले",
        "guide.title": "आपातकालीन प्राथमिक चिकित्सा",
        "guide.chestpain": "छाती में दर्द (दिल का दौरा?)",
        "guide.action.aspirin": "तुरंत 325mg एस्पिरिन चबाएं।",
        "guide.action.ambulance": "एम्बुलेंस को कॉल करें (108/911)।",
        "guide.action.calm": "शांत रहें, बैठ जाएं, चलें नहीं।",
        "guide.cpr": "कार्डियक अरेस्ट (नाड़ी नहीं)",
        "guide.action.cpr": "सीपीआर शुरू करें: छाती के बीच में जोर से और तेजी से दबाएं।",
        "guide.action.aed": "किसी को एईडी खोजने भेजें।"
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
