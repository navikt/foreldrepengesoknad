import { BarnType } from 'app/context/types/Barn';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn } from './components/barnVelger/BarnVelger';

export const getSelectableBarnOptions = () => {
    return [
        {
            id: guid(),
            key: '0',
            type: BarnType.FØDT,
            antallBarn: 1,
            familiehendelsesdato: new Date('2022-02-02'),
            fødselsdatoer: [new Date('2022-02-02')],
            fornavn: ['Maria'],
            mellomnavn: ['Anna'],
            etternavn: 'Olsen',
            fnr: ['898989898989'],
            saksnummer: '12123144141',
            kanSøkeOmEndring: true,
        },
        {
            id: guid(),
            key: '1',
            type: BarnType.UFØDT,
            antallBarn: 1,
            familiehendelsesdato: new Date('2023-01-22'),
            termindato: [new Date('2023-01-22')],
            saksnummer: '12123144999',
            kanSøkeOmEndring: false,
        },
        {
            id: guid(),
            key: '2',
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 2,
            fornavn: ['Henrik', 'Tone'],
            etternavn: 'Olsen',
            familiehendelsesdato: new Date('2021-12-22'),
            omsorgsovertagelse: new Date('2021-12-22'),
            kanSøkeOmEndring: true,
        },
    ] as SelectableBarn[];
};
