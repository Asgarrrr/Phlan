import React from "react"
import { cn } from "@/lib/utils"

interface IconProps {
    width?: number
    height?: number
    className?: string
    primaryClass?: string
    secondaryClass?: string
}

export default function SVGIcon({
    width = 24,
    height = 24,
    className = "",
    primaryClass = "text-neutral-900 dark:text-neutral-100",
    secondaryClass = "text-neutral-900 dark:text-neutral-100"
}: IconProps) {
  
    return (
        <svg
            width={ width }
            height={ height }
            viewBox="0 0 422 581"
            xmlns="http://www.w3.org/2000/svg"
            className={ cn( "fill-current", className ) }
        >
            <path
                d="M173 10.0149V180.454C173 184.008 174.886 187.295 177.955 189.088L251.045 231.797C254.114 233.59 256 236.877 256 240.431V408.922C256 416.609 264.312 421.422 270.978 417.595L416.478 334.075C419.585 332.292 421.5 328.984 421.5 325.402V141.966C421.5 138.393 419.594 135.092 416.501 133.306L188.001 1.3551C181.334 -2.49467 173 2.31653 173 10.0149Z"
                className={ cn( "fill-current", primaryClass ) }
            />
            <path
                d="M0 116.982V484.971C0 488.516 1.87641 491.796 4.93209 493.592L149.932 578.835C156.598 582.754 165.001 577.98 165.004 570.247C165.067 431.999 165.832 236.804 165.976 200.962C165.991 197.369 164.077 194.086 160.963 192.295L14.9867 108.315C8.32002 104.479 0 109.291 0 116.982Z"
                className={ cn( "fill-current", secondaryClass ) }
            />
        </svg>
    )
}