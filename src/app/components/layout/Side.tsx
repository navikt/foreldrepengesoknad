import * as React from 'react';
import DocumentTitle from 'react-document-title';

export interface Props {
    dokumenttittel?: string;
    språkvelger?: React.ReactNode;
}

const Side: React.StatelessComponent<Props> = ({
    dokumenttittel,
    språkvelger,
    children
}) => (
    <React.Fragment>
        {dokumenttittel && <DocumentTitle title={dokumenttittel} />}
        {språkvelger}
        <div className="content">{children}</div>
    </React.Fragment>
);

export default Side;
