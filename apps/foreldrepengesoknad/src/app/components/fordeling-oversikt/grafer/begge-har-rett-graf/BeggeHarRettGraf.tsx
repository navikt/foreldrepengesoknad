import { StønadskontoType, TilgjengeligStønadskonto, bemUtils, guid } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';
import './../graf.css';
import { Dispatch, SetStateAction } from 'react';
import {
    getShadowClass,
    getErAnnenForeldersDel,
    getFordelingBoxColorClass,
    getFordelingTekst,
    getFordelingType,
} from '../../fordelingOversiktUtils';
import { FordelingType } from '../../FordelingOversikt';
import FamiliehendelseVisning from './FamiliehendelseVisning';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import classNames from 'classnames';

interface FordelingGrafInfo {
    uker: number;
    konto: StønadskontoType;
}

interface Props {
    kontoer: TilgjengeligStønadskonto[];
    erFarEllerMedmor: boolean;
    erAdopsjon: boolean;
    sumUker: number;
    navnFarMedmor: string;
    navnMor: string;
    currentUthevet: FordelingType | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingType | undefined>>;
}

const BeggeHarRettGraf: React.FunctionComponent<Props> = ({
    kontoer,
    erFarEllerMedmor,
    erAdopsjon,
    sumUker,
    navnMor,
    navnFarMedmor,
    currentUthevet,
    setCurrentUthevet,
}) => {
    const fordelingList = [
        {
            uker: 3,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
        },
        {
            uker: getAntallUkerMødrekvote(kontoer),
            konto: StønadskontoType.Mødrekvote,
        },
        {
            uker: getAntallUkerFellesperiode(kontoer),
            konto: StønadskontoType.Fellesperiode,
        },
        {
            uker: getAntallUkerFedrekvote(kontoer),
            konto: StønadskontoType.Fedrekvote,
        },
    ];
    const bem = bemUtils('graf');

    const rowHeight = 16;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };

    return (
        <div className={bem.block}>
            {fordelingList.map((fordeling: FordelingGrafInfo, index: number) => {
                const type = getFordelingType(fordeling.konto, erFarEllerMedmor);
                const erAnnenForeldersDel = getErAnnenForeldersDel(erFarEllerMedmor, type);
                const width = (fordeling.uker / sumUker) * 100;
                const colorClass = getFordelingBoxColorClass(type, erAnnenForeldersDel);
                const tekst = getFordelingTekst(fordeling.konto, navnMor, navnFarMedmor, erAnnenForeldersDel);
                const isUthevet = currentUthevet === type;
                const shadowClass = getShadowClass(isUthevet);
                const handleOnMouseEnter = () => {
                    setCurrentUthevet(type);
                };
                const indexForFamiliehendelse = erAdopsjon ? 0 : 1;

                return (
                    <>
                        {index === indexForFamiliehendelse && <FamiliehendelseVisning rowHeight={rowHeight} />}
                        <div
                            className={bem.element('søyle')}
                            key={fordeling.konto}
                            style={{
                                width: `${width}%`,
                            }}
                        >
                            <div className={bem.element('del')}>
                                <div
                                    className={classNames(
                                        bem.element('del-box'),
                                        bem.modifier(`${colorClass}`),
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
                                className={bem.element('del-tekst')}
                                style={{
                                    height: `${rowHeight}px`,
                                }}
                            >
                                {tekst}
                            </BodyShort>
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default BeggeHarRettGraf;
