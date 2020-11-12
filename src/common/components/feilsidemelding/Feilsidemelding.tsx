import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { VeilederProps } from '../veileder/Veileder';
import VeilederMedSnakkeboble from '../veilederMedSnakkeboble/VeilederMedSnakkeboble';
import './feilsidemelding.less';
import { FormattedMessage } from 'react-intl';

export interface Props {
    containerId?: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    language?: string;
    setLanguage?: (languageCode: string) => void;
    uuid?: string;
}

const Feilsidemelding: React.FunctionComponent<Props> = ({ containerId, illustrasjon, tittel, ingress, uuid }) => {
    return (
        <div id={containerId}>
            {illustrasjon && (
                <VeilederMedSnakkeboble
                    veileder={illustrasjon.veileder}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <div>
                                <div>{illustrasjon.tekst}</div>

                                {illustrasjon.lenke && (
                                    <Lenke className="intro-snakkelenke" href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </div>
                        ),
                    }}
                />
            )}
            <div className="responsiveContainer">
                <div className="blokk-s">
                    <Innholdstittel>{tittel}</Innholdstittel>
                </div>
                <div className="blokk-l">
                    <Ingress>{ingress}</Ingress>
                </div>
                {uuid && (
                    <div className="blokk-l">
                        <Ingress>
                            <FormattedMessage id="feilside.uuid" values={{ uuid }} />
                        </Ingress>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feilsidemelding;
