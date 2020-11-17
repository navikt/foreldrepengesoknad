import * as React from 'react';
import './søknadstittel.less';
interface Props {
    children: React.ReactNode;
}
const Søknadstittel: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="søknadstittel" role="banner">
            <h2 className="typo-undertittel">{children}</h2>
        </div>
    );
};
export default Søknadstittel;
