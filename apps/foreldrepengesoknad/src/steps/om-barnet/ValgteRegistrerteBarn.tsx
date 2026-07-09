import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions } from 'api/queries';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { formaterFødselsdatoerPåBarn, getTittelBarnNårNavnSkalIkkeVises } from 'utils/barnUtils';
import { erFødtFørUke33, getAntallVirkedagerFraFødselTilTermin, getVarighetString } from 'utils/dateUtils';

import { Alert, BodyShort, Heading, Label, ReadMore, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { FpBarnDto_fpoversikt } from '@navikt/fp-types';
import { sorterPersonEtterEldstOgNavn } from '@navikt/fp-utils';
import { isRequired, isValidDate } from '@navikt/fp-validation';

import { BarnetFormValues } from './OmBarnetFormValues';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Props {
    valgteRegistrerteBarn: FpBarnDto_fpoversikt[];
    skalInkludereTermindato: boolean;
}

export const ValgteRegistrerteBarn = ({ valgteRegistrerteBarn, skalInkludereTermindato }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<BarnetFormValues>();
    const { control } = formMethods;
    const termindato = formMethods.watch('termindato');

    const alleBarnaLever = valgteRegistrerteBarn.every((barn) => !barn.dødsdato);
    const sorterteBarn = [...valgteRegistrerteBarn].sort(sorterPersonEtterEldstOgNavn);
    const fødselsdatoer = sorterteBarn.map((b) => b.fødselsdato);
    const fødselsdato = sorterteBarn[0]!.fødselsdato;

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const harTerminDatoFraVedtak =
        useQuery({
            ...annenPartVedtakOptions,
            select: (vedtak) => !!vedtak?.termindato,
        }).data ?? false;

    const visInfoOmForlengetPeriode = skalInkludereTermindato && erFødtFørUke33(fødselsdato, termindato);

    const varighet =
        visInfoOmForlengetPeriode && fødselsdato && termindato
            ? getVarighetString(getAntallVirkedagerFraFødselTilTermin(fødselsdato, termindato), intl)
            : undefined;

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
                        person={sorterteBarn[0]!}
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
                    minDate={dayjs(fødselsdato).subtract(1, 'months')}
                    maxDate={dayjs(fødselsdato).add(6, 'months')}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' })),
                        isValidDate(
                            intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' }),
                        ),
                        (termindatoVerdi) => {
                            if (
                                !dayjs(termindatoVerdi).subtract(6, 'months').isSameOrBefore(dayjs(fødselsdato), 'day')
                            ) {
                                return intl.formatMessage({
                                    id: 'valideringsfeil.omBarnet.termindato.forLangtFremITid',
                                });
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
            )}
            {visInfoOmForlengetPeriode && (
                <Alert variant="info">
                    <VStack gap="space-16">
                        <Heading level="3" size="small">
                            <FormattedMessage id="omBarnet.erFødtFørUke33.tittel" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="omBarnet.erFødtFørUke33.tekst" values={{ varighet }} />
                        </BodyShort>
                        <ReadMore header={intl.formatMessage({ id: 'omBarnet.erFødtFørUke33.readMore.header' })}>
                            <FormattedMessage id="omBarnet.erFødtFørUke33.readMore.tekst" />
                        </ReadMore>
                    </VStack>
                </Alert>
            )}
        </>
    );
};
