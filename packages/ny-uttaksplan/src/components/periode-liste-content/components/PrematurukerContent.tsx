import { BodyShort } from '@navikt/ds-react';

export const PrematurukerContent = () => {
    return (
        <>
            <BodyShort weight="semibold">I denne perioden har du pleiepenger i stedet for foreldrepenger.</BodyShort>
            <BodyShort>
                Du får derfor ikke den ekstra tiden med foreldrepenger som du kan få ved prematur fødsel.
            </BodyShort>
            <BodyShort>Denne perioden kan ikke endres eller slettes.</BodyShort>
        </>
    );
};
