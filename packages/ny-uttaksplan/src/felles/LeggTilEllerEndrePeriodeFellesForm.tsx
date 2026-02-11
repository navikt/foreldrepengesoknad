import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Alert, BodyShort, InlineMessage, Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import type {
    BrukerRolleSak_fpoversikt,
    Gradering_fpoversikt,
    KontoTypeUttak,
    MorsAktivitet,
    UttakOverføringÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, getFloatFromString } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { getStønadskontoNavnSimple } from '../liste/utils/uttaksplanListeUtils';
import { erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import {
    erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato,
    useHentGyldigeKontotyper,
} from './useHentGyldigeKontotyper';
import { prosentValideringGradering, valideringSamtidigUttak } from './uttaksplanValidatorer';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export type LeggTilEllerEndrePeriodeFormFormValues = {
    forelder?: BrukerRolleSak_fpoversikt | 'BEGGE';
    kontoTypeMor?: KontoTypeUttak;
    kontoTypeFarMedmor?: KontoTypeUttak;
    samtidigUttaksprosentMor?: string;
    samtidigUttaksprosentFarMedmor?: string;
    skalDuKombinereArbeidOgUttakMor?: boolean;
    skalDuKombinereArbeidOgUttakFarMedmor?: boolean;
    stillingsprosentMor?: string;
    stillingsprosentFarMedmor?: string;
    morsAktivitet?: MorsAktivitet;
    overføringsårsak?: UttakOverføringÅrsak_fpoversikt;
};

interface Props {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    resetFormValuesVedEndringAvForelder: (forelder: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined) => void;
}

export const LeggTilEllerEndrePeriodeFellesForm = ({ valgtePerioder, resetFormValuesVedEndringAvForelder }: Props) => {
    const intl = useIntl();

    const {
        foreldreInfo: { rettighetType, erMedmorDelAvSøknaden },
        familiehendelsedato,
        uttakPerioder,
    } = useUttaksplanData();

    const formMethods = useFormContext<LeggTilEllerEndrePeriodeFormFormValues>();

    const {
        forelder,
        kontoTypeMor,
        kontoTypeFarMedmor,
        skalDuKombinereArbeidOgUttakMor,
        samtidigUttaksprosentMor,
        samtidigUttaksprosentFarMedmor,
        stillingsprosentMor,
        stillingsprosentFarMedmor,
        skalDuKombinereArbeidOgUttakFarMedmor,
    } = formMethods.watch();

    const infotekstOmFedrekvoteBrukRundtFødsel = getInfotekstOmFedrekvoteBrukRundtFødsel(
        uttakPerioder,
        valgtePerioder,
        kontoTypeFarMedmor,
        familiehendelsedato,
        erMedmorDelAvSøknaden,
        stillingsprosentFarMedmor,
    );

    const erFarMedmorUtenAleneomsorg =
        forelder === 'FAR_MEDMOR' &&
        rettighetType !== 'ALENEOMSORG' &&
        (kontoTypeFarMedmor === 'FORELDREPENGER' || kontoTypeFarMedmor === 'FELLESPERIODE');

    const skalViseMorsAktivitetskravVedSamtidigUttak = getSkalViseMorsAktivitetskravVedSamtidigUttak(
        forelder,
        samtidigUttaksprosentMor,
        stillingsprosentMor,
        samtidigUttaksprosentFarMedmor,
        kontoTypeFarMedmor,
    );

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useHentGyldigeKontotyper(
        valgtePerioder,
        forelder === 'BEGGE',
    );

    const erMorGyldigForelder = gyldigeStønadskontoerForMor.length > 0;
    const erFarMedmorGyldigForelder = gyldigeStønadskontoerForFarMedmor.length > 0;
    const morSøkerOmOverføring = kontoTypeMor === 'FEDREKVOTE' && forelder === 'MOR';
    const farMedmorSøkerOmOverføring = kontoTypeFarMedmor === 'MØDREKVOTE' && forelder === 'FAR_MEDMOR';

    if (!erMorGyldigForelder && !erFarMedmorGyldigForelder) {
        return (
            <Alert variant="info">
                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon" />
            </Alert>
        );
    }

    const resetStillingsprosentMor = () => {
        if ((forelder === 'MOR' || forelder === 'BEGGE') && skalDuKombinereArbeidOgUttakMor === false) {
            formMethods.resetField('stillingsprosentMor', undefined);
        }
    };

    const resetStillingsprosentFarMedmor = () => {
        if ((forelder === 'FAR_MEDMOR' || forelder === 'BEGGE') && skalDuKombinereArbeidOgUttakFarMedmor === false) {
            formMethods.resetField('stillingsprosentFarMedmor', undefined);
        }
    };

    return (
        <>
            <RhfRadioGroup
                name="forelder"
                control={formMethods.control}
                validate={[isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.Påkrevd' }))]}
                label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder' })}
                onChange={resetFormValuesVedEndringAvForelder}
            >
                {
                    [
                        erMorGyldigForelder && (
                            <Radio key="mor" value="MOR">
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Mor" />
                            </Radio>
                        ),
                        erFarMedmorGyldigForelder && (
                            <Radio key="far" value="FAR_MEDMOR">
                                {erMedmorDelAvSøknaden ? (
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Medmor" />
                                ) : (
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Far" />
                                )}
                            </Radio>
                        ),
                        erMorGyldigForelder && erFarMedmorGyldigForelder && (
                            <Radio key="begge" value="BEGGE">
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Begge" />
                            </Radio>
                        ),
                    ].filter(Boolean) as React.ReactElement[]
                }
            </RhfRadioGroup>

            {forelder !== undefined && <hr className="text-ax-border-neutral-subtle" />}

            {(forelder === 'MOR' || forelder === 'BEGGE') && (
                <RhfRadioGroup
                    name="kontoTypeMor"
                    control={formMethods.control}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KontoTypeMor.Påkrevd' })),
                    ]}
                    label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KontoTypeMor' })}
                >
                    {gyldigeStønadskontoerForMor.map((konto) => {
                        return (
                            <Radio key={konto} value={konto}>
                                {getStønadskontoNavnSimple(intl, konto, erMedmorDelAvSøknaden)}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
            )}
            {(forelder === 'FAR_MEDMOR' || forelder === 'BEGGE') && (
                <RhfRadioGroup
                    name="kontoTypeFarMedmor"
                    control={formMethods.control}
                    validate={[
                        isRequired(
                            intl.formatMessage(
                                {
                                    id: 'LeggTilEllerEndrePeriodeForm.KontoTypeFarMedmor.Påkrevd',
                                },
                                {
                                    erMedmor: erMedmorDelAvSøknaden,
                                },
                            ),
                        ),
                    ]}
                    label={
                        <FormattedMessage
                            id="LeggTilEllerEndrePeriodeForm.KontoTypeFarMedmor"
                            values={{ erMedmor: erMedmorDelAvSøknaden }}
                        />
                    }
                >
                    {gyldigeStønadskontoerForFarMedmor.map((konto) => {
                        return (
                            <Radio key={konto} value={konto}>
                                {getStønadskontoNavnSimple(intl, konto, erMedmorDelAvSøknaden)}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
            )}

            {morSøkerOmOverføring && (
                <VStack gap="space-16">
                    <hr className="text-ax-border-neutral-subtle" />
                    <InlineMessage status="info">
                        <VStack gap="space-8">
                            <BodyShort>
                                <FormattedMessage
                                    id="LeggTilEllerEndrePeriodeForm.Overføring.Info1.Mor"
                                    values={{ erMedmor: erMedmorDelAvSøknaden }}
                                />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="LeggTilEllerEndrePeriodeForm.Overføring.Info2.Mor"
                                    values={{ erMedmor: erMedmorDelAvSøknaden }}
                                />
                            </BodyShort>
                        </VStack>
                    </InlineMessage>
                    <RhfRadioGroup
                        name="overføringsårsak"
                        control={formMethods.control}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'LeggTilEllerEndrePeriodeForm.Overføringsårsak.Påkrevd',
                                }),
                            ),
                        ]}
                        label={
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.Mor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        }
                    >
                        <Radio value="INSTITUSJONSOPPHOLD_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.Innlagt.Mor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                        <Radio value="SYKDOM_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.ForSyk.Mor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                    </RhfRadioGroup>
                </VStack>
            )}

            {farMedmorSøkerOmOverføring && (
                <VStack gap="space-16">
                    <hr className="text-ax-border-neutral-subtle" />
                    <InlineMessage status="info">
                        <VStack gap="space-8">
                            <VStack gap="space-8">
                                <BodyShort>
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Overføring.Info1.FarMedmor" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Overføring.Info2.FarMedmor" />
                                </BodyShort>
                            </VStack>
                        </VStack>
                    </InlineMessage>
                    <RhfRadioGroup
                        name="overføringsårsak"
                        control={formMethods.control}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'LeggTilEllerEndrePeriodeForm.Overføringsårsak.Påkrevd',
                                }),
                            ),
                        ]}
                        label={
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.FarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        }
                    >
                        <Radio value="INSTITUSJONSOPPHOLD_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.Innlagt.FarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                        <Radio value="SYKDOM_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.ForSyk.FarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                    </RhfRadioGroup>
                </VStack>
            )}

            {(erFarMedmorUtenAleneomsorg || skalViseMorsAktivitetskravVedSamtidigUttak) && (
                <>
                    <hr className="text-ax-border-neutral-subtle" />
                    <RhfSelect
                        name="morsAktivitet"
                        label={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Label' })}
                        control={formMethods.control}
                        validate={[isRequired(intl.formatMessage({ id: 'AktivitetskravSpørsmål.Påkrevd' }))]}
                        description={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Description' })}
                    >
                        {getAktivitetskravOptions(skalViseMorsAktivitetskravVedSamtidigUttak).map((value) => {
                            return (
                                <option key={value} value={value}>
                                    {getAktivitetskravTekst(value, intl)}
                                </option>
                            );
                        })}
                    </RhfSelect>
                </>
            )}
            {forelder === 'BEGGE' && (
                <>
                    <hr className="text-ax-border-neutral-subtle" />
                    <RhfNumericField
                        control={formMethods.control}
                        className="max-w-xs"
                        label={<FormattedMessage id="LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor" />}
                        name="samtidigUttaksprosentMor"
                        validate={[valideringSamtidigUttak(intl, stillingsprosentMor)]}
                        maxLength={5}
                    />
                    <RhfNumericField
                        control={formMethods.control}
                        className="max-w-xs"
                        label={
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentFarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        }
                        name="samtidigUttaksprosentFarMedmor"
                        validate={[valideringSamtidigUttak(intl, stillingsprosentFarMedmor)]}
                        maxLength={5}
                    />
                </>
            )}
            {kontoTypeMor !== undefined && (forelder === 'MOR' || forelder === 'BEGGE') && !morSøkerOmOverføring && (
                <>
                    <hr className="text-ax-border-neutral-subtle" />
                    <VStack gap="space-16">
                        <RhfRadioGroup
                            name="skalDuKombinereArbeidOgUttakMor"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor.Påkrevd',
                                    }),
                                ),
                            ]}
                            onChange={resetStillingsprosentMor}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Nei" />
                            </Radio>
                        </RhfRadioGroup>
                        {skalDuKombinereArbeidOgUttakMor && (
                            <>
                                {erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato(
                                    valgtePerioder,
                                    familiehendelsedato,
                                ) && (
                                    <Alert variant="info">
                                        <FormattedMessage id="LeggTilEllerEndrePeriodeFellesForm.DagerReduseres" />
                                    </Alert>
                                )}
                                <RhfNumericField
                                    name="stillingsprosentMor"
                                    control={formMethods.control}
                                    className="max-w-xs"
                                    label={intl.formatMessage({
                                        id: 'LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor',
                                    })}
                                    validate={[prosentValideringGradering(intl, samtidigUttaksprosentMor)]}
                                    maxLength={5}
                                />
                            </>
                        )}
                    </VStack>
                </>
            )}
            {(forelder === 'FAR_MEDMOR' || forelder === 'BEGGE') && !farMedmorSøkerOmOverføring && (
                <>
                    <hr className="text-ax-border-neutral-subtle" />
                    <VStack gap="space-16">
                        <RhfRadioGroup
                            name="skalDuKombinereArbeidOgUttakFarMedmor"
                            control={formMethods.control}
                            label={intl.formatMessage(
                                { id: 'LeggTilEllerEndrePeriodeForm.SkalKombinere.FarMedmor' },
                                { erMedmor: erMedmorDelAvSøknaden },
                            )}
                            validate={[
                                isRequired(
                                    intl.formatMessage(
                                        {
                                            id: 'LeggTilEllerEndrePeriodeForm.SkalKombinere.FarMedmor.Påkrevd',
                                        },
                                        { erMedmor: erMedmorDelAvSøknaden },
                                    ),
                                ),
                            ]}
                            onChange={resetStillingsprosentFarMedmor}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Nei" />
                            </Radio>
                        </RhfRadioGroup>
                        {skalDuKombinereArbeidOgUttakFarMedmor && (
                            <RhfNumericField
                                name="stillingsprosentFarMedmor"
                                control={formMethods.control}
                                className="max-w-xs"
                                label={intl.formatMessage(
                                    {
                                        id: 'LeggTilEllerEndrePeriodeForm.Stillingsprosent.FarMedmor',
                                    },
                                    { erMedmor: erMedmorDelAvSøknaden },
                                )}
                                validate={[prosentValideringGradering(intl, samtidigUttaksprosentFarMedmor)]}
                                maxLength={5}
                            />
                        )}
                    </VStack>
                </>
            )}
            {infotekstOmFedrekvoteBrukRundtFødsel && (
                <Alert variant="info">{infotekstOmFedrekvoteBrukRundtFødsel}</Alert>
            )}
        </>
    );
};

const getAktivitetskravOptions = (skalViseMorsAktivitetskravVedSamtidigUttak: boolean) => {
    const aktivitetsKrav = [
        'ARBEID',
        'UTDANNING',
        'KVALPROG',
        'INTROPROG',
        'TRENGER_HJELP',
        'INNLAGT',
        'ARBEID_OG_UTDANNING',
    ];

    if (skalViseMorsAktivitetskravVedSamtidigUttak) {
        return ['ARBEID', 'UTDANNING', 'KVALPROG', 'INTROPROG', 'ARBEID_OG_UTDANNING'];
    }

    return skalViseMorsAktivitetskravVedSamtidigUttak
        ? aktivitetsKrav.filter((k) => k !== 'INNLAGT' && k !== 'TRENGER_HJELP')
        : aktivitetsKrav;
};

const getAktivitetskravTekst = (value: string, intl: IntlShape) => {
    switch (value) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Utdanning' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Kvalprog' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Introprog' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Trenger_hjelp' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Innlagt' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid_og_utdanning' });
        default:
            return '';
    }
};

const getSkalViseMorsAktivitetskravVedSamtidigUttak = (
    forelder: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined,
    samtidigUttaksprosentMor?: string,
    stillingsprosentMor?: string,
    samtidigUttaksprosentFarMedmor?: string,
    kontoTypeFarMedmor?: KontoTypeUttak,
) => {
    const morsSamtidigUttakprosent = forelder === 'BEGGE' ? (getFloatFromString(samtidigUttaksprosentMor) ?? 0) : 0;
    const morsStillingProsent = forelder === 'BEGGE' ? (getFloatFromString(stillingsprosentMor) ?? 0) : 0;
    const morsTotaleProsent = morsSamtidigUttakprosent + morsStillingProsent;

    const farMedmorsSamtidigUttakprosent =
        forelder === 'BEGGE' ? (getFloatFromString(samtidigUttaksprosentFarMedmor) ?? 0) : 0;
    const kombinertUttaksprosent = morsSamtidigUttakprosent + farMedmorsSamtidigUttakprosent;

    if (kombinertUttaksprosent !== 100) {
        return false;
    }

    const skalViseMorsAktivitetskravVedSamtidigUttak =
        forelder === 'BEGGE' && kontoTypeFarMedmor === 'FELLESPERIODE' && morsTotaleProsent < 100;

    return skalViseMorsAktivitetskravVedSamtidigUttak;
};

export const mapFraFormValuesTilUttakPeriode = (
    values: LeggTilEllerEndrePeriodeFormFormValues,
    periode: { fom: string; tom: string },
): UttakPeriode_fpoversikt[] => {
    const nye = new Array<UttakPeriode_fpoversikt>();

    if (values.forelder === 'MOR' || values.forelder === 'BEGGE') {
        nye.push({
            fom: periode.fom,
            tom: periode.tom,
            kontoType: values.kontoTypeMor === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoTypeMor,
            morsAktivitet: values.morsAktivitet,
            forelder: 'MOR',
            gradering: values.skalDuKombinereArbeidOgUttakMor
                ? getGradering(values.skalDuKombinereArbeidOgUttakMor, values.stillingsprosentMor)
                : undefined,
            samtidigUttak:
                values.forelder === 'BEGGE' ? getFloatFromString(values.samtidigUttaksprosentMor) : undefined,
            overføringÅrsak: values.overføringsårsak,
        });
    }
    if (values.forelder === 'FAR_MEDMOR' || values.forelder === 'BEGGE') {
        nye.push({
            fom: periode.fom,
            tom: periode.tom,
            kontoType:
                values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoTypeFarMedmor,
            morsAktivitet: values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : values.morsAktivitet,
            forelder: 'FAR_MEDMOR',
            gradering: values.skalDuKombinereArbeidOgUttakFarMedmor
                ? getGradering(values.skalDuKombinereArbeidOgUttakFarMedmor, values.stillingsprosentFarMedmor)
                : undefined,
            samtidigUttak:
                values.forelder === 'BEGGE' ? getFloatFromString(values.samtidigUttaksprosentFarMedmor) : undefined,
            overføringÅrsak: values.overføringsårsak,
        });
    }
    return nye;
};

export const lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm = (
    uttaksplanperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtPeriode: { fom: string; tom: string },
): LeggTilEllerEndrePeriodeFormFormValues | undefined => {
    const eksisterendePerioder = uttaksplanperioder.filter(
        (periode) =>
            dayjs(valgtPeriode.fom).isSameOrAfter(dayjs(periode.fom), 'day') &&
            dayjs(valgtPeriode.tom).isSameOrBefore(dayjs(periode.tom), 'day'),
    );

    if (
        eksisterendePerioder.length === 0 ||
        eksisterendePerioder.length > 2 ||
        !eksisterendePerioder.every(erVanligUttakPeriode) ||
        eksisterendePerioder.some((p) => p.utsettelseÅrsak === 'LOVBESTEMT_FERIE')
    ) {
        return undefined;
    }

    if (eksisterendePerioder.length === 2) {
        const erSamtidigUttak = eksisterendePerioder.every((p) => !!p.samtidigUttak);
        if (!erSamtidigUttak) {
            throw new Error('Forventer to perioder ved samtidig uttak.');
        }
        const morsPeriode = notEmpty(eksisterendePerioder.find((p) => p.forelder === 'MOR'));
        const farMedmorPeriode = notEmpty(eksisterendePerioder.find((p) => p.forelder === 'FAR_MEDMOR'));

        return {
            forelder: 'BEGGE',
            kontoTypeMor:
                morsPeriode.kontoType === 'FORELDREPENGER' && morsPeriode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : morsPeriode.kontoType,
            kontoTypeFarMedmor:
                farMedmorPeriode.kontoType === 'FORELDREPENGER' && farMedmorPeriode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : farMedmorPeriode.kontoType,
            samtidigUttaksprosentMor: morsPeriode.samtidigUttak?.toString(),
            samtidigUttaksprosentFarMedmor: farMedmorPeriode.samtidigUttak?.toString(),
            skalDuKombinereArbeidOgUttakMor: !!morsPeriode.gradering,
            skalDuKombinereArbeidOgUttakFarMedmor: !!farMedmorPeriode.gradering,
            stillingsprosentMor: morsPeriode.gradering?.arbeidstidprosent.toString(),
            stillingsprosentFarMedmor: farMedmorPeriode.gradering?.arbeidstidprosent.toString(),
            morsAktivitet: morsPeriode.morsAktivitet,
        };
    }

    const periode = eksisterendePerioder[0]!;

    if (periode.forelder === 'FAR_MEDMOR') {
        return {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor:
                periode.kontoType === 'FORELDREPENGER' && periode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : periode.kontoType,
            skalDuKombinereArbeidOgUttakFarMedmor: !!periode.gradering,
            stillingsprosentFarMedmor: periode.gradering?.arbeidstidprosent.toString(),
            morsAktivitet: periode.morsAktivitet,
            overføringsårsak: periode.overføringÅrsak,
        };
    }

    return {
        forelder: 'MOR',
        kontoTypeMor: periode.kontoType,
        samtidigUttaksprosentMor: periode.samtidigUttak?.toString(),
        skalDuKombinereArbeidOgUttakMor: !!periode.gradering,
        stillingsprosentMor: periode.gradering?.arbeidstidprosent.toString(),
        overføringsårsak: periode.overføringÅrsak,
    };
};

const getGradering = (skalDuJobbe: boolean, stillingsprosent: string | undefined): Gradering_fpoversikt | undefined => {
    if (skalDuJobbe) {
        return {
            aktivitet: {
                type: 'ORDINÆRT_ARBEID',
            },
            arbeidstidprosent: getFloatFromString(stillingsprosent) ?? 100,
        };
    }

    return undefined;
};

const getInfotekstOmFedrekvoteBrukRundtFødsel = (
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    kontoTypeFarMedmor: KontoTypeUttak | undefined,
    familiehendelsedato: string,
    erMedmorDelAvSøknaden: boolean,
    stillingsprosentFarMedmor: string | undefined,
) => {
    const familiehendelse = UttaksdagenString.denneEllerNeste(familiehendelsedato);

    const toUkerFør = familiehendelse.getDatoAntallUttaksdagerTidligere(10);
    const seksUkerEtter = familiehendelse.getDatoAntallUttaksdagerSenere(30);

    // Hjelpefunksjon for å finne overlappende dager mellom to perioder
    const getOverlappendePeriode = (
        periode1: { fom: string; tom: string },
        periode2: { fom: string; tom: string },
    ): { fom: string; tom: string } | null => {
        const fom1 = dayjs(periode1.fom);
        const tom1 = dayjs(periode1.tom);
        const fom2 = dayjs(periode2.fom);
        const tom2 = dayjs(periode2.tom);

        if (fom1.isAfter(tom2, 'day') || tom1.isBefore(fom2, 'day')) {
            return null; // Ingen overlapp
        }

        const overlappFom = fom1.isAfter(fom2, 'day') ? fom1 : fom2;
        const overlappTom = tom1.isBefore(tom2, 'day') ? tom1 : tom2;

        return {
            fom: overlappFom.format('YYYY-MM-DD'),
            tom: overlappTom.format('YYYY-MM-DD'),
        };
    };

    const perioderRundtFødsel = uttakPerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return fom.isBefore(seksUkerEtter) && tom.isSameOrAfter(toUkerFør);
    });

    const antallDagerMedFedrekvoteIPlan = perioderRundtFødsel.reduce((acc, periode) => {
        if (periode.kontoType !== 'FEDREKVOTE') {
            return acc;
        }

        const uttaksfaktor =
            1 - (erVanligUttakPeriode(periode) ? (periode.gradering?.arbeidstidprosent ?? 0) : 0) / 100;

        const totaleDager = TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager();

        // Finn alle overlappende dager med valgtePerioder
        const overlappendeAntallDager = valgtePerioder.reduce((sum, valgtPeriode) => {
            const overlapp = getOverlappendePeriode(periode, valgtPeriode);
            if (overlapp) {
                return sum + TidsperiodenString({ fom: overlapp.fom, tom: overlapp.tom }).getAntallUttaksdager();
            }
            return sum;
        }, 0);

        // Legg til kun de dagene som ikke overlapper
        return acc + (totaleDager - overlappendeAntallDager) * uttaksfaktor;
    }, 0);

    const valgteDagerRundtFødsel = valgtePerioder.filter((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        return fom.isBefore(seksUkerEtter) && tom.isSameOrAfter(toUkerFør);
    });

    const antallDagerMedFedreKvoteValgtIKalender = valgteDagerRundtFødsel.reduce((acc, periode) => {
        const uttaksfaktor = 1 - (stillingsprosentFarMedmor ? parseInt(stillingsprosentFarMedmor, 10) : 0) / 100;
        const dager = TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager() * uttaksfaktor;

        if (kontoTypeFarMedmor === 'FEDREKVOTE') {
            acc += dager;
        }

        return acc;
    }, 0);

    let infotekstOmFedrekvoteBrukRundtFødsel = undefined;

    if (antallDagerMedFedreKvoteValgtIKalender + antallDagerMedFedrekvoteIPlan > 10) {
        infotekstOmFedrekvoteBrukRundtFødsel =
            `Du kan ikke ha mer enn 10 dager ${erMedmorDelAvSøknaden ? 'medmorkvote' : 'fedrekvote'} samtidig med mor i forbindelse med fødsel. ` +
            'For å kunne ta ut mer enn 10 dager med fedrekvote må mor være for syk i denne perioden';
    }

    return infotekstOmFedrekvoteBrukRundtFødsel;
};
