import { Label, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { sorterRegistrerteBarnEtterEldstOgNavn } from 'app/pages/velkommen/velkommenUtils';
import { formaterFødselsdatoerPåBarn, getTittelBarnNårNavnSkalIkkeVises } from 'app/utils/barnUtils';
import dayjs from 'dayjs';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateTermindatoFødsel } from '../validation/omBarnetValidering';

interface Props {
    valgteRegistrerteBarn: RegistrertBarn[];
    skalInkludereTermindato: boolean;
}

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteRegistrerteBarn, skalInkludereTermindato }) => {
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
                    sorterteBarn.map((barn: RegistrertBarn) => (
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
                <Datepicker
                    name="termindato"
                    label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                    defaultMonth={fødselsdato}
                    minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                    validate={[validateTermindatoFødsel(intl, fødselsdato)]}
                />
            )}
        </>
    );
};

export default ValgteRegistrerteBarn;
