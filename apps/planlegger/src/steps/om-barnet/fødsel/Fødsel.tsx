import { BlueRadioGroup } from 'components/form-wrappers/BlueRadioGroup';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { Radio, VStack } from '@navikt/ds-react';

import { isRequired } from '@navikt/fp-validation';

import { ErFødtPanel } from './ErFødtPanel';
import { ErIkkeFødtPanel } from './ErIkkeFødtPanel';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
    scrollToBottom: () => void;
};

export const Fødsel = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør, antallBarn, scrollToBottom }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const erBarnetFødt = formMethods.watch('erBarnetFødt');

    return (
        <VStack gap="space-32">
            <BlueRadioGroup
                name="erBarnetFødt"
                control={formMethods.control}
                label={<FormattedMessage id="Fødsel.ErFødt" values={{ antallBarn }} />}
                shouldFadeIn
                validate={[
                    isRequired(
                        intl.formatMessage(
                            {
                                id: 'Fødsel.ErFødt.Required',
                            },
                            { antallBarn },
                        ),
                    ),
                ]}
                onChange={() => {
                    formMethods.resetField('fødselsdato');
                    formMethods.resetField('termindato');
                    scrollToBottom();
                }}
            >
                <Radio value={true}>
                    <FormattedMessage id="DefaultMessage.Ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="DefaultMessage.Nei" />
                </Radio>
            </BlueRadioGroup>
            {erBarnetFødt && (
                <ErFødtPanel
                    hvemPlanlegger={hvemPlanlegger}
                    erOmBarnetIkkeOppgittFraFør={erOmBarnetIkkeOppgittFraFør}
                    antallBarn={antallBarn}
                    scrollToBottom={scrollToBottom}
                />
            )}
            {erBarnetFødt === false && (
                <ErIkkeFødtPanel
                    hvemPlanlegger={hvemPlanlegger}
                    erOmBarnetIkkeOppgittFraFør={erOmBarnetIkkeOppgittFraFør}
                    scrollToBottom={scrollToBottom}
                />
            )}
        </VStack>
    );
};
