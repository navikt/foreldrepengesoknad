import { BodyShort, Heading } from '@navikt/ds-react';
import { Block, bemUtils } from '@navikt/fp-common';
import './bekreftelse-sendt-søknad.css';

interface Props {
    oppdatertData: boolean;
    visesPåForside: boolean;
}

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({ oppdatertData, visesPåForside }) => {
    const bem = bemUtils('bekreftelse-sendt-søknad');
    const infotekst = visesPåForside
        ? 'Her kan du se en oversikt over sakene dine. Klikk på en sak for å se oppgaver du må gjennomføre og hva som skjer i saken din.'
        : 'Her kan du se en oversikt over saken din, oppgaver du må gjennomføre og hva som skjer i saken din.';
    return (
        <Block padBottom={oppdatertData ? 'xxl' : 'l'}>
            <Block padBottom="l">
                <Heading size="large" className={bem.element('tittel')}>
                    Søknaden er sendt!
                </Heading>
            </Block>
            {oppdatertData && <BodyShort className={bem.element('info')}>{infotekst}</BodyShort>}
        </Block>
    );
};

export default BekreftelseSendtSøknad;
