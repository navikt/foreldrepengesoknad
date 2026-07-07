import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { erFødtFørUke33, getAntallVirkedagerFraFødselTilTermin, getVarighetString } from 'utils/dateUtils';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Infobox } from '@navikt/fp-ui';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

import { FødtBarn } from '../OmBarnetFormValues';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const ErFødtPanel = () => {
    const intl = useIntl();

    const formMethods = useFormContext<FødtBarn>();
    const { antallBarn, erBarnetFødt, fødselsdatoer, termindato } = formMethods.watch();

    const intlIdFødsel = antallBarn > 1 ? 'omBarnet.fødselsdato.flereBarn' : 'omBarnet.fødselsdato';

    const fødselsdato = fødselsdatoer ? fødselsdatoer[0]!.dato : undefined;

    const visInfoOmForlengetPeriode = erFødtFørUke33(fødselsdato, termindato);

    const varighet =
        visInfoOmForlengetPeriode && fødselsdato && termindato
            ? getVarighetString(getAntallVirkedagerFraFødselTilTermin(fødselsdato, termindato), intl)
            : undefined;

    return (
        <>
            <RhfDatepicker
                name="termindato"
                control={formMethods.control}
                minDate={fødselsdato ? dayjs(fødselsdato).subtract(1, 'months') : undefined}
                maxDate={fødselsdato ? dayjs(fødselsdato).add(6, 'months') : undefined}
                label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                useStrategyAbsolute
                validate={[
                    isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' })),
                    (termindatoVerdi) => {
                        if (!fødselsdato) {
                            return null;
                        }
                        if (!dayjs(termindatoVerdi).subtract(6, 'months').isSameOrBefore(dayjs(fødselsdato), 'day')) {
                            return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.forLangtFremITid' });
                        }
                        if (!dayjs(termindatoVerdi).add(1, 'months').isSameOrAfter(dayjs(fødselsdato), 'day')) {
                            return intl.formatMessage({
                                id: 'valideringsfeil.omBarnet.termindato.forLangtTilbakeITid',
                            });
                        }
                        return null;
                    },
                ]}
            />
            {erBarnetFødt && (
                <RhfDatepicker
                    name="fødselsdatoer.0.dato"
                    control={formMethods.control}
                    label={intl.formatMessage({ id: intlIdFødsel })}
                    minDate={dayjs().subtract(3, 'years')}
                    maxDate={dayjs()}
                    useStrategyAbsolute
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi' })),
                        isValidDate(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat' }),
                        ),
                        isBeforeTodayOrToday(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere' }),
                        ),
                        (fødselsdatoVerdi) =>
                            dayjs(fødselsdatoVerdi).isBefore(dayjs().subtract(3, 'years').subtract(4, 'months'), 'day')
                                ? intl.formatMessage({
                                      id: 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake',
                                  })
                                : null,
                    ]}
                />
            )}
            {visInfoOmForlengetPeriode && (
                <Infobox color="blue" header={<FormattedMessage id="omBarnet.erFødtFørUke33.tittel" />}>
                    <VStack gap="space-16">
                        <BodyShort>
                            <FormattedMessage id="omBarnet.erFødtFørUke33.tekst" values={{ varighet }} />
                        </BodyShort>
                        <ReadMore header={intl.formatMessage({ id: 'omBarnet.erFødtFørUke33.readMore.header' })}>
                            <FormattedMessage id="omBarnet.erFødtFørUke33.readMore.tekst" />
                        </ReadMore>
                    </VStack>
                </Infobox>
            )}
        </>
    );
};
