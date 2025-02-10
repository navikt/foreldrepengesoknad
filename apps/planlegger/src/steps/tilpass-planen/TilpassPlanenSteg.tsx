import { ArrowRedoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { erAlenesøker, getErFarEllerMedmor, getNavnPåSøker1, getNavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getFamiliehendelsedato, lagForslagTilPlan } from 'utils/uttakUtils';

import { BodyLong, Button, HStack, Heading, Modal, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { LocaleAll, SaksperiodeNy, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { usePlanleggerNavigator } from '../../app-data/usePlanleggerNavigator';
import { useStepData } from '../../app-data/useStepData';
import { CalendarLabels } from '../../components/labels/CalendarLabels';
import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { PlanvisningToggle, Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { Arbeidsstatus } from '../../types/Arbeidssituasjon';
import { Situasjon } from '../../types/HvemPlanlegger';
import { erBarnetAdoptert, getFamiliesituasjon, mapOmBarnetTilBarn } from '../../utils/barnetUtils';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';
import styles from './tilpassPlanenSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    locale: LocaleAll;
}

export const TilpassPlanenSteg = ({ stønadskontoer, locale }: Props) => {
    const [open, setOpen] = useState(false);

    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();
    const [visningsmodus, setVisningsmodus] = useState<Visningsmodus>('liste');

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN), 'Uttaksplan ikke oppgitt');
    const gjeldendeUttaksplan = uttaksplan.length > 0 ? uttaksplan[uttaksplan.length - 1] : [];

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const familiesituasjon = getFamiliesituasjon(omBarnet);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    const planforslag = lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(omBarnet),
        erFarEllerMedmor,
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg: hvemPlanlegger.type === Situasjon.FAR || hvemPlanlegger.type === Situasjon.MOR,
    });

    const handleOnPlanChange = (perioder: SaksperiodeNy[]) => {
        const nyUttaksplan = [...uttaksplan];
        nyUttaksplan.push(perioder);
        lagreUttaksplan(nyUttaksplan);
    };

    const getSøkersPerioder = () => {
        return gjeldendeUttaksplan.filter((p) =>
            erFarEllerMedmor ? p.forelder === Forelder.farMedmor : p.forelder === Forelder.mor,
        );
    };

    const getAnnenpartsPerioder = () => {
        return gjeldendeUttaksplan.filter((p) =>
            erFarEllerMedmor ? p.forelder === Forelder.mor : p.forelder === Forelder.farMedmor,
        );
    };

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            {/* // TODO: Legg modal i eget komponent - få tekst inn i intl.  */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                header={{
                    heading: intl.formatMessage({ id: 'TilpassPlanenSteg.FjernAlt.Modal.Tittel' }),
                    size: 'small',
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Body" />
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                            lagreUttaksplan([]);
                            setOpen(false);
                        }}
                    >
                        <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Knapp.Bekreft" />
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        <FormattedMessage id="TilpassPlanenSteg.FjernAlt.Modal.Knapp.Avbryt" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <VStack gap="6">
                <Heading size="medium" spacing level="2">
                    <FormattedMessage id="TilpassPlanenSteg.Tittel" values={{ erAleneforsørger }} />
                </Heading>

                <VStack gap="5">
                    <HvaErMulig hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} barnet={omBarnet} />

                    <VStack gap="10">
                        <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
                    </VStack>
                    {visningsmodus === 'liste' && (
                        <UttaksplanNy
                            familiehendelsedato={familiehendelsedato}
                            bareFarHarRett={bareFarMedmorHarRett}
                            erFarEllerMedmor={erFarEllerMedmor}
                            familiesituasjon={familiesituasjon}
                            gjelderAdopsjon={familiesituasjon === 'adopsjon'}
                            navnPåForeldre={{
                                farMedmor: getNavnPåSøker2(hvemPlanlegger, intl) || 'Annen forelder',
                                mor: getNavnPåSøker1(hvemPlanlegger, intl),
                            }}
                            førsteUttaksdagNesteBarnsSak={undefined}
                            harAktivitetskravIPeriodeUtenUttak={false}
                            søkersPerioder={getSøkersPerioder()}
                            annenPartsPerioder={getAnnenpartsPerioder()}
                            barn={mapOmBarnetTilBarn(omBarnet)}
                            handleOnPlanChange={handleOnPlanChange}
                            planleggerModus={true}
                        />
                    )}
                </VStack>

                <VStack gap="5">
                    {visningsmodus === 'kalender' && (
                        <div className={styles.calendar}>
                            <UttaksplanKalender
                                bareFarHarRett={bareFarMedmorHarRett}
                                erFarEllerMedmor={erFarEllerMedmor}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={planforslag.søker1}
                                annenPartsPerioder={planforslag.søker2}
                                navnAnnenPart="Test"
                                barn={mapOmBarnetTilBarn(omBarnet)}
                                planleggerLegend={
                                    <CalendarLabels
                                        hvemPlanlegger={hvemPlanlegger}
                                        barnet={omBarnet}
                                        hvemHarRett={hvemHarRett}
                                    />
                                }
                            />
                        </div>
                    )}
                    <HStack gap="4">
                        <Button
                            // TODO: Legg til funksjonalitet som gjør at denne gir feilmelding dersom det ikke er noe å angre på
                            size="xsmall"
                            variant="secondary"
                            icon={<ArrowRedoIcon aria-hidden height={24} width={24} />}
                            onClick={() => {
                                lagreUttaksplan([uttaksplan[0]]);
                            }}
                        >
                            <FormattedMessage id="TilpassPlanenSteg.Tilbakestill" />
                        </Button>
                        <Button
                            size="xsmall"
                            variant="secondary"
                            icon={<TrashIcon aria-hidden height={24} width={24} />}
                            onClick={() => setOpen(true)}
                        >
                            <FormattedMessage id="TilpassPlanenSteg.FjernAlt" />
                        </Button>
                    </HStack>
                </VStack>
                <StepButtons
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    nextButtonOnClick={navigator.goToNextDefaultStep}
                    useSimplifiedTexts
                />
            </VStack>
        </PlanleggerStepPage>
    );
};
