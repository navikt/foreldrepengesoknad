import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { formaterFødselsdatoerPåBarn, getTittelBarnNårNavnSkalIkkeVises } from 'utils/barnUtils';

import { Label, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { BarnDto_fpoversikt } from '@navikt/fp-types';
import { sorterPersonEtterEldstOgNavn } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { BarnetFormValues } from './OmBarnetFormValues';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Props {
    valgteRegistrerteBarn: BarnDto_fpoversikt[];
    skalInkludereTermindato: boolean;
}

export const ValgteRegistrerteBarn = ({ valgteRegistrerteBarn, skalInkludereTermindato }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<BarnetFormValues>();

    const alleBarnaLever = valgteRegistrerteBarn.every((barn) => !barn.dødsdato);
    const sorterteBarn = [...valgteRegistrerteBarn].sort(sorterPersonEtterEldstOgNavn);
    const fødselsdatoer = sorterteBarn.map((b) => b.fødselsdato);
    const fødselsdato = sorterteBarn[0].fødselsdato;

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const harTerminDatoFraVedtak =
        useQuery({
            ...annenPartVedtakOptions,
            select: (vedtak) => !!vedtak?.termindato,
        }).data ?? false;

    return (
        <>
            <VStack gap="space-8">
                <Label>
                    <FormattedMessage id="omBarnet.valgteBarn.tittel" values={{ antallBarn: sorterteBarn.length }} />
                </Label>
                {alleBarnaLever ? (
                    sorterteBarn.map((barn) => (
                        <RegistrertePersonalia
                            key={barn.fnr}
                            person={barn}
                            fødselsdatoForVisning={formaterFødselsdatoerPåBarn([barn.fødselsdato])}
                            visEtternavn={false}
                        />
                    ))
                ) : (
                    <RegistrertePersonalia
                        person={sorterteBarn[0]}
                        fødselsdatoForVisning={formaterFødselsdatoerPåBarn(fødselsdatoer)}
                        altTekstHvisUkjentNavn={getTittelBarnNårNavnSkalIkkeVises(
                            undefined,
                            fødselsdatoer,
                            sorterteBarn.length,
                            intl,
                        )}
                        visEtternavn={false}
                    />
                )}
            </VStack>
            {skalInkludereTermindato && (
                <RhfDatepicker
                    name="termindato"
                    control={control}
                    description={
                        harTerminDatoFraVedtak ? intl.formatMessage({ id: 'omBarnet.termindato.født.beskrivelse' }) : ''
                    }
                    label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                    defaultMonth={fødselsdato}
                    minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                        isValidDate(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' }),
                        ),
                        (termindato) => {
                            if (!dayjs(termindato).subtract(6, 'months').isSameOrBefore(dayjs(fødselsdato), 'day')) {
                                return intl.formatMessage({
                                    id: 'valideringsfeil.omBarnet.termindato.forLangtFremITid',
                                });
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
            )}
        </>
    );
};
