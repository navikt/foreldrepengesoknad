import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { Radio, VStack } from '@navikt/ds-react';

import { isRequired } from '@navikt/fp-validation';

import ErFødtPanel from './ErFødtPanel';
import ErIkkeFødtPanel from './ErIkkeFødtPanel';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

const Fødsel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør, antallBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const erBarnetFødt = formMethods.watch('erBarnetFødt');

    return (
        <VStack gap="10">
            <GreenRadioGroup
                label={
                    antallBarn === '1' ? (
                        <FormattedMessage id="barnet.erFødt" />
                    ) : (
                        <FormattedMessage id="barnet.erFødtFlere" />
                    )
                }
                name="erBarnetFødt"
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'validation.required',
                        }),
                    ),
                ]}
            >
                <Radio value={true} autoFocus={erOmBarnetIkkeOppgittFraFør}>
                    <FormattedMessage id="ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="nei" />
                </Radio>
            </GreenRadioGroup>
            {erBarnetFødt && (
                <ErFødtPanel
                    hvemPlanlegger={hvemPlanlegger}
                    erOmBarnetIkkeOppgittFraFør={erOmBarnetIkkeOppgittFraFør}
                    antallBarn={antallBarn}
                />
            )}
            {erBarnetFødt === false && (
                <ErIkkeFødtPanel
                    hvemPlanlegger={hvemPlanlegger}
                    erOmBarnetIkkeOppgittFraFør={erOmBarnetIkkeOppgittFraFør}
                    antallBarn={antallBarn}
                />
            )}
        </VStack>
    );
};
export default Fødsel;
