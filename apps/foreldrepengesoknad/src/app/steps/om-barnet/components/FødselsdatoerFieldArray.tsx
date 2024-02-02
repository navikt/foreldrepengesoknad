import { VStack } from '@navikt/ds-react';
import { Datepicker } from '@navikt/fp-form-hooks';
import { useCustomIntl } from '@navikt/fp-ui';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

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
    const { i18n } = useCustomIntl();
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
                            ? i18n('omBarnet.fødselsdato')
                            : i18n(`omBarnet.fødselsdato.adopsjon.${index + 1}`)
                    }
                    //validate={[(value) => validateFødselsdatoAdopsjon(intl)(value, adopsjonsdato)]}
                />
            ))}
        </VStack>
    );
};

export default FødselsdatoerFieldArray;
