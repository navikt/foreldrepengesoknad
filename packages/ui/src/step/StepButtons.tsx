import { PaperplaneIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    goToPreviousStep: () => void;
    nextButtonOnClick?: () => void;
    isDisabledAndLoading?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isNextButtonVisible?: boolean;
    isSendButton?: boolean;
    useSimplifiedTexts?: boolean;
}

const StepButtons: FunctionComponent<Props> = ({
    goToPreviousStep,
    nextButtonOnClick,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNextButtonVisible = true,
    isSendButton = false,
    useSimplifiedTexts = false,
}) => {
    return (
        <HStack gap="2">
            <Button
                type="button"
                variant="secondary"
                onClick={goToPreviousStep}
                style={{ flex: 1, maxWidth: isSendButton ? 'fit-content' : undefined }}
            >
                {useSimplifiedTexts ? (
                    <FormattedMessage id="StepButtons.ForrigeSimple" />
                ) : (
                    <FormattedMessage id="StepButtons.Forrige" />
                )}
            </Button>
            {isNextButtonVisible && (
                <Button
                    icon={isSendButton ? <PaperplaneIcon aria-hidden /> : undefined}
                    iconPosition="right"
                    type={nextButtonOnClick ? 'button' : 'submit'}
                    onClick={nextButtonOnClick}
                    disabled={isDisabled || isDisabledAndLoading}
                    loading={isLoading || isDisabledAndLoading}
                    style={{ flex: 1 }}
                >
                    {isSendButton && <FormattedMessage id={'StepButtons.Send'} />}
                    {!isSendButton && !useSimplifiedTexts && <FormattedMessage id={'StepButtons.Neste'} />}
                    {!isSendButton && useSimplifiedTexts && <FormattedMessage id={'StepButtons.NesteSimple'} />}
                </Button>
            )}
        </HStack>
    );
};

export default StepButtons;
