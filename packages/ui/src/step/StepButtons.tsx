import { FunctionComponent } from 'react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';

interface Props {
    goToPreviousStep: () => void;
    nextButtonText?: string;
    nextButtonOnClick?: () => void;
    isDisabledAndLoading: boolean;
}

const StepButtons: FunctionComponent<Props> = ({
    goToPreviousStep,
    nextButtonText,
    nextButtonOnClick,
    isDisabledAndLoading,
}) => {
    return (
        <UiIntlProvider>
            <StepButtonWrapper>
                <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                    <FormattedMessage id="StepButtons.Forrige" />
                </Button>
                <Button
                    type={nextButtonOnClick ? 'button' : 'submit'}
                    onClick={nextButtonOnClick}
                    disabled={isDisabledAndLoading}
                    loading={isDisabledAndLoading}
                >
                    {nextButtonText !== undefined && nextButtonText}
                    {!nextButtonText && <FormattedMessage id={'StepButtons.Neste'} />}
                </Button>
            </StepButtonWrapper>
        </UiIntlProvider>
    );
};

export default StepButtons;
