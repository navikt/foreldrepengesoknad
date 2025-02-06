import { PaperplaneIcon } from '@navikt/aksel-icons';
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
    isJumpToEndButton?: boolean;
}

export const StepButtons = ({
    goToPreviousStep,
    nextButtonOnClick,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNextButtonVisible = true,
    isSendButton = false,
    useSimplifiedTexts = false,
    isJumpToEndButton = false,
}: Props) => {
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
                    {!isSendButton && !useSimplifiedTexts && !isJumpToEndButton && (
                        <FormattedMessage id={'StepButtons.Neste'} />
                    )}
                    {!isSendButton && useSimplifiedTexts && !isJumpToEndButton && (
                        <FormattedMessage id={'StepButtons.NesteSimple'} />
                    )}
                    {isJumpToEndButton && !useSimplifiedTexts && (
                        <FormattedMessage id={'StepButtons.GåTilOppsummering'} />
                    )}
                    {isJumpToEndButton && useSimplifiedTexts && (
                        <FormattedMessage id={'StepButtons.GåTilOppsummeringSimple'} />
                    )}
                </Button>
            )}
        </HStack>
    );
};
