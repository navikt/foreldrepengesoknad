import * as React from 'react';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { FormattedMessage } from 'react-intl';
import { formaterDato } from 'common/util/datoUtils';

export interface Props {
    søkersituasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    erBarnetFødt?: boolean;
}

const FamiliehendelsedatoInfo: React.StatelessComponent<Props> = ({
    søkersituasjon,
    familiehendelsesdato,
    erBarnetFødt,
}) => {
    let key = `uttaksplan.familiehendelsesdato.${søkersituasjon}`;
    if (søkersituasjon === Søkersituasjon.FØDSEL) {
        key = `${key}.${erBarnetFødt ? 'fødtBarn' : 'ufødtBarn'}`;
    }
    return <FormattedMessage id={key} values={{ dato: formaterDato(familiehendelsesdato, 'D. MMMM YYYY') }} />;
};

export default FamiliehendelsedatoInfo;
