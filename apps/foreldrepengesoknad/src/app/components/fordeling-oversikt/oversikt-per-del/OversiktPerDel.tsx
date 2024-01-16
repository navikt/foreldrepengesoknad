import { BodyLong, HStack, VStack } from '@navikt/ds-react';
import './oversikt-per-del.css';
import { bemUtils, guid } from '@navikt/fp-common';
import DelGraf from '../grafer/del-graf/DelGraf';
import { FordelingType, DelInformasjon } from '../FordelingOversikt';
import { Dispatch, SetStateAction } from 'react';
import { getErAnnenForeldersDel, getFordelingBoxColorClass, getFordelingDelTittel } from '../fordelingOversiktUtils';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

interface Props {
    delInformasjon: DelInformasjon;
    currentUthevet: FordelingType | undefined;
    erFarEllerMedmor: boolean;
    navnMor: string;
    navnFarMedmor: string;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingType | undefined>>;
}

const OversiktPerDel: React.FunctionComponent<Props> = ({
    delInformasjon,
    currentUthevet,
    erFarEllerMedmor,
    navnMor,
    navnFarMedmor,
    setCurrentUthevet,
}) => {
    const intl = useIntl();
    const bem = bemUtils('oversiktPerDel');
    const hoverClass = currentUthevet === delInformasjon.type ? 'hover' : 'no-hover';
    const handleOnMouseEnter = () => {
        setCurrentUthevet(delInformasjon.type);
    };
    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    const erAnnenForeldersDel = getErAnnenForeldersDel(erFarEllerMedmor, delInformasjon.type);
    const colorClass = getFordelingBoxColorClass(delInformasjon.type, erAnnenForeldersDel);
    const tittel = getFordelingDelTittel(delInformasjon, erFarEllerMedmor, intl, navnMor, navnFarMedmor);
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
            <DelGraf uker={delInformasjon.fordelingUker} sumUker={delInformasjon.sumUker} colorClass={colorClass} />
            <HStack gap="4">
                {delInformasjon.fordelingInfo.map((infoTekst) => {
                    return (
                        <BodyLong size="small" key={guid()}>
                            {infoTekst}
                        </BodyLong>
                    );
                })}
            </HStack>
        </VStack>
    );
};

export default OversiktPerDel;
