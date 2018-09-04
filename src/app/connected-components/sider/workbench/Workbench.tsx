import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Applikasjonsside from '../Applikasjonsside';

class Workbench extends React.Component<{}> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
                workbench
            </Applikasjonsside>
        );
    }
}

export default Workbench;
