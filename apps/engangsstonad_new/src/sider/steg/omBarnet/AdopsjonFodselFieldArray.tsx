import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Block } from '@navikt/fp-common';

import Datepicker from 'fpcommon/form/Datepicker';

export type FormValues = {
    adopsjonAvEktefellesBarn?: boolean;
    adopsjonsdato?: string;
    antallBarn?: number;
    antallBarnDropDown?: number;
    fødselsdatoer?: {
        dato?: string;
    }[];
};

const AdopsjonFodselFieldArray: React.FunctionComponent = () => {
    const { watch, control } = useFormContext<FormValues>();

    const { fields, remove, append } = useFieldArray({
        control,
        name: 'fødselsdatoer',
    });

    const antallBarn = watch('antallBarn');
    const antallBarnDropDown = watch('antallBarnDropDown');

    useEffect(() => {
        if (!antallBarn) {
            return;
        }
        const antall = antallBarn < 3 || !antallBarnDropDown ? antallBarn : antallBarnDropDown;
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
        <>
            {fields.map((field, index) => (
                <Block margin="xl" key={field.id}>
                    <Datepicker
                        name={`fødselsdatoer.${index}.dato`}
                        disabledDays={[
                            {
                                from: dayjs().subtract(50, 'year').toDate(),
                                to: dayjs().subtract(15, 'year').toDate(),
                            },
                            {
                                from: dayjs().toDate(),
                            },
                        ]}
                        label={
                            <FormattedMessage
                                id={
                                    index === 0
                                        ? 'søknad.fødselsdato'
                                        : `omBarnet.adopsjon.spørsmål.fødselsdato.${index + 1}`
                                }
                            />
                        }
                    />
                </Block>
            ))}
        </>
    );
};

export default AdopsjonFodselFieldArray;
