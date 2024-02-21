import { BodyShort, Radio, ReadMore } from '@navikt/ds-react';
import { Datepicker, RadioGroup, TextArea, TextField } from '@navikt/fp-form-hooks';
import {
    hasMaxLength,
    hasMinLength,
    hasMinValue,
    isAfterDate,
    isAfterOrSame,
    isBeforeOrSame,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
    isValidNumber,
} from '@navikt/fp-validation';
import { date4YearsAgo } from 'app/utils/dateUtils';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    egenNæringFom: string;
    egenNæringTom: string;
    varigEndring: boolean | undefined;
}

const VarigEndringSpørsmål: FunctionComponent<Props> = ({ egenNæringFom, egenNæringTom, varigEndring }) => {
    const intl = useIntl();
    const egenNæringVarigEndringBeskrivelseLabel = intl.formatMessage({
        id: 'egenNæring.varigEndringBeskrivelse.label',
    });

    return (
        <>
            <RadioGroup
                name="hattVarigEndringAvNæringsinntektSiste4Kalenderår"
                label={intl.formatMessage({ id: 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene' })}
                validate={[
                    isRequired(
                        intl.formatMessage({ id: 'valideringsfeil.egenNæringHattVarigEndringDeSiste4Årene.påkrevd' }),
                    ),
                ]}
            >
                <Radio value={true}>
                    <FormattedMessage id="ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="nei" />
                </Radio>
            </RadioGroup>
            <ReadMore
                header={intl.formatMessage({ id: 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel' })}
            >
                <BodyShort>
                    <FormattedMessage id="egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info"></FormattedMessage>
                </BodyShort>
            </ReadMore>
            {varigEndring && (
                <>
                    <Datepicker
                        name="varigEndringDato"
                        label={intl.formatMessage({ id: 'egenNæring.egenNæringVarigEndringDato' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.påkrevd' })),
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.gyldigDato' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.erIFremtiden' }),
                            ),
                            isAfterDate(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden' }),
                                date4YearsAgo,
                            ),
                            isAfterOrSame(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.førFraDato' }),
                                egenNæringFom,
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.etterTilDato' }),
                                egenNæringTom,
                            ),
                        ]}
                        maxDate={dayjs()}
                        minDate={egenNæringFom}
                    />
                    <TextField
                        name="varigEndringInntektEtterEndring"
                        label={intl.formatMessage({ id: 'egenNæring.egenNæringVarigEndringInntektEtterEndring' })}
                        description={intl.formatMessage({
                            id: 'egenNæring.egenNæringVarigEndringInntektEtterEndring.description',
                        })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.påkrevd' })),
                            hasMaxLength(intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.forLang' }), 9),
                            isValidNumber(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.ugyldigFormat' }),
                            ),
                            hasMinValue(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.mindreEnnNull' }),
                                0,
                            ),
                        ]}
                    />
                    <TextArea
                        name="varigEndringBeskrivelse"
                        label={egenNæringVarigEndringBeskrivelseLabel}
                        minLength={TEXT_INPUT_MIN_LENGTH}
                        maxLength={TEXT_INPUT_MAX_LENGTH}
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'valideringsfeil.egenNæringVarigEndringBeskrivelse.påkrevd' }),
                            ),
                            hasMaxLength(
                                intl.formatMessage({ id: 'valideringsfeil.egenNæringVarigEndringBeskrivelse.forLang' }),
                                TEXT_INPUT_MAX_LENGTH,
                            ),
                            hasMinLength(
                                intl.formatMessage({ id: 'valideringsfeil.egenNæringVarigEndringBeskrivelse.forKort' }),
                                TEXT_INPUT_MIN_LENGTH,
                            ),
                        ]}
                    />
                </>
            )}
        </>
    );
};

export default VarigEndringSpørsmål;
