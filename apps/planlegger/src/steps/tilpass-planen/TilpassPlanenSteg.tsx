import { ArrowCirclepathIcon, ArrowUndoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { erAlenesøker, getErFarEllerMedmor, getNavnPåSøker1, getNavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { getFamiliesituasjon, mapOmBarnetTilBarn } from 'utils/barnetUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAnnenpartsPerioder, getFamiliehendelsedato, getSøkersPerioder } from 'utils/uttakUtils';

import { Alert, BodyLong, Button, HStack, Heading, Modal, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { Dekningsgrad, RettighetType, SaksperiodeNy, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import {
    KvoteOppsummering,
    Planperiode,
    UttaksplanNy,
    finnOgSettInnHull,
    utledKomplettPlan,
} from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { CalendarLabels } from '../../components/labels/CalendarLabels';
import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { PlanvisningToggle, Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';
import styles from './tilpassPlanenSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
}

export const TilpassPlanenSteg = ({ stønadskontoer }: Props) => {
    const [open, setOpen] = useState(false);

    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const [visningsmodus, setVisningsmodus] = useState<Visningsmodus>('liste');

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN), 'Uttaksplan ikke oppgitt');
    const originalUttaksplan = notEmpty(
        useContextGetData(ContextDataType.ORIGINAL_UTTAKSPLAN),
        'Uttaksplan ikke oppgitt',
    );

    // Uttaksplan lagrer hver state av planen i et array. Når denne siden laster vil vi starte på den siste endringen.
    const initiellUttaksplanIndex = uttaksplan.length - 1;
    const [currentUttaksplanIndex, setCurrentUttaksplanIndex] = useState(
        initiellUttaksplanIndex < 0 ? 0 : initiellUttaksplanIndex,
    );

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];
    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;
    const barnehagestartdato = barnehagestartDato(omBarnet);

    const gjeldendeUttaksplan = uttaksplan.length > 0 ? uttaksplan[currentUttaksplanIndex] : [];

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const familiesituasjon = getFamiliesituasjon(omBarnet);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erDeltUttak = fordeling !== undefined;

    const utledRettighetType = () => {
        if (erDeltUttak) {
            return RettighetType.BEGGE_RETT;
        }
        if (erAleneOmOmsorg) {
            return RettighetType.ALENEOMSORG;
        }

        return RettighetType.BARE_SØKER_RETT;
    };

    const handleOnPlanChange = (perioder: SaksperiodeNy[]) => {
        let nyUttaksplan = [];

        if (currentUttaksplanIndex !== uttaksplan.length - 1) {
            nyUttaksplan = uttaksplan.slice(0, currentUttaksplanIndex + 1);
        } else {
            nyUttaksplan = uttaksplan.length >= 6 ? [...uttaksplan.toSpliced(1, 1)] : [...uttaksplan];
        }

        nyUttaksplan.push(perioder);
        setCurrentUttaksplanIndex(nyUttaksplan.length - 1);
        lagreUttaksplan(nyUttaksplan);
    };

    const navnPåForeldre = {
        farMedmor: getNavnPåSøker2(hvemPlanlegger, intl),
        mor: getNavnPåSøker1(hvemPlanlegger, intl),
    };

    const konverterTilPlanperiode = (periode: SaksperiodeNy): Planperiode => ({
        ...periode,
        id: `${periode.fom}-${periode.tom}`,
        readOnly: false,
        fom: periode.fom,
        tom: periode.tom,
    });

    const søkersPerioder = getSøkersPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor);
    const søkersPerioderAsPlanperiode = søkersPerioder.map(konverterTilPlanperiode);

    const perioderMedHull: Planperiode[] = finnOgSettInnHull(
        søkersPerioderAsPlanperiode,
        false,
        familiehendelsedato,
        familiesituasjon === 'adopsjon',
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        undefined,
    );

    const harTapteDager = perioderMedHull.some((periode) => periode.periodeHullÅrsak === 'Tapte dager');

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
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
                            lagreUttaksplan([[]]);
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
                <Alert variant="info">
                    <Heading size="medium" spacing level="2">
                        Savner du noe i planleggeren?
                    </Heading>
                    <BodyLong>
                        Vi jobber med å forbedre planleggeren. Det betyr at flere funksjoner kommer snart. Det kan
                        derfor være forskjeller mellom det du kan legge inn i planleggeren og det du faktisk kan søke
                        om.
                    </BodyLong>
                </Alert>

                <Heading size="medium" spacing level="2">
                    <FormattedMessage id="TilpassPlanenSteg.Tittel" values={{ erAleneforsørger: erAleneOmOmsorg }} />
                </Heading>

                <VStack gap="6">
                    <HvaErMulig hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} barnet={omBarnet} />

                    <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
                    {visningsmodus === 'liste' && (
                        <>
                            <UttaksplanNy
                                familiehendelsedato={familiehendelsedato}
                                bareFarMedmorHarRett={bareFarMedmorHarRett}
                                erFarEllerMedmor={erFarEllerMedmor}
                                familiesituasjon={familiesituasjon}
                                gjelderAdopsjon={familiesituasjon === 'adopsjon'}
                                navnPåForeldre={navnPåForeldre}
                                førsteUttaksdagNesteBarnsSak={undefined}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={getSøkersPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor)}
                                annenPartsPerioder={getAnnenpartsPerioder(
                                    erDeltUttak,
                                    gjeldendeUttaksplan,
                                    erFarEllerMedmor,
                                )}
                                barn={mapOmBarnetTilBarn(omBarnet)}
                                handleOnPlanChange={handleOnPlanChange}
                                modus="planlegger"
                                valgtStønadskonto={valgtStønadskonto}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                            />
                            <HStack gap="4">
                                <Button
                                    size="xsmall"
                                    variant="secondary"
                                    icon={<ArrowCirclepathIcon aria-hidden height={24} width={24} />}
                                    onClick={() => {
                                        setCurrentUttaksplanIndex(0);
                                        lagreUttaksplan([originalUttaksplan]);
                                    }}
                                >
                                    <FormattedMessage id="TilpassPlanenSteg.Tilbakestill" />
                                </Button>
                                <Button
                                    size="xsmall"
                                    variant="secondary"
                                    icon={<ArrowUndoIcon aria-hidden height={24} width={24} />}
                                    onClick={() => {
                                        if (currentUttaksplanIndex > 0) {
                                            setCurrentUttaksplanIndex(currentUttaksplanIndex - 1);
                                        }
                                    }}
                                >
                                    Angre
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
                            <KvoteOppsummering
                                navnPåForeldre={navnPåForeldre}
                                modus="planlegger"
                                visStatusIkoner
                                konto={valgtStønadskonto}
                                perioder={utledKomplettPlan({
                                    familiehendelsedato,
                                    erFarEllerMedmor,
                                    søkersPerioder: getSøkersPerioder(
                                        erDeltUttak,
                                        gjeldendeUttaksplan,
                                        erFarEllerMedmor,
                                    ),
                                    annenPartsPerioder: getAnnenpartsPerioder(
                                        erDeltUttak,
                                        gjeldendeUttaksplan,
                                        erFarEllerMedmor,
                                    ),
                                    gjelderAdopsjon: familiesituasjon === 'adopsjon',
                                    bareFarMedmorHarRett,
                                    harAktivitetskravIPeriodeUtenUttak: false,
                                    førsteUttaksdagNesteBarnsSak: undefined,
                                    modus: 'planlegger',
                                })}
                                rettighetType={utledRettighetType()}
                                forelder={erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor}
                            />
                        </>
                    )}
                </VStack>

                <VStack gap="5">
                    {visningsmodus === 'kalender' && (
                        <div className={styles.calendar}>
                            <UttaksplanKalender
                                bareFarMedmorHarRett={bareFarMedmorHarRett}
                                erFarEllerMedmor={erFarEllerMedmor}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={getSøkersPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor)}
                                annenPartsPerioder={getAnnenpartsPerioder(
                                    erDeltUttak,
                                    gjeldendeUttaksplan,
                                    erFarEllerMedmor,
                                )}
                                navnAnnenPart="Test" //TODO: fiks denne før prod?
                                barn={mapOmBarnetTilBarn(omBarnet)}
                                planleggerLegend={
                                    <CalendarLabels
                                        hvemPlanlegger={hvemPlanlegger}
                                        barnet={omBarnet}
                                        hvemHarRett={hvemHarRett}
                                        uttaksplan={gjeldendeUttaksplan}
                                        inneholderTapteDager={harTapteDager}
                                    />
                                }
                                barnehagestartdato={barnehagestartdato}
                            />
                        </div>
                    )}
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
