import React from 'react';
import { VeilederProps } from '../veileder/Veileder';
import VeilederMedSnakkeboble from '../veileder-med-snakkeboble/VeilederMedSnakkeboble';
import './feilsidemelding.less';
import { FormattedMessage } from 'react-intl';
import { Heading, Ingress, Link } from '@navikt/ds-react';

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
                                    <Link className="intro-snakkelenke" href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Link>
                                )}
                            </div>
                        ),
                    }}
                />
            )}
            <div className="responsiveContainer">
                <div className="blokk-s">
                    <Heading size="large">{tittel}</Heading>
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
