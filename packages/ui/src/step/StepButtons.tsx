import { FunctionComponent, useCallback, useState } from 'react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import UiIntlProvider from '../i18n/UiIntlProvider';

interface Props {
    goToPreviousStep: () => void;
    nextButtonText?: string;
    nextButtonOnClick?: (setButtonsDisabled: (isDisabled: boolean) => void) => void;
}

const StepButtons: FunctionComponent<Props> = ({ goToPreviousStep, nextButtonText, nextButtonOnClick }) => {
    const [disabled, setDisabled] = useState(false);

    const onClickNextButton = useCallback(() => {
        if (nextButtonOnClick) {
            nextButtonOnClick((d: boolean) => setDisabled(d));
        }
    }, [nextButtonOnClick]);

    return (
        <UiIntlProvider>
            <StepButtonWrapper>
                <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                    <FormattedMessage id="StepButtons.Forrige" />
                </Button>
                <Button type="submit" onClick={onClickNextButton} disabled={disabled}>
                    {nextButtonText && nextButtonText}
                    {!nextButtonText && <FormattedMessage id={'StepButtons.Neste'} />}
                </Button>
            </StepButtonWrapper>
        </UiIntlProvider>
    );
};

export default StepButtons;
