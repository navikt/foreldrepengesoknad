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
            <Infobox header={<FormattedMessage id="arbeid.jobber.infoboks.harRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="arbeid.jobber.infoboks.harJobbetSeksAvTiMnd" />
                </BodyLong>
            </Infobox>
        )}
        {status === Arbeidsstatus.UFØR && (
            <Infobox header={<FormattedMessage id="arbeid.infoboks.harIkkeRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="arbeid.ufør.infoboks.erUførDeg" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage
                        id="arbeid.ufør.infoboks.lesMerDeg"
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
            <Infobox header={<FormattedMessage id="arbeid.infoboks.harIkkeRettTilForeldrepengerDeg" />}>
                <BodyLong>
                    <FormattedMessage id="arbeid.ingen.infoboks.manHarIkkeRett" />
                </BodyLong>
                <BodyLong>
                    <FormattedMessage
                        id="arbeid.ingen.infoboks.engangsstønadDeg"
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
