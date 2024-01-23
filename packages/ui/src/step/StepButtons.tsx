import { FunctionComponent } from 'react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';

interface Props {
    goToPreviousStep: () => void;
    nextButtonText?: string;
    nextButtonOnClick?: () => void;
    isDisabledAndLoading?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isNexButtonVisible?: boolean;
}

const StepButtons: FunctionComponent<Props> = ({
    goToPreviousStep,
    nextButtonText,
    nextButtonOnClick,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNexButtonVisible = true,
}) => {
    return (
        <UiIntlProvider>
            <StepButtonWrapper>
                <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                    <FormattedMessage id="StepButtons.Forrige" />
                </Button>
                {isNexButtonVisible && (
                    <Button
                        type={nextButtonOnClick ? 'button' : 'submit'}
                        onClick={nextButtonOnClick}
                        disabled={isDisabled || isDisabledAndLoading}
                        loading={isLoading || isDisabledAndLoading}
                    >
                        {nextButtonText !== undefined && nextButtonText}
                        {!nextButtonText && <FormattedMessage id={'StepButtons.Neste'} />}
                    </Button>
                )}
            </StepButtonWrapper>
        </UiIntlProvider>
    );
};

export default StepButtons;
