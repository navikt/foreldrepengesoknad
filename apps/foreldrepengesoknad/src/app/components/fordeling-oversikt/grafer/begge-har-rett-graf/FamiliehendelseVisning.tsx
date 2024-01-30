import { HeartFillIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import './../graf.css';
import { bemUtils } from '@navikt/fp-common';
interface Props {
    rowHeight: number;
    familiehendelseNavn: string;
    fieldWidthPercent: number;
}

const FamiliehendelseVisning: React.FunctionComponent<Props> = ({
    rowHeight,
    familiehendelseNavn,
    fieldWidthPercent,
}) => {
    const iconSize = 24;
    const bem = bemUtils('graf');
    return (
        <div
            className={bem.element('søyle')}
            style={{
                width: `${fieldWidthPercent}%`,
                justifyContent: 'center',
                alignItems: 'center',
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
                        color: '#C30000',
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

export default FamiliehendelseVisning;
