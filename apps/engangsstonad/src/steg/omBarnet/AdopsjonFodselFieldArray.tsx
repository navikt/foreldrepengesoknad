import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

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

const AdopsjonFodselFieldArray: React.FunctionComponent<Props> = ({
    adopsjonsdato,
    antallBarn,
    antallBarnDropDown,
}) => {
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
                    minDate={dayjs().subtract(15, 'year').toDate()}
                    maxDate={dayjs().toDate()}
                    label={
                        fields.length === 1
                            ? intl.formatMessage({ id: 'AdopsjonFodselFieldArray.Fødselsdato' })
                            : // @ts-ignore Bør ikkje bruka dynamiske tekstId'ar
                              intl.formatMessage({ id: `AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.${index + 1}` })
                    }
                    validate={[
                        isRequired(intl.formatMessage({ id: 'AdopsjonFodselFieldArray.Fodselsdato.DuMåOppgi' })),
                        isValidDate(intl.formatMessage({ id: 'AdopsjonFodselFieldArray.Fødselsdato.Gyldig' })),
                        (fødselsdato) => {
                            return !fødselsdato || !adopsjonsdato
                                ? undefined
                                : isBeforeTodayOrToday(
                                      intl.formatMessage({
                                          id: 'AdopsjonFodselFieldArray.fodselsdato.MåVæreIdagEllerTidligere',
                                      }),
                                  )(fødselsdato);
                        },
                    ]}
                />
            ))}
        </VStack>
    );
};

export default AdopsjonFodselFieldArray;
