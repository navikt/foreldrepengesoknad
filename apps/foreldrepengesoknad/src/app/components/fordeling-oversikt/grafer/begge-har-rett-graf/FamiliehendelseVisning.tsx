import { HeartFillIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
interface Props {
    rowHeight: number;
}

const FamiliehendelseVisning: React.FunctionComponent<Props> = ({ rowHeight }) => {
    const iconSize = 24;
    const iconFieldWidth = 12;
    return (
        <div
            style={{
                width: `${iconFieldWidth}%`,
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr 1fr 1fr',
            }}
        >
            <BodyShort
                style={{
                    gridRow: '1',
                    gridColumn: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    height: `${rowHeight}px`,
                }}
            >
                {'Termin'}
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
