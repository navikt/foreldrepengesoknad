import { FunctionComponent } from 'react';

import { BarnType } from '@navikt/fp-constants';
import { SaksperiodeNy } from '@navikt/fp-types';
import { UttaksplanNy } from '@navikt/fp-uttaksplan-ny';

interface Props {
    søkersPerioder: SaksperiodeNy[] | undefined;
    annenPartsPerioder?: SaksperiodeNy[];
}

const DinPlan: FunctionComponent<Props> = ({ annenPartsPerioder, søkersPerioder }) => {
    return (
        <div>
            <UttaksplanNy
                annenForelder={{
                    erAleneOmOmsorg: false,
                    etternavn: 'Normann',
                    fnr: '12345612345',
                    fornavn: 'Ola',
                    kanIkkeOppgis: false,
                }}
                barn={{
                    antallBarn: 1,
                    fødselsdatoer: ['2024-03-05'],
                    type: BarnType.FØDT,
                    termindato: '2024-03-05',
                }}
                erFarEllerMedmor={true}
                familiehendelsedato="2024-03-05"
                navnPåForeldre={{
                    farMedmor: 'Ola',
                    mor: 'Kari',
                }}
                annenPartsPerioder={annenPartsPerioder}
                søkersPerioder={søkersPerioder || []}
            />
        </div>
    );
};

export default DinPlan;
