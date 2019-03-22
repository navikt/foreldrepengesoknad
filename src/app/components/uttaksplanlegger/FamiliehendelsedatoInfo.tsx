import * as React from 'react';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { FormattedMessage } from 'react-intl';
import { Barn } from '../../types/søknad/Barn';
import { formaterDato } from 'common/util/datoUtils';

export interface Props {
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    familiehendelsesdato: Date;
}

const FamiliehendelsedatoInfo: React.StatelessComponent<Props> = ({ søkersituasjon, barn, familiehendelsesdato }) => {
    let key: string = `uttaksplan.familiehendelsesdato.${søkersituasjon}`;
    if (søkersituasjon === Søkersituasjon.FØDSEL) {
        key = `${key}.${barn.erBarnetFødt ? 'fødtBarn' : 'ufødtBarn'}`;
    }
    return <FormattedMessage id={key} values={{ dato: formaterDato(familiehendelsesdato, 'D. MMMM YYYY') }} />;
};

export default FamiliehendelsedatoInfo;
