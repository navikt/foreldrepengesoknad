import { BodyShort, Link } from '@navikt/ds-react';

import './lenkeKnapp.less';

interface Props {
    onClick: () => void;
    text: string | React.ReactNode;
}

const LenkeKnapp: React.FunctionComponent<Props> = ({ text, onClick }) => {
    return (
        <Link
            as="button"
            className="lenkeKnapp lenke"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <BodyShort>{text}</BodyShort>
        </Link>
    );
};

export default LenkeKnapp;
