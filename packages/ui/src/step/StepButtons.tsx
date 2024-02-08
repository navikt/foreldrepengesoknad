import { FunctionComponent } from 'react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';
import { PaperplaneIcon } from '@navikt/aksel-icons';

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
            <StepButtonWrapper>
                <Button type="button" variant="secondary" onClick={goToPreviousStep}>
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
                    >
                        {isSendButton && <FormattedMessage id={'StepButtons.Send'} />}
                        {!isSendButton && <FormattedMessage id={'StepButtons.Neste'} />}
                    </Button>
                )}
            </StepButtonWrapper>
        </UiIntlProvider>
    );
};

export default StepButtons;
