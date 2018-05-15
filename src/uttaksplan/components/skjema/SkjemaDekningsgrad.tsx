import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import Sporsmal from 'uttaksplan/components/sporsmal/Sporsmal';
import { Dekningsgrad, Permisjonsregler } from 'uttaksplan/types';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import DekningsgradInfo from 'uttaksplan/components/content/DekningsgradInfo';
import Radioliste from 'uttaksplan/components/radioliste/Radioliste';

export interface OwnProps {
    permisjonsregler: Permisjonsregler;
    dekningsgrad?: Dekningsgrad;
    antallUkerTotalt80: number;
    antallUkerTotalt100: number;
    onChange: (dekningsgrad: Dekningsgrad) => void;
}

type Props = OwnProps & InjectedIntlProps;

const SkjemaDekningsgrad: React.StatelessComponent<Props> = ({
    intl,
    onChange,
    antallUkerTotalt80,
    antallUkerTotalt100,
    permisjonsregler,
    dekningsgrad
}) => (
    <Radioliste
        inputnavn="dekningsgrad"
        tittel={
            <Sporsmal
                info={{
                    id: Infotekster.sats,
                    label: intl.formatMessage({
                        id: 'uttaksplan.skjema.veiledning.sats.alttekst'
                    })
                }}>
                <FormattedMessage id="uttaksplan.skjema.label.sats" />
            </Sporsmal>
        }
        beskrivelse={<DekningsgradInfo />}
        valgtVerdi={dekningsgrad}
        onChange={(value) => onChange(value as Dekningsgrad)}
        stil="ekstern"
        kolonner="2"
        valg={[
            {
                tittel: intl.formatMessage(
                    {
                        id: 'uttaksplan.skjema.label.sats100'
                    },
                    {
                        uker: antallUkerTotalt100
                    }
                ),
                verdi: '100%'
            },
            {
                tittel: intl.formatMessage(
                    {
                        id: 'uttaksplan.skjema.label.sats80'
                    },
                    {
                        uker: antallUkerTotalt80
                    }
                ),
                verdi: '80%'
            }
        ]}
    />
);

export default injectIntl(SkjemaDekningsgrad);
