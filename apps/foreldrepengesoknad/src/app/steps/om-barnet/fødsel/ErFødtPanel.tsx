import { Datepicker } from '@navikt/fp-form-hooks';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useIntl } from 'react-intl';
import { FødtBarn } from '../OmBarnetFormValues';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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
                label={intl.formatMessage({ id: intlIdFødsel })}
                minDate={dayjs().subtract(3, 'years').toDate()}
                maxDate={dayjs().toDate()}
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat' })),
                    isBeforeTodayOrToday(
                        intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere' }),
                    ),
                    (fødselsdato) =>
                        dayjs(fødselsdato).isBefore(dayjs().subtract(3, 'years').subtract(4, 'months'), 'day')
                            ? intl.formatMessage({
                                  id: 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake',
                              })
                            : undefined,
                ]}
            />
            <Datepicker
                name="termindato"
                minDate={fødselsdato ? dayjs(fødselsdato).subtract(1, 'months').toDate() : undefined}
                maxDate={fødselsdato ? dayjs(fødselsdato).add(6, 'months').toDate() : undefined}
                label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' })),
                    (termindato) => {
                        if (!fødselsdato) {
                            return undefined;
                        }
                        if (!dayjs(termindato).subtract(6, 'months').isSameOrBefore(dayjs(fødselsdato), 'day')) {
                            return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.forLangtFremITid' });
                        }
                        if (!dayjs(termindato).add(1, 'months').isSameOrAfter(dayjs(fødselsdato), 'day')) {
                            return intl.formatMessage({
                                id: 'valideringsfeil.omBarnet.termindato.forLangtTilbakeITid',
                            });
                        }
                        return undefined;
                    },
                ]}
            />
        </>
    );
};

export default ErFødtPanel;
