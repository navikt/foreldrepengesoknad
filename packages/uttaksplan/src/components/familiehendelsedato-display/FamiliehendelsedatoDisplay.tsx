import { Barn, bemUtils, isAdoptertBarn, isFødtBarn } from '@navikt/fp-common';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import HjerteIkon from 'assets/HjerteIkon';

import './familiehendelsesdatoDisplay.less';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    familiehendelsedato: Date;
    barn: Barn;
}

const getTekst = (barn: Barn, familiehendelsedato: Date, antallBarn: number): ReactNode => {
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

const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ familiehendelsedato, barn }) => {
    const bem = bemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <BodyShort>{getTekst(barn, familiehendelsedato, barn.antallBarn)}</BodyShort>
        </div>
    );
};

export default FamiliehendelsedatoDisplay;
