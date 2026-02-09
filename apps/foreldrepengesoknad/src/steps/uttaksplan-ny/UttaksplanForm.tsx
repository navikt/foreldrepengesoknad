import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getTermindato } from 'utils/barnUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';
import { erIkkeEøsPeriode } from 'utils/uttaksplanInfoUtils';

import { Alert, Radio, VStack } from '@navikt/ds-react';

import { isAnnenForelderOppgitt, isIkkeUtfyltTypeBarn } from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import {
    Barn,
    PersonMedArbeidsforholdDto_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';
import { useErAntallDagerOvertrukketIUttaksplan } from '@navikt/fp-uttaksplan-ny';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { VilDuGåTilbakeModal } from './VilDuGåTilbakeModal';

const NULLSTILTE_PERIODE_VEDLEGG: VedleggDataType = {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [],
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [],
    [Skjemanummer.DOK_SYKDOM_MOR]: [],
    [Skjemanummer.DOK_SYKDOM_FAR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: [],
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: [],
    [Skjemanummer.DOK_ARBEID_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
};

type FormValues = {
    ønskerJustertUttakVedFødsel?: boolean;
};

interface UttaksplanFormProps {
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    defaultUttaksperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    setFeilmelding: (melding: string) => void;
    scrollToKvoteOppsummering: () => void;
}

export const UttaksplanForm = ({
    søkerInfo,
    defaultUttaksperioder,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    setFeilmelding,
    scrollToKvoteOppsummering,
}: UttaksplanFormProps) => {
    const intl = useIntl();

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA_NY);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN_NY);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);

    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const oppdaterUttaksplanMetadata = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA_NY);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN_NY);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    const erEndringssøknad = !!valgtEksisterendeSaksnr;

    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

    const formMethods = useForm<FormValues>({
        defaultValues: {
            ønskerJustertUttakVedFødsel: uttaksplanMetadata?.ønskerJustertUttakVedFødsel,
        },
    });

    const harSvartJaPåAutoJustering = !!formMethods.watch('ønskerJustertUttakVedFødsel');

    const erAntallDagerOvertrukket = useErAntallDagerOvertrukketIUttaksplan();

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erDeltUttak =
        oppgittAnnenForelder?.harRettPåForeldrepengerINorge === true ||
        oppgittAnnenForelder?.harRettPåForeldrepengerIEØS === true;

    const erMorUfør = getErMorUfør(annenForelder, erSøkerFarEllerMedmor);
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const bareFarHarRett = erSøkerFarEllerMedmor && (!erDeltUttak || erMorUfør || erAleneOmOmsorg);

    const visAutomatiskJustering =
        erSøkerFarEllerMedmor &&
        søkersituasjon.situasjon === 'fødsel' &&
        uttaksplan &&
        finnPerioderRundtFødsel(uttaksplan, barn).length > 0 &&
        isUfødtBarn(barn) &&
        barn.termindato !== undefined &&
        !bareFarHarRett;

    const onSubmit = (formValues: FormValues) => {
        if (uttaksplan && uttaksplan.length === 0) {
            setFeilmelding(intl.formatMessage({ id: 'UttaksplanSteg.IngenPerioder' }));
            scrollToKvoteOppsummering();
        } else if (erAntallDagerOvertrukket) {
            setFeilmelding(intl.formatMessage({ id: 'UttaksplanSteg.OvertrukketDager' }));
            scrollToKvoteOppsummering();
        } else if (harPeriodeDerMorsAktivitetIkkeErValgt(uttaksplan || defaultUttaksperioder)) {
            setFeilmelding(intl.formatMessage({ id: 'UttaksplanSteg.MorsAktivitetIkkeValgt' }));
            scrollToKvoteOppsummering();
        } else {
            oppdaterUttaksplanMetadata({
                ønskerJustertUttakVedFødsel: visAutomatiskJustering
                    ? formValues.ønskerJustertUttakVedFødsel
                    : undefined,
            });

            if (!uttaksplan) {
                oppdaterUttaksplan(defaultUttaksperioder);
            }

            return navigator.goToNextDefaultStep();
        }
    };

    //TODO (TOR) TFP-6583 Fjern bruk av VilDuGåTilbakeModal og resett context i andre steg
    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);

    const gåTilForrigeSteg = () => {
        setGåTilbakeIsOpen(false);

        oppdaterUttaksplanMetadata(undefined);
        oppdaterUttaksplan(undefined);
        oppdaterVedlegg({ ...vedlegg, ...NULLSTILTE_PERIODE_VEDLEGG });

        navigator.goToPreviousDefaultStep();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-24">
                <VilDuGåTilbakeModal
                    isOpen={gåTilbakeIsOpen}
                    setIsOpen={setGåTilbakeIsOpen}
                    goToPreviousStep={gåTilForrigeSteg}
                />
                {visAutomatiskJustering && (
                    <VStack gap="space-16">
                        <AutomatiskJusteringInfotekst harSvartJaPåAutoJustering={harSvartJaPåAutoJustering} />
                        <RhfRadioGroup
                            name="ønskerJustertUttakVedFødsel"
                            control={formMethods.control}
                            label={<FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Spørsmål" />}
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

const AutomatiskJusteringInfotekst = ({ harSvartJaPåAutoJustering }: { harSvartJaPåAutoJustering: boolean }) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN_NY);

    const termindato = getTermindato(barn);

    const uttaksdagPåEllerEtterTermin = termindato
        ? UttaksdagenString.denneEllerNeste(termindato).getDato()
        : undefined;

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
        ((erUttaksperiode(perioderMedUttakRundtFødsel[0]!) &&
            (perioderMedUttakRundtFødsel[0]!.kontoType !== 'FEDREKVOTE' ||
                !erSamtidigUttak(perioderMedUttakRundtFødsel[0]!))) ||
            erOverføringsperiode(perioderMedUttakRundtFødsel[0]!));

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
        erUttaksperiode(perioderMedUttakRundtFødsel[0]!) &&
        perioderMedUttakRundtFødsel[0]!.kontoType === 'FEDREKVOTE' &&
        erFlerbarnsdager(perioderMedUttakRundtFødsel[0]!);

    if (harSvartJaOgEndretPeriodenTilØnskerFlerbarnsdager) {
        return (
            <Alert variant="info">
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager" />
            </Alert>
        );
    }

    return null;
};

const erUttaksperiode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt): boolean => {
    return !('trekkdager' in periode) && !periode.oppholdÅrsak && !periode.overføringÅrsak && !periode.utsettelseÅrsak;
};

const erOverføringsperiode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt): boolean => {
    return !('trekkdager' in periode) && !!periode.overføringÅrsak;
};

const erSamtidigUttak = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt): boolean => {
    return !('trekkdager' in periode) && !!periode.samtidigUttak;
};

const erFlerbarnsdager = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt): boolean => {
    return !('trekkdager' in periode) && !!periode.flerbarnsdager;
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
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
    const sisteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

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
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

    return valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const harPeriodeDerMorsAktivitetIkkeErValgt = (
    perioder?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
) => {
    return (
        perioder &&
        perioder.some(
            (periode) =>
                erIkkeEøsPeriode(periode) &&
                periode.forelder === 'FAR_MEDMOR' &&
                periode.kontoType === 'FELLESPERIODE' &&
                periode.flerbarnsdager === undefined &&
                periode.morsAktivitet === undefined,
        )
    );
};
