import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { TilgjengeligStønadskonto, bemUtils, capitalizeFirstLetter, guid } from '@navikt/fp-common';

import { FordelingEier, FordelingGrafInfo } from 'app/types/FordelingOversikt';
import { getFamiliehendelseNavn } from 'app/utils/familiehendelseUtils';

import { getBeggeHarRettGrafFordeling, getFordelingShadowClass } from '../../fordelingOversiktUtils';
import './../graf.css';
import FamiliehendelseVisning from './FamiliehendelseVisning';

const getRowClass = (antallPerioder: number, periodeIndex: number) => {
    if (antallPerioder % 2 === 0) {
        return periodeIndex % 2 === 0 ? 'up' : 'down';
    }
    return periodeIndex % 2 === 0 ? 'down' : 'up';
};

interface Props {
    kontoer: TilgjengeligStønadskonto[];
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
        <div className={bem.block}>
            {fordelingList.map((fordeling: FordelingGrafInfo, index) => {
                const width = (fordeling.antallDager / sumBredde) * 100;
                const erUthevet = currentUthevet === fordeling.eier;
                const shadowClass = getFordelingShadowClass(erUthevet);
                const rowClass = getRowClass(fordelingList.length, index);

                const handleOnMouseEnter = () => {
                    setCurrentUthevet(fordeling.eier);
                };
                const indexForFamiliehendelse = erAdopsjon ? 0 : 1;

                return (
                    <>
                        {index === indexForFamiliehendelse && (
                            <FamiliehendelseVisning
                                rowHeight={rowHeight}
                                familiehendelseNavn={familiehendelseNavn}
                                fieldWidthPercent={famiHendelseFieldWidth}
                            />
                        )}
                        <div
                            className={bem.element('søyle')}
                            key={fordeling.eier}
                            style={{
                                width: `${width}%`,
                            }}
                        >
                            <div className={bem.element('del')}>
                                <div
                                    className={classNames(
                                        bem.element('del-box'),
                                        bem.modifier(`${fordeling.fargekode}`),
                                        bem.modifier(`${shadowClass}`),
                                    )}
                                    key={guid()}
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
                    </>
                );
            })}
        </div>
    );
};

export default BeggeHarRettGraf;
