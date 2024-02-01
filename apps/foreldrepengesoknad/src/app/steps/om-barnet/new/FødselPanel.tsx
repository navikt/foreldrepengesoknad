import { Radio, ReadMore } from '@navikt/ds-react';
import { Block, RegistrertBarn, Søkersituasjon } from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Termin from '../components/Termin';
import { useFormContext } from 'react-hook-form';
import { OmBarnetFormValues } from '../components/OmBarnetFormValues';
import Fødsel from '../components/Fødsel';

interface Props {
    søkersituasjon: Søkersituasjon;
    erFarEllerMedmor: boolean;
    søknadGjelderEtNyttBarn: boolean;
    barnSøktOmFørMenIkkeRegistrert: boolean;
    valgteRegistrerteBarn?: RegistrertBarn[];
}

const FødselPanel: FunctionComponent<Props> = ({
    søkersituasjon,
    erFarEllerMedmor,
    søknadGjelderEtNyttBarn,
    barnSøktOmFørMenIkkeRegistrert,
    valgteRegistrerteBarn,
}) => {
    const intl = useIntl();
    const formMethods = useFormContext<OmBarnetFormValues>();

    const erBarnetFødt = formMethods.watch('erBarnetFødt');

    return (
        <>
            {søknadGjelderEtNyttBarn && (
                <Block padBottom="xl">
                    <RadioGroup
                        name="erBarnetFødt"
                        label={intl.formatMessage({ id: 'omBarnet.erBarnetFødt' })}
                        // validate={[
                        //     isRequired(
                        //         intl.formatMessage({
                        //             id: 'valideringsfeil.annenForelder',
                        //         }),
                        //     ),
                        // ]}
                    >
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RadioGroup>
                    {!erFarEllerMedmor && (
                        <ReadMore header={intl.formatMessage({ id: 'omBarnet.erBarnetFødt.readMore.header' })}>
                            <Block padBottom="m">
                                <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del1" />
                            </Block>
                            <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del2" />
                        </ReadMore>
                    )}
                </Block>
            )}
            {erBarnetFødt === false && søknadGjelderEtNyttBarn && <Termin søkersituasjon={søkersituasjon} />}
            {erBarnetFødt === true && (søknadGjelderEtNyttBarn || barnSøktOmFørMenIkkeRegistrert) && (
                <Fødsel valgteBarn={valgteRegistrerteBarn} søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn} />
            )}
        </>
    );
};

export default FødselPanel;
