import { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    Barn,
    bemUtils,
    formaterDatoUtenDag,
    getFamiliehendelsedato,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-common';

import HjerteIkon from '../../assets/HjerteIkon';
import './familiehendelsesdatoDisplay.less';

interface Props {
    barn: Barn;
}

export const getFamiliehendelseTekst = (barn: Barn): ReactNode => {
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const antallBarn = barn.antallBarn;
    if (!isAdoptertBarn(barn)) {
        if (isFødtBarn(barn)) {
            return (
                <FormattedMessage
                    id="uttaksplan.familiehendelsesdato.født"
                    values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
                />
            );
        }

        return (
            <FormattedMessage
                id="uttaksplan.familiehendelsesdato.termin"
                values={{ dato: formaterDatoUtenDag(familiehendelsedato) }}
            />
        );
    }

    return (
        <FormattedMessage
            id="uttaksplan.familiehendelsesdato.adopsjon"
            values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
        />
    );
};

const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ barn }) => {
    const bem = bemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <BodyShort>{getFamiliehendelseTekst(barn)}</BodyShort>
        </div>
    );
};

export default FamiliehendelsedatoDisplay;
