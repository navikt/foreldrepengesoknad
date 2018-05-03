import * as React from 'react';
import Feilside from '../components/layout/Feilside';

class WorkbenchFH extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Feilside
                    dokumenttittel="ABC"
                    tittel="Feilside"
                    ingress="abc"
                />
            </div>
        );
    }
}
export default WorkbenchFH;
