import { BodyLong, HStack, VStack } from '@navikt/ds-react';
import './del-oversikt.css';
import { bemUtils, guid } from '@navikt/fp-common';
import DelGraf from '../del-graf/DelGraf';
import { FordelingType, KvoteFordeling, KvoteInformasjon } from '../FordelingOversikt';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    kvoteInformasjon: KvoteInformasjon;
    currentUthevet: FordelingType | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<FordelingType | undefined>>;
}

const DelOversikt: React.FunctionComponent<Props> = ({ kvoteInformasjon, currentUthevet, setCurrentUthevet }) => {
    const bem = bemUtils('delOversikt');
    const isUthevet = currentUthevet === kvoteInformasjon.type;

    //TODO: GR - Gjør om til klassenavn og bruk shadows (og borders?) fra Aksel design tokens.
    const border = isUthevet ? '2px solid rgba(7, 26, 54, 0.21)' : '2px solid transparent';
    const shadow = isUthevet ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : '0px 4px 4px 0px transparent';
    const sumUker = kvoteInformasjon.fordeling.reduce((sum, f) => {
        return sum + f.uker;
    }, 0);
    const handleOnMouseEnter = () => {
        setCurrentUthevet(kvoteInformasjon.type);
    };
    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };

    return (
        <VStack
            className={bem.block}
            gap="2"
            style={{ border: `${border}`, boxShadow: `${shadow}` }}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div>
                <BodyLong className={bem.element('uker')}>{kvoteInformasjon.kvoteTittel}</BodyLong>
            </div>
            <DelGraf fordelingList={kvoteInformasjon.fordeling} sumUker={sumUker} farge={kvoteInformasjon.kvoteFarge} />
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
