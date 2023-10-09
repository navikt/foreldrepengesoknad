import { FunctionComponent } from 'react';
import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';

interface Props {
    goToPreviousStep: () => void;
    nextButtonText?: string;
    nextButtonOnClick?: () => void;
}

const StepButtons: FunctionComponent<Props> = ({ goToPreviousStep, nextButtonText, nextButtonOnClick }) => {
    return (
        <StepButtonWrapper>
            <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                <FormattedMessage id="backlink.label" />
            </Button>
            <Button type="submit" onClick={nextButtonOnClick}>
                <FormattedMessage id={nextButtonText || 'søknad.gåVidere'} />
            </Button>
        </StepButtonWrapper>
    );
};

export default StepButtons;
