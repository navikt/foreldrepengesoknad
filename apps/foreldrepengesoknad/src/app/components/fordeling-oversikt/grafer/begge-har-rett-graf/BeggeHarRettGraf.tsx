import {
    StønadskontoType,
    TilgjengeligStønadskonto,
    bemUtils,
    capitalizeFirstLetter,
    guid,
    uttaksConstants,
} from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';
import './../graf.css';
import { Dispatch, SetStateAction } from 'react';
import { getFordelingShadowClass } from '../../fordelingOversiktUtils';
import { FordeligFargekode, FordelingEier } from '../../FordelingOversikt';
import FamiliehendelseVisning from './FamiliehendelseVisning';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { getFamiliehendelseNavn } from 'app/utils/familiehendelseUtils';

const getRowClass = (antallPerioder: number, periodeIndex: number) => {
    if (antallPerioder % 2 === 0) {
        return periodeIndex % 2 === 0 ? 'up' : 'down';
    }
    return periodeIndex % 2 === 0 ? 'down' : 'up';
};

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
    erBarnetFødt: boolean;
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
    erBarnetFødt,
    sumUker,
    navnMor,
    navnFarMedmor,
    currentUthevet,
    setCurrentUthevet,
}) => {
    const intl = useIntl();
    const fordelingFørFødsel = {
        antallUker: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        eier: FordelingEier.Mor,
        fargekode: erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR,
        beskrivelse: '',
    };
    const fordelingEtterFødselAdopsjon = [
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
            beskrivelse: erFarEllerMedmor ? 'Din del' : `${navnFarMedmor}s del`,
        },
    ];

    const fordelingList = erAdopsjon
        ? fordelingEtterFødselAdopsjon
        : [fordelingFørFødsel, ...fordelingEtterFødselAdopsjon];
    const bem = bemUtils('graf');

    const rowHeight = 16;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    const familiehendelseNavn = capitalizeFirstLetter(getFamiliehendelseNavn(erAdopsjon, erBarnetFødt, intl));

    return (
        <div className={bem.block}>
            {fordelingList.map((fordeling: FordelingGrafInfo, index) => {
                const width = (fordeling.antallUker / sumUker) * 100;
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
                            <FamiliehendelseVisning rowHeight={rowHeight} familiehendelseNavn={familiehendelseNavn} />
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
