import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import { BodyLong, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

interface Props {
    status?: Arbeidsstatus;
}

const Aleneforsørger: FunctionComponent<Props> = ({ status }) => (
    <>
        {status === Arbeidsstatus.JOBBER && (
            <Infobox header={<FormattedMessage id="Aleneforsørger.Jobber.Infoboks.HarRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="Aleneforsørger.Jobber.Infoboks.HarJobbetSeksAvTiMnd" />
                </BodyLong>
            </Infobox>
        )}
        {status === Arbeidsstatus.UFØR && (
            <Infobox header={<FormattedMessage id="Aleneforsørger.Infoboks.HarIkkeRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="Aleneforsørger.Ufør.Infoboks.ErUfør" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage
                        id="Aleneforsørger.Ufør.Infoboks.LesMer"
                        values={{
                            a: (msg: any) => (
                                <Link href={links.hvorLenge} className="lenke" rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyLong>
            </Infobox>
        )}
        {status === Arbeidsstatus.INGEN && (
            <Infobox header={<FormattedMessage id="Aleneforsørger.Infoboks.HarIkkeRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="Aleneforsørger.Ingen.Infoboks.ManHarIkkeRett" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage
                        id="Aleneforsørger.Ingen.Infoboks.EngangsstønadDeg"
                        values={{
                            a: (msg: any) => (
                                <Link href={links.veiviser} className="lenke" rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyLong>
            </Infobox>
        )}
    </>
);

export default Aleneforsørger;
