import * as React from 'react';
import Feilside from '../components/layout/Feilside';
import UtenlandsoppholdBolk from './poc/utenlandsopphold/UtenlandsoppholdBolk';

class WorkbenchFH extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Feilside
                    dokumenttittel="ABC"
                    tittel="Feilside"
                    ingress="abc"
                    illustrasjon={{
                        tittel: 'Hei',
                        tekst: 'Whoo'
                    }}
                />
                <UtenlandsoppholdBolk
                    utenlandsopphold={[]}
                    onAdd={() => null}
                    onDelete={() => null}
                    onUpdate={() => null}
                />
            </div>
        );
    }
}
export default WorkbenchFH;
