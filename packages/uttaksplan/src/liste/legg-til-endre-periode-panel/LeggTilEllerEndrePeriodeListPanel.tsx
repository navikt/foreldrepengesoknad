import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BrukerRolleSak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Tidsperioden, omitMany } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../context/UttaksplanRedigeringContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilUttakPeriode,
} from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { useHentGyldigeKontotyper } from '../../felles/useHentGyldigeKontotyper';
import { LeggTilPauseForm } from '../../felles/utsettelse/LeggTilPauseForm';
import {
    LeggTilUtsettelseForm,
    FormValues as UtsettelseFormValues,
} from '../../felles/utsettelse/LeggTilUtsettelseForm';
import { kanMisteDagerVedEndringTilFerie, useFormSubmitValidator } from '../../felles/uttaksplanValidatorer';
import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erUttaksplanHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { erDetEksisterendePerioderEtterValgtePerioder } from '../../utils/periodeUtils';
import { TidsperiodeSpørsmål } from './/TidsperiodeSpørsmål';

export type HvaVilDuGjøre =
    | 'LEGG_TIL_FERIE'
    | 'LEGG_TIL_UTSETTELSE'
    | 'LEGG_TIL_PAUSE'
    | 'LEGG_TIL_OPPHOLD'
    | 'LEGG_TIL_PERIODE';

export type FormValues = {
    fom?: string;
    tom?: string;
    hvaVilDuGjøre?: HvaVilDuGjøre;
} & LeggTilEllerEndrePeriodeFormFormValues &
    UtsettelseFormValues;

interface Props {
    erNyPeriodeModus: boolean;
    uttaksplanperiode?: Uttaksplanperiode;
    harPeriodeDerMorsAktivitetIkkeErValgt: boolean;
    setIsLeggTilPeriodePanelOpen: (isOpen: boolean) => void;
    setValgtPeriodeIndex?: (valgtPeriodeIndex: number | undefined) => void;
}

export const LeggTilEllerEndrePeriodeListPanel = ({
    erNyPeriodeModus,
    uttaksplanperiode,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    setIsLeggTilPeriodePanelOpen,
    setValgtPeriodeIndex,
}: Props) => {
    const intl = useIntl();
    const {
        uttakPerioder,
        foreldreInfo: { søker, rettighetType },
        familiesituasjon,
        familiehendelsedato,
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const defaultValues = uttaksplanperiode
        ? leggTilDatoOgHvaVilDuGjøre(
              uttaksplanperiode,
              lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(
                  uttakPerioder,
                  uttaksplanperiode,
                  søker,
                  erPeriodeneTilAnnenPartLåst,
              ),
          )
        : undefined;

    const formMethods = useForm<FormValues>({
        defaultValues,
    });

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');
    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');
    const forelder = formMethods.watch('forelder');
    const ønskerFlerbarnsdager = formMethods.watch('ønskerFlerbarnsdager');
    const skalDuKombinereArbeidOgUttakMor = formMethods.watch('skalDuKombinereArbeidOgUttakMor');

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } = useVisForskyvEllerErstattPanel(
        fomValue && tomValue
            ? [
                  {
                      fom: fomValue,
                      tom: tomValue,
                  },
              ]
            : [],
    );

    const handleAddPeriode = (nyPeriode: UttakPeriode_fpoversikt[], skalForskyve: boolean) => {
        const builder = new UttakPeriodeBuilder(uttakPerioder, 'liste');
        if (uttaksplanperiode) {
            builder.fjernUttakPerioder([uttaksplanperiode], false);
        }
        const nyePerioder = builder.leggTilUttakPerioder(nyPeriode, skalForskyve).getUttakPerioder();
        uttaksplanRedigering?.oppdaterUttaksplan?.(nyePerioder);
        setIsLeggTilPeriodePanelOpen(false);
    };

    const formSubmitValidator = useFormSubmitValidator<FormValues>();

    const onSubmit = (values: FormValues) => {
        setFeilmelding(undefined);

        const erOverlappendeMedEøsPerioder = uttakPerioder.some(
            (periode) =>
                erEøsUttakPeriode(periode) &&
                Tidsperioden.forPeriode(periode).overlapper({
                    fom: notEmpty(values.fom),
                    tom: notEmpty(values.tom),
                }),
        );
        if (erOverlappendeMedEøsPerioder) {
            setFeilmelding(intl.formatMessage({ id: 'uttaksplan.overskriderEøs' }));
            return;
        }

        if (hvaVilDuGjøre === 'LEGG_TIL_PERIODE') {
            const fom = notEmpty(values.fom);
            const tom = notEmpty(values.tom);
            const submitFeilmelding = formSubmitValidator([{ fom, tom }], values);

            if (submitFeilmelding) {
                setFeilmelding(submitFeilmelding);
                return;
            }
        } else if (
            hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD' ||
            hvaVilDuGjøre === 'LEGG_TIL_PAUSE' ||
            hvaVilDuGjøre === 'LEGG_TIL_UTSETTELSE'
        ) {
            leggIListe(false);
            return;
        }

        if (
            !harPeriodeDerMorsAktivitetIkkeErValgt &&
            erDetEksisterendePerioderEtterValgtePerioder(uttakPerioder, [
                {
                    fom: uttaksplanperiode?.fom ?? notEmpty(fomValue),
                    tom: uttaksplanperiode?.tom ?? notEmpty(tomValue),
                },
            ])
        ) {
            setVisEndreEllerForskyvPanel(true);
        } else {
            leggIListe(false);
        }
    };

    const leggIListe = (skalForskyve: boolean) => {
        const values = formMethods.getValues();
        const fom = notEmpty(values.fom);
        const tom = notEmpty(values.tom);

        if (hvaVilDuGjøre === 'LEGG_TIL_FERIE') {
            handleAddPeriode(
                [
                    {
                        fom,
                        tom,
                        forelder: 'MOR',
                        utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                        flerbarnsdager: false,
                    },
                ],
                skalForskyve,
            );
        } else if (hvaVilDuGjøre === 'LEGG_TIL_UTSETTELSE') {
            handleAddPeriode(
                [
                    {
                        fom,
                        tom,
                        forelder: søker,
                        utsettelseÅrsak: values.utsettelseÅrsak,
                        flerbarnsdager: false,
                    },
                ],
                skalForskyve,
            );
        } else if (hvaVilDuGjøre === 'LEGG_TIL_PAUSE') {
            handleAddPeriode(
                [
                    {
                        fom,
                        tom,
                        forelder: søker,
                        utsettelseÅrsak: 'FRI',
                        morsAktivitet: values.morsAktivitet,
                        flerbarnsdager: false,
                    },
                ],
                skalForskyve,
            );
        } else if (hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder, 'liste')
                .fjernUttakPerioder(
                    [
                        {
                            fom,
                            tom,
                        },
                    ],
                    false,
                )
                .getUttakPerioder();

            uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);
        } else {
            const submitFeilmelding = formSubmitValidator([{ fom, tom }], values);

            if (submitFeilmelding) {
                setFeilmelding(submitFeilmelding);
                return;
            }
            const mapped = omitMany(values, ['fom', 'tom', 'hvaVilDuGjøre']);
            handleAddPeriode(mapFraFormValuesTilUttakPeriode(mapped, { fom, tom }, søker), skalForskyve);
        }

        setIsLeggTilPeriodePanelOpen(false);
    };

    const resetFormValuesVedEndringAvForelder = (forelderVerdi: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined) => {
        formMethods.reset({
            fom: fomValue,
            tom: tomValue,
            hvaVilDuGjøre,
        });
        formMethods.setValue('forelder', forelderVerdi, { shouldDirty: true });
    };
    const resetFormValuesVedEndringAvHvaVilDuGjøre = (value: HvaVilDuGjøre | undefined) => {
        formMethods.reset({
            fom: fomValue,
            tom: tomValue,
        });
        formMethods.setValue('hvaVilDuGjøre', value, { shouldDirty: true });
    };

    const erAdopsjon = familiesituasjon === 'adopsjon';

    const perioder = fomValue && tomValue ? [{ fom: fomValue, tom: tomValue }] : [];
    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useHentGyldigeKontotyper(
        perioder,
        forelder === 'BEGGE',
        ønskerFlerbarnsdager,
    );
    const isSubmitDisabled =
        hvaVilDuGjøre === 'LEGG_TIL_PERIODE' &&
        gyldigeStønadskontoerForMor.length === 0 &&
        gyldigeStønadskontoerForFarMedmor.length === 0;

    const erUtsettelseGyldig = (nyHvaVilDuGjøre?: HvaVilDuGjøre) => {
        return nyHvaVilDuGjøre !== 'LEGG_TIL_UTSETTELSE' ||
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
                fomValue && tomValue ? [{ fom: fomValue, tom: tomValue }] : [],
                familiehendelsedato,
            )
            ? null
            : intl.formatMessage({ id: 'uttaksplan.valgPanel.utsettelse' });
    };

    const erPauseGyldig = (nyHvaVilDuGjøre?: HvaVilDuGjøre) => {
        if (nyHvaVilDuGjøre !== 'LEGG_TIL_PAUSE') {
            return null;
        }
        const erFørSeksUker = UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
            perioder,
            familiehendelsedato,
        );
        return erFørSeksUker ? intl.formatMessage({ id: 'uttaksplan.valgPanel.pause' }) : null;
    };

    const erFerieOgPeriodeUtenForeldrepengerGyldig = (nyHvaVilDuGjøre?: HvaVilDuGjøre) => {
        return (nyHvaVilDuGjøre === 'LEGG_TIL_FERIE' || nyHvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') &&
            søker === 'FAR_MEDMOR' &&
            rettighetType === 'BARE_SØKER_RETT' &&
            fomValue &&
            tomValue &&
            !UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                [{ fom: fomValue, tom: tomValue }],
                familiehendelsedato,
            )
            ? intl.formatMessage({ id: 'uttaksplan.valgPanel.ferie' })
            : null;
    };

    return (
        <VStack
            gap="space-8"
            className={
                erNyPeriodeModus ? 'border-border-subtle bg-surface-default w-full rounded-xl border p-4' : undefined
            }
        >
            {erNyPeriodeModus && (
                <HStack gap="space-8" align="center" className="bg-ax-bg-neutral-soft -m-4 mb-0 rounded-t-xl p-4">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium">
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Heading>
                </HStack>
            )}
            {fomValue &&
                tomValue &&
                søker === 'MOR' &&
                !erAdopsjon &&
                (hvaVilDuGjøre === 'LEGG_TIL_FERIE' || hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') &&
                kanMisteDagerVedEndringTilFerie([{ fom: fomValue, tom: tomValue }], familiehendelsedato) && (
                    <Alert variant="info" size="small">
                        <FormattedMessage id="RedigeringPanel.KanMisteDager" />
                    </Alert>
                )}

            {harPeriodeDerMorsAktivitetIkkeErValgt && (
                <Alert variant="warning" size="small">
                    <FormattedMessage id="LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt" />
                </Alert>
            )}

            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                {visEndreEllerForskyvPanel && fomValue && tomValue && (
                    <LeggTilPeriodeForskyvEllerErstattPanel
                        valgtePerioder={[{ fom: fomValue, tom: tomValue }]}
                        erFerie={hvaVilDuGjøre === 'LEGG_TIL_FERIE'}
                        erGradert={
                            hvaVilDuGjøre === 'LEGG_TIL_PERIODE' &&
                            (forelder === 'MOR' || forelder === 'BEGGE') &&
                            skalDuKombinereArbeidOgUttakMor === true
                        }
                        setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                        leggTilEllerForskyvPeriode={leggIListe}
                    />
                )}
                {!visEndreEllerForskyvPanel && (
                    <VStack gap="space-32">
                        <RhfRadioGroup
                            name="hvaVilDuGjøre"
                            label={intl.formatMessage({ id: 'uttaksplan.valgPanel.label' })}
                            control={formMethods.control}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.hvaVilDuGjøre.påkrevd' })),
                                erUtsettelseGyldig,
                                erPauseGyldig,
                                erFerieOgPeriodeUtenForeldrepengerGyldig,
                            ]}
                            onChange={resetFormValuesVedEndringAvHvaVilDuGjøre}
                        >
                            <Radio value={'LEGG_TIL_FERIE' satisfies HvaVilDuGjøre} autoFocus>
                                {erNyPeriodeModus ? (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie" />
                                ) : (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie.endre" />
                                )}
                            </Radio>
                            <>
                                {søker === 'MOR' && familiesituasjon !== 'adopsjon' && (
                                    <Radio value={'LEGG_TIL_UTSETTELSE' satisfies HvaVilDuGjøre}>
                                        <FormattedMessage id="uttaksplan.valgPanel.leggTilUtsettelse" />
                                    </Radio>
                                )}
                                {søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT' && (
                                    <Radio value={'LEGG_TIL_PAUSE' satisfies HvaVilDuGjøre}>
                                        <FormattedMessage id="uttaksplan.valgPanel.leggTilPause" />
                                    </Radio>
                                )}
                            </>
                            <Radio value={'LEGG_TIL_OPPHOLD' satisfies HvaVilDuGjøre}>
                                {erNyPeriodeModus ? (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilOpphold" />
                                ) : (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilOpphold.endre" />
                                )}
                            </Radio>
                            <Radio value={'LEGG_TIL_PERIODE' satisfies HvaVilDuGjøre}>
                                {erNyPeriodeModus ? (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilPeriode" />
                                ) : (
                                    <FormattedMessage id="uttaksplan.valgPanel.leggTilPeriode.endre" />
                                )}
                            </Radio>
                        </RhfRadioGroup>

                        <TidsperiodeSpørsmål />

                        {hvaVilDuGjøre === 'LEGG_TIL_PERIODE' && fomValue && tomValue && (
                            <LeggTilEllerEndrePeriodeFellesForm
                                valgtePerioder={[{ fom: fomValue, tom: tomValue }]}
                                resetFormValuesVedEndringAvForelder={resetFormValuesVedEndringAvForelder}
                            />
                        )}

                        {hvaVilDuGjøre === 'LEGG_TIL_UTSETTELSE' && <LeggTilUtsettelseForm />}

                        {hvaVilDuGjøre === 'LEGG_TIL_PAUSE' && <LeggTilPauseForm />}

                        {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}

                        <HStack gap="space-8" justify="space-between">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setIsLeggTilPeriodePanelOpen(false)}
                            >
                                <FormattedMessage id="uttaksplan.avbryt" />
                            </Button>
                            <HStack gap="space-8">
                                {setValgtPeriodeIndex && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setValgtPeriodeIndex(undefined)}
                                    >
                                        <FormattedMessage id="uttaksplan.gåTilbake" />
                                    </Button>
                                )}
                                <Button type="submit" disabled={!formMethods.formState.isDirty || isSubmitDisabled}>
                                    <FormattedMessage id="uttaksplan.ferdig" />
                                </Button>
                            </HStack>
                        </HStack>
                    </VStack>
                )}
            </RhfForm>
        </VStack>
    );
};

const leggTilDatoOgHvaVilDuGjøre = (
    uttaksplanperiode: Uttaksplanperiode,
    periode?: LeggTilEllerEndrePeriodeFormFormValues,
): FormValues | undefined => {
    if (erVanligUttakPeriode(uttaksplanperiode) && uttaksplanperiode.utsettelseÅrsak) {
        const hvaVilDuGjøre =
            uttaksplanperiode.utsettelseÅrsak === 'FRI' && uttaksplanperiode.morsAktivitet
                ? 'LEGG_TIL_PAUSE'
                : 'LEGG_TIL_UTSETTELSE';
        return {
            fom: uttaksplanperiode.fom,
            tom: uttaksplanperiode.tom,
            hvaVilDuGjøre: uttaksplanperiode.utsettelseÅrsak === 'LOVBESTEMT_FERIE' ? 'LEGG_TIL_FERIE' : hvaVilDuGjøre,
            utsettelseÅrsak:
                uttaksplanperiode.utsettelseÅrsak !== 'LOVBESTEMT_FERIE'
                    ? uttaksplanperiode.utsettelseÅrsak
                    : undefined,
            morsAktivitet: uttaksplanperiode.morsAktivitet,
        };
    }

    if (erUttaksplanHull(uttaksplanperiode)) {
        return {
            fom: uttaksplanperiode.fom,
            tom: uttaksplanperiode.tom,
            hvaVilDuGjøre: 'LEGG_TIL_OPPHOLD',
        };
    }

    return periode
        ? {
              ...periode,
              fom: uttaksplanperiode.fom,
              tom: uttaksplanperiode.tom,
              hvaVilDuGjøre: 'LEGG_TIL_PERIODE',
          }
        : undefined;
};
