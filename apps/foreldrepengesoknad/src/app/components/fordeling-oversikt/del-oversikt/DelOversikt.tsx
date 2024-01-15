import { BodyLong, HStack, VStack } from '@navikt/ds-react';
import './del-oversikt.css';
import { bemUtils, guid } from '@navikt/fp-common';
import DelGraf from '../del-graf/DelGraf';
import { FordelingType, KvoteFordeling, KvoteInformasjon } from '../FordelingOversikt';
import { Dispatch, SetStateAction } from 'react';
import { getErAnnenForeldersDel, getFordelingBoxColorClass, getFordelingType } from '../fordelingOversiktUtils';
import classNames from 'classnames';

interface Props {
    kvoteInformasjon: KvoteInformasjon;
    currentUthevet: FordelingType | undefined;
    erFarEllerMedmor: boolean;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingType | undefined>>;
}

const DelOversikt: React.FunctionComponent<Props> = ({
    kvoteInformasjon,
    currentUthevet,
    erFarEllerMedmor,
    setCurrentUthevet,
}) => {
    const bem = bemUtils('delOversikt');
    const hoverClass = currentUthevet === kvoteInformasjon.type ? 'hover' : 'no-hover';
    const sumUker = kvoteInformasjon.fordeling.reduce((sum, f) => {
        return sum + f.uker;
    }, 0);
    const handleOnMouseEnter = () => {
        setCurrentUthevet(kvoteInformasjon.type);
    };
    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };
    const type = getFordelingType(kvoteInformasjon.konto, erFarEllerMedmor);
    const erAnnenForeldersDel = getErAnnenForeldersDel(erFarEllerMedmor, type);
    const colorClass = getFordelingBoxColorClass(type, erAnnenForeldersDel);

    return (
        <VStack
            className={classNames(bem.block, bem.modifier(`${hoverClass}`))}
            gap="2"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div>
                <BodyLong className={bem.element('uker')}>{kvoteInformasjon.kvoteTittel}</BodyLong>
            </div>
            <DelGraf fordelingList={kvoteInformasjon.fordeling} sumUker={sumUker} colorClass={colorClass} />
            <HStack gap="4">
                {kvoteInformasjon.fordeling.map((fordeling: KvoteFordeling) => {
                    return (
                        <BodyLong size="small" key={guid()}>
                            {fordeling.tekst}
                        </BodyLong>
                    );
                })}
            </HStack>
        </VStack>
    );
};

export default DelOversikt;
