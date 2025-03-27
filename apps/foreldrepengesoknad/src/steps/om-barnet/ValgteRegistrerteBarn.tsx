import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { RegistrertePersonalia } from 'pages/registrerte-personalia/RegistrertePersonalia';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    formaterFødselsdatoerPåBarn,
    getTittelBarnNårNavnSkalIkkeVises,
    sorterRegistrerteBarnEtterEldstOgNavn,
} from 'utils/barnUtils';

import { Label, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { BarnFrontend } from '@navikt/fp-types';
import { isRequired, isValidDate } from '@navikt/fp-validation';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Props {
    valgteRegistrerteBarn: BarnFrontend[];
    skalInkludereTermindato: boolean;
}

export const ValgteRegistrerteBarn = ({ valgteRegistrerteBarn, skalInkludereTermindato }: Props) => {
    const intl = useIntl();

    const alleBarnaLever = valgteRegistrerteBarn.every((barn) => !barn.dødsdato);
    const sorterteBarn = [...valgteRegistrerteBarn].sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const fødselsdatoer = sorterteBarn.map((b) => b.fødselsdato);
    const fødselsdato = sorterteBarn[0].fødselsdato;

    return (
        <>
            <VStack gap="2">
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
