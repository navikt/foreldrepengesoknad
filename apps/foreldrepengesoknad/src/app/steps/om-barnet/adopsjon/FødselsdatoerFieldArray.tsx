import { VStack } from '@navikt/ds-react';
import { Datepicker } from '@navikt/fp-form-hooks';
import { isBeforeOrSame, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

const erBarnetUnder15årPåAdopsjonsdato = (i18nText: string, adopsjonsdato?: string) => (fødselsdato: string) => {
    if (!adopsjonsdato) {
        return undefined;
    }
    const datoBarnetFyllerFemten = dayjs(fødselsdato).startOf('day').add(15, 'year');
    return dayjs(adopsjonsdato).isBetween(fødselsdato, datoBarnetFyllerFemten, null, '[]') ? undefined : i18nText;
};

export type FormValues = {
    fødselsdatoer?: Array<{
        dato?: string;
    }>;
};

interface Props {
    antallBarn?: number;
    antallBarnDropDown?: string;
    adopsjonsdato?: string;
}

const FødselsdatoerFieldArray: React.FunctionComponent<Props> = ({ adopsjonsdato, antallBarn, antallBarnDropDown }) => {
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
        <VStack gap="10">
            {fields.map((field, index) => (
                <Datepicker
                    key={field.id}
                    name={`fødselsdatoer.${index}.dato`}
                    minDate={dayjs(adopsjonsdato).subtract(15, 'years').toDate()}
                    maxDate={dayjs(adopsjonsdato).toDate()}
                    label={
                        fields.length === 1
                            ? intl.formatMessage({ id: 'omBarnet.fødselsdato' })
                            : intl.formatMessage({ id: `omBarnet.fødselsdato.adopsjon.${index + 1}` })
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

export default FødselsdatoerFieldArray;
