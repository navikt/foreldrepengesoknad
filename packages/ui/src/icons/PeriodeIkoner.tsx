/**
 * Delte, line-art-ikon som matchar stilen i card-anatomi.html (og som `KvoteProgresjonRing`
 * opphavleg definerte lokalt for MOR/FAR/FELLES). Aksel sine tilsvarande ikon (`PersonFillIcon`,
 * `PersonGroupFillIcon`, `ParasolBeachFillIcon` m.fl.) er heilfarga («fill»-stil) og skil seg
 * visuelt frå den tynne strek-stilen anatomien brukar, så desse ikona nyttast i staden – både her
 * og i `KvoteProgresjonRing` – for eit konsistent uttrykk på tvers av kort og progresjonsringen.
 */

interface Props {
    className?: string;
}

export const PersonIkon = ({ className }: Props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2.2}
        width={22}
        height={22}
        aria-hidden
        className={`stroke-current ${className ?? ''}`}
    >
        <circle cx="12" cy="7" r="3" />
        <path d="M12 10v8M9 14h6" />
    </svg>
);

/** Litt enklare variant av `PersonIkon` (utan «armane»), brukt for FAR-tonen i `KvoteProgresjonRing`. */
export const PersonEnkelIkon = ({ className }: Props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2.2}
        width={22}
        height={22}
        aria-hidden
        className={`stroke-current ${className ?? ''}`}
    >
        <circle cx="12" cy="7" r="3" />
        <path d="M12 10v10" />
    </svg>
);

export const PersonGruppeIkon = ({ className }: Props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2.2}
        width={22}
        height={22}
        aria-hidden
        className={`stroke-current ${className ?? ''}`}
    >
        <circle cx="9" cy="8" r="3" />
        <circle cx="15" cy="8" r="3" />
        <path d="M5 20c0-3 2-5 4-5M19 20c0-3-2-5-4-5" />
    </svg>
);

/** Sol-ikon for FERIE, jf. `.card.small.ferie`/`.card.medium.ferie` i card-anatomi.html. */
export const SolIkon = ({ className }: Props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        width={22}
        height={22}
        aria-hidden
        className={className}
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </svg>
);

export const CheckmarkIkon = ({ className }: Props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={3}
        width={14}
        height={14}
        aria-hidden
        className={`stroke-current ${className ?? ''}`}
    >
        <path d="M5 12l5 5L20 7" />
    </svg>
);
