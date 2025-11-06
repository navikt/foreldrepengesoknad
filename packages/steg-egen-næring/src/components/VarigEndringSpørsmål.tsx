import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Radio, ReadMore } from '@navikt/ds-react';

import { DATE_4_YEARS_AGO } from '@navikt/fp-constants';
import { RhfDatepicker, RhfRadioGroup, RhfTextField, RhfTextarea } from '@navikt/fp-form-hooks';
import { loggUmamiEvent } from '@navikt/fp-metrics';
import { AppName } from '@navikt/fp-types';
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
    isValidNumberForm,
} from '@navikt/fp-validation';

import { NæringFormValues } from '../types/NæringFormValues';

const TEXT_INPUT_MIN_LENGTH = 10;
const TEXT_INPUT_MAX_LENGTH = 1000;

interface Props {
    egenNæringFom: string;
    egenNæringTom?: string;
    varigEndring: boolean | undefined;
    appOrigin: AppName;
}

export const VarigEndringSpørsmål = ({ egenNæringFom, egenNæringTom, varigEndring, appOrigin }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<NæringFormValues>();

    return (
        <>
            <RhfRadioGroup
                name="hattVarigEndringAvNæringsinntektSiste4Kalenderår"
                control={control}
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
            </RhfRadioGroup>
            <ReadMore
                onOpenChange={(open) =>
                    loggUmamiEvent({
                        origin: appOrigin,
                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                        eventData: { tittel: 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel' },
                    })
                }
                header={intl.formatMessage({ id: 'egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info.åpneLabel' })}
            >
                <BodyShort>
                    <FormattedMessage id="egenNæring.egenNæringHattVarigEndringDeSiste4Årene.info" />
                </BodyShort>
            </ReadMore>
            {varigEndring && (
                <>
                    <RhfDatepicker
                        name="varigEndringDato"
                        control={control}
                        label={intl.formatMessage({ id: 'egenNæring.egenNæringVarigEndringDato' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.påkrevd' })),
                            isValidDate(intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.gyldigDato' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.erIFremtiden' }),
                            ),
                            isAfterDate(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringDato.mindreEnn4ÅrSiden' }),
                                DATE_4_YEARS_AGO,
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
                    <RhfTextField
                        name="varigEndringInntektEtterEndring"
                        control={control}
                        label={intl.formatMessage({ id: 'egenNæring.egenNæringVarigEndringInntektEtterEndring' })}
                        description={intl.formatMessage({
                            id: 'egenNæring.egenNæringVarigEndringInntektEtterEndring.description',
                        })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.påkrevd' })),
                            hasMaxLength(intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.forLang' }), 9),
                            isValidNumberForm(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.ugyldigFormat' }),
                            ),
                            hasMinValue(
                                intl.formatMessage({ id: 'valideringsfeil.varigEndringInntekt.mindreEnnNull' }),
                                0,
                            ),
                        ]}
                    />
                    <RhfTextarea
                        name="varigEndringBeskrivelse"
                        control={control}
                        label={intl.formatMessage({ id: 'egenNæring.varigEndringBeskrivelse.label' })}
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
