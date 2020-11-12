import * as React from 'react';
import StatusIkon from 'common/components/ikoner/StatusIkon';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { fordelingGrafBem } from '../FordelingGraf';
import { StatusKey } from 'common/types';

interface Props {
    tittel: string;
    status: StatusKey;
    statusTekst: string;
}

const FordelingGrafHeader: React.FunctionComponent<Props> = ({ tittel, status, statusTekst }) => {
    const bemHeader = fordelingGrafBem.child('statusHeader');
    return (
        <div>
            <div>
                <div className={bemHeader.block}>
                    <div className={bemHeader.element('ikon')}>
                        <StatusIkon status={status} size={32} />
                    </div>
                    <div className={bemHeader.element('statusBlokk')}>
                        <Normaltekst className={bemHeader.element('tittel')} tag="strong">
                            {tittel}
                        </Normaltekst>
                        <Undertittel className={bemHeader.element('statusTekst')} tag="h3">
                            {statusTekst}
                        </Undertittel>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FordelingGrafHeader;
