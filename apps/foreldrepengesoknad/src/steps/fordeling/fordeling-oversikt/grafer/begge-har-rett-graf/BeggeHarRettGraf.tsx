import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { FordelingEier, FordelingGrafInfo } from 'types/FordelingOversikt';
import { getFamiliehendelseNavn } from 'utils/familiehendelseUtils';

import { BodyShort } from '@navikt/ds-react';

import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { bemUtils, capitalizeFirstLetter } from '@navikt/fp-utils';

import { getBeggeHarRettGrafFordeling } from '../../fordelingOversiktUtils';
import './../graf.css';
import FamiliehendelseVisning from './FamiliehendelseVisning';

const getRowClass = (antallPerioder: number, periodeIndex: number) => {
    if (antallPerioder % 2 === 0) {
        return periodeIndex % 2 === 0 ? 'up' : 'down';
    }
    return periodeIndex % 2 === 0 ? 'down' : 'up';
};

interface Props {
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    erFarEllerMedmor: boolean;
    erAdopsjon: boolean;
    erBarnetFødt: boolean;
    sumDager: number;
    navnFarMedmor: string;
    navnMor: string;
    currentUthevet: FordelingEier | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingEier | undefined>>;
}

const BeggeHarRettGraf: React.FunctionComponent<Props> = ({
    kontoer,
    erFarEllerMedmor,
    erAdopsjon,
    erBarnetFødt,
    sumDager,
    navnMor,
    navnFarMedmor,
    currentUthevet,
    setCurrentUthevet,
}) => {
    const intl = useIntl();
    const bem = bemUtils('graf');

    const rowHeight = 16;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    const familiehendelseNavn = capitalizeFirstLetter(getFamiliehendelseNavn(erAdopsjon, erBarnetFødt, intl));
    const fordelingList = getBeggeHarRettGrafFordeling(
        kontoer,
        erAdopsjon,
        erFarEllerMedmor,
        navnMor,
        navnFarMedmor,
        intl,
    );
    const widthFamiliehendelse = 30;
    const sumBredde = sumDager + widthFamiliehendelse;
    const famiHendelseFieldWidth = (widthFamiliehendelse / sumBredde) * 100;
    return (
        <div className={bem.block} aria-hidden={true}>
            {fordelingList.map((fordeling: FordelingGrafInfo, index) => {
                const width = (fordeling.antallDager / sumBredde) * 100;
                const indexForFamiliehendelse = erAdopsjon ? 0 : 1;
                const finalWidth = index === indexForFamiliehendelse ? width + famiHendelseFieldWidth : width;
                const erUthevet = currentUthevet === fordeling.eier;
                const shadowClass = erUthevet ? 'shadow' : 'no-shadow';
                const rowClass = getRowClass(fordelingList.length, index);

                const handleOnMouseEnter = () => {
                    setCurrentUthevet(fordeling.eier);
                };

                return (
                    <div
                        className={bem.element('container')}
                        style={{
                            width: `${finalWidth}%`,
                        }}
                        key={`${fordeling.eier}-${fordeling.konto}-${fordeling.antallDager}`}
                    >
                        {index === indexForFamiliehendelse && (
                            <FamiliehendelseVisning
                                rowHeight={rowHeight}
                                familiehendelseNavn={familiehendelseNavn}
                                fieldWidthPercent={famiHendelseFieldWidth}
                            />
                        )}
                        <div className={bem.element('søyle')}>
                            <div className={bem.element('del')}>
                                <div
                                    className={classNames(
                                        bem.element('del-box'),
                                        bem.modifier(`${fordeling.fargekode}`),
                                        bem.modifier(`${shadowClass}`),
                                    )}
                                    onMouseEnter={handleOnMouseEnter}
                                    onMouseLeave={handleOnMouseLeave}
                                    style={{
                                        height: `${rowHeight}px`,
                                        borderRadius: `${rowHeight / 2}px`,
                                    }}
                                ></div>
                            </div>
                            <BodyShort
                                className={classNames(bem.element('del-tekst'), bem.modifier(`${rowClass}`))}
                                style={{
                                    height: `${rowHeight}px`,
                                }}
                            >
                                {fordeling.beskrivelse}
                            </BodyShort>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BeggeHarRettGraf;
