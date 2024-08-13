import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { AnnenForelder, FamiliehendelseType, NavnPåForeldre, bemUtils, isUttaksperiode } from '@navikt/fp-common';

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
    familiehendelseType?: FamiliehendelseType;
}

const PeriodeListeItem: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelsedato,
    erFamiliehendelse,
    navnPåForeldre,
    erFarEllerMedmor,
    annenForelder,
    familiehendelseType,
}) => {
    const bem = bemUtils('periode-liste-item');
    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const skalJobbeIPermisjonsperioden =
        permisjonsperiode.perioder.find((p) => {
            if (isUttaksperiode(p) && p.gradert) {
                return p;
            }

            return undefined;
        }) !== undefined;

    return (
        <Accordion.Item>
            <Accordion.Header className={bem.element('header')}>
                <PeriodeListeHeader
                    permisjonsperiode={permisjonsperiode}
                    familiehendelsedato={familiehendelsedato}
                    erFamiliehendelse={erFamiliehendelse}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
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
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                        familiehendelseType={familiehendelseType}
                    />
                ) : (
                    <>
                        {permisjonsperiode.perioder.map((p) => {
                            return (
                                <PeriodeListeContent
                                    periode={p}
                                    erFamiliehendelse={!!erFamiliehendelse}
                                    navnPåForeldre={navnPåForeldre}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    annenForelder={annenForelder}
                                    inneholderKunEnPeriode={inneholderKunEnPeriode}
                                />
                            );
                        })}
                        {!skalJobbeIPermisjonsperioden && <div>Skal ikke jobbe</div>}
                    </>
                )}
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default PeriodeListeItem;
