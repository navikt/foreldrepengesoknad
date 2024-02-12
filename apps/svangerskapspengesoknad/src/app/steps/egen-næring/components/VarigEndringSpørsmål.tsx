import { ISOStringToDate, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    validateEgenNæringVarigEndringBeskrivelse,
    validateEgenNæringVarigEndringDato,
    validateEgenNæringVarigEndringInntekt,
} from '../egenNæringValidation';
import { EgenNæringFormField } from 'app/steps/egen-næring/egenNæringFormConfig';
import dayjs from 'dayjs';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH } from 'app/utils/validationUtils';
import { BodyShort, Radio, ReadMore } from '@navikt/ds-react';
import { Datepicker, RadioGroup, TextArea, TextField } from '@navikt/fp-form-hooks';

interface Props {
    egenNæringFom: string;
    egenNæringTom: string;
    varigEndring: boolean | undefined;
}

const VarigEndringSpørsmål: FunctionComponent<Props> = ({ egenNæringFom, egenNæringTom, varigEndring }) => {
    const intl = useIntl();
    const egenNæringVarigEndringBeskrivelseLabel = intlUtils(intl, 'egenNæring.varigEndringBeskrivelse.label');
    return (
        <>
            <RadioGroup
                name={EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene}
                label={intlUtils(intl, 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene')}
                // validate={[
                //     (value) =>
                //         validateYesOrNoIsAnswered(
                //             value,
                //             intlUtils(intl, 'valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd'),
                //         ),
                // ]}
            >
                <Radio value={true}>
                    <FormattedMessage id="ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="nei" />
                </Radio>
            </RadioGroup>
            <ReadMore header={intlUtils(intl, 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel')}>
                <BodyShort>
                    <FormattedMessage id="egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"></FormattedMessage>
                </BodyShort>
            </ReadMore>
            {varigEndring && (
                <>
                    <Datepicker
                        name={EgenNæringFormField.egenNæringVarigEndringDato}
                        label={intlUtils(intl, 'egenNæring.egenNæringVarigEndringDato')}
                        validate={[validateEgenNæringVarigEndringDato(intl, egenNæringFom, egenNæringTom)]}
                        maxDate={dayjs().toDate()}
                        minDate={ISOStringToDate(egenNæringFom)}
                    />
                    <TextField
                        name={EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring}
                        label={intlUtils(intl, 'egenNæring.egenNæringVarigEndringInntektEtterEndring')}
                        description={intlUtils(
                            intl,
                            'egenNæring.egenNæringVarigEndringInntektEtterEndring.description',
                        )}
                        validate={[validateEgenNæringVarigEndringInntekt(intl)]}
                    />
                    <TextArea
                        name={EgenNæringFormField.egenNæringVarigEndringBeskrivelse}
                        label={egenNæringVarigEndringBeskrivelseLabel}
                        minLength={TEXT_INPUT_MIN_LENGTH}
                        maxLength={TEXT_INPUT_MAX_LENGTH}
                        validate={[
                            validateEgenNæringVarigEndringBeskrivelse(intl, egenNæringVarigEndringBeskrivelseLabel),
                        ]}
                    />
                </>
            )}
        </>
    );
};

export default VarigEndringSpørsmål;
