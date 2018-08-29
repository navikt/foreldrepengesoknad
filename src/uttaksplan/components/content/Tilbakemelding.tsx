import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';

import './tilbakemelding.less';

const Tilbakemelding: React.StatelessComponent<{}> = (props) => (
    <div className="tilbakemelding no-print">
        <Undertittel className="blokk-xxs">Hjelp oss å gjøre foreldrepengeplanleggeren bedre</Undertittel>
        <p>
            Takk for at du tester ut vår nye foreldrepengeplanlegger her på NAV LAB. Vi vil gjerne vite hva du syns om
            planleggeren, så vi har laget et lite spørreskjema med fire spørsmål som vi ønsker at du svarer på.
        </p>
        <Lenke href="https://www.survey-xact.no/LinkCollector?key=P11NWVYZC535" target="_blank">
            Gi din tilbakemelding her
        </Lenke>
    </div>
);

export default Tilbakemelding;
