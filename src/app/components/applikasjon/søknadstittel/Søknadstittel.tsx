import * as React from 'react';
import './søknadstittel.less';
interface Props {
    children: React.ReactNode;
}
const Søknadstittel: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="søknadstittel">
            <h1 className="typo-undertittel">{children}</h1>
        </div>
    );
};
export default Søknadstittel;
