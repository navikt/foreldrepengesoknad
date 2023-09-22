import { StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button, Link } from '@navikt/ds-react';

interface Props {
    previousStepHref: string;
    nextText?: string;
    nextOnClick?: () => void;
}

const StepButtons: React.FunctionComponent<Props> = ({ previousStepHref, nextText, nextOnClick }) => {
    return (
        <StepButtonWrapper>
            <Button variant="secondary" as={Link} to={previousStepHref}>
                <FormattedMessage id="backlink.label" />
            </Button>
            <Button type="submit" onClick={nextOnClick}>
                <FormattedMessage id={nextText || 'søknad.gåVidere'} />
            </Button>
        </StepButtonWrapper>
    );
};

export default StepButtons;
