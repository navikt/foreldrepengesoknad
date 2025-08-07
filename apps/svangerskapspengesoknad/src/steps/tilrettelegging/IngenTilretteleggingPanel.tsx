import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Barn } from 'types/Barn';
import {
    Arbeidsforholdstype,
    IngenTilrettelegging,
    TilOgMedDatoType,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { getDefaultMonth, getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';

import { Radio } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { tiMånederSidenDato } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import {
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTilbakeIJobbDato,
    validerTilretteleggingTomType,
} from './tilretteleggingValidation';

interface Props {
    barnet: Barn;
    arbeidsforholdType: Arbeidsforholdstype;
    sluttdatoArbeid?: string;
    startdatoArbeid: string;
    arbeidsforholdNavn?: string;
}

export const IngenTilretteleggingPanel = ({
    barnet,
    sluttdatoArbeid,
    startdatoArbeid,
    arbeidsforholdType,
    arbeidsforholdNavn,
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

    const formMethods = useFormContext<IngenTilrettelegging>();

    const behovForTilretteleggingFom = formMethods.watch('behovForTilretteleggingFom');
    const enPeriodeMedTilretteleggingFom = formMethods.watch('enPeriodeMedTilretteleggingFom');
    const enPeriodeMedTilretteleggingTomType = formMethods.watch('enPeriodeMedTilretteleggingTomType');

    const minDatoPeriodeFom = behovForTilretteleggingFom ?? minDatoBehovFom;
    const minDatoTilbakeIJobb = enPeriodeMedTilretteleggingFom
        ? dayjs(enPeriodeMedTilretteleggingFom).add(1, 'day')
        : behovForTilretteleggingFom;

    return (
        <>
            <RhfDatepicker
                name="enPeriodeMedTilretteleggingFom"
                control={formMethods.control}
                label={intl.formatMessage({
                    id: 'tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen',
                })}
                description={
                    harSkjema ? intl.formatMessage({ id: 'tilrettelegging.tilrettelagtArbeidType.description' }) : ''
                }
                minDate={minDatoPeriodeFom}
                maxDate={maxDatoBehovFom}
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.ingen',
                        }),
                    ),
                    isValidDate(
                        intl.formatMessage({
                            id: 'valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.ingen',
                        }),
                    ),
                    validateSammePeriodeFremTilTerminFom(
                        intl,
                        behovForTilretteleggingFom,
                        sisteDagForSvangerskapspenger,
                        Tilretteleggingstype.INGEN,
                        arbeidsforholdNavn || '',
                        sluttdatoArbeid,
                        kanHaSVPFremTilTreUkerFørTermin,
                    ),
                ]}
                defaultMonth={minDatoPeriodeFom ? getDefaultMonth(minDatoPeriodeFom, maxDatoBehovFom) : undefined}
            />
            <RhfRadioGroup
                name="enPeriodeMedTilretteleggingTomType"
                control={formMethods.control}
                label={intl.formatMessage({
                    id: 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen',
                })}
                validate={[
                    validerTilretteleggingTomType(intl, Tilretteleggingstype.INGEN, kanHaSVPFremTilTreUkerFørTermin),
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
            {enPeriodeMedTilretteleggingTomType === TilOgMedDatoType.VALGFRI_DATO && (
                <RhfDatepicker
                    name="enPeriodeMedTilretteleggingTilbakeIJobbDato"
                    control={formMethods.control}
                    label={intl.formatMessage({
                        id: 'tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.ingen',
                    })}
                    minDate={minDatoTilbakeIJobb}
                    maxDate={maxDatoBehovFom}
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.ingen',
                            }),
                        ),
                        isValidDate(
                            intl.formatMessage({
                                id: 'valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.ingen',
                            }),
                        ),
                        validateSammePeriodeFremTilTerminTilbakeIJobbDato(
                            intl,
                            behovForTilretteleggingFom,
                            sisteDagForSvangerskapspenger,
                            enPeriodeMedTilretteleggingFom,
                            Tilretteleggingstype.INGEN,
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
