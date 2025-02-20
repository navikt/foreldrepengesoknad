import { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Barn, isAdoptertBarn, isFødtBarn } from '@navikt/fp-common';
import { formaterDatoUtenDag, getFamiliehendelsedato } from '@navikt/fp-utils';

import HjerteIkon from '../../assets/HjerteIkon';
import planBemUtils from '../../utils/planBemUtils';
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

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ barn }) => {
    const bem = planBemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <BodyShort>{getFamiliehendelseTekst(barn)}</BodyShort>
        </div>
    );
};
// eslint-disable-next-line import/no-default-export
export default FamiliehendelsedatoDisplay;
