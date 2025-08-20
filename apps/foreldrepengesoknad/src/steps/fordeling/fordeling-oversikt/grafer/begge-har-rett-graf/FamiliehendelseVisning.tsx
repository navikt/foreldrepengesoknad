import { HeartFillIcon } from '@navikt/aksel-icons';

import { BodyShort } from '@navikt/ds-react';

import styles from './../graf.module.css';

interface Props {
    rowHeight: number;
    familiehendelseNavn: string;
    fieldWidthPercent: number;
}

export const FamiliehendelseVisning = ({ rowHeight, familiehendelseNavn, fieldWidthPercent }: Props) => {
    const iconSize = 24;
    return (
        <div
            className={styles.søyle}
            style={{
                width: `${fieldWidthPercent}%`,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.5rem',
            }}
        >
            <BodyShort
                style={{
                    gridRow: '1',
                    gridColumn: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: `${rowHeight}px`,
                }}
            >
                {familiehendelseNavn}
            </BodyShort>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HeartFillIcon
                    style={{
                        color: 'var(--ax-danger-700)',
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        gridRow: '2',
                        gridColumn: '1',
                    }}
                    aria-hidden={true}
                />
            </div>
        </div>
    );
};
