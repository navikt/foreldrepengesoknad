import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { DelInformasjon, FordelingEier } from 'types/FordelingOversikt';
import { guid } from 'utils/guid';

import { BodyLong, VStack } from '@navikt/ds-react';

import { getFordelingDelTittel } from './fordelingOversiktUtils';
import { DelGraf } from './grafer/del-graf/DelGraf';
import styles from './oversikt-per-del.module.css';

interface Props {
    delInformasjon: DelInformasjon;
    currentUthevet: FordelingEier | undefined;
    erFarEllerMedmor: boolean;
    navnMor: string;
    navnFarMedmor: string;
    erFødsel: boolean;
    annenForelderKunRettIEØS: boolean | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingEier | undefined>>;
    erDeltUttak: boolean;
}

export const OversiktPerDel = ({
    delInformasjon,
    currentUthevet,
    erFarEllerMedmor,
    navnMor,
    navnFarMedmor,
    erFødsel,
    annenForelderKunRettIEØS,
    setCurrentUthevet,
    erDeltUttak,
}: Props) => {
    const intl = useIntl();

    const handleOnMouseEnter = () => {
        setCurrentUthevet(delInformasjon.eier);
    };
    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };

    const tittel = getFordelingDelTittel(
        delInformasjon,
        erFarEllerMedmor,
        intl,
        navnMor,
        navnFarMedmor,
        erFødsel,
        annenForelderKunRettIEØS,
    );

    const hoverClass = currentUthevet === delInformasjon.eier && erDeltUttak ? styles.hover : styles.noHover;

    return (
        <VStack
            className={classNames(styles.oversiktPerDel, hoverClass)}
            gap="space-8"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div>
                <BodyLong className={styles.uker}>{tittel}</BodyLong>
            </div>
            <DelGraf fordelingsdager={delInformasjon.fordelingDager} sumDager={delInformasjon.sumDager} />
            <VStack gap="space-8">
                {delInformasjon.fordelingInfo.map((infoTekst) => {
                    return (
                        <BodyLong size="medium" key={guid()}>
                            {infoTekst}
                        </BodyLong>
                    );
                })}
            </VStack>
        </VStack>
    );
};
