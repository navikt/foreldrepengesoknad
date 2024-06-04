import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
    erFamiliehendelse?: boolean;
}

const PeriodeListeItem: FunctionComponent<Props> = ({ permisjonsperiode, familiehendelsedato, erFamiliehendelse }) => {
    const bem = bemUtils('periode-liste-item');

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader
                        permisjonsperiode={permisjonsperiode}
                        familiehendelsedato={familiehendelsedato}
                        erFamiliehendelse={erFamiliehendelse}
                    />
                </Accordion.Header>
                {/* <Hide asChild above="md">
                    <Accordion.Header className={bem.element('header')}>
                        <PeriodeListeHeaderMobil
                            permisjonsperiode={permisjonsperiode}
                            familiehendelsedato={familiehendelsedato}
                            erFamiliehendelse={erFamiliehendelse}
                        />
                    </Accordion.Header>
                </Hide> */}
                <Accordion.Content>
                    {permisjonsperiode.perioder.map((p) => {
                        return <PeriodeListeContent periode={p} erFamiliehendelse={!!erFamiliehendelse} />;
                    })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
