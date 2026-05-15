import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getErMorUfør } from 'utils/annenForelderUtils';
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
    isUfødtBarn,
} from '@navikt/fp-types';
import { isIkkeUtfyltTypeBarn } from '@navikt/fp-types/src/Barn';
import { Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { GåTilbakeModal } from './GåTilbakeModal';
import { useFinnFørsteSubmitFeilmelding } from './submitValidering';

export { harKunPerioderForAnnenForelder } from './submitValidering';

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
}: UttaksplanFormProps) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const harJustertUttakVedFødsel = useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const oppdaterHarJustertUttakVedFødsel = useContextSaveData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erEndringssøknad = !!valgtEksisterendeSaksnr;
    const uttaksplanMedKunNyePerioder =
        uttaksplan?.filter((p) => Uttaksperioden.erIkkeEøsPeriode(p) && p.resultat === undefined) ?? [];
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

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erDeltUttak =
        oppgittAnnenForelder?.harRettPåForeldrepengerINorge === true ||
        oppgittAnnenForelder?.harRettPåForeldrepengerIEØS === true;

    const erMorUfør = getErMorUfør(annenForelder, erSøkerFarEllerMedmor);
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const bareFarHarRett = erSøkerFarEllerMedmor && (!erDeltUttak || erMorUfør || erAleneOmOmsorg);

    const termindato = getTermindato(barn);
    const uttaksdagPåEllerEtterTermin = termindato ? Uttaksdagen.denneEllerNeste(termindato).getDato() : undefined;

    const perioderRundtFødselForFarMedmor = gjeldendeUttaksplan
        ? finnPerioderRundtFødsel(gjeldendeUttaksplan, barn).filter(
              (p) => Uttaksperioden.erIkkeEøsPeriode(p) && p.forelder === 'FAR_MEDMOR',
          )
        : [];

    const visAutomatiskJustering =
        erSøkerFarEllerMedmor &&
        søkersituasjon.situasjon === 'fødsel' &&
        perioderRundtFødselForFarMedmor.length === 1 &&
        uttaksdagPåEllerEtterTermin !== undefined &&
        dayjs(perioderRundtFødselForFarMedmor[0]!.fom).isSame(uttaksdagPåEllerEtterTermin, 'day') &&
        isUfødtBarn(barn) &&
        barn.termindato !== undefined &&
        !bareFarHarRett;

    const finnFørsteSubmitFeilmelding = useFinnFørsteSubmitFeilmelding({ opprinneligPlan });

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

        return navigator.goToNextDefaultStep();
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
                            uttaksplan={gjeldendeUttaksplan}
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
            (perioderMedUttakRundtFødsel[0]!.kontoType !== 'FEDREKVOTE' ||
                !Uttaksperioden.erSamtidigUttak(perioderMedUttakRundtFødsel[0]!))) ||
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
