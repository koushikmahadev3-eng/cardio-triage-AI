"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, FileHeart, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
    onFileSelect: (file: File) => void
}

import { useLanguage } from "@/components/language-provider"

export function FileUploader({ onFileSelect }: FileUploaderProps) {
    const { t } = useLanguage()
    const [dragActive, setDragActive] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const [isAnalyzing, setIsAnalyzing] = React.useState(false)
    const [ocrResult, setOcrResult] = React.useState<React.ReactNode | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        setSelectedFile(file)
        setIsAnalyzing(true)
        setOcrResult(null)

        // Simulate OCR Analysis Delay
        setTimeout(() => {
            const mockText = `Patient: John Doe, 58M
sample_date: 2025-01-04
Troponin I: 0.85 ng/mL (Ref: <0.04)
CK-MB: 12.4 ng/mL (Ref: <5.0)
Potassium: 4.1 mmol/L (Ref: 3.5-5.1)
ECG Interpretation: ST Elevation in V2-V4.
Summary: Acute Myocardial Infarction detected.`
            
            const highlighted = highlightClinicalMatches(mockText)
            setOcrResult(highlighted)
            setIsAnalyzing(false)
            onFileSelect(file)
        }, 1500)
    }

    const highlightClinicalMatches = (text: string) => {
        return text.split('\n').map((line, i) => {
            let content: React.ReactNode = line

            // Simple regex checks for demonstration
            if (line.includes('Troponin')) {
                const val = parseFloat(line.match(/[\d.]+/)?.[0] || '0')
                if (val > 0.04) {
                    content = (
                        <span className="bg-red-500/20 text-red-500 px-1 rounded font-bold border border-red-500/30">
                            {line}
                        </span>
                    )
                }
            } else if (line.includes('CK-MB')) {
                const val = parseFloat(line.match(/[\d.]+/)?.[0] || '0')
                if (val > 5.0) {
                     content = (
                        <span className="bg-red-500/20 text-red-500 px-1 rounded font-bold border border-red-500/30">
                            {line}
                        </span>
                    )
                }
            } else if (line.includes('Potassium')) {
                 content = (
                        <span className="bg-green-500/20 text-green-500 px-1 rounded font-bold border border-green-500/30">
                            {line}
                        </span>
                    )
            } else if (line.includes('ST Elevation')) {
                content = (
                        <span className="bg-red-500/20 text-red-500 px-1 rounded font-bold border border-red-500/30 animate-pulse">
                            {line}
                        </span>
                    )
            }

            return <div key={i} className="text-sm font-mono my-0.5">{content}</div>
        })
    }

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFile(null)
        setOcrResult(null)
        setIsAnalyzing(false)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <div className="w-full space-y-4">
            <div
                className={cn(
                    "relative h-64 w-full rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-6 text-center cursor-pointer overflow-hidden group",
                    dragActive
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/5",
                    selectedFile ? "border-green-500/50 bg-green-500/5" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleChange}
                />

                <AnimatePresence mode="wait">
                    {!selectedFile ? (
                        <motion.div
                            key="prompt"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-4 pointer-events-none"
                        >
                            <div className="p-4 rounded-full bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-medium text-foreground">
                                    {t('upload.drop')}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {t('upload.supports')}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative flex flex-col items-center gap-4 w-full max-w-xs"
                        >
                            <div className="absolute top-0 right-0 -mt-10 -mr-10">
                                <button onClick={removeFile} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="p-4 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                <FileHeart className="h-10 w-10" />
                            </div>
                            <div className="space-y-1 text-center w-full">
                                <p className="text-sm font-medium text-foreground truncate px-4">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-2">
                                <motion.div
                                    className="h-full bg-green-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8 }}
                                />
                            </div>
                            <div className="text-xs text-green-500 font-medium flex items-center gap-1">
                                {isAnalyzing ? (
                                    <span className="animate-pulse text-yellow-500">Scanning Document...</span>
                                ) : (
                                    t('upload.ready')
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {dragActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center font-bold text-xl text-primary border-4 border-primary rounded-xl"
                    >
                        {t('upload.dropzone')}
                    </motion.div>
                )}
            </div>
            
            {/* OCR Result Mock Display */}
            <AnimatePresence>
                {ocrResult && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border rounded-lg bg-card/50"
                    >
                        <div className="p-3 border-b text-xs font-bold uppercase text-muted-foreground bg-muted/30 flex items-center justify-between">
                            <span>Contextual AI Analysis</span>
                            <span className="text-red-500 animate-pulse">● Attention Needed</span>
                        </div>
                        <div className="p-4 bg-black/20">
                            {ocrResult}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
