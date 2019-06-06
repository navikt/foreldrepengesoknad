import * as React from 'react';
import FordelingGraf, { ForbrukType } from 'shared/components/fordelingGraf/FordelingGraf';
import { Forelder } from 'common/types';

interface Props {}

const UttakFordeling: React.StatelessComponent<Props> = (props) => (
    <div>
        <FordelingGraf
            headerProps={{
                ariaTitle: 'abnc',
                status: 'feil',
                statusTekst: 'Alt er galt',
                tittel: 'Whoåa'
            }}
            titlerProps={{
                mor: {
                    dagerForLite: 0,
                    dagerForMye: 0,
                    dagerTotalt: 0,
                    ikonRef: 'mor1',
                    navn: 'Therese'
                },
                farMedmor: {
                    dagerForLite: 0,
                    dagerForMye: 12,
                    dagerTotalt: 102,
                    ikonRef: 'far1',
                    navn: 'Tore'
                }
            }}
            forbrukProps={{
                type: ForbrukType.bareFar,
                pstBrukt: 0,
                pstForMye: 0,
                forelder: Forelder.mor
            }}
        />
    </div>
);

export default UttakFordeling;
