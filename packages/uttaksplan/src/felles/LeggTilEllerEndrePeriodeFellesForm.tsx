import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, InlineMessage, Radio, VStack } from '@navikt/ds-react';

import { RhfNumericField, RhfRadioGroup, RhfSelect } from '@navikt/fp-form-hooks';
import type {
    AktivitetType_fpoversikt,
    BrukerRolleSak_fpoversikt,
    Gradering_fpoversikt,
    KontoTypeUttak,
    MorsAktivitet,
    UttakOverføringÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { getStønadskvoteNavnSimple } from '../liste/utils/uttaksplanListeUtils';
import { useBlokkerendeAlert, useSkjemaKontekstuelleAlerts } from '../regler/alert/skjemaAlerts';
import { useFeltSynlighet } from '../regler/synlighet/feltSynlighet';
import { useForelderValgSynlighet } from '../regler/synlighet/forelderValg';
import { ForelderValg } from '../regler/synlighet/types';
import { erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { getAktivitetskravOptions, getAktivitetskravTekst } from '../utils/periodeUtils';
import { prosentValideringGradering, valideringSamtidigUttak } from './uttaksplanValidatorer';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const SELVSTENDIG_NÆRINGSDRIVENDE = 'SELVSTENDIG_NÆRINGSDRIVENDE' satisfies AktivitetType_fpoversikt;
const FRILANS = 'FRILANS' satisfies AktivitetType_fpoversikt;

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
    hvorSkalDuJobbe?: string;
    ønskerFlerbarnsdager?: boolean;
};

interface Props {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    resetFormValuesVedEndringAvForelder: (forelder: ForelderValg) => void;
}

export const LeggTilEllerEndrePeriodeFellesForm = ({ valgtePerioder, resetFormValuesVedEndringAvForelder }: Props) => {
    const intl = useIntl();

    const {
        foreldreInfo: { rettighetType, erMedmorDelAvSøknaden, søker },
        aktiveArbeidsforhold,
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
        ønskerFlerbarnsdager,
    } = formMethods.watch();

    const feltSynlighet = useFeltSynlighet(valgtePerioder, {
        forelder,
        kontoTypeMor,
        kontoTypeFarMedmor,
        ønskerFlerbarnsdager,
        samtidigUttaksprosentMor,
        stillingsprosentMor,
    });

    const forelderValgSynlighet = useForelderValgSynlighet(valgtePerioder, {
        forelder,
        ønskerFlerbarnsdager,
    });

    const skjemaKontekstuelleAlerts = useSkjemaKontekstuelleAlerts(valgtePerioder);

    const erBareFarHarRett = søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT';

    // Når bare én forelder kan ha foreldrepenger for den valgte perioden, skjuler
    // vi forelder-spørsmålet (se VIS_FORELDER_VALG) og setter verdien bak panseret.
    // Da slipper brukeren å svare på et spørsmål med kun ett gyldig alternativ.
    const { visForelderValg, enesteMuligeForelder } = forelderValgSynlighet;

    useEffect(() => {
        if (forelder === undefined && enesteMuligeForelder !== undefined) {
            formMethods.setValue('forelder', enesteMuligeForelder, { shouldDirty: false });
        }
    }, [forelder, enesteMuligeForelder, formMethods]);

    const blokkerendeAlert = useBlokkerendeAlert({
        valgtePerioder,
        erMorGyldigForelder: forelderValgSynlighet.erMorGyldigForelder,
        erFarMedmorGyldigForelder: forelderValgSynlighet.erFarMedmorGyldigForelder,
    });

    if (blokkerendeAlert) {
        return <Alert variant={blokkerendeAlert.variant}>{blokkerendeAlert.melding}</Alert>;
    }

    const resetStillingsprosentMor = () => {
        if ((forelder === 'MOR' || forelder === 'BEGGE') && skalDuKombinereArbeidOgUttakMor === false) {
            formMethods.resetField('stillingsprosentMor', undefined);
        }
    };

    const resetStillingsprosentFarMedmor = () => {
        if (forelder !== 'MOR' && skalDuKombinereArbeidOgUttakFarMedmor === false) {
            formMethods.resetField('stillingsprosentFarMedmor', undefined);
        }
    };

    const resetAktivitetskrav = () => {
        if (forelder !== 'MOR' && ønskerFlerbarnsdager) {
            formMethods.resetField('morsAktivitet', undefined);
        }
    };

    const resetGraderingFelterForMor = (nyKontoType: KontoTypeUttak | undefined) => {
        if (nyKontoType === 'FEDREKVOTE') {
            formMethods.resetField('skalDuKombinereArbeidOgUttakMor', { defaultValue: undefined });
            formMethods.resetField('stillingsprosentMor', { defaultValue: undefined });
            if (søker === 'MOR') {
                formMethods.resetField('hvorSkalDuJobbe', { defaultValue: undefined });
            }
        }
    };

    const resetGraderingFelterForFarMedmor = (nyKontoType: KontoTypeUttak | undefined) => {
        if (nyKontoType === 'MØDREKVOTE') {
            formMethods.resetField('skalDuKombinereArbeidOgUttakFarMedmor', { defaultValue: undefined });
            formMethods.resetField('stillingsprosentFarMedmor', { defaultValue: undefined });
            if (søker === 'FAR_MEDMOR') {
                formMethods.resetField('hvorSkalDuJobbe', { defaultValue: undefined });
            }
        }

        // Nullstill aktivitetskravsvaret (morsAktivitet) når kontotypen endres. Uten dette
        // henger et svar gitt for en tidligere kontotype (typisk fellesperiode eller
        // foreldrepenger der bare far har rett) igjen i form-state og blir lagret på den nye
        // kontotypen — f.eks. fedrekvote, som normalt ikke skal ha aktivitetskrav. Feltet
        // vises og kreves på nytt dersom den nye kontotypen faktisk har aktivitetskrav (f.eks.
        // fedrekvote i de første seks ukene etter fødsel).
        formMethods.resetField('morsAktivitet', { defaultValue: undefined });
    };

    return (
        <>
            {visForelderValg && (
                <RhfRadioGroup
                    name="forelder"
                    control={formMethods.control}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.Påkrevd' })),
                    ]}
                    label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder' })}
                    onChange={resetFormValuesVedEndringAvForelder}
                >
                    {
                        [
                            forelderValgSynlighet.visMorRadio && (
                                <Radio key="mor" value="MOR">
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Mor" />
                                </Radio>
                            ),
                            forelderValgSynlighet.visFarMedmorRadio && (
                                <Radio key="far" value="FAR_MEDMOR">
                                    {erMedmorDelAvSøknaden ? (
                                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Medmor" />
                                    ) : (
                                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Far" />
                                    )}
                                </Radio>
                            ),
                            forelderValgSynlighet.visBeggeRadio && (
                                <Radio key="begge" value="BEGGE">
                                    <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Begge" />
                                </Radio>
                            ),
                        ].filter(Boolean) as React.ReactElement[]
                    }
                </RhfRadioGroup>
            )}

            {feltSynlighet.visFlerbarnsdager && (
                <RhfRadioGroup
                    name="ønskerFlerbarnsdager"
                    control={formMethods.control}
                    validate={[
                        isRequired(
                            intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager.Påkrevd' }),
                        ),
                    ]}
                    label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager' })}
                    onChange={resetAktivitetskrav}
                >
                    <Radio value={true}>
                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Nei" />
                    </Radio>
                </RhfRadioGroup>
            )}

            {forelder !== undefined && (visForelderValg || feltSynlighet.visFlerbarnsdager) && (
                <hr className="text-ax-border-neutral-subtle" />
            )}

            {forelderValgSynlighet.visKontoMorRadiogruppe && (
                <RhfRadioGroup
                    name="kontoTypeMor"
                    control={formMethods.control}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KvoteTypeMor.Påkrevd' })),
                    ]}
                    label={intl.formatMessage({ id: 'LeggTilEllerEndrePeriodeForm.KvoteTypeMor' })}
                    onChange={resetGraderingFelterForMor}
                >
                    {forelderValgSynlighet.gyldigeStønadskontoerForMor.map((konto) => {
                        return (
                            <Radio
                                key={konto}
                                value={konto}
                                disabled={!!kontoTypeMor && forelderValgSynlighet.erMorLåst}
                            >
                                {getStønadskvoteNavnSimple(intl, konto, erMedmorDelAvSøknaden)}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
            )}
            {forelderValgSynlighet.visKontoFarMedmorRadiogruppe && (
                <RhfRadioGroup
                    name="kontoTypeFarMedmor"
                    control={formMethods.control}
                    validate={[
                        isRequired(
                            intl.formatMessage(
                                {
                                    id: 'LeggTilEllerEndrePeriodeForm.KvoteTypeFarMedmor.Påkrevd',
                                },
                                {
                                    erMedmor: erMedmorDelAvSøknaden,
                                },
                            ),
                        ),
                    ]}
                    label={
                        <FormattedMessage
                            id="LeggTilEllerEndrePeriodeForm.KvoteTypeFarMedmor"
                            values={{ erMedmor: erMedmorDelAvSøknaden }}
                        />
                    }
                    onChange={resetGraderingFelterForFarMedmor}
                >
                    {forelderValgSynlighet.gyldigeStønadskontoerForFarMedmor.map((konto) => {
                        return (
                            <Radio
                                key={konto}
                                value={konto}
                                disabled={!!kontoTypeFarMedmor && forelderValgSynlighet.erFarMedmorLåst}
                            >
                                {getStønadskvoteNavnSimple(intl, konto, erMedmorDelAvSøknaden, erBareFarHarRett)}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
            )}

            {feltSynlighet.visInfoFedrekvoteRundtFødsel && (
                <InlineMessage status="info">
                    <BodyShort>
                        <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Infotekst.FedrekvoteRundtFødsel" />
                    </BodyShort>
                </InlineMessage>
            )}

            {feltSynlighet.visMorOverføring && (
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
                        <Radio value="ALENEOMSORG">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.Aleneomsorg.Mor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                        <Radio value="IKKE_RETT_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.IkkeRett.Mor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                    </RhfRadioGroup>
                </VStack>
            )}

            {feltSynlighet.visFarMedmorOverføring && (
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
                        <Radio value="ALENEOMSORG">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.Aleneomsorg.FarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                        <Radio value="IKKE_RETT_ANNEN_FORELDER">
                            <FormattedMessage
                                id="LeggTilEllerEndrePeriodeForm.Overføringsårsak.IkkeRett.FarMedmor"
                                values={{ erMedmor: erMedmorDelAvSøknaden }}
                            />
                        </Radio>
                    </RhfRadioGroup>
                </VStack>
            )}

            {feltSynlighet.visAktivitetskravFelt && (
                <>
                    <hr className="text-ax-border-neutral-subtle" />
                    <RhfSelect
                        name="morsAktivitet"
                        label={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Label' })}
                        control={formMethods.control}
                        validate={[isRequired(intl.formatMessage({ id: 'AktivitetskravSpørsmål.Påkrevd' }))]}
                        description={intl.formatMessage({ id: 'AktivitetskravSpørsmål.Description' })}
                    >
                        {getAktivitetskravOptions(
                            feltSynlighet.visMorsAktivitetskravVedSamtidigUttak,
                            feltSynlighet.erValgtPeriodeInnenforFørsteSeksUkerEtterFødsel,
                        ).map((value) => {
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
                        inputMode="decimal"
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
                        inputMode="decimal"
                    />
                </>
            )}
            {feltSynlighet.visKombinereArbeidOgUttakMor && (
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
                                {skjemaKontekstuelleAlerts.graderingDagerReduseres && (
                                    <Alert variant={skjemaKontekstuelleAlerts.graderingDagerReduseres.variant}>
                                        {skjemaKontekstuelleAlerts.graderingDagerReduseres.melding}
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
                                    inputMode="decimal"
                                />
                                {aktiveArbeidsforhold !== undefined && søker === 'MOR' && (
                                    <RhfRadioGroup
                                        name="hvorSkalDuJobbe"
                                        control={formMethods.control}
                                        label={intl.formatMessage({
                                            id: 'LeggTilEllerEndrePeriodeForm.HvorSkalDuJobbe',
                                        })}
                                        validate={[
                                            isRequired(
                                                intl.formatMessage({
                                                    id: 'LeggTilEllerEndrePeriodeForm.HvorSkalDuJobbe.Påkrevd',
                                                }),
                                            ),
                                        ]}
                                    >
                                        <>
                                            {aktiveArbeidsforhold.map((a) => (
                                                <Radio key={a.arbeidsgiverId} value={a.arbeidsgiverId}>
                                                    {a.arbeidsgiverNavn}
                                                </Radio>
                                            ))}
                                        </>
                                        <Radio value={SELVSTENDIG_NÆRINGSDRIVENDE}>
                                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Selvstendig" />
                                        </Radio>
                                        <Radio value={FRILANS}>
                                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Frilans" />
                                        </Radio>
                                    </RhfRadioGroup>
                                )}
                            </>
                        )}
                    </VStack>
                </>
            )}
            {feltSynlighet.visKombinereArbeidOgUttakFarMedmor && (
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
                            <>
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
                                    inputMode="decimal"
                                />

                                {aktiveArbeidsforhold !== undefined && søker === 'FAR_MEDMOR' && (
                                    <RhfRadioGroup
                                        name="hvorSkalDuJobbe"
                                        control={formMethods.control}
                                        label={intl.formatMessage({
                                            id: 'LeggTilEllerEndrePeriodeForm.HvorSkalDuJobbe',
                                        })}
                                        validate={[
                                            isRequired(
                                                intl.formatMessage({
                                                    id: 'LeggTilEllerEndrePeriodeForm.HvorSkalDuJobbe.Påkrevd',
                                                }),
                                            ),
                                        ]}
                                    >
                                        <>
                                            {aktiveArbeidsforhold.map((a) => (
                                                <Radio key={a.arbeidsgiverId} value={a.arbeidsgiverId}>
                                                    {a.arbeidsgiverNavn}
                                                </Radio>
                                            ))}
                                        </>
                                        <Radio value={SELVSTENDIG_NÆRINGSDRIVENDE}>
                                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Selvstendig" />
                                        </Radio>
                                        <Radio value={FRILANS}>
                                            <FormattedMessage id="LeggTilEllerEndrePeriodeForm.Frilans" />
                                        </Radio>
                                    </RhfRadioGroup>
                                )}
                            </>
                        )}
                    </VStack>
                </>
            )}
        </>
    );
};

export const mapFraFormValuesTilUttakPeriode = (
    values: LeggTilEllerEndrePeriodeFormFormValues,
    periode: { fom: string; tom: string },
    søker: BrukerRolleSak_fpoversikt,
    kanVelgeArbeidsgiver: boolean,
): UttakPeriode_fpoversikt[] => {
    const nye = new Array<UttakPeriode_fpoversikt>();

    if (values.forelder === 'MOR' || values.forelder === 'BEGGE') {
        const erOverføringMor = values.kontoTypeMor === 'FEDREKVOTE';
        nye.push({
            fom: periode.fom,
            tom: periode.tom,
            kontoType: values.kontoTypeMor === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoTypeMor,
            morsAktivitet: values.morsAktivitet || undefined,
            forelder: 'MOR',
            gradering:
                !erOverføringMor && values.skalDuKombinereArbeidOgUttakMor
                    ? getGradering(søker === 'MOR', values.stillingsprosentMor, values.hvorSkalDuJobbe, kanVelgeArbeidsgiver)
                    : undefined,
            samtidigUttak:
                values.forelder === 'BEGGE' ? getFloatFromString(values.samtidigUttaksprosentMor) : undefined,
            overføringÅrsak: values.overføringsårsak,
            flerbarnsdager: values.ønskerFlerbarnsdager ?? false,
        });
    }
    if (values.forelder === 'FAR_MEDMOR' || values.forelder === 'BEGGE') {
        const erOverføringFarMedmor = values.kontoTypeFarMedmor === 'MØDREKVOTE';
        nye.push({
            fom: periode.fom,
            tom: periode.tom,
            kontoType:
                values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoTypeFarMedmor,
            morsAktivitet:
                values.kontoTypeFarMedmor === 'AKTIVITETSFRI_KVOTE'
                    ? 'IKKE_OPPGITT'
                    : values.morsAktivitet || undefined,
            forelder: 'FAR_MEDMOR',
            gradering:
                !erOverføringFarMedmor && values.skalDuKombinereArbeidOgUttakFarMedmor
                    ? getGradering(
                          søker === 'FAR_MEDMOR',
                          values.stillingsprosentFarMedmor,
                          values.hvorSkalDuJobbe,
                          kanVelgeArbeidsgiver,
                      )
                    : undefined,
            samtidigUttak:
                values.forelder === 'BEGGE' ? getFloatFromString(values.samtidigUttaksprosentFarMedmor) : undefined,
            overføringÅrsak: values.overføringsårsak,
            flerbarnsdager: values.ønskerFlerbarnsdager ?? false,
        });
    }
    return nye;
};

export const lagDefaultValuesLeggTilEllerEndrePeriodeFellesForm = (
    uttaksplanperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtPeriode: { fom: string; tom: string },
    søker: BrukerRolleSak_fpoversikt,
    erPeriodeneTilAnnenPartLåst: boolean,
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
        eksisterendePerioder.some((p) => p.utsettelseÅrsak === 'LOVBESTEMT_FERIE') ||
        eksisterendePerioder.some((p) => erPeriodeneTilAnnenPartLåst && p.forelder !== søker)
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

        const søkersPeriode = søker === 'MOR' ? morsPeriode : farMedmorPeriode;

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
            hvorSkalDuJobbe:
                søkersPeriode.gradering?.aktivitet?.arbeidsgiver?.id ?? søkersPeriode.gradering?.aktivitet?.type,
            ønskerFlerbarnsdager: morsPeriode.flerbarnsdager || farMedmorPeriode.flerbarnsdager,
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
            hvorSkalDuJobbe: periode.gradering?.aktivitet?.arbeidsgiver?.id ?? periode.gradering?.aktivitet?.type,
            morsAktivitet: periode.morsAktivitet,
            overføringsårsak: periode.overføringÅrsak,
            ønskerFlerbarnsdager: periode.flerbarnsdager,
        };
    }

    return {
        forelder: 'MOR',
        kontoTypeMor: periode.kontoType,
        samtidigUttaksprosentMor: periode.samtidigUttak?.toString(),
        skalDuKombinereArbeidOgUttakMor: !!periode.gradering,
        stillingsprosentMor: periode.gradering?.arbeidstidprosent.toString(),
        hvorSkalDuJobbe: periode.gradering?.aktivitet?.arbeidsgiver?.id ?? periode.gradering?.aktivitet?.type,
        overføringsårsak: periode.overføringÅrsak,
        ønskerFlerbarnsdager: periode.flerbarnsdager,
    };
};

const getGradering = (
    erSøker: boolean,
    stillingsprosent: string | undefined,
    hvorSkalDuJobbe: string | undefined,
    kanVelgeArbeidsgiver: boolean,
): Gradering_fpoversikt => {
    // I planleggaren (kanVelgeArbeidsgiver === false) kan ein ikkje oppi aktivitet, så vi set alltid ANNET.
    // 'ANNET' i hvorSkalDuJobbe er ein plassholdar (typisk frå planleggar-import) – brukaren har då
    // ikkje valt ein reell aktivitet, så vi held på ANNET slik at detektoren framleis flaggar perioden.
    if (erSøker && kanVelgeArbeidsgiver && hvorSkalDuJobbe !== 'ANNET') {
        return {
            aktivitet: {
                type: finnAktivitetType(hvorSkalDuJobbe),
                arbeidsgiver:
                    hvorSkalDuJobbe && hvorSkalDuJobbe !== SELVSTENDIG_NÆRINGSDRIVENDE && hvorSkalDuJobbe !== FRILANS
                        ? {
                              id: hvorSkalDuJobbe,
                          }
                        : undefined,
            },
            arbeidstidprosent: getFloatFromString(stillingsprosent) ?? 100,
        } satisfies Gradering_fpoversikt;
    }

    // Dette må endrast når ein byrjar å lagre annen part sine periodar. Per no så kan ein ikkje oppi aktivitet for denne i skjema.
    return {
        aktivitet: {
            type: 'ANNET',
        },
        arbeidstidprosent: getFloatFromString(stillingsprosent) ?? 100,
    } satisfies Gradering_fpoversikt;
};

const finnAktivitetType = (hvorSkalDuJobbe?: string): AktivitetType_fpoversikt => {
    return hvorSkalDuJobbe === 'FRILANS' || hvorSkalDuJobbe === 'SELVSTENDIG_NÆRINGSDRIVENDE'
        ? hvorSkalDuJobbe
        : 'ORDINÆRT_ARBEID';
};
