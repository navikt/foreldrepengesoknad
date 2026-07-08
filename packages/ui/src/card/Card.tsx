import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';

import {
    STATE_BORDER_KLASSE,
    TONE_BG_SOFT,
    TONE_BG_STRONG,
    TONE_TEXT_CONTRAST,
    TONE_TEXT_SUBTLE,
    cx,
} from './cardTone';
import { CardSize, CardStateTone, CardTone } from './types';

const STORLEIK_KLASSE: Record<CardSize, string> = {
    // Storleik (breidde/høgde) blir ikkje sett her – micro-kortet er meint å fylle ei
    // kalender-celle (t.d. via `absolute inset-1` frå forbrukaren), så Card eig berre forma.
    micro: 'flex h-full w-full items-center justify-center rounded-md text-sm font-medium',
    small: 'flex flex-col rounded-lg p-2.5 text-left',
    medium: 'flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg px-4 py-3.5 text-left',
    xl: 'flex w-full flex-col gap-4 rounded-xl px-7 py-6 text-left shadow-md',
};

const NØYTRAL_KLASSE = 'bg-ax-bg-default text-ax-text-subtle shadow-[inset_0_0_0_1.5px_var(--ax-border-subtle)]';
const NØYTRAL_VALGT_KLASSE = 'bg-ax-bg-neutral-strong text-[color:var(--ax-bg-default)]';

const HATCHED_STYLE = {
    backgroundImage: [
        'repeating-linear-gradient(45deg,',
        'var(--ax-bg-danger-softA), var(--ax-bg-danger-softA) 6px,',
        'var(--ax-bg-danger-moderateA) 6px, var(--ax-bg-danger-moderateA) 12px)',
    ].join(' '),
};

interface CardBaseProps {
    /**
     * Storleik – styrer kva kontekst kortet er meint for (jf. card-anatomien):
     * `micro` = kalender-celle, `small` = ukesvisning, `medium` = listevisning,
     * `xl` = dagsvisning/detaljvising.
     */
    size: CardSize;
    /**
     * Fargekanal 1: kva kortet «er» (eig bakgrunnen). Utelaten tone gjev ei nøytral,
     * ufylt framtoning, t.d. ein dag som endå ikkje har fått noko innhald.
     */
    tone?: CardTone;
    /**
     * Fargekanal 2: kortets tilstand, lagt oppå bakgrunnen som ein border. Bytter aldri ut
     * bakgrunnsfargen. Kombiner med `CardBadge` (same `tone`) for å forklare kva staten betyr.
     */
    state?: CardStateTone;
    /**
     * Fargekanal 3: om kortet er valgt. Uttrykt som invertering (soft/nøytral → sterk fylling
     * med kontrastfarga tekst) i staden for enno ein farge eller border.
     */
    selected?: boolean;
    /**
     * Skravert bakgrunn for eit kort utan tone der noko likevel manglar (t.d. ein udekt dag i
     * ein uttaksplan). Nyttast uavhengig av `tone`/`state`.
     */
    hatched?: boolean;
    className?: string;
    children?: ReactNode;
}

type CardAsButtonProps = CardBaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CardBaseProps | 'type'> & {
        onClick: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['onClick']>;
        ref?: Ref<HTMLButtonElement>;
    };

type CardAsDivProps = CardBaseProps &
    Omit<HTMLAttributes<HTMLDivElement>, keyof CardBaseProps> & {
        onClick?: undefined;
        ref?: Ref<HTMLDivElement>;
    };

export type CardProps = CardAsButtonProps | CardAsDivProps;

/**
 * Generisk kort etter card-anatomien: fire storleikar og tre uavhengige visuelle kanalar
 * (tone = kva kortet er, state = tilstand, selected = valgt). `Card` eig berre desse kanalane
 * og storleiks-skalet (padding/gap/radius) – alt domenespesifikt innhald (ikon, tekst,
 * handlingar) sendast inn som `children`, gjerne bygd med `CardIconCircle`, `CardBadge`,
 * `CardChip`, `CardLabel`, `CardDate`, `CardBody` og `CardActions`.
 *
 * Rendrar ein `<button>` når `onClick` er sett (med fokusring og tastaturstøtte via
 * standard knapp-oppførsel), elles ein rein `<div>`.
 */
export const Card = ({ size, tone, state, selected, hatched, className, children, ...rest }: CardProps) => {
    const toneKlasse = hatched
        ? cx(selected ? TONE_BG_STRONG.danger : undefined, selected ? TONE_TEXT_CONTRAST.danger : 'text-ax-text-danger')
        : tone
          ? cx(
                selected ? TONE_BG_STRONG[tone] : TONE_BG_SOFT[tone],
                selected ? TONE_TEXT_CONTRAST[tone] : TONE_TEXT_SUBTLE[tone],
            )
          : cx(selected ? NØYTRAL_VALGT_KLASSE : NØYTRAL_KLASSE);

    const classes = cx(STORLEIK_KLASSE[size], toneKlasse, state && STATE_BORDER_KLASSE[state], className);
    const style = hatched ? HATCHED_STYLE : undefined;

    if (rest.onClick) {
        const { onClick, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
            ref?: Ref<HTMLButtonElement>;
        };
        return (
            <button
                type="button"
                onClick={onClick}
                className={cx(
                    classes,
                    'cursor-pointer hover:brightness-[0.97] focus-visible:brightness-[0.97]',
                    'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ax-border-focus focus-visible:-outline-offset-2',
                )}
                style={style}
                {...buttonRest}
            >
                {children}
            </button>
        );
    }

    return (
        <div className={classes} style={style} {...rest}>
            {children}
        </div>
    );
};
