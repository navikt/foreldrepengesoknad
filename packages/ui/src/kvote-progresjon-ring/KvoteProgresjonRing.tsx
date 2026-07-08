import { CSSProperties, ReactNode, useEffect, useState } from 'react';

// Kvote-fargar – matcher design-dokumentet plan-progresjon.html
const MOR_SOFT = '#ECE3FA';
const MOR_STRONG = '#6B4FBB';
const FAR_SOFT = '#DCE7F7';
const FAR_STRONG = '#2C5AA8';
const FELLES_SOFT = '#E4EFD0';
const FELLES_STRONG = '#6B8A3A';
const SUCCESS_DOT = '#6FB07A';

const TEXT_DEFAULT = '#1F2024';
const TEXT_SUBTLE = '#5E5F66';

type RingDims = { size: number; cx: number; cy: number; r: number; sw: number };

const DIMS: Record<NonNullable<KvoteProgresjonRingProps['size']>, RingDims> = {
    normal: { size: 80, cx: 40, cy: 40, r: 34, sw: 8 },
    mini: { size: 32, cx: 16, cy: 16, r: 14, sw: 4 },
};

function ringCircumference(r: number) {
    return 2 * Math.PI * r;
}

function dashOffset(circumference: number, progress: number) {
    return circumference * (1 - Math.min(1, Math.max(0, progress)));
}

function MorIcon({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} width={22} height={22} aria-hidden>
            <circle cx="12" cy="7" r="3" />
            <path d="M12 10v8M9 14h6" />
        </svg>
    );
}

function FarIcon({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} width={22} height={22} aria-hidden>
            <circle cx="12" cy="7" r="3" />
            <path d="M12 10v10" />
        </svg>
    );
}

function FellesIcon({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} width={22} height={22} aria-hidden>
            <circle cx="9" cy="8" r="3" />
            <circle cx="15" cy="8" r="3" />
            <path d="M5 20c0-3 2-5 4-5M19 20c0-3-2-5-4-5" />
        </svg>
    );
}

function CheckmarkIcon({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} width={14} height={14} aria-hidden>
            <path d="M5 12l5 5L20 7" />
        </svg>
    );
}

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

export function KvoteProgresjonRing({
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
}: KvoteProgresjonRingProps) {
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

    const bgColor = tone === 'mor' ? MOR_SOFT : tone === 'far' ? FAR_SOFT : FELLES_SOFT;

    // Mor-farge er primær fill for tone=mor og felles; far-farge for tone=far
    const primaryFill = tone === 'far' ? FAR_STRONG : MOR_STRONG;
    const iconColor = tone === 'far' ? FAR_STRONG : tone === 'felles' ? FELLES_STRONG : MOR_STRONG;

    const transitionStyle = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    const morOffset = animated ? dashOffset(c, progress) : c;
    const farOffset = progressFar !== undefined ? (animated ? dashOffset(c, progressFar) : c) : undefined;

    const ringContent = (
        <>
            <div style={{ position: 'relative', width: dims.size, height: dims.size, flexShrink: 0 }}>
                <svg
                    width={dims.size}
                    height={dims.size}
                    viewBox={`0 0 ${dims.size} ${dims.size}`}
                    style={{ transform: 'rotate(-90deg)', display: 'block' }}
                    aria-hidden
                >
                    <circle cx={dims.cx} cy={dims.cy} r={dims.r} fill="none" stroke={bgColor} strokeWidth={dims.sw} />

                    {/* For felles: far-segmentet i bakgrunnen (blå) */}
                    {tone === 'felles' && farOffset !== undefined && (
                        <circle
                            cx={dims.cx}
                            cy={dims.cy}
                            r={dims.r}
                            fill="none"
                            stroke={FAR_STRONG}
                            strokeWidth={dims.sw}
                            strokeLinecap="round"
                            strokeDasharray={c}
                            strokeDashoffset={farOffset}
                            style={{ transition: transitionStyle }}
                        />
                    )}

                    {/* Primær fill (lilla for mor/felles, blå for far) */}
                    <circle
                        cx={dims.cx}
                        cy={dims.cy}
                        r={dims.r}
                        fill="none"
                        stroke={primaryFill}
                        strokeWidth={dims.sw}
                        strokeLinecap="round"
                        strokeDasharray={c}
                        strokeDashoffset={morOffset}
                        style={{ transition: transitionStyle }}
                    />
                </svg>

                {/* Midtinnhald for normal-storleik */}
                {size === 'normal' && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        {!complete && (
                            <>
                                {tone === 'far' && <FarIcon color={iconColor} />}
                                {tone === 'felles' && <FellesIcon color={iconColor} />}
                                {tone === 'mor' && <MorIcon color={iconColor} />}
                            </>
                        )}
                        {complete && (
                            <div
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: '50%',
                                    background: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <CheckmarkIcon color={iconColor} />
                            </div>
                        )}
                    </div>
                )}

                {/* Mini ferdig: liten grøn prikk i midten */}
                {size === 'mini' && complete && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: SUCCESS_DOT,
                        }}
                    />
                )}
            </div>

            {/* Etikettar (berre normal-storleik) */}
            {size === 'normal' && label && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        minHeight: 38,
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_DEFAULT }}>{label}</span>
                    {progressLabel && (
                        <span style={{ fontSize: 12, color: TEXT_SUBTLE }}>{progressLabel}</span>
                    )}
                    {splitInfo && splitInfo.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 4,
                                marginTop: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                color: TEXT_SUBTLE,
                                flexWrap: 'wrap',
                            }}
                        >
                            {splitInfo.map((item, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                                    {i > 0 && (
                                        <span style={{ color: '#8A8B91', margin: '0 2px' }}>·</span>
                                    )}
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: item.color === 'mor' ? MOR_STRONG : FAR_STRONG,
                                            display: 'inline-block',
                                            flexShrink: 0,
                                        }}
                                    />
                                    {item.text}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );

    const sharedStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: size === 'normal' ? 12 : 0,
        background: 'transparent',
        border: 'none',
        padding: size === 'normal' ? 8 : 0,
        borderRadius: 10,
        fontFamily: 'inherit',
        color: 'inherit',
        textAlign: 'center',
    };

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                style={{ ...sharedStyle, cursor: 'pointer' }}
            >
                {ringContent}
            </button>
        );
    }

    return (
        <div aria-label={ariaLabel} style={sharedStyle}>
            {ringContent}
        </div>
    );
}
