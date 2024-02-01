import { Radio } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import AdopsjonAnnetBarn from '../components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from '../components/AdopsjonEktefellesBarn';
import { OmBarnetFormValues } from '../components/OmBarnetFormValues';

interface Props {
    søknadGjelderEtNyttBarn: boolean;
}

const AdopsjonPanel: FunctionComponent<Props> = ({ søknadGjelderEtNyttBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetFormValues>();

    const adopsjonAvEktefellesBarn = formMethods.watch('adopsjonAvEktefellesBarn');

    return (
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
            {adopsjonAvEktefellesBarn === false && (
                <AdopsjonAnnetBarn søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn} />
            )}
            {adopsjonAvEktefellesBarn === true && (
                <AdopsjonEktefellesBarn søknadGjelderEtNyttBarn={søknadGjelderEtNyttBarn} />
            )}
        </Block>
    );
};

export default AdopsjonPanel;
