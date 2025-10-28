import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { FordelingEier, FordelingFargekode } from 'types/FordelingOversikt';
import { getFamiliehendelseNavn } from 'utils/familiehendelseUtils';

import { BodyShort } from '@navikt/ds-react';

import { KontoBeregningDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { getBeggeHarRettGrafFordeling } from '../../fordelingOversiktUtils';
import styles from './../graf.module.css';
import { FamiliehendelseVisning } from './FamiliehendelseVisning';

const getRowClass = (antallPerioder: number, periodeIndex: number) => {
    if (antallPerioder % 2 === 0) {
        return periodeIndex % 2 === 0 ? styles.up : styles.down;
    }
    return periodeIndex % 2 === 0 ? styles.down : styles.up;
};

export const getFargeClass = (fargekode: FordelingFargekode): string => {
    switch (fargekode) {
        case FordelingFargekode.ANNEN_PART_FAR:
            return styles.annenPartFar;
        case FordelingFargekode.ANNEN_PART_MOR:
            return styles.annenPartMor;
        case FordelingFargekode.FEDREKVOTE_BRUKT_AV_MOR:
            return styles.fedrekvoteBruktAvMor;
        case FordelingFargekode.FELLESPERIODE_BRUKT_AV_FAR:
            return styles.fellesperiodeBruktAvFar;
        case FordelingFargekode.FELLESPERIODE_BRUKT_AV_MOR:
            return styles.fellesperiodeBruktAvMor;
        case FordelingFargekode.IKKE_TILDELT:
            return styles.ikkeTildelt;
        case FordelingFargekode.MØDREKVOTE_BRUKT_AV_FAR:
            return styles.mødrekvoteBruktAvFar;
        case FordelingFargekode.SØKER_FAR:
            return styles.søkerFar;
        case FordelingFargekode.SØKER_MOR:
            return styles.søkerMor;
    }
};

interface Props {
    kontoer: KontoBeregningDto_fpoversikt;
    erFarEllerMedmor: boolean;
    erAdopsjon: boolean;
    erBarnetFødt: boolean;
    sumDager: number;
    navnFarMedmor: string;
    navnMor: string;
    currentUthevet: FordelingEier | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingEier | undefined>>;
}

export const BeggeHarRettGraf = ({
    kontoer,
    erFarEllerMedmor,
    erAdopsjon,
    erBarnetFødt,
    sumDager,
    navnMor,
    navnFarMedmor,
    currentUthevet,
    setCurrentUthevet,
}: Props) => {
    const intl = useIntl();

    const rowHeight = 16;

    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    const familiehendelseNavn = capitalizeFirstLetter(getFamiliehendelseNavn(erAdopsjon, erBarnetFødt, intl));
    const fordelingList = getBeggeHarRettGrafFordeling(
        kontoer,
        erAdopsjon,
        erFarEllerMedmor,
        navnMor,
        navnFarMedmor,
        intl,
    );
    const widthFamiliehendelse = 30;
    const sumBredde = sumDager + widthFamiliehendelse;
    const famiHendelseFieldWidth = (widthFamiliehendelse / sumBredde) * 100;
    return (
        <div className={styles.graf} aria-hidden={true}>
            {fordelingList.map((fordeling, index) => {
                const width = (fordeling.antallDager / sumBredde) * 100;
                const indexForFamiliehendelse = erAdopsjon ? 0 : 1;
                const finalWidth = index === indexForFamiliehendelse ? width + famiHendelseFieldWidth : width;
                const erUthevet = currentUthevet === fordeling.eier;
                const shadowClass = erUthevet ? styles.shadow : styles.noShadow;
                const rowClass = getRowClass(fordelingList.length, index);

                const handleOnMouseEnter = () => {
                    setCurrentUthevet(fordeling.eier);
                };

                return (
                    <div
                        className={styles.container}
                        style={{
                            width: `${finalWidth}%`,
                        }}
                        key={`${fordeling.eier}-${fordeling.konto}-${fordeling.antallDager}`}
                    >
                        {index === indexForFamiliehendelse && (
                            <FamiliehendelseVisning
                                rowHeight={rowHeight}
                                familiehendelseNavn={familiehendelseNavn}
                                fieldWidthPercent={famiHendelseFieldWidth}
                            />
                        )}
                        <div className={styles.søyle}>
                            <div className={styles.del}>
                                <div
                                    className={classNames(
                                        styles.delBox,
                                        getFargeClass(fordeling.fargekode),
                                        shadowClass,
                                    )}
                                    onMouseEnter={handleOnMouseEnter}
                                    onMouseLeave={handleOnMouseLeave}
                                    style={{
                                        height: `${rowHeight}px`,
                                        borderRadius: `${rowHeight / 2}px`,
                                    }}
                                ></div>
                            </div>
                            <BodyShort
                                className={classNames(styles.delTekst, rowClass)}
                                style={{
                                    height: `${rowHeight}px`,
                                }}
                            >
                                {fordeling.beskrivelse}
                            </BodyShort>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
