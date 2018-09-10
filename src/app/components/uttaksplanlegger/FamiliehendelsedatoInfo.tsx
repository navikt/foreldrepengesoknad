import * as React from 'react';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { FormattedMessage } from 'react-intl';
import { Barn } from '../../types/søknad/Barn';
import { formaterDato } from 'common/util/datoUtils';
import { getFamiliehendelsedato } from '../../util/uttaksplan';

export interface Props {
    søkersituasjon: Søkersituasjon;
    barn: Barn;
}

const FamiliehendelsedatoInfo: React.StatelessComponent<Props> = ({ søkersituasjon, barn }) => {
    let key: string = `uttaksplan.familiehendelsesdato.${søkersituasjon}`;
    if (søkersituasjon === Søkersituasjon.FØDSEL) {
        key = `${key}.${barn.erBarnetFødt ? 'fødtBarn' : 'ufødtBarn'}`;
    }
    return (
        <FormattedMessage
            id={key}
            values={{ dato: formaterDato(getFamiliehendelsedato(barn, søkersituasjon), 'D. MMMM YYYY') }}
        />
    );
};

export default FamiliehendelsedatoInfo;
