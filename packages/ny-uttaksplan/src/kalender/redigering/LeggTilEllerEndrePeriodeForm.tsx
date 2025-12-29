import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, ErrorMessage, HStack, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfNumericField, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, KontoTypeUttak, MorsAktivitet } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { getFloatFromString } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { prosentValideringGradering, valideringSamtidigUttak } from '../../components/spørsmål/validators';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getGradering } from '../../utils/graderingUtils';
import { getStønadskontoNavnSimple } from '../../utils/stønadskontoerUtils';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type FormValues = {
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
};

interface Props {
    gyldigeKontotyper: KontoTypeUttak[];
    lukkRedigeringsmodus: () => void;
}

export const LeggTilEllerEndrePeriodeForm = ({ gyldigeKontotyper, lukkRedigeringsmodus }: Props) => {
    const intl = useIntl();

    const {
        uttaksplan,
        foreldreInfo: { rettighetType, erMedmorDelAvSøknaden },
        familiehendelsedato,
        valgtStønadskonto,
    } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, leggTilUttaksplanPerioder, setValgtePerioder } = useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    // const { finnKontotypeGyldigFeilmeldinger, finnPerioderGyldigeFeilmeldinger } =
    //     usePeriodeValidator(sammenslåtteValgtePerioder);

    const defaultValues = lagDefaultValues(uttaksplan, sammenslåtteValgtePerioder[0]!);

    const formMethods = useForm<FormValues>({
        defaultValues,
    });

    const onSubmit = (values: FormValues) => {
        // const valideringsfeil = finnKontotypeGyldigFeilmeldinger(values.kontoType, values.samtidigUttak).concat(
        //     finnPerioderGyldigeFeilmeldinger(
        //         values.kontoType,
        //         values.samtidigUttak,
        //         values.skalDuJobbe,
        //         values.forelder,
        //     ),
        const valideringsfeil = new Array<string>();
        if (valideringsfeil.length > 0) {
            setFeilmelding(valideringsfeil.at(0));
            return;
        }
        setFeilmelding(undefined);

        leggTilUttaksplanPerioder(
            sammenslåtteValgtePerioder.flatMap((periode) => {
                const nye = new Array<Planperiode>();

                if (values.forelder === 'MOR' || values.forelder === 'BEGGE') {
                    nye.push({
                        erAnnenPartEøs: false,
                        fom: periode.fom,
                        tom: periode.tom,
                        id: `${periode.fom} - ${periode.tom} - ${values.kontoTypeMor} - ${values.forelder}`,
                        kontoType:
                            values.kontoTypeMor === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoTypeMor,
                        morsAktivitet: values.morsAktivitet,
                        forelder: 'MOR',
                        gradering: values.skalDuKombinereArbeidOgUttakMor
                            ? getGradering(
                                  values.skalDuKombinereArbeidOgUttakMor,
                                  values.stillingsprosentMor,
                                  values.kontoTypeMor,
                              )
                            : undefined,
                        samtidigUttak:
                            values.forelder === 'BEGGE'
                                ? getFloatFromString(values.samtidigUttaksprosentMor)
                                : undefined,
                    });
                }
                if (values.forelder === 'FAR_MEDMOR' || values.forelder === 'BEGGE') {
                    nye.push({
                        erAnnenPartEøs: false,
                        fom: periode.fom,
                        tom: periode.tom,
                        id: `${periode.fom} - ${periode.tom} - ${values.kontoTypeFarMedmor} - ${values.forelder}`,
                        kontoType:
                            values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE'
                                ? 'FORELDREPENGER'
                                : values.kontoTypeFarMedmor,
                        morsAktivitet:
                            values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : values.morsAktivitet,
                        forelder: 'FAR_MEDMOR',
                        gradering: values.skalDuKombinereArbeidOgUttakFarMedmor
                            ? getGradering(
                                  values.skalDuKombinereArbeidOgUttakFarMedmor,
                                  values.stillingsprosentFarMedmor,
                                  values.kontoTypeFarMedmor,
                              )
                            : undefined,
                        samtidigUttak:
                            values.forelder === 'BEGGE'
                                ? getFloatFromString(values.samtidigUttaksprosentFarMedmor)
                                : undefined,
                    });
                }
                return nye;
            }),
        );
        setValgtePerioder([]);

        lukkRedigeringsmodus();
    };

    const harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato = !sammenslåtteValgtePerioder.some((periode) =>
        dayjs(periode.tom).isAfter(dayjs(familiehendelsedato).subtract(22, 'days')),
    );

    const {
        forelder,
        kontoTypeFarMedmor,
        kontoTypeMor,
        skalDuKombinereArbeidOgUttakMor,
        samtidigUttaksprosentMor,
        samtidigUttaksprosentFarMedmor,
        stillingsprosentMor,
        stillingsprosentFarMedmor,
        skalDuKombinereArbeidOgUttakFarMedmor,
    } = formMethods.watch();

    const erFarMedmorUtenAleneomsorg =
        forelder === 'FAR_MEDMOR' &&
        rettighetType !== 'ALENEOMSORG' &&
        (kontoTypeFarMedmor === 'FORELDREPENGER' || kontoTypeFarMedmor === 'FELLESPERIODE');

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                <RhfRadioGroup
                    name="forelder"
                    control={formMethods.control}
                    validate={[isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.Påkrevd' }))]}
                    label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder' })}
                    onChange={(value) => {
                        formMethods.reset({ ...defaultValues, forelder: value as BrukerRolleSak_fpoversikt | 'BEGGE' });
                    }}
                >
                    <Radio value="MOR">
                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Mor" />
                    </Radio>
                    <Radio value="FAR_MEDMOR">
                        {erMedmorDelAvSøknaden ? (
                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Medmor" />
                        ) : (
                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Far" />
                        )}
                    </Radio>
                    <>
                        {rettighetType !== 'ALENEOMSORG' && !harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato && (
                            <Radio value="BEGGE">
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Begge" />
                            </Radio>
                        )}
                    </>
                </RhfRadioGroup>

                <hr className="text-ax-border-neutral-subtle" />

                {(forelder === 'MOR' || forelder === 'BEGGE') && (
                    <RhfRadioGroup
                        name="kontoTypeMor"
                        control={formMethods.control}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KontoTypeMor.Påkrevd' })),
                        ]}
                        label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KontoTypeMor' })}
                    >
                        {valgtStønadskonto.kontoer
                            .filter((kontotype) => !gyldigeKontotyper || gyldigeKontotyper.includes(kontotype.konto))
                            .map((konto) => {
                                return (
                                    <Radio key={konto.konto} value={konto.konto}>
                                        {getStønadskontoNavnSimple(intl, konto.konto, erMedmorDelAvSøknaden)}
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
                        {valgtStønadskonto.kontoer
                            .filter((kontotype) => !gyldigeKontotyper || gyldigeKontotyper.includes(kontotype.konto))
                            .map((konto) => {
                                return (
                                    <Radio key={konto.konto} value={konto.konto}>
                                        {getStønadskontoNavnSimple(intl, konto.konto, erMedmorDelAvSøknaden)}
                                    </Radio>
                                );
                            })}
                    </RhfRadioGroup>
                )}

                {erFarMedmorUtenAleneomsorg && (
                    <>
                        <hr className="text-ax-border-neutral-subtle" />
                        <RhfSelect
                            name="morsAktivitet"
                            label={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Label' })}
                            control={formMethods.control}
                            validate={[isRequired(intl.formatMessage({ id: 'AktivitetskravSpørsmål.Påkrevd' }))]}
                            description={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Description' })}
                        >
                            <option value="ARBEID">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Arbeid'} />
                            </option>
                            <option value="UTDANNING">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Utdanning'} />
                            </option>
                            <option value="KVALPROG">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Kvalprog'} />
                            </option>
                            <option value="INTROPROG">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Introprog'} />
                            </option>
                            <option value="TRENGER_HJELP">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Trenger_hjelp'} />
                            </option>
                            <option value="INNLAGT">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Innlagt'} />
                            </option>
                            <option value="ARBEID_OG_UTDANNING">
                                <FormattedMessage id={'AktivitetskravSpørsmål.Arbeid_og_utdanning'} />
                            </option>
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

                <hr className="text-ax-border-neutral-subtle" />

                {kontoTypeMor !== 'FORELDREPENGER_FØR_FØDSEL' && (forelder === 'MOR' || forelder === 'BEGGE') && (
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
                        >
                            <Radio value={true}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Nei" />
                            </Radio>
                        </RhfRadioGroup>
                        {skalDuKombinereArbeidOgUttakMor && (
                            <RhfNumericField
                                name="stillingsprosentMor"
                                control={formMethods.control}
                                className="max-w-xs"
                                label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor' })}
                                validate={[prosentValideringGradering(intl, samtidigUttaksprosentMor)]}
                                maxLength={5}
                            />
                        )}
                    </VStack>
                )}

                {(forelder === 'FAR_MEDMOR' || forelder === 'BEGGE') && (
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

                <HStack gap="space-8" justify="space-between">
                    <Button type="button" variant="secondary" onClick={lukkRedigeringsmodus}>
                        <FormattedMessage id="uttaksplan.avbryt" />
                    </Button>
                    <HStack gap="space-8">
                        <Button>
                            <FormattedMessage id="LeggTilPeriodePanel.LeggTil" />
                        </Button>
                    </HStack>
                </HStack>
            </VStack>
        </RhfForm>
    );
};

const lagDefaultValues = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod): FormValues | undefined => {
    const eksisterendePerioder = uttaksplan.filter(
        (periode) =>
            dayjs(valgtPeriode.fom).isSameOrAfter(dayjs(periode.fom), 'day') &&
            dayjs(valgtPeriode.tom).isSameOrBefore(dayjs(periode.tom), 'day'),
    );

    if (eksisterendePerioder.length === 0 || eksisterendePerioder.some((p) => p.erAnnenPartEøs)) {
        return undefined;
    }

    if (eksisterendePerioder.length === 2) {
        const erSamtidigUttak = eksisterendePerioder.every((p) => !p.erAnnenPartEøs && !!p.samtidigUttak);
        if (!erSamtidigUttak) {
            throw new Error('Forventer to perioder ved samtidig uttak.');
        }
        const morsPeriode = notEmpty(eksisterendePerioder.find((p) => !p.erAnnenPartEøs && p.forelder === 'MOR'));
        const farMedmorPeriode = notEmpty(
            eksisterendePerioder.find((p) => !p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR'),
        );

        return {
            forelder: 'BEGGE',
            kontoTypeMor:
                morsPeriode.kontoType === 'FORELDREPENGER' &&
                !morsPeriode.erAnnenPartEøs &&
                morsPeriode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : morsPeriode.kontoType,
            kontoTypeFarMedmor:
                farMedmorPeriode.kontoType === 'FORELDREPENGER' &&
                !farMedmorPeriode.erAnnenPartEøs &&
                farMedmorPeriode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : farMedmorPeriode.kontoType,
            samtidigUttaksprosentMor: !morsPeriode.erAnnenPartEøs ? morsPeriode.samtidigUttak?.toString() : undefined,
            samtidigUttaksprosentFarMedmor: !farMedmorPeriode.erAnnenPartEøs
                ? farMedmorPeriode.samtidigUttak?.toString()
                : undefined,
            skalDuKombinereArbeidOgUttakMor: !morsPeriode.erAnnenPartEøs && !!morsPeriode.gradering,
            skalDuKombinereArbeidOgUttakFarMedmor: !farMedmorPeriode.erAnnenPartEøs && !!farMedmorPeriode.gradering,
            stillingsprosentMor: !morsPeriode.erAnnenPartEøs
                ? morsPeriode.gradering?.arbeidstidprosent.toString()
                : undefined,
            stillingsprosentFarMedmor: !farMedmorPeriode.erAnnenPartEøs
                ? farMedmorPeriode.gradering?.arbeidstidprosent.toString()
                : undefined,
            morsAktivitet: !morsPeriode.erAnnenPartEøs ? morsPeriode.morsAktivitet : undefined,
        };
    }

    const periode = eksisterendePerioder[0]!;
    const erFarEllerMedmor = !periode.erAnnenPartEøs && periode.forelder === 'FAR_MEDMOR';

    if (!periode.erAnnenPartEøs && erFarEllerMedmor) {
        return {
            forelder: 'FAR_MEDMOR',
            kontoTypeFarMedmor:
                periode.kontoType === 'FORELDREPENGER' &&
                !periode.erAnnenPartEøs &&
                periode.morsAktivitet === 'IKKE_OPPGITT'
                    ? 'AKTIVITETSFRI_KVOTE'
                    : periode.kontoType,
            skalDuKombinereArbeidOgUttakFarMedmor: !periode.erAnnenPartEøs && !!periode.gradering,
            stillingsprosentFarMedmor: !periode.erAnnenPartEøs
                ? periode.gradering?.arbeidstidprosent.toString()
                : undefined,
        };
    }

    return {
        forelder: 'MOR',
        kontoTypeMor:
            periode.kontoType === 'FORELDREPENGER' &&
            !periode.erAnnenPartEøs &&
            periode.morsAktivitet === 'IKKE_OPPGITT'
                ? 'AKTIVITETSFRI_KVOTE'
                : periode.kontoType,
        samtidigUttaksprosentMor: !periode.erAnnenPartEøs ? periode.samtidigUttak?.toString() : undefined,
        skalDuKombinereArbeidOgUttakMor: !periode.erAnnenPartEøs && !!periode.gradering,
        stillingsprosentMor: !periode.erAnnenPartEøs ? periode.gradering?.arbeidstidprosent.toString() : undefined,
        morsAktivitet: !periode.erAnnenPartEøs ? periode.morsAktivitet : undefined,
    };
};
