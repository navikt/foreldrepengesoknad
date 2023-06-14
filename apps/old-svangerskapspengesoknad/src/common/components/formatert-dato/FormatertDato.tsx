import { år, mnd, dagIMåned, ukedag } from '../../util/datoUtils';
import moment from 'moment';

import './formatertDato.less';

interface Props {
    dato: Date;
    visUkedag?: boolean;
}

const FormatertDato: React.FunctionComponent<Props> = ({ dato, visUkedag = true }) => {
    const d = moment.utc(dato);
    return (
        <span className="formatert-dato">
            {visUkedag && <span className="formatert-dato__ukedag">{ukedag(d).substr(0, 3)}. </span>}
            <span className="formatert-dato__dag">{dagIMåned(d)}</span>{' '}
            <span className="formatert-dato__måned">{mnd(d)}</span> <span className="formatert-dato__år">{år(d)}</span>
        </span>
    );
};

export default FormatertDato;
