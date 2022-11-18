import { bemUtils } from '@navikt/fp-common';
import Barn, { BarnFraNesteSak, isAdoptertBarn, isFødtBarn } from 'app/context/types/Barn';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import HjerteIkon from 'uttaksplan/assets/HjerteIkon';

import './familiehendelsesdatoDisplay.less';

interface Props {
    familiehendelsedato: Date;
    barn: Barn | BarnFraNesteSak;
    gjelderNesteSak: boolean;
}

const getTekst = (
    barn: Barn | BarnFraNesteSak,
    familiehendelsedato: Date,
    antallBarn: number,
    gjelderNesteSak: boolean
): ReactNode => {
    if (!isAdoptertBarn(barn)) {
        if (isFødtBarn(barn)) {
            return (
                <FormattedMessage
                    id={
                        gjelderNesteSak
                            ? 'uttaksplan.familiehendelsesdato.nesteBarn.født'
                            : 'uttaksplan.familiehendelsesdato.født'
                    }
                    values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
                />
            );
        }

        return (
            <FormattedMessage
                id={
                    gjelderNesteSak
                        ? 'uttaksplan.familiehendelsesdato.nesteBarn.termin'
                        : 'uttaksplan.familiehendelsesdato.termin'
                }
                values={
                    gjelderNesteSak
                        ? { antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }
                        : { dato: formaterDatoUtenDag(familiehendelsedato) }
                }
            />
        );
    }

    return (
        <FormattedMessage
            id={
                gjelderNesteSak
                    ? 'uttaksplan.familiehendelsesdato.nesteBarn.adopsjon'
                    : 'uttaksplan.familiehendelsesdato.adopsjon'
            }
            values={{ antallBarn, dato: formaterDatoUtenDag(familiehendelsedato) }}
        />
    );
};

const FamiliehendelsedatoDisplay: FunctionComponent<Props> = ({ familiehendelsedato, barn, gjelderNesteSak }) => {
    const bem = bemUtils('familiehendelsesdatoDisplay');

    return (
        <div className={bem.block}>
            <div className={bem.element('hjerte')}>
                <HjerteIkon fylt={true} title="Hjerte" />
            </div>
            <Normaltekst>{getTekst(barn, familiehendelsedato, barn.antallBarn, gjelderNesteSak)}</Normaltekst>
        </div>
    );
};

export default FamiliehendelsedatoDisplay;
