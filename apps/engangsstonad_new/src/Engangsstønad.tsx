import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Locale, erMyndig } from '@navikt/fp-common';
import SøkersituasjonSteg from './sider/steg/sokersituasjon/SøkersituasjonSteg';
import Velkommen from './sider/velkommen/Velkommen';
import OmBarnetForm, { FormValues as OmBarnetFormValues } from './sider/steg/omBarnet/OmBarnetForm';
import UtenlandsoppholdSteg, {
    FormValues as UtenlandsoppholdFormFormValus,
} from './sider/steg/utenlandsopphold/UtenlandsoppholdSteg';
import Oppsummering from './sider/steg/oppsummering/Oppsummering';
import { lenker } from './lenker';
import { useRequest } from './fpcommon/api/apiHooks';
import Api from './api';
import Person from './types/Person';
import Kvittering from './types/Kvittering';
import SøknadSendt from './sider/kvittering/SøknadSendt';
import Umyndig from './sider/umyndig/Umyndig';
import NesteUtlandsopphold from './sider/steg/utlandsoppholdNeste/NesteUtlandsopphold';
import SisteUtlandsopphold from './sider/steg/utlandsoppholdSiste/SisteUtlandsopphold';
import Feilside from 'fpcommon/components/feilside/Feilside';
import { Søkersituasjon } from 'types/Søkersituasjon';
import { Path } from './useEsNavigator';

const renderSpinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const useDataHåndterer = (locale: Locale) => {
    const navigate = useNavigate();

    const [lagretSøkersituasjon, lagreSøkersituasjon] = useState<Søkersituasjon | undefined>();
    const [lagretOmBarnet, lagreOmBarnet] = useState<OmBarnetFormValues | undefined>();
    const [lagretUtenlandsopphold, lagreUtenlandsopphold] = useState<UtenlandsoppholdFormFormValus | undefined>();
    const [lagretFremtidigUtenlandsopphold, lagreFremtidigUtenlandsopphold] = useState<any | undefined>();
    const [lagretTidligereUtenlandsopphold, lagreTidligereUtenlandsopphold] = useState<any | undefined>();

    const lagreSøkersituasjonOgGåTilOmBarnet = useCallback((søkersituasjon: Søkersituasjon) => {
        lagreSøkersituasjon(søkersituasjon);
        navigate('/soknad/om-barnet');
    }, []);
    const lagreOmBarnetOgGårTilUtenlandsopphold = useCallback((form: OmBarnetFormValues) => {
        lagreOmBarnet(form);
        navigate('/soknad/utenlandsopphold');
    }, []);
    const lagreUtenlandsoppholdOgGåTilNeste = useCallback((form: UtenlandsoppholdFormFormValus) => {
        lagreUtenlandsopphold(form);
        if (form.skalBoUtenforNorgeNeste12Mnd) {
            navigate('/soknad/neste-utenlandsopphold');
        } else if (lagretUtenlandsopphold?.harBoddUtenforNorgeSiste12Mnd) {
            navigate('/soknad/siste-utenlandsopphold');
        } else {
            navigate('/soknad/oppsummering');
        }
    }, []);
    const lagreFremtidigUtenlandsoppholdOgGåTilNeste = useCallback(
        (form: any) => {
            lagreFremtidigUtenlandsopphold(form);
            if (lagretUtenlandsopphold?.harBoddUtenforNorgeSiste12Mnd) {
                navigate('/soknad/siste-utenlandsopphold');
            } else {
                navigate('/soknad/oppsummering');
            }
        },
        [lagretUtenlandsopphold],
    );
    const lagreTidligereUtenlandsoppholdOgGåTilOppsummering = useCallback((form: any) => {
        lagreTidligereUtenlandsopphold(form);
        navigate('/soknad/oppsummering');
    }, []);

    const [kvittering, setKvittering] = useState<Kvittering | undefined>();

    const avbrytSøknad = useCallback(() => {
        lagreSøkersituasjon(undefined);
        lagreOmBarnet(undefined);
        lagreUtenlandsopphold(undefined);
    }, []);

    const sendSøknad = async () => {
        //TODO Treng nok framleis noko mapping (Gjer mappinga i dei ulike komponentane ved neste?)
        const søknadForInnsending = {
            barn: lagretOmBarnet,
            type: 'engangsstønad',
            erEndringssøknad: false,
            informasjonOmUtenlandsopphold: lagretUtenlandsopphold,
            søker: {
                språkkode: locale,
            },
            //TODO Vedlegg
            vedlegg: [],
        };

        const kvitteringFraSøknad = await Api.sendSøknad(søknadForInnsending);
        setKvittering(kvitteringFraSøknad.data);
        navigate('/kvittering');
    };

    return {
        lagre: {
            lagreSøkersituasjonOgGåTilOmBarnet,
            lagreOmBarnetOgGårTilUtenlandsopphold,
            lagreUtenlandsoppholdOgGåTilNeste,
            lagreFremtidigUtenlandsoppholdOgGåTilNeste,
            lagreTidligereUtenlandsoppholdOgGåTilOppsummering,
        },
        data: {
            lagretSøkersituasjon,
            lagretOmBarnet,
            lagretUtenlandsopphold,
            lagretFremtidigUtenlandsopphold,
            lagretTidligereUtenlandsopphold,
            kvittering,
        },
        avbrytSøknad,
        sendSøknad,
    };
};

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();

    const [erVelkommen, setVelkommen] = useState(false);

    const { avbrytSøknad, sendSøknad, lagre, data } = useDataHåndterer(locale);

    const gåTilSøkersituasjon = useCallback(() => {
        setVelkommen(true);
    }, []);

    const { data: person, loading, error } = useRequest<Person>(Api.getPerson);

    if (error !== null) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            return renderSpinner();
        }

        return (
            <Feilside
                dokumenttittel="NAV Engangsstønad"
                ingress=""
                tittel=""
                illustrasjon={{
                    tittel: intl.formatMessage({ id: 'intro.generellFeil.tittel' }),
                    tekst: intl.formatMessage({ id: 'intro.generellFeil.ingress' }),
                    veileder: {
                        ansikt: 'skeptisk',
                    },
                    lenke: {
                        tekst: intl.formatMessage({ id: 'intro.generellFeil.brukerstøtte' }),
                        url: lenker.brukerstøtte,
                    },
                }}
                setLanguage={onChangeLocale}
                språkkode={locale}
            />
        );
    }

    if (loading || !person) {
        return renderSpinner();
    }

    if (!erMyndig(person.fødselsdato)) {
        return <Umyndig person={person} />;
    }

    return (
        <Routes>
            <Route
                path={Path.VELKOMMEN}
                element={
                    <Velkommen locale={locale} onChangeLocale={onChangeLocale} startSøknad={gåTilSøkersituasjon} />
                }
            />
            {!erVelkommen && <Route path="*" element={<Navigate to={Path.VELKOMMEN} />} />}
            {erVelkommen && (
                <>
                    <Route
                        path={Path.SØKERSITUASJON}
                        element={
                            <SøkersituasjonSteg
                                lagretSøkersituasjon={data.lagretSøkersituasjon}
                                lagreSøkersituasjon={lagre.lagreSøkersituasjonOgGåTilOmBarnet}
                            />
                        }
                    />
                    {data.lagretSøkersituasjon && (
                        <Route
                            path={Path.OM_BARNET}
                            element={
                                <OmBarnetForm
                                    kjønn={person.kjønn}
                                    søkersituasjon={data.lagretSøkersituasjon}
                                    lagretOmBarnet={data.lagretOmBarnet}
                                    lagreOmBarnet={lagre.lagreOmBarnetOgGårTilUtenlandsopphold}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && (
                        <Route
                            path={Path.UTENLANDSOPPHOLD}
                            element={
                                <UtenlandsoppholdSteg
                                    lagreUtenlandsopphold={lagre.lagreUtenlandsoppholdOgGåTilNeste}
                                    lagretUtenlandsopphold={data.lagretUtenlandsopphold}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && data.lagretUtenlandsopphold && (
                        <Route
                            path={Path.NESTE_UTENLANDSOPPHOLD}
                            element={
                                <NesteUtlandsopphold
                                    lagretNesteUtenlandsopphold={data.lagretFremtidigUtenlandsopphold}
                                    lagreNesteUtenlandsopphold={lagre.lagreFremtidigUtenlandsoppholdOgGåTilNeste}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && data.lagretUtenlandsopphold && (
                        <Route
                            path={Path.SISTE_UTENLANDSOPPHOLD}
                            element={
                                <SisteUtlandsopphold
                                    lagretSisteUtenlandsopphold={data.lagretTidligereUtenlandsopphold}
                                    lagreSisteUtenlandsopphold={lagre.lagreTidligereUtenlandsoppholdOgGåTilOppsummering}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && data.lagretUtenlandsopphold && (
                        <Route
                            path={Path.OPPSUMMERING}
                            element={
                                <Oppsummering
                                    person={person}
                                    omBarnet={data.lagretOmBarnet}
                                    utenlandsopphold={data.lagretUtenlandsopphold}
                                    utenlandsoppholdFremtidig={data.lagretFremtidigUtenlandsopphold}
                                    utenlandsoppholdTidligere={data.lagretTidligereUtenlandsopphold}
                                    avbrytSøknad={avbrytSøknad}
                                    sendSøknad={sendSøknad}
                                />
                            }
                        />
                    )}
                    {data.kvittering && (
                        <Route
                            path={Path.KVITTERING}
                            element={<SøknadSendt person={person} kvittering={data.kvittering} />}
                        />
                    )}
                </>
            )}
        </Routes>
    );
};

export default Engangsstønad;
