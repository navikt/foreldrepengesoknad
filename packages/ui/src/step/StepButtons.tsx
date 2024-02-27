import { PaperplaneIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

import UiIntlProvider from '../i18n/ui/UiIntlProvider';

interface Props {
    goToPreviousStep: () => void;
    nextButtonOnClick?: () => void;
    isDisabledAndLoading?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isNexButtonVisible?: boolean;
    isSendButton?: boolean;
}

const StepButtons: FunctionComponent<Props> = ({
    goToPreviousStep,
    nextButtonOnClick,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNexButtonVisible = true,
    isSendButton = false,
}) => {
    return (
        <UiIntlProvider>
            <HStack gap="2">
                <Button type="button" variant="secondary" onClick={goToPreviousStep} style={{ flex: 1 }}>
                    <FormattedMessage id="StepButtons.Forrige" />
                </Button>
                {isNexButtonVisible && (
                    <Button
                        icon={isSendButton ? <PaperplaneIcon aria-hidden /> : undefined}
                        iconPosition="right"
                        type={nextButtonOnClick ? 'button' : 'submit'}
                        onClick={nextButtonOnClick}
                        disabled={isDisabled || isDisabledAndLoading}
                        loading={isLoading || isDisabledAndLoading}
                        style={{ flex: 1 }}
                    >
                        {isSendButton && <FormattedMessage id="StepButtons.Send" />}
                        {!isSendButton && <FormattedMessage id="StepButtons.Neste" />}
                    </Button>
                )}
            </HStack>
        </UiIntlProvider>
    );
};

export default StepButtons;
