import React from 'react';
import './søknadstittel.less';

interface Props {
    tittel: string;
}

const Søknadstittel: React.FunctionComponent<Props> = ({ tittel }) => {
    return (
        <div className="søknadstittel">
            <h1 className="typo-undertittel">{tittel}</h1>
        </div>
    );
};
export default Søknadstittel;
