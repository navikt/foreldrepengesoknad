import { cx } from './cardTone';

interface Props {
    /** Nyttar same tone-rekkje som `CardBadge` – dashen border blir rød ved «danger». */
    tone?: 'danger';
    className?: string;
}

/**
 * Stipla, tom sirkel som viser at kortet endå ikkje har fått noko innhald (jf. «tom dag» i
 * card-anatomien). Nyttar `tone="danger"` for varianten der dagen i tillegg manglar dekning.
 */
export const CardEmptyIndicator = ({ tone, className }: Props) => (
    <div
        className={cx(
            'h-[26px] w-[26px] rounded-full border-[1.5px] border-dashed',
            tone === 'danger' ? 'border-ax-border-danger' : 'border-ax-border-neutral',
            className,
        )}
        aria-hidden
    />
);
