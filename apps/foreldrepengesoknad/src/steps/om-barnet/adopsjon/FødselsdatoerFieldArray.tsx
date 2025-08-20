import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { isBeforeToday } from '@navikt/fp-utils';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

const erBarnetUnder15årPåAdopsjonsdato = (i18nText: string, adopsjonsdato?: string) => (fødselsdato: string) => {
    if (!adopsjonsdato) {
        return undefined;
    }
    const datoBarnetFyllerFemten = dayjs(fødselsdato).startOf('day').add(15, 'year');
    return dayjs(adopsjonsdato).isBetween(fødselsdato, datoBarnetFyllerFemten, null, '[]') ? undefined : i18nText;
};

const finnAntallBarnTekst = (antall: number) => {
    switch (antall) {
        case 1:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.1" />;
        case 2:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.2" />;
        case 3:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.3" />;
        case 4:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.4" />;
        case 5:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.5" />;
        case 6:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.6" />;
        case 7:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.7" />;
        case 8:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.8" />;
        case 9:
            return <FormattedMessage id="omBarnet.fødselsdato.adopsjon.9" />;
        default:
            throw new Error('Antall barn ikke supportert: ' + antall);
    }
};

type FormValues = {
    fødselsdatoer?: Array<{
        dato?: string;
    }>;
};

interface Props {
    antallBarn?: number;
    antallBarnDropDown?: string;
    adopsjonsdato?: string;
}

export const FødselsdatoerFieldArray = ({ adopsjonsdato, antallBarn, antallBarnDropDown }: Props) => {
    const intl = useIntl();
    const { control } = useFormContext<FormValues>();
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'fødselsdatoer',
    });

    useEffect(() => {
        if (!antallBarn || (antallBarn === 3 && !antallBarnDropDown)) {
            return;
        }
        const antall = antallBarn < 3 || !antallBarnDropDown ? antallBarn : Number.parseInt(antallBarnDropDown, 10);
        const diff = fields.length - antall;
        if (diff > 0) {
            [...new Array(diff)].forEach((_unused, index) => {
                remove(fields.length - index - 1);
            });
        }
        if (diff < 0) {
            [...new Array(antall - fields.length)].forEach(() => {
                append({ dato: undefined });
            });
        }
    }, [antallBarn, antallBarnDropDown, append, fields.length, remove]);

    return (
        <VStack gap="space-40">
            {fields.map((field, index) => (
                <RhfDatepicker
                    key={field.id}
                    control={control}
                    name={`fødselsdatoer.${index}.dato`}
                    minDate={dayjs(adopsjonsdato).subtract(15, 'years').toDate()}
                    maxDate={adopsjonsdato && isBeforeToday(adopsjonsdato) ? dayjs(adopsjonsdato).toDate() : dayjs()}
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
