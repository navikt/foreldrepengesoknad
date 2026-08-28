import dayjs from 'dayjs';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import {
    isBeforeOrSame,
    isDateBeforeToday as isBeforeToday,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

const erBarnetUnder15årPåAdopsjonsdato = (i18nText: string, adopsjonsdato?: string) => (fødselsdato: string) => {
    if (!adopsjonsdato) {
        return null;
    }
    const datoBarnetFyllerFemten = dayjs(fødselsdato).startOf('day').add(15, 'year');
    return dayjs(adopsjonsdato).isBetween(fødselsdato, datoBarnetFyllerFemten, null, '[]') ? null : i18nText;
};

const finnAntallBarnTekst = (antall: number) => {
    switch (antall) {
        case 1: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.1" />;
        }
        case 2: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.2" />;
        }
        case 3: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.3" />;
        }
        case 4: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.4" />;
        }
        case 5: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.5" />;
        }
        case 6: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.6" />;
        }
        case 7: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.7" />;
        }
        case 8: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.8" />;
        }
        case 9: {
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.9" />;
        }
        default: {
            throw new Error('Antall barn ikke supportert: ' + antall);
        }
    }
};

export type FormValues = {
    fødselsdatoer?: Array<{
        dato?: string;
    }>;
};

interface Props {
    adopsjonsdato?: string;
    fields: Array<FieldArrayWithId<FormValues, 'fødselsdatoer', 'id'>>;
}

export const FødselsdatoerFieldArray = ({ adopsjonsdato, fields }: Props) => {
    const intl = useIntl();
    const { control } = useFormContext<FormValues>();

    return (
        <VStack gap="space-40">
            {fields.map((field, index) => (
                <RhfDatepicker
                    key={field.id}
                    control={control}
                    name={`fødselsdatoer.${index}.dato`}
                    minDate={dayjs(adopsjonsdato).subtract(15, 'years')}
                    maxDate={adopsjonsdato && isBeforeToday(adopsjonsdato) ? dayjs(adopsjonsdato) : dayjs()}
                    defaultMonth={adopsjonsdato && isBeforeToday(adopsjonsdato) ? adopsjonsdato : dayjs()}
                    label={
                        fields.length === 1
                            ? intl.formatMessage({ id: 'omBarnet.fødselsdato' })
                            : finnAntallBarnTekst(index + 1)
                    }
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi' })),
                        isValidDate(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat' }),
                        ),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere' }),
                        ),
                        isBeforeOrSame(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato' }),
                            adopsjonsdato,
                        ),
                        erBarnetUnder15årPåAdopsjonsdato(
                            intl.formatMessage({
                                id: 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake',
                            }),
                            adopsjonsdato,
                        ),
                    ]}
                />
            ))}
        </VStack>
    );
};
