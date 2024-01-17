import { BodyShort } from '@navikt/ds-react';
import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import './frilans-visning.css';
interface Props {
    frilans: Frilans;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans }) => {
    const bem = bemUtils('frilans-visning');
    const frilansTekst = 'Arbeid som frilanser';
    // const tilTekst = !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? formatDate(frilans.sluttDato) : 'Pågående';
    const tilTekst = !frilans.jobberFremdelesSomFrilans ? '(Avsluttet)' : '(Pågående)';
    return (
        <Block padBottom="l">
            <div className={bem.block}>
                <BodyShort className={bem.element('tittel')}>{frilansTekst}</BodyShort>
                <BodyShort className={bem.element('dato')}>
                    {`Startet: ${formatDate(frilans.oppstart)} ${tilTekst}`}
                </BodyShort>
            </div>
        </Block>
    );
};

export default FrilansVisning;
