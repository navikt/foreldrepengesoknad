import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { AnnenForelder, NavnPåForeldre, bemUtils } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
    erFamiliehendelse?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

const PeriodeListeItem: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelsedato,
    erFamiliehendelse,
    navnPåForeldre,
    erFarEllerMedmor,
    annenForelder,
}) => {
    const bem = bemUtils('periode-liste-item');

    return (
        <Accordion.Item>
            <Accordion.Header className={bem.element('header')}>
                <PeriodeListeHeader
                    permisjonsperiode={permisjonsperiode}
                    familiehendelsedato={familiehendelsedato}
                    erFamiliehendelse={erFamiliehendelse}
                />
            </Accordion.Header>
            <Accordion.Content>
                {erFamiliehendelse ? (
                    <PeriodeListeContent
                        periode={permisjonsperiode.perioder[0]}
                        erFamiliehendelse={!!erFamiliehendelse}
                        navnPåForeldre={navnPåForeldre}
                        erFarEllerMedmor={erFarEllerMedmor}
                        annenForelder={annenForelder}
                    />
                ) : (
                    permisjonsperiode.perioder.map((p) => {
                        return (
                            <PeriodeListeContent
                                periode={p}
                                erFamiliehendelse={!!erFamiliehendelse}
                                navnPåForeldre={navnPåForeldre}
                                erFarEllerMedmor={erFarEllerMedmor}
                                annenForelder={annenForelder}
                            />
                        );
                    })
                )}
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default PeriodeListeItem;
