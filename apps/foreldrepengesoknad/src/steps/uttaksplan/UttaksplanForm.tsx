import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTermindato } from 'utils/barnUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { Alert, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import {
    Barn,
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
    isIkkeUtfyltTypeBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { GåTilbakeModal } from './GåTilbakeModal';
import { erSammePeriodeInkludertDatoer, useFinnFørsteSubmitFeilmelding } from './submitValidering';

type FormValues = {
    ønskerJustertUttakVedFødsel?: boolean;
};

interface UttaksplanFormProps {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    defaultUttaksperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    setFeilmelding: (melding: ReactNode) => void;
    scrollToKvoteOppsummering: () => void;
    eksisterendeSak: FpSak_fpoversikt | undefined;
    opprinneligPlan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined;
    erEndringssøknad: boolean;
}

export const UttaksplanForm = ({
    søkerInfo,
    defaultUttaksperioder,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    setFeilmelding,
    scrollToKvoteOppsummering,
    eksisterendeSak,
    opprinneligPlan,
    erEndringssøknad,
}: UttaksplanFormProps) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const harJustertUttakVedFødsel = useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    const oppdaterHarJustertUttakVedFødsel = useContextSaveData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const uttaksplanMedKunNyePerioder =
        uttaksplan?.filter(
            (p) =>
                Uttaksperioden.erIkkeEøsPeriode(p) &&
                (p.resultat === undefined ||
                    (opprinneligPlan !== undefined && !opprinneligPlan.some((o) => erSammePeriodeInkludertDatoer(p, o)))),
        ) ?? [];
    const gjeldendeUttaksplan = erEndringssøknad ? uttaksplanMedKunNyePerioder : uttaksplan;

    const navigator = useFpNavigator(
        søkerInfo.arbeidsforhold,
        mellomlagreSøknadOgNaviger,
        erEndringssøknad,
        eksisterendeSak,
    );

    const formMethods = useForm<FormValues>({
        defaultValues: {
            ønskerJustertUttakVedFødsel: harJustertUttakVedFødsel,
        },
    });

    const harSvartJaPåAutoJustering = !!formMethods.watch('ønskerJustertUttakVedFødsel');

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const erFødselssituasjonForFar = erSøkerFarEllerMedmor && søkersituasjon.situasjon === 'fødsel';

    // Når far/medmor kommer rett fra planleggeren ligg uttaket i defaultUttaksperioder fram til
    // planen blir redigert (då blir uttaksplan-context fylt). Bruk same fallback som onSubmit slik
    // at spørsmålet om automatisk justering står fast med ein gong, utan at brukaren må tukle med planen.
    const planForVisning = gjeldendeUttaksplan ?? defaultUttaksperioder;

    const farMedmorPerioder = planForVisning
        .filter((p): p is UttakPeriode_fpoversikt => Uttaksperioden.erIkkeEøsPeriode(p))
        .filter((p) => p.forelder === 'FAR_MEDMOR');

    const visAutomatiskJustering =
        erFødselssituasjonForFar &&
        isUfødtBarn(barn) &&
        barn.termindato !== undefined &&
        kanJustereFarsUttakRundtFødsel(farMedmorPerioder, barn.termindato);

    const finnFørsteSubmitFeilmelding = useFinnFørsteSubmitFeilmelding({ opprinneligPlan, erEndringssøknad });

    const onSubmit = (formValues: FormValues) => {
        const planForValidering = gjeldendeUttaksplan ?? defaultUttaksperioder;
        const feilmelding = finnFørsteSubmitFeilmelding(planForValidering);

        if (feilmelding) {
            setFeilmelding(feilmelding);
            scrollToKvoteOppsummering();

            return;
        }

        oppdaterHarJustertUttakVedFødsel(visAutomatiskJustering ? formValues.ønskerJustertUttakVedFødsel : undefined);

        if (!gjeldendeUttaksplan) {
            oppdaterUttaksplan(defaultUttaksperioder);
        }

        return navigator.goToNextStep();
    };

    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-24">
                <GåTilbakeModal
                    isOpen={gåTilbakeIsOpen}
                    setIsOpen={setGåTilbakeIsOpen}
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                />
                {visAutomatiskJustering && (
                    <VStack gap="space-16">
                        <AutomatiskJusteringInfotekst
                            harSvartJaPåAutoJustering={harSvartJaPåAutoJustering}
                            uttaksplan={planForVisning}
                        />
                        <RhfRadioGroup
                            name="ønskerJustertUttakVedFødsel"
                            control={formMethods.control}
                            label={
                                <FormattedMessage
                                    id="UttaksplanSteg.AutomatiskJustering.Spørsmål"
                                    values={{ antallBarn: barn.antallBarn }}
                                />
                            }
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'UttaksplanSteg.AutomatiskJustering.Svar.Påkrevd' }),
                                ),
                            ]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Nei" />
                            </Radio>
                        </RhfRadioGroup>
                    </VStack>
                )}
                <StepButtonsHookForm
                    goToPreviousStep={
                        uttaksplan
                            ? () => {
                                  setGåTilbakeIsOpen(true);
                              }
                            : navigator.goToPreviousDefaultStep
                    }
                    onAvsluttOgSlett={avbrytSøknad}
                    onFortsettSenere={navigator.fortsettSøknadSenere}
                />
            </VStack>
        </RhfForm>
    );
};

const AutomatiskJusteringInfotekst = ({
    harSvartJaPåAutoJustering,
    uttaksplan,
}: {
    harSvartJaPåAutoJustering: boolean;
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
}) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const termindato = getTermindato(barn);

    const uttaksdagPåEllerEtterTermin = termindato ? Uttaksdagen.denneEllerNeste(termindato).getDato() : undefined;

    const perioderMedUttakRundtFødsel = finnPerioderRundtFødsel(uttaksplan ?? [], barn);

    const harSvartJaOgHarFlerePerioderInnen6Uker = harSvartJaPåAutoJustering && perioderMedUttakRundtFødsel.length > 1;

    if (harSvartJaOgHarFlerePerioderInnen6Uker) {
        return (
            <Alert variant="info">
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisFlerePerioder" />
            </Alert>
        );
    }

    const harSvartJaOgHarEnPeriodeRundtFødsel = harSvartJaPåAutoJustering && perioderMedUttakRundtFødsel.length === 1;

    const harSvartJaOgStarterIkkeLengerPåTermin =
        harSvartJaOgHarEnPeriodeRundtFødsel &&
        uttaksdagPåEllerEtterTermin &&
        !dayjs(perioderMedUttakRundtFødsel[0]!.fom).isSame(uttaksdagPåEllerEtterTermin, 'day');

    if (harSvartJaOgStarterIkkeLengerPåTermin) {
        return (
            <Alert variant="info">
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin" />
            </Alert>
        );
    }

    const harSvartJaOgEndretPeriodenPåTermin =
        harSvartJaOgHarEnPeriodeRundtFødsel &&
        dayjs(perioderMedUttakRundtFødsel[0]!.fom).isSame(uttaksdagPåEllerEtterTermin, 'day') &&
        ((Uttaksperioden.erUttaksperiode(perioderMedUttakRundtFødsel[0]!) &&
            !erJusterbartUttakRundtTermin(perioderMedUttakRundtFødsel[0]!)) ||
            Uttaksperioden.erOverføringsperiode(perioderMedUttakRundtFødsel[0]!));

    if (harSvartJaOgEndretPeriodenPåTermin) {
        return (
            <Alert variant="info">
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin" />
            </Alert>
        );
    }

    const harSvartJaOgEndretPeriodenTilØnskerFlerbarnsdager =
        harSvartJaOgHarEnPeriodeRundtFødsel &&
        dayjs(perioderMedUttakRundtFødsel[0]!.fom).isSame(uttaksdagPåEllerEtterTermin, 'day') &&
        Uttaksperioden.erUttaksperiode(perioderMedUttakRundtFødsel[0]!) &&
        perioderMedUttakRundtFødsel[0]!.kontoType === 'FEDREKVOTE' &&
        Uttaksperioden.erFlerbarnsdager(perioderMedUttakRundtFødsel[0]!);

    if (harSvartJaOgEndretPeriodenTilØnskerFlerbarnsdager) {
        return (
            <Alert variant="info">
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager" />
            </Alert>
        );
    }

    return null;
};

const finnPerioderRundtFødsel = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    barnet: Barn,
) => {
    if (isAdoptertBarn(barnet) || isIkkeUtfyltTypeBarn(barnet)) {
        return [];
    }

    const familiehendelsesdato = isFødtBarn(barnet) ? barnet.fødselsdatoer[0]! : barnet.termindato;

    return finnPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsesdato).concat(
        finnPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(valgtePerioder, familiehendelsesdato),
    );
};

const finnPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
) => {
    const førsteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDato();
    const sisteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

    return valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const finnPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
) => {
    const førsteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = Uttaksdagen.forrige(familiehendelsedato).getDato();

    return valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const erJusterbartUttakRundtTermin = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): boolean =>
    periode.kontoType === 'FORELDREPENGER' ||
    (periode.kontoType === 'FEDREKVOTE' && 'samtidigUttak' in periode && periode.samtidigUttak !== undefined);

/**
 * Speilar backend-regelen `FarsJustering.skalJustere` i fpsak. Far/medmor sitt uttak rundt fødsel kan
 * berre justerast automatisk når:
 *  1. den første perioden i fars plan startar på termin,
 *  2. den er ei ekte uttaksperiode (ikkje utsettelse/opphald/overføring) av justerbar type
 *     (FORELDREPENGER, eller FEDREKVOTE med samtidig uttak),
 *  3. den ligg HEILT innanfor intervallet far rundt fødsel: [termin - 2 veker, termin + 6 veker - 1 dag], og
 *  4. det er nøyaktig éin periode inne i det intervallet.
 *
 * Den gamle frontend-logikken kravde berre at perioden *starta* på termin og hadde rett type, men sjekka
 * verken at perioden var omslutta av intervallet eller at det var den første perioden i planen. Då kunne
 * søknaden sende `ønskerJustertUttakVedFødsel = true` for plan backend ikkje kan justere (t.d. ein lang
 * foreldrepengeperiode som strekk seg forbi 6 veker), og backend logga "Kan ikke justere fars uttak rundt
 * fødsel. Selv om bruker har søkt om justering!".
 */
export const kanJustereFarsUttakRundtFødsel = (
    farMedmorPerioder: UttakPeriode_fpoversikt[],
    termindato: string,
): boolean => {
    if (farMedmorPerioder.length === 0) {
        return false;
    }

    const sortertePerioder = [...farMedmorPerioder].sort((p1, p2) => dayjs(p1.fom).diff(dayjs(p2.fom)));

    const termindatoUttaksdag = Uttaksdagen.denneEllerNeste(termindato).getDato();
    const intervallFom = dayjs(termindatoUttaksdag).subtract(2, 'week');
    const intervallTom = dayjs(termindatoUttaksdag).add(6, 'week').subtract(1, 'day');

    const liggerHeiltInnanforIntervallet = (periode: UttakPeriode_fpoversikt) =>
        dayjs(periode.fom).isSameOrAfter(intervallFom, 'day') && dayjs(periode.tom).isSameOrBefore(intervallTom, 'day');

    const førstePeriode = sortertePerioder[0]!;

    const førstePeriodeStarterPåTermin = dayjs(Uttaksdagen.denneEllerNeste(førstePeriode.fom).getDato()).isSame(
        termindatoUttaksdag,
        'day',
    );

    const førstePeriodeErJusterbar =
        Uttaksperioden.erUttaksperiode(førstePeriode) &&
        erJusterbartUttakRundtTermin(førstePeriode) &&
        liggerHeiltInnanforIntervallet(førstePeriode) &&
        førstePeriodeStarterPåTermin;

    if (!førstePeriodeErJusterbar) {
        return false;
    }

    return sortertePerioder.filter(liggerHeiltInnanforIntervallet).length === 1;
};
