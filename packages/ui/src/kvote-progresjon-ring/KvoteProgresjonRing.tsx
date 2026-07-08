import { ReactNode, useEffect, useState } from 'react';

// Farge-konfigurasjon per kvote-tone, basert på Aksel-token:
// – MOR  → ax-accent-*  (blå, same som BLUE i uttaksplan-kalenderen)
// – FAR  → ax-success-* (grønn, same som GREEN i uttaksplan-kalenderen)
// – FELLES bakgrunn → ax-meta-lime-* (lime)
const TONE = {
    mor: {
        bgStroke: 'var(--ax-accent-200)',
        fillStroke: 'var(--ax-accent-600)',
        iconClass: 'text-ax-accent-600',
        dotClass: 'bg-ax-accent-600',
    },
    far: {
        bgStroke: 'var(--ax-success-200)',
        fillStroke: 'var(--ax-success-600)',
        iconClass: 'text-ax-success-600',
        dotClass: 'bg-ax-success-600',
    },
    felles: {
        bgStroke: 'var(--ax-meta-lime-200)',
        // felles ringen er splitta: mor-del (accent) og far-del (success)
        fillStroke: 'var(--ax-accent-600)',
        fillStroke2: 'var(--ax-success-600)',
        iconClass: 'text-ax-meta-lime-700',
        dotClass: 'bg-ax-meta-lime-700',
    },
} as const;

type RingDims = { cx: number; cy: number; r: number; sw: number };

const DIMS: Record<NonNullable<KvoteProgresjonRingProps['size']>, RingDims> = {
    normal: { cx: 40, cy: 40, r: 34, sw: 8 },
    mini: { cx: 16, cy: 16, r: 14, sw: 4 },
};

const ringCircumference = (r: number) => 2 * Math.PI * r;

const dashOffset = (circumference: number, progress: number) =>
    circumference * (1 - Math.min(1, Math.max(0, progress)));

const MorIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.2} width={22} height={22} aria-hidden className={`stroke-current ${className}`}>
        <circle cx="12" cy="7" r="3" />
        <path d="M12 10v8M9 14h6" />
    </svg>
);

const FarIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.2} width={22} height={22} aria-hidden className={`stroke-current ${className}`}>
        <circle cx="12" cy="7" r="3" />
        <path d="M12 10v10" />
    </svg>
);

const FellesIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.2} width={22} height={22} aria-hidden className={`stroke-current ${className}`}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="15" cy="8" r="3" />
        <path d="M5 20c0-3 2-5 4-5M19 20c0-3-2-5-4-5" />
    </svg>
);

const CheckmarkIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={3} width={14} height={14} aria-hidden className={`stroke-current ${className}`}>
        <path d="M5 12l5 5L20 7" />
    </svg>
);

export type KvoteTone = 'mor' | 'far' | 'felles';
export type KvoteRingSize = 'normal' | 'mini';

export interface KvoteProgresjonRingSplitInfo {
    color: 'mor' | 'far';
    /** Tekst, t.d. «10u Ada» */
    text: string;
}

export interface KvoteProgresjonRingProps {
    /** Farge-tone for kvotetype */
    tone: KvoteTone;
    /**
     * Framgang 0–1.
     * For `felles`-tone: mors andel av det totalt planlagde.
     */
    progress: number;
    /**
     * Berre for `felles`-tone.
     * Total planlagt del (mor + far), 0–1.
     * Far-segmentet fyller resten opp til denne verdien.
     */
    progressFar?: number;
    /** Er kvoten ferdig planlagd? */
    complete?: boolean;
    /** Storleik på ringen */
    size?: KvoteRingSize;
    /** Etikettekst under ringen (berre `normal`-storleik) */
    label?: string;
    /** Framgangstekst, t.d. <><strong>18u 1d</strong> av 19 veker</> */
    progressLabel?: ReactNode;
    /** Fordeling for fellesperiode – vis fargeprikkane under etiketten */
    splitInfo?: KvoteProgresjonRingSplitInfo[];
    /** Klikk-handlar */
    onClick?: () => void;
    /** Tilgjengelegheitsetikett */
    'aria-label'?: string;
}

export const KvoteProgresjonRing = ({
    tone,
    progress,
    progressFar,
    complete = false,
    size = 'normal',
    label,
    progressLabel,
    splitInfo,
    onClick,
    'aria-label': ariaLabel,
}: KvoteProgresjonRingProps) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        // Dobbel-RAF sikrar at nettlesaren har teikna ring utan fill
        // før CSS-overgangen frå 0 til target-dashoffset startar
        let inner = 0;
        const outer = requestAnimationFrame(() => {
            inner = requestAnimationFrame(() => setAnimated(true));
        });
        return () => {
            cancelAnimationFrame(outer);
            cancelAnimationFrame(inner);
        };
    }, []);

    const dims = DIMS[size];
    const c = ringCircumference(dims.r);
    const t = TONE[tone];

    // Klamp verdiane: progress alltid [0,1]; progressFar aldri lågare enn progress
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const clampedFar =
        progressFar !== undefined ? Math.min(1, Math.max(clampedProgress, progressFar)) : undefined;

    const morOffset = animated ? dashOffset(c, clampedProgress) : c;
    const farOffset = (() => {
        if (clampedFar === undefined) {
            return undefined;
        }
        return animated ? dashOffset(c, clampedFar) : c;
    })();

    const viewBox = size === 'normal' ? '0 0 80 80' : '0 0 32 32';
    const sizeClass = size === 'normal' ? 'w-20 h-20' : 'w-8 h-8';

    // SVG transition – beheld som Tailwind arbitrary class sidan stroke-dashoffset
    // ikkje har eit innebygd utility i dette Tailwind/Aksel-oppsettet
    const dashTransition = '[transition:stroke-dashoffset_1.2s_cubic-bezier(0.4,0,0.2,1)]';

    const ringContent = (
        <>
            <div className={`relative shrink-0 ${sizeClass}`}>
                <svg
                    viewBox={viewBox}
                    aria-hidden
                    className="-rotate-90 block w-full h-full"
                >
                    {/* Bakgrunnsring (tom spor) */}
                    <circle
                        cx={dims.cx}
                        cy={dims.cy}
                        r={dims.r}
                        fill="none"
                        stroke={t.bgStroke}
                        strokeWidth={dims.sw}
                    />

                    {/* For felles: far-segmentet (grøn) under mor-segmentet */}
                    {tone === 'felles' && farOffset !== undefined && (
                        <circle
                            cx={dims.cx}
                            cy={dims.cy}
                            r={dims.r}
                            fill="none"
                            stroke={TONE.felles.fillStroke2}
                            strokeWidth={dims.sw}
                            strokeLinecap="round"
                            strokeDasharray={c}
                            strokeDashoffset={farOffset}
                            className={dashTransition}
                        />
                    )}

                    {/* Primær fill: mor-farge (accent/blå) for mor og felles, success/grøn for far */}
                    <circle
                        cx={dims.cx}
                        cy={dims.cy}
                        r={dims.r}
                        fill="none"
                        stroke={t.fillStroke}
                        strokeWidth={dims.sw}
                        strokeLinecap="round"
                        strokeDasharray={c}
                        strokeDashoffset={morOffset}
                        className={dashTransition}
                    />
                </svg>

                {/* Midtinnhald – berre normal-storleik */}
                {size === 'normal' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {!complete && (
                            <>
                                {tone === 'mor' && <MorIcon className={t.iconClass} />}
                                {tone === 'far' && <FarIcon className={t.iconClass} />}
                                {tone === 'felles' && <FellesIcon className={t.iconClass} />}
                            </>
                        )}
                        {complete && (
                            <div className="w-[26px] h-[26px] rounded-full bg-[var(--ax-bg-default)] flex items-center justify-center shadow-sm">
                                <CheckmarkIcon className={t.iconClass} />
                            </div>
                        )}
                    </div>
                )}

                {/* Mini ferdig: liten grøn prikk i midten */}
                {size === 'mini' && complete && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ax-success-400" />
                )}
            </div>

            {/* Etikettar – berre normal-storleik */}
            {size === 'normal' && label && (
                <div className="flex flex-col gap-0.5 min-h-[38px] items-center text-center">
                    <span className="text-[13px] font-semibold text-[var(--ax-text-default)]">{label}</span>
                    {progressLabel && (
                        <span className="text-[12px] text-[var(--ax-text-subtle)]">{progressLabel}</span>
                    )}
                    {splitInfo && splitInfo.length > 0 && (
                        <div className="flex gap-1 mt-1 items-center justify-center text-[11px] text-[var(--ax-text-subtle)] flex-wrap">
                            {splitInfo.map((item, idx) => {
                                const dotClass = item.color === 'mor' ? TONE.mor.dotClass : TONE.far.dotClass;
                                return (
                                    <span key={`${item.color}-${item.text}`} className="inline-flex items-center gap-[3px]">
                                        {idx > 0 && <span className="mx-0.5 text-[var(--ax-text-muted)]">·</span>}
                                        <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${dotClass}`} />
                                        {item.text}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );

    const baseClass = `flex flex-col items-center gap-3 bg-transparent border-0 p-2 rounded-[10px] font-[inherit] text-inherit text-center`;

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className={`${baseClass} cursor-pointer`}
            >
                {ringContent}
            </button>
        );
    }

    return (
        <div role={size === 'mini' ? 'img' : undefined} aria-label={ariaLabel} className={baseClass}>
            {ringContent}
        </div>
    );
};
