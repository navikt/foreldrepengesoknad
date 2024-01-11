import { BodyLong, Detail, HStack, VStack } from '@navikt/ds-react';
import './kvote-oversikt.css';
import { StønadskontoType, bemUtils, guid } from '@navikt/fp-common';
import KvoteGraf from '../kvote-graf/KvoteGraf';
import { KvoteFordeling, KvoteInformasjon } from '../FordelingOversikt';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    kvoteInformasjon: KvoteInformasjon;
    currentUthevet: StønadskontoType | undefined;
    setCurrentUthevet: Dispatch<SetStateAction<StønadskontoType | undefined>>;
}

const KvoteOversikt: React.FunctionComponent<Props> = ({ kvoteInformasjon, currentUthevet, setCurrentUthevet }) => {
    const bem = bemUtils('kvoteOversikt');
    const isUthevet = currentUthevet === kvoteInformasjon.konto;
    const shadow = isUthevet ? '4px 4px 4px rgba(0, 0, 0, 0.15)' : '0 0px 0px white';
    const sumUker = kvoteInformasjon.fordeling.reduce((sum, f) => {
        return sum + f.uker;
    }, 0);
    const handleOnMouseEnter = () => {
        setCurrentUthevet(kvoteInformasjon.konto);
    };
    const handleOnMouseLeave = () => {
        setCurrentUthevet(undefined);
    };

    return (
        <VStack
            className={bem.block}
            gap="2"
            style={{ boxShadow: `${shadow}` }}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <div>
                <BodyLong className={bem.element('uker')}>{kvoteInformasjon.kvoteTittel}</BodyLong>
                <Detail className={bem.element('kvoteNavn')}>{kvoteInformasjon.kvoteNavn}</Detail>
            </div>
            <KvoteGraf
                fordelingList={kvoteInformasjon.fordeling}
                sumUker={sumUker}
                farge={kvoteInformasjon.kvoteFarge}
            />
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

export default KvoteOversikt;
