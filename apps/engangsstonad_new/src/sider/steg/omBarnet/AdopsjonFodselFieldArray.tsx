import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Block } from '@navikt/fp-common';

import Datepicker from 'fpcommon/form/Datepicker';
import { validateAdopsjonFødselDate } from 'fpcommon/validering/valideringsregler';

export type FormValues = {
    fødselsdatoer?: {
        dato?: string;
    }[];
};

interface Props {
    antallBarn?: number;
    antallBarnDropDown?: number;
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
                        validate={[(fødselsdato) => validateAdopsjonFødselDate(fødselsdato, adopsjonsdato, intl)]}
                    />
                </Block>
            ))}
        </>
    );
};

export default AdopsjonFodselFieldArray;
