import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Datepicker } from '@navikt/fp-form-hooks';
import { VStack } from '@navikt/ds-react';
import { useFormValidators } from '@navikt/fp-validation';

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
    const {
        isRequired,
        date: { isValidDate, isBeforeTodayOrToday },
    } = useFormValidators();

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
    }, [antallBarn, antallBarnDropDown]);

    return (
        <VStack gap="10">
            {fields.map((field, index) => (
                <Datepicker
                    key={field.id}
                    name={`fødselsdatoer.${index}.dato`}
                    minDate={dayjs().subtract(15, 'year').toDate()}
                    maxDate={dayjs().toDate()}
                    label={
                        <FormattedMessage
                            id={
                                fields.length === 1
                                    ? 'AdopsjonFodselFieldArray.Fødselsdato'
                                    : `AdopsjonFodselFieldArray.Spørsmål.Fødselsdato.${index + 1}`
                            }
                        />
                    }
                    validate={[
                        isRequired('AdopsjonFodselFieldArray.Fodselsdato.DuMåOppgi'),
                        isValidDate('AdopsjonFodselFieldArray.Fødselsdato.Gyldig'),
                        (fødselsdato) => {
                            return !fødselsdato || !adopsjonsdato
                                ? undefined
                                : isBeforeTodayOrToday('AdopsjonFodselFieldArray.fodselsdato.MåVæreIdagEllerTidligere')(
                                      fødselsdato,
                                  );
                        },
                    ]}
                />
            ))}
        </VStack>
    );
};

export default AdopsjonFodselFieldArray;
