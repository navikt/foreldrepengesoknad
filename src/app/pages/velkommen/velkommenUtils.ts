import { BarnType } from 'app/context/types/Barn';
import { FagsakStatus, SakType } from 'app/types/Sak';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn } from './components/barnVelger/BarnVelger';

export const getSelectableBarnOptions = () => {
    return [
        {
            id: guid(),
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 1,
            omsorgsovertagelse: new Date('2022-02-02'),
            familiehendelsesdato: new Date('2022-02-02'),
            fødselsdatoer: [new Date('2022-02-02')],
            fornavn: ['Vakker'],
            mellomnavn: ['Blå'],
            etternavn: 'Olsen',
            fnr: ['898989898989'],
            kanSøkeOmEndring: true,
            sak: {
                type: SakType.FPSAK,
                opprettet: '',
                status: FagsakStatus.UNDER_BEHANDLING,
                saksnummer: '12123144141',
            },
        },
        {
            id: guid(),
            key: '1',
            type: BarnType.UFØDT,
            antallBarn: 1,
            familiehendelsesdato: new Date('2023-01-22'),
            termindato: [new Date('2023-01-22')],
            kanSøkeOmEndring: false,
            sak: {
                type: SakType.FPSAK,
                opprettet: '',
                status: FagsakStatus.LOPENDE,
                saksnummer: '12123144999',
            },
        },
        {
            id: guid(),
            key: '2',
            type: BarnType.FØDT,
            antallBarn: 2,
            fornavn: ['Stolt', 'Sterk'],
            etternavn: 'Olsen',
            familiehendelsesdato: new Date('2021-12-22'),
            fødselsdatoer: [new Date('2022-02-02')],
        },
    ] as SelectableBarn[];
};
