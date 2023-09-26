import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';

interface Props {
    goToPreviousStep: () => void;
    nextText?: string;
    nextOnClick?: () => void;
}

const StepButtons: React.FunctionComponent<Props> = ({ goToPreviousStep, nextText, nextOnClick }) => {
    return (
        <StepButtonWrapper>
            <Button type="button" variant="secondary" onClick={goToPreviousStep}>
                <FormattedMessage id="backlink.label" />
            </Button>
            <Button type="submit" onClick={nextOnClick}>
                <FormattedMessage id={nextText || 'søknad.gåVidere'} />
            </Button>
        </StepButtonWrapper>
    );
};

export default StepButtons;
