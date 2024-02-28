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
    isNexButtonVisible?: boolean;
    isSendButton?: boolean;
    useSimplifiedTexts?: boolean;
}

const StepButtons: FunctionComponent<Props> = ({
    goToPreviousStep,
    nextButtonOnClick,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNexButtonVisible = true,
    isSendButton = false,
    useSimplifiedTexts = false,
}) => {
    return (
<<<<<<< HEAD
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
=======
        <UiIntlProvider>
            <StepButtonWrapper>
                <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                    {useSimplifiedTexts ? (
                        <FormattedMessage id="StepButtons.ForrigeSimple" />
                    ) : (
                        <FormattedMessage id="StepButtons.Forrige" />
                    )}
                </Button>
                {isNexButtonVisible && (
                    <Button
                        icon={isSendButton ? <PaperplaneIcon aria-hidden /> : undefined}
                        iconPosition="right"
                        type={nextButtonOnClick ? 'button' : 'submit'}
                        onClick={nextButtonOnClick}
                        disabled={isDisabled || isDisabledAndLoading}
                        loading={isLoading || isDisabledAndLoading}
                    >
                        {isSendButton && <FormattedMessage id={'StepButtons.Send'} />}
                        {!isSendButton && !useSimplifiedTexts && <FormattedMessage id={'StepButtons.Neste'} />}
                        {!isSendButton && useSimplifiedTexts && <FormattedMessage id={'StepButtons.NesteSimple'} />}
                    </Button>
                )}
            </StepButtonWrapper>
        </UiIntlProvider>
>>>>>>> bf643cebc (rebase)
    );
};

export default StepButtons;
