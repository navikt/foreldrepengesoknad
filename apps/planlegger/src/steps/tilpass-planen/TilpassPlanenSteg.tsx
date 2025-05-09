import { ArrowRedoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { erAlenesøker, getErFarEllerMedmor, getNavnPåSøker1, getNavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAnnenpartsPerioder, getFamiliehendelsedato, getSøkersPerioder } from 'utils/uttakUtils';

import { Alert, BodyLong, Button, HStack, Heading, Modal, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import {
    Dekningsgrad,
    LocaleAll,
    OppholdÅrsakType,
    RettighetType,
    SaksperiodeNy,
    TilgjengeligeStønadskontoer,
} from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { KvoteOppsummering, UttaksplanNy } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { usePlanleggerNavigator } from '../../app-data/usePlanleggerNavigator';
import { useStepData } from '../../app-data/useStepData';
import { CalendarLabels } from '../../components/labels/CalendarLabels';
import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { PlanvisningToggle, Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { getFamiliesituasjon, mapOmBarnetTilBarn } from '../../utils/barnetUtils';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';
import styles from './tilpassPlanenSteg.module.css';

interface Props {
    locale: LocaleAll;
    stønadskontoer: TilgjengeligeStønadskontoer;
}

export const TilpassPlanenSteg = ({ locale, stønadskontoer }: Props) => {
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
    const originalUttaksplan = notEmpty(
        useContextGetData(ContextDataType.ORIGINAL_UTTAKSPLAN),
        'Uttaksplan ikke oppgitt',
    );

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];
    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;
    const barnehagestartdato = barnehagestartDato(omBarnet);

    const gjeldendeUttaksplan = uttaksplan.length > 0 ? uttaksplan[uttaksplan.length - 1] : [];

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const familiesituasjon = getFamiliesituasjon(omBarnet);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erDeltUttak = fordeling !== undefined;

    const utledRettighetType = () => {
        if (erDeltUttak) {
            return RettighetType.BEGGE_RETT;
        }
        if (erAleneforsørger) {
            return RettighetType.ALENEOMSORG;
        }

        return RettighetType.BARE_SØKER_RETT;
    };

    const handleOnPlanChange = (perioder: SaksperiodeNy[]) => {
        const nyUttaksplan = [...uttaksplan];
        nyUttaksplan.push(perioder);
        lagreUttaksplan(nyUttaksplan);
    };

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
                    <FormattedMessage id="TilpassPlanenSteg.Tittel" values={{ erAleneforsørger }} />
                </Heading>

                <VStack gap="5">
                    <HvaErMulig hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} barnet={omBarnet} />

                    <VStack gap="10">
                        <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
                    </VStack>
                    {visningsmodus === 'liste' && (
                        <>
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
                                erAleneOmOmsorg={erAleneforsørger}
                            />
                            <KvoteOppsummering
                                hvemPlanleggerType={hvemPlanlegger.type}
                                visStatusIkoner
                                konto={valgtStønadskonto}
                                perioder={[
                                    ...getSøkersPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor),
                                    ...getAnnenpartsPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor).map(
                                        (p) => {
                                            // I innsyn så er fellesperioder for annen part gitt uten kontotype og med oppholdÅrsak istedetfor.
                                            // Derfor trikser vi til periodene i planleggeren til å følge samme format.
                                            if (p.kontoType === StønadskontoType.Fellesperiode) {
                                                return {
                                                    ...p,
                                                    kontoType: undefined,
                                                    oppholdÅrsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
                                                };
                                            }
                                            return p;
                                        },
                                    ),
                                ]}
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
                                bareFarHarRett={bareFarMedmorHarRett}
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
                                    />
                                }
                                barnehagestartdato={barnehagestartdato}
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
                                lagreUttaksplan([originalUttaksplan]);
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
