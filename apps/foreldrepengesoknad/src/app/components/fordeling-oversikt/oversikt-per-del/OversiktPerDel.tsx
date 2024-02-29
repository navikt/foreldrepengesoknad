import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { BodyLong, VStack } from '@navikt/ds-react';

import { bemUtils, guid } from '@navikt/fp-common';

import { DelInformasjon, FordelingEier } from 'app/types/FordelingOversikt';

import { getFordelingDelTittel } from '../fordelingOversiktUtils';
import DelGraf from '../grafer/del-graf/DelGraf';
import './oversikt-per-del.css';

interface Props {
    delInformasjon: DelInformasjon;
    currentUthevet: FordelingEier | undefined;
    erFarEllerMedmor: boolean;
    navnMor: string;
    navnFarMedmor: string;
    erFødsel: boolean;
    annenForelderKunRettIEØS: boolean | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingEier | undefined>>;
}

const OversiktPerDel: React.FunctionComponent<Props> = ({
    delInformasjon,
    currentUthevet,
    erFarEllerMedmor,
    navnMor,
    navnFarMedmor,
    erFødsel,
    annenForelderKunRettIEØS,
    setCurrentUthevet,
}) => {
    const intl = useIntl();
    const bem = bemUtils('oversiktPerDel');
    const hoverClass = currentUthevet === delInformasjon.eier ? 'hover' : 'no-hover';
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
    return (
        <VStack
            className={classNames(bem.block, bem.modifier(`${hoverClass}`))}
            gap="2"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div>
                <BodyLong className={bem.element('uker')}>{tittel}</BodyLong>
            </div>
            <DelGraf fordelingsdager={delInformasjon.fordelingDager} sumDager={delInformasjon.sumDager} />
            <VStack gap="2">
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

export default OversiktPerDel;
