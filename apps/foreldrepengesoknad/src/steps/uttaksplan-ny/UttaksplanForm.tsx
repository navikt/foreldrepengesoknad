import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { Radio, VStack } from '@navikt/ds-react';

import { isAnnenForelderOppgitt, isIkkeUtfyltTypeBarn } from '@navikt/fp-common';
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

type FormValues = {
    ønskerJustertUttakVedFødsel?: boolean;
};

interface UttaksplanFormProps {
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    setFeilmelding: (melding: string) => void;
    scrollToKvoteOppsummering: () => void;
}

export const UttaksplanForm = ({
    søkerInfo,
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
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_NY));

    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const oppdaterUttaksplanMetadata = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA_NY);

    const erEndringssøknad = !!valgtEksisterendeSaksnr;

    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

    const formMethods = useForm<FormValues>({
        defaultValues: {
            ønskerJustertUttakVedFødsel: uttaksplanMetadata?.ønskerJustertUttakVedFødsel,
        },
    });

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
        harPerioderRundtFødsel(uttaksplan, barn) &&
        isUfødtBarn(barn) &&
        barn.termindato !== undefined &&
        !bareFarHarRett;

    const onSubmit = (formValues: FormValues) => {
        if (erAntallDagerOvertrukket) {
            setFeilmelding(intl.formatMessage({ id: 'UttaksplanSteg.OvertrukketDager' }));
            scrollToKvoteOppsummering();
        } else {
            oppdaterUttaksplanMetadata({
                ønskerJustertUttakVedFødsel: visAutomatiskJustering
                    ? formValues.ønskerJustertUttakVedFødsel
                    : undefined,
            });
            return navigator.goToNextDefaultStep();
        }
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-24">
                {visAutomatiskJustering && (
                    <RhfRadioGroup
                        name="ønskerJustertUttakVedFødsel"
                        control={formMethods.control}
                        label={<FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'uttaksplan.automatiskJustering.svar.påkrevd' })),
                        ]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Nei" />
                        </Radio>
                    </RhfRadioGroup>
                )}
                <StepButtonsHookForm
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    onAvsluttOgSlett={avbrytSøknad}
                    onFortsettSenere={navigator.fortsettSøknadSenere}
                />
            </VStack>
        </RhfForm>
    );
};

const harPerioderRundtFødsel = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    barnet: Barn,
): boolean => {
    if (isAdoptertBarn(barnet) || isIkkeUtfyltTypeBarn(barnet)) {
        return false;
    }

    const familiehendelsesdato = isFødtBarn(barnet) ? barnet.fødselsdatoer[0]! : barnet.termindato;

    return (
        erNoenPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsesdato) ||
        erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(valgtePerioder, familiehendelsesdato)
    );
};

const erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
    const sisteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const erNoenPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato = (
    valgtePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
) => {
    const førsteDag = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = UttaksdagenString.forrige(familiehendelsedato).getDato();

    return valgtePerioder.some((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};
