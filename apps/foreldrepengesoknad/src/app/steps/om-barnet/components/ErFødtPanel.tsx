import { intlUtils } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { validateFødselsdato, validateTermindatoFødsel } from '../validation/omBarnetValidering';
import { FødtBarn } from './OmBarnetFormValues';

const ErFødtPanel: FunctionComponent = () => {
    const intl = useIntl();

    const formMethods = useFormContext<FødtBarn>();
    const { antallBarn, fødselsdatoer } = formMethods.watch();

    const intlIdFødsel = antallBarn > 1 ? 'omBarnet.fødselsdato.flereBarn' : 'omBarnet.fødselsdato';

    const fødselsdato = fødselsdatoer ? fødselsdatoer[0].dato : undefined;

    return (
        <>
            <Datepicker
                name="fødselsdatoer.0.dato"
                label={intlUtils(intl, intlIdFødsel)}
                minDate={dayjs().subtract(3, 'years').toDate()}
                maxDate={dayjs().toDate()}
                validate={[validateFødselsdato(intl)]}
            />
            <Datepicker
                name="termindato"
                minDate={fødselsdato ? dayjs(fødselsdato).subtract(1, 'months').toDate() : undefined}
                maxDate={fødselsdato ? dayjs(fødselsdato).add(6, 'months').toDate() : undefined}
                label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                validate={[validateTermindatoFødsel(intl, fødselsdato)]}
            />
        </>
    );
};

export default ErFødtPanel;
