import dayjs from 'dayjs';
import { Control } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import {
    Barn,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { isIkkeUtfyltTypeBarn } from '@navikt/fp-types/src/Barn';
import { Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

type SkalViseArgs = {
    erSøkerFarEllerMedmor: boolean;
    erFødselsSituasjon: boolean;
    bareFarHarRett: boolean;
    harMellomlagretPlan: boolean;
    erEndringssøknad: boolean;
    planForValidering: AlleUttakPerioder[];
    barn: Barn;
};

/**
 * Avgjer om automatisk justering av uttak ved fødsel skal tilbydast.
 * Vert berre aktuelt for far/medmor med eit uføtt barn der brukar har éin
 * periode rundt termin og delar foreldrepengane med mor.
 */
export const skalViseAutomatiskJustering = ({
    erSøkerFarEllerMedmor,
    erFødselsSituasjon,
    bareFarHarRett,
    harMellomlagretPlan,
    erEndringssøknad,
    planForValidering,
    barn,
}: SkalViseArgs): boolean => {
    if (!erSøkerFarEllerMedmor || !erFødselsSituasjon || bareFarHarRett) {
        return false;
    }
    if (!harMellomlagretPlan) {
        return false;
    }
    if (erEndringssøknad && planForValidering.length === 0) {
        return false;
    }
    if (!isUfødtBarn(barn) || barn.termindato === undefined) {
        return false;
    }
    return (
        finnPerioderRundtFødsel(planForValidering, barn).filter(
            (p) => Uttaksperioden.erIkkeEøsPeriode(p) && p.forelder === 'FAR_MEDMOR',
        ).length === 1
    );
};

type SpørsmålProps = {
    control: Control<{ ønskerJustertUttakVedFødsel?: boolean }>;
    harSvartJaPåAutoJustering: boolean;
    uttaksplan: AlleUttakPerioder[];
    barn: Barn;
};

export const AutomatiskJusteringSpørsmål = ({
    control,
    harSvartJaPåAutoJustering,
    uttaksplan,
    barn,
}: SpørsmålProps) => {
    const intl = useIntl();

    return (
        <VStack gap="space-16">
            <AutomatiskJusteringInfotekst
                harSvartJaPåAutoJustering={harSvartJaPåAutoJustering}
                uttaksplan={uttaksplan}
                barn={barn}
            />
            <RhfRadioGroup
                name="ønskerJustertUttakVedFødsel"
                control={control}
                label={
                    <FormattedMessage
                        id="UttaksplanSteg.AutomatiskJustering.Spørsmål"
                        values={{ antallBarn: barn.antallBarn }}
                    />
                }
                validate={[isRequired(intl.formatMessage({ id: 'UttaksplanSteg.AutomatiskJustering.Svar.Påkrevd' }))]}
            >
                <Radio value={true}>
                    <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="UttaksplanSteg.AutomatiskJustering.Nei" />
                </Radio>
            </RhfRadioGroup>
        </VStack>
    );
};

const AutomatiskJusteringInfotekst = ({
    harSvartJaPåAutoJustering,
    uttaksplan,
    barn,
}: {
    harSvartJaPåAutoJustering: boolean;
    uttaksplan: AlleUttakPerioder[];
    barn: Barn;
}) => {
    if (!harSvartJaPåAutoJustering) {
        return null;
    }

    const termindato = isFødtBarn(barn) ? barn.termindato : isUfødtBarn(barn) ? barn.termindato : undefined;
    const uttaksdagPåEllerEtterTermin = termindato ? Uttaksdagen.denneEllerNeste(termindato).getDato() : undefined;
    const perioderRundtFødsel = finnPerioderRundtFødsel(uttaksplan, barn);
    const variant = utledInfotekstVariant(perioderRundtFødsel, uttaksdagPåEllerEtterTermin);

    if (variant === null) {
        return null;
    }

    return (
        <Alert variant="info">
            {variant === 'flerePerioder' && (
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisFlerePerioder" />
            )}
            {variant === 'ikkeLengerStarterPåTermin' && (
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin" />
            )}
            {variant === 'endretPeriodePåTermin' && (
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin" />
            )}
            {variant === 'endretPeriodeTilØnskerFlerbarnsdager' && (
                <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager" />
            )}
        </Alert>
    );
};

type InfotekstVariant =
    | 'flerePerioder'
    | 'ikkeLengerStarterPåTermin'
    | 'endretPeriodePåTermin'
    | 'endretPeriodeTilØnskerFlerbarnsdager';

const utledInfotekstVariant = (
    perioderRundtFødsel: AlleUttakPerioder[],
    uttaksdagPåEllerEtterTermin: string | undefined,
): InfotekstVariant | null => {
    if (perioderRundtFødsel.length > 1) {
        return 'flerePerioder';
    }
    if (perioderRundtFødsel.length !== 1) {
        return null;
    }

    const første = perioderRundtFødsel[0]!;
    const starterPåTermin = dayjs(første.fom).isSame(uttaksdagPåEllerEtterTermin, 'day');

    if (!starterPåTermin) {
        return 'ikkeLengerStarterPåTermin';
    }

    if (
        (Uttaksperioden.erUttaksperiode(første) &&
            (første.kontoType !== 'FEDREKVOTE' || !Uttaksperioden.erSamtidigUttak(første))) ||
        Uttaksperioden.erOverføringsperiode(første)
    ) {
        return 'endretPeriodePåTermin';
    }

    if (
        Uttaksperioden.erUttaksperiode(første) &&
        første.kontoType === 'FEDREKVOTE' &&
        Uttaksperioden.erFlerbarnsdager(første)
    ) {
        return 'endretPeriodeTilØnskerFlerbarnsdager';
    }

    return null;
};

const finnPerioderRundtFødsel = (valgtePerioder: AlleUttakPerioder[], barnet: Barn): AlleUttakPerioder[] => {
    if (isAdoptertBarn(barnet) || isIkkeUtfyltTypeBarn(barnet)) {
        return [];
    }
    const familiehendelsesdato = isFødtBarn(barnet) ? barnet.fødselsdatoer[0]! : barnet.termindato;

    return finnPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato(valgtePerioder, familiehendelsesdato).concat(
        finnPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(valgtePerioder, familiehendelsesdato),
    );
};

const finnPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato = (
    valgtePerioder: AlleUttakPerioder[],
    familiehendelsedato: string,
): AlleUttakPerioder[] => {
    const førsteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDato();
    const sisteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

    return valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};

const finnPerioderInnenforIntervalletToUkerFørFamDatoOgFamDato = (
    valgtePerioder: AlleUttakPerioder[],
    familiehendelsedato: string,
): AlleUttakPerioder[] => {
    const førsteDag = Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(15);
    const sisteDag = Uttaksdagen.forrige(familiehendelsedato).getDato();

    return valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        return tom.isSameOrAfter(førsteDag, 'day') && fom.isSameOrBefore(sisteDag, 'day');
    });
};
