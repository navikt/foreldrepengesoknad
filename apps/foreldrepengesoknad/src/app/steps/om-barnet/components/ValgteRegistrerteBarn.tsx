import { Label } from '@navikt/ds-react';
import { Block, RegistrertBarn, hasValue } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { sorterRegistrerteBarnEtterEldstOgNavn } from 'app/pages/velkommen/velkommenUtils';
import { formaterFødselsdatoerPåBarn, getLeverBarnet, getTittelBarnNårNavnSkalIkkeVises } from 'app/utils/barnUtils';
import dayjs from 'dayjs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateTermindatoFødsel } from '../validation/omBarnetValidering';
import { OmBarnetFormValues } from './OmBarnetFormValues';

interface Props {
    valgteRegistrerteBarn: RegistrertBarn[];
}

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteRegistrerteBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();
    const formValues = formMethods.watch();

    const antallBarn = valgteRegistrerteBarn.length;
    const alleBarnaLever = valgteRegistrerteBarn.every((b) => getLeverBarnet(b));
    valgteRegistrerteBarn.sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const fødselsdatoer = valgteRegistrerteBarn.map((b) => b.fødselsdato);
    const fødselsdato = valgteRegistrerteBarn[0].fødselsdato;

    return (
        <>
            <Block padBottom="xl">
                <div>
                    <Block padBottom="s">
                        <Label>
                            <FormattedMessage id="omBarnet.valgteBarn.tittel" values={{ antallBarn }} />
                        </Label>
                    </Block>
                    {alleBarnaLever ? (
                        valgteRegistrerteBarn.map((barn: RegistrertBarn) => (
                            <Block padBottom="s" key={barn.fnr}>
                                <RegistrertePersonalia
                                    person={barn}
                                    fødselsdatoForVisning={formaterFødselsdatoerPåBarn([barn.fødselsdato])}
                                    visEtternavn={false}
                                />
                            </Block>
                        ))
                    ) : (
                        <Block padBottom="s">
                            <RegistrertePersonalia
                                person={valgteRegistrerteBarn[0]}
                                fødselsdatoForVisning={formaterFødselsdatoerPåBarn(fødselsdatoer)}
                                altTekstHvisUkjentNavn={getTittelBarnNårNavnSkalIkkeVises(
                                    undefined,
                                    fødselsdatoer,
                                    valgteRegistrerteBarn.length,
                                    intl,
                                )}
                                visEtternavn={false}
                            />
                        </Block>
                    )}
                </div>
            </Block>
            {((formValues.fødselsdatoer && hasValue(formValues.fødselsdatoer[0].dato)) ||
                (formValues.erBarnetFødt === false && hasValue(antallBarn)) ||
                (valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0)) &&
                valgteRegistrerteBarn.length > 0 && (
                    <Block padBottom="l">
                        <Datepicker
                            name="termindato"
                            label={intl.formatMessage({ id: 'omBarnet.termindato.født' })}
                            defaultMonth={fødselsdato}
                            minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                            maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                            validate={[validateTermindatoFødsel(dateToISOString(fødselsdato), intl)]}
                        />
                    </Block>
                )}
        </>
    );
};

export default ValgteRegistrerteBarn;
