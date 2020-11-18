import * as React from 'react';
import './søknadstittel.less';
interface Props {
    tittel: string;
}
const Søknadstittel: React.FunctionComponent<Props> = ({ tittel }) => {
    return (
        <div className="søknadstittel" role="main" aria-label={tittel}>
            <h2 className="typo-undertittel">{tittel}</h2>
        </div>
    );
};
export default Søknadstittel;
