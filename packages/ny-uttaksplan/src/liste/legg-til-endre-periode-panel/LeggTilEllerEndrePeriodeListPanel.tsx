import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Button, ErrorMessage, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BrukerRolleSak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { omitMany } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../context/UttaksplanRedigeringContext';
import {
    LeggTilEllerEndrePeriodeFellesForm,
    LeggTilEllerEndrePeriodeFormFormValues,
    lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm,
    mapFraFormValuesTilUttakPeriode,
} from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { useHentGyldigeKontotyper } from '../../felles/useHentGyldigeKontotyper';
import { kanMisteDagerVedEndringTilFerie, useFormSubmitValidator } from '../../felles/uttaksplanValidatorer';
import { Uttaksplanperiode, erUttaksplanHull, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../utils/UttakPeriodeBuilder';
import { TidsperiodeSpørsmål } from './/TidsperiodeSpørsmål';

export type HvaVilDuGjøre = 'LEGG_TIL_FERIE' | 'LEGG_TIL_OPPHOLD' | 'LEGG_TIL_PERIODE';

export type FormValues = {
    fom: string;
    tom: string;
    hvaVilDuGjøre: HvaVilDuGjøre;
} & LeggTilEllerEndrePeriodeFormFormValues;

interface Props {
    erNyPeriodeModus: boolean;
    uttaksplanperiode?: Uttaksplanperiode;
    setIsLeggTilPeriodePanelOpen: (isOpen: boolean) => void;
    setValgtPeriodeIndex?: (valgtPeriodeIndex: number | undefined) => void;
}

export const LeggTilEllerEndrePeriodeListPanel = ({
    erNyPeriodeModus,
    uttaksplanperiode,
    setIsLeggTilPeriodePanelOpen,
    setValgtPeriodeIndex,
}: Props) => {
    const intl = useIntl();
    const {
        uttakPerioder,
        foreldreInfo: { søker },
        familiesituasjon,
        familiehendelsedato,
    } = useUttaksplanData();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const defaultValues = uttaksplanperiode
        ? leggTilDatoOgHvaVilDuGjøre(
              uttaksplanperiode,
              lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm(uttakPerioder, uttaksplanperiode),
          )
        : undefined;

    const formMethods = useForm<FormValues>({
        defaultValues,
    });

    const handleAddPeriode = (nyPeriode: UttakPeriode_fpoversikt[]) => {
        const nyePerioder = new UttakPeriodeBuilder(uttakPerioder).leggTilUttakPerioder(nyPeriode).getUttakPerioder();
        uttaksplanRedigering?.oppdaterUttaksplan?.(nyePerioder);
        setIsLeggTilPeriodePanelOpen(false);
    };

    const formSubmitValidator = useFormSubmitValidator<FormValues>();

    const onSubmit = (values: FormValues) => {
        const fomValue = values.fom;
        const tomValue = values.tom;

        setFeilmelding(undefined);

        if (hvaVilDuGjøre === 'LEGG_TIL_FERIE') {
            handleAddPeriode([
                {
                    fom: fomValue,
                    tom: tomValue,
                    forelder: 'MOR',
                    utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                },
            ]);
        } else if (hvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
                .fjernUttakPerioder([
                    {
                        fom: fomValue,
                        tom: tomValue,
                    },
                ])
                .getUttakPerioder();

            uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);
        } else {
            const submitFeilmelding = formSubmitValidator([{ fom: fomValue, tom: tomValue }], values);

            if (submitFeilmelding) {
                setFeilmelding(submitFeilmelding);
                return;
            }
            const mapped = omitMany(values, ['fom', 'tom', 'hvaVilDuGjøre']);
            handleAddPeriode(mapFraFormValuesTilUttakPeriode(mapped, { fom: fomValue, tom: tomValue }));
        }

        setIsLeggTilPeriodePanelOpen(false);
    };

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');
    const hvaVilDuGjøre = formMethods.watch('hvaVilDuGjøre');

    const resetFormValues = (value: string | number | boolean) => {
        formMethods.reset({
            ...defaultValues,
            fom: fomValue,
            tom: tomValue,
            hvaVilDuGjøre,
            forelder: value as BrukerRolleSak_fpoversikt | 'BEGGE',
        });
    };

    const erAdopsjon = familiesituasjon === 'adopsjon';

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useHentGyldigeKontotyper([
        { fom: fomValue, tom: tomValue },
    ]);
    const isSubmitDisabled =
        hvaVilDuGjøre === 'LEGG_TIL_PERIODE' &&
        gyldigeStønadskontoerForMor.length === 0 &&
        gyldigeStønadskontoerForFarMedmor.length === 0;

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
            {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="space-32">
                    <RhfRadioGroup
                        name="hvaVilDuGjøre"
                        label={intl.formatMessage({ id: 'uttaksplan.valgPanel.label' })}
                        control={formMethods.control}
                        validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.hvaVilDuGjøre.påkrevd' }))]}
                    >
                        <Radio value={'LEGG_TIL_FERIE' satisfies HvaVilDuGjøre} autoFocus>
                            {erNyPeriodeModus ? (
                                <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie" />
                            ) : (
                                <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie.endre" />
                            )}
                        </Radio>
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
                    {hvaVilDuGjøre === 'LEGG_TIL_PERIODE' && (
                        <LeggTilEllerEndrePeriodeFellesForm
                            valgtePerioder={[{ fom: fomValue, tom: tomValue }]}
                            resetFormValues={resetFormValues}
                        />
                    )}
                    <HStack gap="space-8" justify="space-between">
                        <Button type="button" variant="secondary" onClick={() => setIsLeggTilPeriodePanelOpen(false)}>
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
            </RhfForm>
        </VStack>
    );
};

const leggTilDatoOgHvaVilDuGjøre = (
    uttaksplanperiode: Uttaksplanperiode,
    periode?: LeggTilEllerEndrePeriodeFormFormValues,
): FormValues | undefined => {
    if (
        erUttaksplanHull(uttaksplanperiode) ||
        (erVanligUttakPeriode(uttaksplanperiode) && uttaksplanperiode.utsettelseÅrsak === 'LOVBESTEMT_FERIE')
    ) {
        return {
            fom: uttaksplanperiode.fom,
            tom: uttaksplanperiode.tom,
            hvaVilDuGjøre: erUttaksplanHull(uttaksplanperiode) ? 'LEGG_TIL_OPPHOLD' : 'LEGG_TIL_FERIE',
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
