import { StønadskontoType, TilgjengeligStønadskonto, bemUtils, guid, uttaksConstants } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';
import './../graf.css';
import { Dispatch, SetStateAction } from 'react';
import { getShadowClass } from '../../fordelingOversiktUtils';
import { FordeligFargekode, FordelingEier } from '../../FordelingOversikt';
import FamiliehendelseVisning from './FamiliehendelseVisning';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import classNames from 'classnames';

interface FordelingGrafInfo {
    antallUker: number;
    konto: StønadskontoType;
    eier: FordelingEier;
    fargekode: FordeligFargekode;
    beskrivelse: string;
}

interface Props {
    kontoer: TilgjengeligStønadskonto[];
    erFarEllerMedmor: boolean;
    erAdopsjon: boolean;
    sumUker: number;
    navnFarMedmor: string;
    navnMor: string;
    currentUthevet: FordelingEier | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingEier | undefined>>;
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
            antallUker: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            eier: FordelingEier.Mor,
            fargekode: erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR,
            beskrivelse: '',
        },
        {
            antallUker: getAntallUkerMødrekvote(kontoer),
            konto: StønadskontoType.Mødrekvote,
            eier: FordelingEier.Mor,
            fargekode: erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR,
            beskrivelse: erFarEllerMedmor ? `${navnMor}s del` : 'Din del',
        },
        {
            antallUker: getAntallUkerFellesperiode(kontoer),
            konto: StønadskontoType.Fellesperiode,
            eier: FordelingEier.Felles,
            fargekode: FordeligFargekode.IKKE_TILDELT,
            beskrivelse: 'Fellesperiode',
        },
        {
            antallUker: getAntallUkerFedrekvote(kontoer),
            konto: StønadskontoType.Fedrekvote,
            eier: FordelingEier.FarMedmor,
            fargekode: erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR,
            beskrivelse: erFarEllerMedmor ? `${navnFarMedmor}s del` : 'Din del',
        },
    ];
    const bem = bemUtils('graf');

    const rowHeight = 16;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };

    return (
        <div className={bem.block}>
            {fordelingList.map((fordeling: FordelingGrafInfo, index) => {
                const width = (fordeling.antallUker / sumUker) * 100;
                const isUthevet = currentUthevet === fordeling.eier;
                const shadowClass = getShadowClass(isUthevet);
                const handleOnMouseEnter = () => {
                    setCurrentUthevet(fordeling.eier);
                };
                const indexForFamiliehendelse = erAdopsjon ? 0 : 1; //TODO: GR: For prematur fødsel eller fødsel før termin kommer også fellesperioden inn her og index blir 2.

                return (
                    <>
                        {index === indexForFamiliehendelse && <FamiliehendelseVisning rowHeight={rowHeight} />}
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
                                className={bem.element('del-tekst')}
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
