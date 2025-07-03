import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Barn } from 'types/Barn';
import {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    DelvisTilrettelegging,
    IngenTilrettelegging,
    Stilling,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';

import { BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfTextField } from '@navikt/fp-form-hooks';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { tiMånederSidenDato } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import {
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTilbakeIJobbDato,
    validateStillingsprosentEnDelvisPeriode,
    validerTilretteleggingTomType,
} from './tilretteleggingValidation';

export interface Props {
    barnet: Barn;
    arbeidsforholdType: Arbeidsforholdstype;
    sluttdatoArbeid?: string;
    startdatoArbeid: string;
    arbeidsforholdNavn?: string;
    stillinger: Stilling[];
}

export const DelvisTilretteleggingPanel = ({
    barnet,
    arbeidsforholdType,
    sluttdatoArbeid,
    startdatoArbeid,
    arbeidsforholdNavn,
    stillinger,
}: Props) => {
    const intl = useIntl();

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);

    const harSkjema =
        arbeidsforholdType === Arbeidsforholdstype.VIRKSOMHET || arbeidsforholdType === Arbeidsforholdstype.PRIVAT;
    const minDatoBehovFom =
        dayjs.max(dayjs(tiMånederSidenDato(barnet.termindato)), dayjs(startdatoArbeid)) || undefined;
    const maxDatoBehovFom = sluttdatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttdatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const formMethods = useFormContext<DelvisTilrettelegging | IngenTilrettelegging>();
    const behovForTilretteleggingFom = formMethods.watch('behovForTilretteleggingFom');
    const enPeriodeMedTilretteleggingFom = formMethods.watch('enPeriodeMedTilretteleggingFom');
    const delvisTilretteleggingPeriodeType = formMethods.watch('delvisTilretteleggingPeriodeType');
    const enPeriodeMedTilretteleggingTomType = formMethods.watch('enPeriodeMedTilretteleggingTomType');

    const minDatoPeriodeFom = behovForTilretteleggingFom ?? minDatoBehovFom;
    const minDatoTilbakeIJobb = enPeriodeMedTilretteleggingFom
        ? dayjs(enPeriodeMedTilretteleggingFom).add(1, 'day')
        : behovForTilretteleggingFom;

    return (
        <>
            <RhfRadioGroup
                name="delvisTilretteleggingPeriodeType"
                control={formMethods.control}
                label={intl.formatMessage({ id: 'tilrettelegging.tilretteleggingPeriodetype.label' })}
                description={
                    harSkjema ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.description' }) : ''
                }
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.tilretteleggingPeriodeType.mangler' })),
                ]}
            >
                <Radio value={DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN}>
                    <FormattedMessage id="tilrettelegging.tilretteleggingPeriodetype.en" />
                </Radio>
                <Radio value={DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER}>
                    <FormattedMessage id="tilrettelegging.tilretteleggingPeriodetype.variert" />
                </Radio>
            </RhfRadioGroup>
            {delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN && (
                <div>
                    <RhfTextField
                        name="enPeriodeMedTilretteleggingStillingsprosent"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'tilrettelegging.stillingsprosent.label' })}
                        description={
                            harSkjema
                                ? intl.formatMessage({
                                      id: 'tilrettelegging.tilrettelagtArbeidType.description',
                                  })
                                : ''
                        }
                        validate={[
                            validateStillingsprosentEnDelvisPeriode(intl, enPeriodeMedTilretteleggingFom, stillinger),
                        ]}
                    />
                    <ReadMore
                        onOpenChange={(open) =>
                            loggAmplitudeEvent({
                                origin: 'svangerskapspengesoknad',
                                eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                eventData: { tittel: 'tilrettelegging.varierendePerioderStillingsprosent.info.tittel' },
                            })
                        }
                        header={intl.formatMessage({
                            id: 'tilrettelegging.varierendePerioderStillingsprosent.info.tittel',
                        })}
                    >
                        <VStack gap="2">
                            <BodyShort>
                                <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"></FormattedMessage>
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"></FormattedMessage>
                            </BodyShort>
                        </VStack>
                    </ReadMore>
                </div>
            )}
            {delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN && (
                <RhfDatepicker
                    name="enPeriodeMedTilretteleggingFom"
                    control={formMethods.control}
                    label={intl.formatMessage({
                        id: 'tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis',
                    })}
                    description={
                        harSkjema
                            ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.description' })
                            : ''
                    }
                    minDate={minDatoPeriodeFom}
                    maxDate={maxDatoBehovFom}
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis',
                            }),
                        ),
                        isValidDate(
                            intl.formatMessage({
                                id: 'valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.delvis',
                            }),
                        ),
                        validateSammePeriodeFremTilTerminFom(
                            intl,
                            behovForTilretteleggingFom,
                            sisteDagForSvangerskapspenger,
                            Tilretteleggingstype.DELVIS,
                            arbeidsforholdNavn || '',
                            sluttdatoArbeid,
                            kanHaSVPFremTilTreUkerFørTermin,
                        ),
                    ]}
                    defaultMonth={minDatoPeriodeFom ? getDefaultMonth(minDatoPeriodeFom, maxDatoBehovFom) : undefined}
                />
            )}
            {delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN && (
                <RhfRadioGroup
                    name="enPeriodeMedTilretteleggingTomType"
                    control={formMethods.control}
                    label={intl.formatMessage({
                        id: 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis',
                    })}
                    validate={[
                        validerTilretteleggingTomType(
                            intl,
                            Tilretteleggingstype.DELVIS,
                            kanHaSVPFremTilTreUkerFørTermin,
                        ),
                    ]}
                >
                    <Radio value={TilOgMedDatoType.VALGFRI_DATO}>
                        <FormattedMessage id="perioder.varierende.tomType.valgfriDato" />
                    </Radio>
                    <Radio value={TilOgMedDatoType.SISTE_DAG_MED_SVP}>
                        {kanHaSVPFremTilTreUkerFørTermin ? (
                            <FormattedMessage id="perioder.varierende.tomType.treUkerFørTermin" />
                        ) : (
                            <FormattedMessage id="perioder.varierende.tomType.dagenFørFødsel" />
                        )}
                    </Radio>
                </RhfRadioGroup>
            )}
            {delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN &&
                enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO && (
                    <RhfDatepicker
                        name="enPeriodeMedTilretteleggingTilbakeIJobbDato"
                        control={formMethods.control}
                        label={intl.formatMessage({
                            id: 'tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis',
                        })}
                        minDate={minDatoTilbakeIJobb}
                        maxDate={maxDatoBehovFom}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.delvis',
                                }),
                            ),
                            isValidDate(
                                intl.formatMessage({
                                    id: 'valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.delvis',
                                }),
                            ),
                            validateSammePeriodeFremTilTerminTilbakeIJobbDato(
                                intl,
                                behovForTilretteleggingFom,
                                sisteDagForSvangerskapspenger,
                                enPeriodeMedTilretteleggingFom,
                                Tilretteleggingstype.DELVIS,
                                arbeidsforholdNavn || '',
                                sluttdatoArbeid,
                                kanHaSVPFremTilTreUkerFørTermin,
                            ),
                        ]}
                        defaultMonth={getDefaultMonth(minDatoTilbakeIJobb, maxDatoBehovFom)}
                    />
                )}
        </>
    );
};
