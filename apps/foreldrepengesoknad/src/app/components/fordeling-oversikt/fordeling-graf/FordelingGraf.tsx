import { StønadskontoType, bemUtils, guid } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';
import { HeartFillIcon } from '@navikt/aksel-icons';
import './fordeling-graf.css';
import { Dispatch, SetStateAction } from 'react';

interface FordelingGrafInfo {
    tekst: string;
    uker: number;
    farge: string;
    konto?: StønadskontoType;
}

interface Props {
    fordelingList: FordelingGrafInfo[];
    sumUker: number;
    currentUthevet: StønadskontoType | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<StønadskontoType | undefined>>;
}

const FordelingGraf: React.FunctionComponent<Props> = ({
    fordelingList,
    sumUker,
    currentUthevet,
    setCurrentUthevet,
}) => {
    const bem = bemUtils('fordeling-graf');
    const iconSize = 24;
    const rowHeight = 16;
    const iconFieldWidth = 12;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {fordelingList.map((fordeling: FordelingGrafInfo) => {
                const width = fordeling.uker === 0 ? iconFieldWidth : (fordeling.uker / sumUker) * 100;
                const borderColor = fordeling.farge === '#ECEEF0' ? 'black' : `${fordeling.farge}`;
                const isUthevet = currentUthevet === fordeling.konto;
                const shadow = isUthevet ? '0 4px 4px rgba(0, 0, 0, 0.25)' : '0 0px 0px white';
                const handleOnMouseEnter = () => {
                    setCurrentUthevet(fordeling.konto);
                };
                return ['Termin', 'Fødsel', 'Adopsjon'].includes(fordeling.tekst) ? (
                    <div
                        style={{
                            width: `${width}%`,
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
                            {fordeling.tekst}
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
                ) : (
                    <div
                        style={{
                            width: `${width}%`,
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gridTemplateRows: '1fr 1fr 1fr',
                        }}
                    >
                        <div
                            style={{
                                gridRow: '2',
                                gridColumn: '1',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                className={bem.element('kvote')}
                                key={guid()}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                style={{
                                    width: '100%',
                                    backgroundColor: `${fordeling.farge}`,
                                    height: `${rowHeight}px`,
                                    borderRadius: `${rowHeight / 2}px`,
                                    borderColor: `${borderColor}`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    marginLeft: '2px',
                                    marginRight: '2px',
                                    boxShadow: `${shadow}`,
                                }}
                            ></div>
                        </div>
                        <BodyShort
                            style={{
                                gridRow: '3',
                                gridColumn: '1',
                                display: 'flex',
                                justifyContent: 'center',
                                height: `${rowHeight}px`,
                            }}
                        >
                            {fordeling.tekst}
                        </BodyShort>
                    </div>
                );
            })}
        </div>
    );
};

export default FordelingGraf;
