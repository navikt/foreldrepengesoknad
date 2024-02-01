import { Radio, ReadMore } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { Situasjon } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    søknadGjelderEtNyttBarn: boolean;
}

const BarnFødtEllerAdoptert: FunctionComponent<Props> = ({ erFarEllerMedmor, situasjon, søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();
    return (
        <>
            {situasjon === 'adopsjon' && (
                <Block padBottom="xl">
                    <RadioGroup
                        name="adopsjonAvEktefellesBarn"
                        label={intl.formatMessage({ id: 'omBarnet.adopsjonGjelder' })}
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
                </Block>
            )}
            {situasjon === 'fødsel' && søknadGjelderEtNyttBarn && (
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
        </>
    );
};

export default BarnFødtEllerAdoptert;
