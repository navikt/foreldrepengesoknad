import { PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { ReactElement, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BrukerRolleSak_fpoversikt, UttakPeriode_fpoversikt, UttakPeriodeAnnenpartEøs_fpoversikt } from '@navikt/fp-types';
import { Tidsperioden, omitMany } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../context/UttaksplanRedigeringContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilUttakPeriode,
    useLoggUgyldigSamtidigUttakVedRedigering,
} from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { LeggTilPeriodeForskyvEllerErstattPanel } from '../../felles/forskyvEllerErstatt/LeggTilPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { LeggTilPauseForm } from '../../felles/utsettelse/LeggTilPauseForm';
import {
    LeggTilUtsettelseForm,
    FormValues as UtsettelseFormValues,
} from '../../felles/utsettelse/LeggTilUtsettelseForm';
import { useFormSubmitValidator } from '../../felles/uttaksplanValidatorer';
import { useListePanelInfoAlerts, useKanKunErstatte } from '../../regler/alert/informasjonsAlertHooks';
import { lagHvaVilDuGjøreValidatorer } from '../../regler/felt/hvaVilDuGjøre';
import { useGyldigeKvotetyper } from '../../regler/kvotetype/kvoteRegler';
import { useHvaVilDuGjøreValgSynlighet, HvaVilDuGjøreValgSynlighet } from '../../regler/synlighet/hvaVilDuGjøreValg';
import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erUttaksplanHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
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

const erGradertMorsUttak = (
    hvaVilDuGjøre: HvaVilDuGjøre | undefined,
    forelder: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined,
    skalDuKombinereArbeidOgUttakMor: boolean | undefined,
): boolean =>
    hvaVilDuGjøre === 'LEGG_TIL_PERIODE' &&
    (forelder === 'MOR' || forelder === 'BEGGE') &&
    skalDuKombinereArbeidOgUttakMor === true;

const byggEnkelHandlingPerioder = (
    hvaVilDuGjøre: HvaVilDuGjøre | undefined,
    fom: string,
    tom: string,
    søker: BrukerRolleSak_fpoversikt,
    values: FormValues,
): UttakPeriode_fpoversikt[] | undefined => {
    switch (hvaVilDuGjøre) {
        case 'LEGG_TIL_FERIE':
            // forelder settes til MOR fordi feltet er påkrevd, men ferie behandles likt for alle foreldre
            return [{ fom, tom, forelder: 'MOR', utsettelseÅrsak: 'LOVBESTEMT_FERIE', flerbarnsdager: false }];
        case 'LEGG_TIL_UTSETTELSE':
            return [{ fom, tom, forelder: søker, utsettelseÅrsak: values.utsettelseÅrsak, flerbarnsdager: false }];
        case 'LEGG_TIL_PAUSE':
            return [
                {
                    fom,
                    tom,
                    forelder: søker,
                    utsettelseÅrsak: 'FRI',
                    morsAktivitet: values.morsAktivitet || undefined,
                    flerbarnsdager: false,
                },
            ];
        default:
            return undefined;
    }
};

type UttakPeriodeEllerEøs = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

const erOverlappendeMedEøsPerioder = (perioder: UttakPeriodeEllerEøs[], fom: string, tom: string): boolean =>
    perioder.some(
        (periode) => erEøsUttakPeriode(periode) && Tidsperioden.forPeriode(periode).overlapper({ fom, tom }),
    );

const skalViseEndreEllerForskyvPanel = (
    harPeriodeDerMorsAktivitetIkkeErValgt: boolean,
    kanKunErstatte: boolean,
    uttakPerioder: UttakPeriodeEllerEøs[],
    fom: string,
    tom: string,
): boolean =>
    !harPeriodeDerMorsAktivitetIkkeErValgt &&
    !kanKunErstatte &&
    erDetEksisterendePerioderEtterValgtePerioder(uttakPerioder, [{ fom, tom }]);

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
        familiehendelsedato,
        erPeriodeneTilAnnenPartLåst,
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const uttaksplanRedigering = useUttaksplanRedigering();

    useLoggUgyldigSamtidigUttakVedRedigering(uttaksplanperiode);

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

    const valgtePerioder = fomValue && tomValue ? [{ fom: fomValue, tom: tomValue }] : [];

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(valgtePerioder);

    const kanKunErstatte = useKanKunErstatte({
        valgtePerioder,
        erFerie: hvaVilDuGjøre === 'LEGG_TIL_FERIE',
        erGradert: erGradertMorsUttak(hvaVilDuGjøre, forelder, skalDuKombinereArbeidOgUttakMor),
    });

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

        const fom = notEmpty(values.fom);
        const tom = notEmpty(values.tom);

        if (erOverlappendeMedEøsPerioder(uttakPerioder, fom, tom)) {
            setFeilmelding(intl.formatMessage({ id: 'uttaksplan.overskriderEøs' }));
            return;
        }

        if (hvaVilDuGjøre === 'LEGG_TIL_PERIODE') {
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

        const visForskyvPanel = skalViseEndreEllerForskyvPanel(
            harPeriodeDerMorsAktivitetIkkeErValgt,
            kanKunErstatte,
            uttakPerioder,
            uttaksplanperiode?.fom ?? notEmpty(fomValue),
            uttaksplanperiode?.tom ?? notEmpty(tomValue),
        );
        if (visForskyvPanel) {
            setVisEndreEllerForskyvPanel(true);
        } else {
            leggIListe(false);
        }
    };

    const leggIListe = (skalForskyve: boolean) => {
        const values = formMethods.getValues();
        const fom = notEmpty(values.fom);
        const tom = notEmpty(values.tom);

        const enkelHandlingPerioder = byggEnkelHandlingPerioder(hvaVilDuGjøre, fom, tom, søker, values);
        if (enkelHandlingPerioder) {
            handleAddPeriode(enkelHandlingPerioder, skalForskyve);
        } else if (hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder, 'liste')
                .fjernUttakPerioder([{ fom, tom }], false)
                .getUttakPerioder();

            uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);
        } else {
            const submitFeilmelding = formSubmitValidator([{ fom, tom }], values);

            if (submitFeilmelding) {
                setFeilmelding(submitFeilmelding);
                return;
            }
            const mapped = omitMany(values, ['fom', 'tom', 'hvaVilDuGjøre']);
            handleAddPeriode(
                mapFraFormValuesTilUttakPeriode(mapped, { fom, tom }, søker, kanVelgeArbeidsgiver),
                skalForskyve,
            );
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

    const perioder = fomValue && tomValue ? [{ fom: fomValue, tom: tomValue }] : [];

    const harGyldigTidsperiode =
        !!fomValue && !!tomValue && dayjs(fomValue).isValid() && dayjs(tomValue).isValid();

    const hvaVilDuGjøreSynlighet = useHvaVilDuGjøreValgSynlighet(perioder);

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useGyldigeKvotetyper({
        valgtePerioder: perioder,
        harValgtSamtidigUttak: forelder === 'BEGGE',
        ønskerFlerbarnsdager: ønskerFlerbarnsdager,
    });
    const isSubmitDisabled =
        hvaVilDuGjøre === 'LEGG_TIL_PERIODE' &&
        gyldigeStønadskontoerForMor.length === 0 &&
        gyldigeStønadskontoerForFarMedmor.length === 0;

    const hvaVilDuGjøreFeltvalidatorer = lagHvaVilDuGjøreValidatorer(intl, {
        fomValue,
        tomValue,
        perioder,
        familiehendelsedato,
        søker,
        rettighetType,
    });

    const listePanelAlerts = useListePanelInfoAlerts({
        valgtPeriode: fomValue && tomValue ? { fom: fomValue, tom: tomValue } : undefined,
        harValgtFerieEllerOpphold: hvaVilDuGjøre === 'LEGG_TIL_FERIE' || hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD',
        harPeriodeDerMorsAktivitetIkkeErValgt,
    });

    const hvaVilDuGjøreAlternativer = lagHvaVilDuGjøreAlternativer(hvaVilDuGjøreSynlighet, erNyPeriodeModus);

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
            {listePanelAlerts.kanMisteDagerVedFerie && (
                <Alert variant={listePanelAlerts.kanMisteDagerVedFerie.variant} size="small">
                    {listePanelAlerts.kanMisteDagerVedFerie.melding}
                </Alert>
            )}

            {listePanelAlerts.morsAktivitetIkkeOppgitt && (
                <Alert variant={listePanelAlerts.morsAktivitetIkkeOppgitt.variant} size="small">
                    {listePanelAlerts.morsAktivitetIkkeOppgitt.melding}
                </Alert>
            )}

            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                {visEndreEllerForskyvPanel && fomValue && tomValue && (
                    <LeggTilPeriodeForskyvEllerErstattPanel
                        setVisEndreEllerForskyvPanel={setVisEndreEllerForskyvPanel}
                        leggTilEllerForskyvPeriode={leggIListe}
                    />
                )}
                {!visEndreEllerForskyvPanel && (
                    <VStack gap="space-32">
                        <TidsperiodeSpørsmål />

                        {harGyldigTidsperiode && (
                            <RhfRadioGroup
                                name="hvaVilDuGjøre"
                                label={intl.formatMessage({ id: 'uttaksplan.valgPanel.label' })}
                                control={formMethods.control}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'leggTilPeriodePanel.hvaVilDuGjøre.påkrevd' }),
                                    ),
                                    ...hvaVilDuGjøreFeltvalidatorer,
                                ]}
                                onChange={resetFormValuesVedEndringAvHvaVilDuGjøre}
                            >
                                {hvaVilDuGjøreAlternativer}
                            </RhfRadioGroup>
                        )}

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

    return {
        ...periode,
        fom: uttaksplanperiode.fom,
        tom: uttaksplanperiode.tom,
        hvaVilDuGjøre: 'LEGG_TIL_PERIODE',
    };
};

const lagHvaVilDuGjøreAlternativer = (
    synlighet: HvaVilDuGjøreValgSynlighet,
    erNyPeriodeModus: boolean,
): ReactElement[] => {
    const alternativer: Array<{ vis: boolean; value: HvaVilDuGjøre; nyTekst: ReactNode; endreTekst: ReactNode }> = [
        {
            vis: synlighet.visLeggTilFerie,
            value: 'LEGG_TIL_FERIE',
            nyTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie" />,
            endreTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie.endre" />,
        },
        {
            vis: synlighet.visLeggTilUtsettelse,
            value: 'LEGG_TIL_UTSETTELSE',
            nyTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilUtsettelse" />,
            endreTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilUtsettelse" />,
        },
        {
            vis: synlighet.visLeggTilPause,
            value: 'LEGG_TIL_PAUSE',
            nyTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilPause" />,
            endreTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilPause" />,
        },
        {
            vis: synlighet.visLeggTilOpphold,
            value: 'LEGG_TIL_OPPHOLD',
            nyTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilOpphold" />,
            endreTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilOpphold.endre" />,
        },
        {
            vis: synlighet.visLeggTilPeriode,
            value: 'LEGG_TIL_PERIODE',
            nyTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilPeriode" />,
            endreTekst: <FormattedMessage id="uttaksplan.valgPanel.leggTilPeriode.endre" />,
        },
    ];

    return alternativer
        .filter((alternativ) => alternativ.vis)
        .map((alternativ) => (
            <Radio value={alternativ.value} key={alternativ.value}>
                {erNyPeriodeModus ? alternativ.nyTekst : alternativ.endreTekst}
            </Radio>
        ));
};
