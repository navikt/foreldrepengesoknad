import type { ReactElement } from 'react';

import { Button } from '@navikt/ds-react';

type Props = {
    ikon: ReactElement;
    label: string;
    erUtvidet: boolean;
    onClick: () => void;
    className?: string;
};

export const UtvidIkonKnapp = ({ ikon, label, erUtvidet, onClick, className }: Props) => (
    <Button
        type="button"
        variant="tertiary-neutral"
        size="small"
        icon={ikon}
        aria-label={label}
        aria-expanded={erUtvidet}
        className={className}
        onClick={(e) => {
            // Hindrer at et foreldreelement som også utvider ved klikk, får hendelsen.
            e.stopPropagation();
            onClick();
        }}
    />
);
