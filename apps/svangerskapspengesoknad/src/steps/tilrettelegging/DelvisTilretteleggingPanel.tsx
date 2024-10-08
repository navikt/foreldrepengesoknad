import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Barn } from 'types/Barn';
import Tilrettelegging, {
    Arbeidsforholdstype,
    DelivisTilretteleggingPeriodeType,
    TilOgMedDatoType,
} from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';

import { BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfTextField } from '@navikt/fp-form-hooks';
import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
import { tiMånederSidenDato } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { TilretteleggingFormData } from './tilretteleggingStepUtils';
import {
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTilbakeIJobbDato,
    validateStillingsprosentEnDelvisPeriode,
    validerTilretteleggingTomType,
} from './tilretteleggingValidation';

export interface Props {
    barnet: Barn;
    valgtTilrettelegging: Tilrettelegging;
}

const DelvisTilretteleggingPanel: FunctionComponent<Props> = ({ barnet, valgtTilrettelegging }) => {
    const intl = useIntl();

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barnet);

    const typeArbeid = valgtTilrettelegging.arbeidsforhold.type;

    const harSkjema = typeArbeid === Arbeidsforholdstype.VIRKSOMHET || typeArbeid === Arbeidsforholdstype.PRIVAT;
    const sluttDatoArbeid = valgtTilrettelegging.arbeidsforhold.sluttdato;
    const startDatoArbeid = valgtTilrettelegging.arbeidsforhold.startdato;
    const minDatoBehovFom =
        dayjs.max(dayjs(tiMånederSidenDato(barnet.termindato)), dayjs(startDatoArbeid)) || undefined;
    const maxDatoBehovFom = sluttDatoArbeid
        ? dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid))!.toDate()
        : sisteDagForSvangerskapspenger;
    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barnet);

    const formMethods = useFormContext<TilretteleggingFormData>();

    const type = formMethods.watch('type');
    const behovForTilretteleggingFom = formMethods.watch('behovForTilretteleggingFom');
    const enPeriodeMedTilretteleggingFom = formMethods.watch('enPeriodeMedTilretteleggingFom');
    const delvisTilretteleggingPeriodeType = formMethods.watch('delvisTilretteleggingPeriodeType');
    const enPeriodeMedTilretteleggingTomType = formMethods.watch('enPeriodeMedTilretteleggingTomType');

    const minDatoPeriodeFom = behovForTilretteleggingFom ? behovForTilretteleggingFom : minDatoBehovFom;
    const minDatoTilbakeIJobb = enPeriodeMedTilretteleggingFom
        ? dayjs(enPeriodeMedTilretteleggingFom).add(1, 'day')
        : behovForTilretteleggingFom;

    return (
        <>
            <RhfRadioGroup
                name="delvisTilretteleggingPeriodeType"
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
                        label={intl.formatMessage({ id: 'tilrettelegging.stillingsprosent.label' })}
                        description={
                            harSkjema
                                ? intl.formatMessage({
                                      id: 'tilrettelegging.tilrettelagtArbeidType.description',
                                  })
                                : ''
                        }
                        validate={[
                            validateStillingsprosentEnDelvisPeriode(
                                intl,
                                enPeriodeMedTilretteleggingFom,
                                valgtTilrettelegging.arbeidsforhold.stillinger,
                            ),
                        ]}
                    />
                    <ReadMore
                        onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'Ikke_har_100%_stilling')}
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
                            type,
                            valgtTilrettelegging.arbeidsforhold.navn || '',
                            sluttDatoArbeid,
                            kanHaSVPFremTilTreUkerFørTermin,
                        ),
                    ]}
                    defaultMonth={minDatoPeriodeFom ? getDefaultMonth(minDatoPeriodeFom, maxDatoBehovFom) : undefined}
                />
            )}
            {delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.SAMMME_PERIODE_FREM_TIL_TERMIN && (
                <RhfRadioGroup
                    name="enPeriodeMedTilretteleggingTomType"
                    label={intl.formatMessage({
                        id: 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis',
                    })}
                    validate={[
                        validerTilretteleggingTomType(
                            intl,
                            type,
                            behovForTilretteleggingFom,
                            sisteDagForSvangerskapspenger,
                            valgtTilrettelegging.arbeidsforhold.navn || '',
                            sluttDatoArbeid,
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
                                type,
                                valgtTilrettelegging.arbeidsforhold.navn || '',
                                sluttDatoArbeid,
                                kanHaSVPFremTilTreUkerFørTermin,
                            ),
                        ]}
                        defaultMonth={getDefaultMonth(minDatoTilbakeIJobb, maxDatoBehovFom)}
                    />
                )}
        </>
    );
};

export default DelvisTilretteleggingPanel;
