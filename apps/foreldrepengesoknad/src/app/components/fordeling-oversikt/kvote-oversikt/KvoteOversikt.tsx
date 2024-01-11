import { BodyLong, Detail, HStack, VStack } from '@navikt/ds-react';
import './kvote-oversikt.css';
import { bemUtils, guid } from '@navikt/fp-common';
import KvoteGraf from '../kvote-graf/KvoteGraf';
import { KvoteFordeling, KvoteInformasjon } from '../FordelingOversikt';

interface Props {
    kvoteInformasjon: KvoteInformasjon;
}

const KvoteOversikt: React.FunctionComponent<Props> = ({ kvoteInformasjon }) => {
    const bem = bemUtils('kvoteOversikt');

    const sumUker = kvoteInformasjon.fordeling.reduce((sum, f) => {
        return sum + f.uker;
    }, 0);
    return (
        <VStack className={bem.block} gap="2">
            <div>
                <BodyLong className={bem.element('uker')}>{kvoteInformasjon.kvoteTittel}</BodyLong>
                <Detail className={bem.element('kvoteNavn')}>{kvoteInformasjon.kvoteNavn}</Detail>
            </div>
            <HStack gap="1" className={bem.element('graf')}>
                <KvoteGraf
                    fordelingList={kvoteInformasjon.fordeling}
                    sumUker={sumUker}
                    farge={kvoteInformasjon.kvoteFarge}
                />
            </HStack>
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
