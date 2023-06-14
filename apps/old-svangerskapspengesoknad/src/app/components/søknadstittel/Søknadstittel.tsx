import { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';
import './søknadstittel.less';

const cls = BEMHelper('søknadstittel');

interface Props {
    children: React.ReactChild;
}

const Søknadstittel: FunctionComponent<Props> = ({ children }) => {
    return (
        <div role="banner" className={cls.block}>
            <h1 className="typo-undertittel">{children}</h1>
        </div>
    );
};

export default Søknadstittel;
