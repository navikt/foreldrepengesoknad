import { ArrowCirclepathIcon, ArrowUndoIcon, PencilIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { erAlenesøker, erMedmorDelAvSøknaden, getErFarEllerMedmor, getNavnPåForeldre } from 'utils/HvemPlanleggerUtils';
import { mapOmBarnetTilBarn } from 'utils/barnetUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { Alert, BodyLong, Button, HStack, Heading, Modal, VStack } from '@navikt/ds-react';

import { KontoBeregningResultatDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { KvoteOppsummering, UttaksplanDataProvider, UttaksplanKalender, UttaksplanNy } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { PlanvisningToggle, Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';

interface Props {
    stønadskontoer: KontoBeregningResultatDto;
}

export const TilpassPlanenSteg = ({ stønadskontoer }: Props) => {
    const [open, setOpen] = useState(false);
    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

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
    const [currentUttaksplanIndex, setCurrentUttaksplanIndex] = useState(Math.max(initiellUttaksplanIndex, 0));

    const stønadskonto100 = stønadskontoer['100'];
    const stønadskonto80 = stønadskontoer['80'];
    const valgtStønadskonto = hvorLangPeriode.dekningsgrad === '100' ? stønadskonto100 : stønadskonto80;
    const barnehagestartdato = barnehagestartDato(omBarnet);

    const gjeldendeUttaksplan = uttaksplan.length > 0 ? uttaksplan[currentUttaksplanIndex]! : [];

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const isMedmorDelAvSøknaden = erMedmorDelAvSøknaden(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erDeltUttak = fordeling !== undefined;

    const utledRettighetType = () => {
        if (erDeltUttak) {
            return 'BEGGE_RETT';
        }
        if (erAleneOmOmsorg) {
            return 'ALENEOMSORG';
        }

        return 'BARE_SØKER_RETT';
    };

    const oppdaterUttaksplan = (perioder: UttakPeriode_fpoversikt[]) => {
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

    const handleToggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    const navnPåForeldre = getNavnPåForeldre(hvemPlanlegger, intl);

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
                            setCurrentUttaksplanIndex(0);
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

            <UttaksplanDataProvider
                barn={mapOmBarnetTilBarn(omBarnet)}
                erFarEllerMedmor={erFarEllerMedmor}
                navnPåForeldre={navnPåForeldre}
                modus="planlegger"
                valgtStønadskonto={valgtStønadskonto}
                aleneOmOmsorg={erAleneOmOmsorg}
                erMedmorDelAvSøknaden={isMedmorDelAvSøknaden}
                bareFarMedmorHarRett={bareFarMedmorHarRett}
                harAktivitetskravIPeriodeUtenUttak={false}
                erDeltUttak={erDeltUttak}
                saksperioder={gjeldendeUttaksplan}
            >
                <VStack gap="space-24">
                    <Alert variant="info">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="TilpassPlanenSteg.SavnerDuNoe.Tittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="TilpassPlanenSteg.SavnerDuNoe.Tekst" />
                        </BodyLong>
                    </Alert>

                    <Heading size="medium" spacing level="2">
                        <FormattedMessage
                            id="TilpassPlanenSteg.Tittel"
                            values={{ erAleneforsørger: erAleneOmOmsorg }}
                        />
                    </Heading>

                    <VStack gap="space-24">
                        <HvaErMulig
                            hvemPlanlegger={hvemPlanlegger}
                            arbeidssituasjon={arbeidssituasjon}
                            barnet={omBarnet}
                        />

                        <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
                        {visningsmodus === 'liste' && (
                            <>
                                <UttaksplanNy
                                    oppdaterUttaksplan={oppdaterUttaksplan}
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                                <HStack gap="space-16">
                                    <Button
                                        size="small"
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
                                        size="small"
                                        variant="secondary"
                                        icon={<ArrowUndoIcon aria-hidden height={24} width={24} />}
                                        onClick={() => {
                                            if (currentUttaksplanIndex > 0) {
                                                setCurrentUttaksplanIndex(currentUttaksplanIndex - 1);
                                            }
                                        }}
                                    >
                                        <FormattedMessage id="TilpassPlanenSteg.Angre" />
                                    </Button>
                                    <Button
                                        size="small"
                                        variant={isAllAccordionsOpen ? 'primary' : 'secondary'}
                                        icon={
                                            isAllAccordionsOpen ? (
                                                <XMarkIcon aria-hidden height={24} width={24} />
                                            ) : (
                                                <PencilIcon aria-hidden height={24} width={24} />
                                            )
                                        }
                                        onClick={handleToggleAllAccordions}
                                    >
                                        {isAllAccordionsOpen ? (
                                            <FormattedMessage id="TilpassPlanenSteg.LukkPerioder" />
                                        ) : (
                                            <FormattedMessage id="TilpassPlanenSteg.EndrePlanen" />
                                        )}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        icon={<TrashIcon aria-hidden height={24} width={24} />}
                                        onClick={() => setOpen(true)}
                                    >
                                        <FormattedMessage id="TilpassPlanenSteg.FjernAlt" />
                                    </Button>
                                </HStack>
                                <KvoteOppsummering visStatusIkoner rettighetType={utledRettighetType()} />
                            </>
                        )}
                    </VStack>

                    <VStack gap="space-20">
                        {visningsmodus === 'kalender' && (
                            <div className="max-[479px]:p-0">
                                <UttaksplanKalender
                                    readOnly={!erUttaksplanKalenderRedigerbar()}
                                    barnehagestartdato={barnehagestartdato}
                                    oppdaterUttaksplan={oppdaterUttaksplan}
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
            </UttaksplanDataProvider>
        </PlanleggerStepPage>
    );
};

const erUttaksplanKalenderRedigerbar = () => {
    const hostname = globalThis.location.hostname;
    return hostname === 'localhost' || hostname === 'www.intern.dev.nav.no';
};
