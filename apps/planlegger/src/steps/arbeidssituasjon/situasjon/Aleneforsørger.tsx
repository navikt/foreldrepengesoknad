import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';

import { BodyLong, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

const Aleneforsørger: FunctionComponent = () => {
    const formMethods = useFormContext<Arbeidssituasjon>();

    const arbeidssituasjon = formMethods.watch('arbeidssituasjon');

    return (
        <>
            {arbeidssituasjon === ArbeidssituasjonEnum.JOBBER && (
                <Infobox header={<FormattedMessage id="arbeid.jobber.infoboks.harRettTilForeldrepengerDeg" />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.jobber.infoboks.harJobbetSeksAvTiMnd" />
                    </BodyLong>
                </Infobox>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.UFØR && (
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
            {arbeidssituasjon === ArbeidssituasjonEnum.INGEN && (
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
};

export default Aleneforsørger;
