import { Alert } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import './unansweredQuestionsInfo.scss';

interface Props {
    children?: React.ReactNode;
}

const UnansweredQuestionsInfo: React.FunctionComponent<Props> = ({ children }) => {
    const intl = useIntl();

    const getDefaultMessage = () => {
        switch (intl.locale) {
            case 'nn':
                return 'For å kome vidare, må du svare på alle spørsmåla ovafor';
            default:
                return 'For å komme videre, må du svare på alle spørsmålene ovenfor';
        }
    };
    return (
        <div className="unansweredQuestionsInfo">
            <Alert variant="info" size="small">
                {children || getDefaultMessage()}
            </Alert>
        </div>
    );
};

export default UnansweredQuestionsInfo;
