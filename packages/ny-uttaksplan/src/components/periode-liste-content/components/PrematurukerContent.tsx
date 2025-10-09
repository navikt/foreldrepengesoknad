import { BodyShort } from '@navikt/ds-react';

export const PrematurukerContent = () => {
    return (
        <>
            <BodyShort weight="semibold">I denne perioden har du pleiepenger i stedet for foreldrepenger.</BodyShort>
            <BodyShort>
                Hele eller deler av den ekstra tiden med foreldrepenger du får i forbindelse med prematur fødsel blir da
                omgjort til pleiepenger og kan ikke brukes som fellesperiode. Dette påvirker ikke den totale mengden
                dager du har fått.
            </BodyShort>
            <BodyShort>Denne perioden kan ikke endres eller slettes.</BodyShort>
        </>
    );
};
