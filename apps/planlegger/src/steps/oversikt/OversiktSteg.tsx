import { InformationIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import { default as Infobox } from 'components/boxes/Infobox';
import Calendar from 'components/calendar/Calendar';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Situasjon } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoer } from 'types/TilgjengeligeStønadskontoer';
import { erAlenesøker, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { lagKalenderPerioder } from 'utils/kalenderPerioderUtils';
import { getAntallUkerFellesperiode } from 'utils/stønadskontoerUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import OversiktLabels from './labels/OversiktLabels';
import styles from './oversiktSteg.module.css';
import OmÅTilpassePlanen from './tilpassePlanen/OmÅTilpassePlanen';
import UforutsetteEndringer from './uforutsetteEndringer/UforutsetteEndringer';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    locale: LocaleAll;
}

const OversiktSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const farOgFarKunEnPartHarRett =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        (hvemHarRett === 'kunFarSøker1HarRett' || hvemHarRett === 'kunMedfarHarRett');

    const uttaksdata100 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto100,
        barnet,
        fordeling?.antallUkerSøker1,
    );
    const uttaksdata80 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto80,
        barnet,
        fordeling?.antallUkerSøker1,
    );

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);
    const ukerFødsel = antallUker100 + 6;

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        fordeling?.antallUkerSøker1,
    );

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    return (
        <form>
            <PlanleggerStepPage steps={stepConfig}>
                <VStack gap="10">
                    <Heading size="large" spacing level="2">
                        <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" />}
                        isGray
                        icon={<InformationIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                    >
                        <BodyLong>
                            <FormattedMessage id="OversiktSteg.Infoboks.Utkast.Tekst" values={{ erAleneforsørger }} />
                        </BodyLong>
                    </Infobox>
                    {farOgFarKunEnPartHarRett && barnet.erFødsel && (
                        <Infobox
                            header={<FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt" />}
                            icon={
                                <PersonGroupIcon height={24} width={24} fontSize="1.5rem" color="#0067C5" aria-hidden />
                            }
                        >
                            <div>
                                <BodyShort>
                                    <FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk" />
                                </BodyShort>

                                <BodyShort>
                                    <FormattedMessage
                                        id="OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon"
                                        values={{ uker: antallUker100, ukerFødsel: ukerFødsel, uker2: antallUker80 }}
                                    />
                                </BodyShort>
                            </div>
                        </Infobox>
                    )}
                    <ToggleGroup
                        defaultValue={hvorLangPeriode?.dekningsgrad}
                        size="medium"
                        variant="neutral"
                        onChange={(value) => lagreHvorLangPeriode({ dekningsgrad: value as Dekningsgrad })}
                        style={{ width: '100%' }}
                    >
                        <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                            <FormattedMessage
                                id="OversiktSteg.100"
                                values={{
                                    uker: antallUker100,
                                }}
                            />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                            <FormattedMessage id="OversiktSteg.80" values={{ uker: antallUker80 }} />
                        </ToggleGroup.Item>
                    </ToggleGroup>
                    {hvemHarRett === 'beggeHarRett' &&
                        (!barnet.erFødsel || hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) && (
                            <Select
                                defaultValue={fordeling?.antallUkerSøker1}
                                label={<FormattedMessage id="OversiktSteg.Fellesperiodefordeling" />}
                                name="antallUkerSøker1"
                                onChange={(e) => {
                                    lagreFordeling({ antallUkerSøker1: parseInt(e.target.value, 10) });
                                }}
                            >
                                {getFellesperiodefordelingSelectOptions(antallUkerFellesperiode).map((value) => (
                                    <option key={value.antallUkerSøker1} value={value.antallUkerSøker1}>
                                        {finnFellesperiodeFordelingOptionTekst(
                                            intl,
                                            value,
                                            hvemPlanlegger,
                                            fornavnSøker1,
                                            fornavnSøker2,
                                        )}
                                    </option>
                                ))}
                            </Select>
                        )}
                    <OversiktLabels
                        uttaksdata={
                            hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? uttaksdata100 : uttaksdata80
                        }
                        hvemPlanlegger={hvemPlanlegger}
                        barnet={barnet}
                        valgtStønadskonto={valgtStønadskonto}
                        hvemHarRett={hvemHarRett}
                    />
                    <div className={styles.calendar}>
                        <Calendar periods={uttaksperioder} />
                    </div>
                    <VStack gap="5">
                        <OmÅTilpassePlanen
                            arbeidssituasjon={arbeidssituasjon}
                            barnet={barnet}
                            hvemPlanlegger={hvemPlanlegger}
                        />
                        <UforutsetteEndringer
                            arbeidssituasjon={arbeidssituasjon}
                            hvemPlanlegger={hvemPlanlegger}
                            barnet={barnet}
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

export default OversiktSteg;
