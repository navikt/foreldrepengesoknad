import { InformationIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import CalendarLabels from 'components/labels/CalendarLabels';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { Situasjon } from 'types/HvemPlanlegger';
import {
    erAlenesøker,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnPåSøker1,
    getNavnPåSøker2,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, finnUttaksdata, getFamiliehendelsedato } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { BarnType } from '@navikt/fp-constants';
import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Calendar, Infobox, StepButtons } from '@navikt/fp-ui';
import { useMedia } from '@navikt/fp-utils/src/hooks/useMedia';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanNy, sorterPerioder } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import PlanvisningToggle, { Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { getFamiliesituasjon } from '../../utils/barnetUtils';
import { deltUttak } from '../../utils/deltUttak';
import styles from './planenDeresSteg.module.css';
import OmÅTilpassePlanen from './tilpasse-planen/OmÅTilpassePlanen';
import UforutsetteEndringer from './uforutsette-endringer/UforutsetteEndringer';

const finnAntallDagerSøker1 = (
    dekningsgrad: Dekningsgrad,
    stønadskontoer: TilgjengeligeStønadskontoer,
    fordeling: Fordeling,
) => {
    const ukerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? stønadskontoer[Dekningsgrad.HUNDRE_PROSENT]
            : stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );
    return fordeling.antallDagerSøker1 > ukerOgDagerFellesperiode.totaltAntallDager
        ? ukerOgDagerFellesperiode.totaltAntallDager
        : fordeling.antallDagerSøker1;
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    locale: LocaleAll;
}

const PlanenDeresSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();
    const [visningsmodus, setVisningsmodus] = useState<Visningsmodus>('kalender');

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    const oppdaterPeriodeOgFordeling = (value: string) => {
        const dekningsgrad = value as Dekningsgrad;
        lagreHvorLangPeriode({ dekningsgrad });
        if (fordeling) {
            lagreFordeling({
                antallDagerSøker1: finnAntallDagerSøker1(dekningsgrad, stønadskontoer, fordeling),
            });
        }
    };

    const familiesituasjon = getFamiliesituasjon(omBarnet);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const farOgFarKunEnPartHarRett =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        (hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett');

    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto100, omBarnet);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto80, omBarnet);

    const antallUkerOgDager100 = finnAntallUkerOgDagerMedForeldrepenger(uttaksdata100);
    const antallUkerOgDager80 = finnAntallUkerOgDagerMedForeldrepenger(uttaksdata80);
    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    // const uttaksperioder = lagKalenderPerioder(
    //     valgtStønadskonto,
    //     omBarnet,
    //     hvemPlanlegger,
    //     arbeidssituasjon,
    //     fordeling?.antallDagerSøker1,
    // );

    const planforslag = deltUttak({
        famDato: familiehendelsedato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
    });
    const kombinertPlanforslag = [...planforslag.søker1, ...planforslag.søker2].sort(sorterPerioder);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    const erOversiktSteg = true;
    const isDesktop = useMedia('screen and (min-width: 480)');
    return (
        <form>
            <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
                <VStack gap="10">
                    <Heading size="medium" spacing level="2">
                        <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" />}
                        color="gray"
                        icon={<InformationIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                    >
                        <BodyLong>
                            <FormattedMessage id="OversiktSteg.Infoboks.Utkast.Tekst" />
                        </BodyLong>
                    </Infobox>
                    {farOgFarKunEnPartHarRett && omBarnet.erFødsel && (
                        <Infobox
                            header={<FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt" />}
                            icon={
                                <PersonGroupIcon height={24} width={24} fontSize="1.5rem" color="#0067C5" aria-hidden />
                            }
                            color="green"
                        >
                            <div>
                                <BodyShort>
                                    <FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon" />
                                </BodyShort>
                            </div>
                        </Infobox>
                    )}
                    <VStack gap="1">
                        <ToggleGroup
                            defaultValue={hvorLangPeriode?.dekningsgrad}
                            size={isDesktop ? 'medium' : 'small'}
                            variant="neutral"
                            onChange={oppdaterPeriodeOgFordeling}
                            style={{ width: '100%' }}
                        >
                            <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                                <FormattedMessage
                                    id="OversiktSteg.100"
                                    values={{
                                        uker: antallUkerOgDager100.uker,
                                        dager: antallUkerOgDager100.dager,
                                    }}
                                />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                                <FormattedMessage
                                    id="OversiktSteg.80"
                                    values={{ uker: antallUkerOgDager80.uker, dager: antallUkerOgDager80.dager }}
                                />
                            </ToggleGroup.Item>
                        </ToggleGroup>
                        {hvemHarRett === 'beggeHarRett' &&
                            (!omBarnet.erFødsel || hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) && (
                                <Select
                                    defaultValue={fordeling?.antallDagerSøker1}
                                    label={''}
                                    name="antallDagerSøker1"
                                    onChange={(e) => {
                                        lagreFordeling({ antallDagerSøker1: parseInt(e.target.value, 10) });
                                    }}
                                >
                                    {getFellesperiodefordelingSelectOptions(antallUkerOgDagerFellesperiode).map(
                                        (value) => (
                                            <option
                                                key={value.antallUkerOgDagerSøker1.totaltAntallDager}
                                                value={value.antallUkerOgDagerSøker1.totaltAntallDager}
                                            >
                                                {finnFellesperiodeFordelingOptionTekst(
                                                    intl,
                                                    value,
                                                    hvemPlanlegger,
                                                    fornavnSøker1,
                                                    fornavnSøker2,
                                                    erOversiktSteg,
                                                )}
                                            </option>
                                        ),
                                    )}
                                </Select>
                            )}
                    </VStack>

                    <VStack gap="5">
                        <PlanvisningToggle setVisningsmodus={setVisningsmodus} />

                        <CalendarLabels
                            uttaksdata={
                                hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                                    ? uttaksdata100
                                    : uttaksdata80
                            }
                            hvemPlanlegger={hvemPlanlegger}
                            barnet={omBarnet}
                            hvemHarRett={hvemHarRett}
                        />

                        {visningsmodus === 'liste' && (
                            <UttaksplanNy
                                familiehendelsedato={familiehendelsedato}
                                bareFarHarRett={hvemHarRett === 'kunSøker2HarRett'}
                                erFarEllerMedmor={false}
                                familiesituasjon={familiesituasjon}
                                gjelderAdopsjon={familiesituasjon === 'adopsjon'}
                                navnPåForeldre={{
                                    farMedmor: getNavnPåSøker2(hvemPlanlegger, intl) || 'Annen forelder',
                                    mor: getNavnPåSøker1(hvemPlanlegger, intl),
                                }}
                                førsteUttaksdagNesteBarnsSak={undefined}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={planforslag.søker1}
                                annenPartsPerioder={planforslag.søker2}
                                barn={{
                                    antallBarn: 1,
                                    type: BarnType.FØDT,
                                    fødselsdatoer: [familiehendelsedato],
                                    termindato: familiehendelsedato,
                                }}
                            />
                        )}
                    </VStack>

                    <VStack gap="5">
                        {visningsmodus === 'kalender' && (
                            <div className={styles.calendar}>
                                <Calendar periods={kombinertPlanforslag} familiehendelsedato={familiehendelsedato} />
                            </div>
                        )}
                    </VStack>
                    <VStack gap="1">
                        <OmÅTilpassePlanen
                            arbeidssituasjon={arbeidssituasjon}
                            barnet={omBarnet}
                            hvemPlanlegger={hvemPlanlegger}
                        />
                        <UforutsetteEndringer
                            arbeidssituasjon={arbeidssituasjon}
                            hvemPlanlegger={hvemPlanlegger}
                            barnet={omBarnet}
                        />
                    </VStack>
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </PlanleggerStepPage>
        </form>
    );
};

export default PlanenDeresSteg;
