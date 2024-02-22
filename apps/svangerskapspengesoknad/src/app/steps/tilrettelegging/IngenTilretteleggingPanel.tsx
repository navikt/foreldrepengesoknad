import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import { Datepicker, RadioGroup } from '@navikt/fp-form-hooks';
import { tiMånederSidenDato } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { Barn } from 'app/types/Barn';
import Tilrettelegging, { Arbeidsforholdstype, TilOgMedDatoType } from 'app/types/Tilrettelegging';
import {
    getDefaultMonth,
    getKanHaSvpFremTilTreUkerFørTermin,
    getSisteDagForSvangerskapspenger,
} from 'app/utils/dateUtils';

import { TilretteleggingFormData } from './tilretteleggingStepUtils';
import {
    validateSammePeriodeFremTilTerminFom,
    validateSammePeriodeFremTilTerminTilbakeIJobbDato,
    validerTilretteleggingTomType,
} from './tilretteleggingValidation';

export interface Props {
    barnet: Barn;
    valgtTilrettelegging: Tilrettelegging;
}

const IngenTilretteleggingPanel: FunctionComponent<Props> = ({ barnet, valgtTilrettelegging }) => {
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

    const minDatoPeriodeFom = behovForTilretteleggingFom ? behovForTilretteleggingFom : minDatoBehovFom;
    const minDatoTilbakeIJobb = enPeriodeMedTilretteleggingFom
        ? dayjs(enPeriodeMedTilretteleggingFom).add(1, 'day')
        : behovForTilretteleggingFom;

    return (
        <>
            <Datepicker
                name="enPeriodeMedTilretteleggingFom"
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
                        type,
                        valgtTilrettelegging.arbeidsforhold.navn,
                        sluttDatoArbeid,
                        kanHaSVPFremTilTreUkerFørTermin,
                    ),
                ]}
                defaultMonth={minDatoPeriodeFom ? getDefaultMonth(minDatoPeriodeFom, maxDatoBehovFom) : undefined}
            />
            <RadioGroup
                name="enPeriodeMedTilretteleggingTomType"
                label={intl.formatMessage({
                    id: 'tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen',
                })}
                validate={[
                    validerTilretteleggingTomType(
                        intl,
                        type,
                        behovForTilretteleggingFom,
                        sisteDagForSvangerskapspenger,
                        valgtTilrettelegging.arbeidsforhold.navn,
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
            </RadioGroup>
            <Datepicker
                name="enPeriodeMedTilretteleggingTilbakeIJobbDato"
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
                        type,
                        valgtTilrettelegging.arbeidsforhold.navn,
                        sluttDatoArbeid,
                        kanHaSVPFremTilTreUkerFørTermin,
                    ),
                ]}
                defaultMonth={getDefaultMonth(minDatoTilbakeIJobb, maxDatoBehovFom)}
            />
        </>
    );
};

export default IngenTilretteleggingPanel;
