import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Loader } from '@navikt/ds-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Locale, erMyndig } from '@navikt/fp-common';
import SøkersituasjonForm, {
    FormValues as SøkersituasjonFormValues,
} from './sider/steg/sokersituasjon/SøkersituasjonForm';
import Velkommen from './sider/velkommen/Velkommen';
import OmBarnetForm, { FormValues as OmBarnetFormValues } from './sider/steg/omBarnet/OmBarnetForm';
import UtenlandsoppholdForm, {
    FormValues as UtenlandsoppholdFormFormValus,
} from './sider/steg/utenlandsopphold/UtenlandsoppholdForm';
import Oppsummering from './sider/steg/oppsummering/Oppsummering';
import { lenker } from './lenker';
import Feilside from './sider/feilside/Feilside';
import { useRequest } from './fpcommon/api/apiHooks';
import Api from './api';
import Person from './types/Person';
import Kvittering from './types/Kvittering';
import SøknadSendt from './sider/kvittering/SøknadSendt';
import Umyndig from './sider/umyndig/Umyndig';
import FremtidigUtlandsopphold, {
    FormValues as FremtidigUtenlandsoppholdFormValues,
} from 'sider/steg/utlandsoppholdFremtidig/FremtidigUtlandsopphold';

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

    const [lagretSøkersituasjon, lagreSøkersituasjon] = useState<SøkersituasjonFormValues | undefined>();
    const [lagretOmBarnet, lagreOmBarnet] = useState<OmBarnetFormValues | undefined>();
    const [lagretUtenlandsopphold, lagreUtenlandsopphold] = useState<UtenlandsoppholdFormFormValus | undefined>();
    const [lagretFremtidigUtenlandsopphold, lagreFremtidigUtenlandsopphold] = useState<
        FremtidigUtenlandsoppholdFormValues | undefined
    >();

    const lagreSøkersituasjonOgGåTilOmBarnet = useCallback((form: SøkersituasjonFormValues) => {
        lagreSøkersituasjon(form);
        navigate('/soknad/om-barnet');
    }, []);
    const lagreOmBarnetOgGårTilUtenlandsopphold = useCallback((form: OmBarnetFormValues) => {
        lagreOmBarnet(form);
        navigate('/soknad/utenlandsopphold');
    }, []);
    const lagreUtenlandsoppholdOgGåTilNeste = useCallback((form: UtenlandsoppholdFormFormValus) => {
        lagreUtenlandsopphold(form);
        if (form.skalBoUtenforNorgeNeste12Mnd) {
            navigate('/soknad/fremtidig-utenlandsopphold');
        } else {
            navigate('/soknad/oppsummering');
        }
    }, []);
    const lagreFremtidigUtenlandsoppholdOgGåTilNeste = useCallback(
        (form: FremtidigUtenlandsoppholdFormValues) => {
            lagreFremtidigUtenlandsopphold(form);
            if (lagretUtenlandsopphold?.harBoddUtenforNorgeSiste12Mnd) {
                navigate('/soknad/fremtidig-utenlandsopphold');
            } else {
                navigate('/soknad/oppsummering');
            }
        },
        [lagretUtenlandsopphold],
    );

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
        },
        data: {
            lagretSøkersituasjon,
            lagretOmBarnet,
            lagretUtenlandsopphold,
            lagretFremtidigUtenlandsopphold,
            kvittering,
        },
        avbrytSøknad,
        sendSøknad,
    };
};

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const intl = useIntl();
    const navigate = useNavigate();

    const [erVelkommen, setVelkommen] = useState(false);

    const { avbrytSøknad, sendSøknad, lagre, data } = useDataHåndterer(locale);

    const gåTilSøkersituasjon = useCallback(() => {
        setVelkommen(true);
        navigate('/soknad/søkersituasjon');
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
                path="/"
                element={
                    <Velkommen locale={locale} onChangeLocale={onChangeLocale} startSøknad={gåTilSøkersituasjon} />
                }
            />
            {!erVelkommen && <Route path="*" element={<Navigate to="/" />} />}
            {erVelkommen && (
                <>
                    <Route
                        path="/soknad/søkersituasjon"
                        element={
                            <SøkersituasjonForm
                                lagretSøkersituasjon={data.lagretSøkersituasjon}
                                lagreSøkersituasjon={lagre.lagreSøkersituasjonOgGåTilOmBarnet}
                                avbrytSøknad={avbrytSøknad}
                                gåTilForrige={() => undefined}
                            />
                        }
                    />
                    {data.lagretSøkersituasjon && (
                        <Route
                            path="/soknad/om-barnet"
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
                            path="/soknad/utenlandsopphold"
                            element={
                                <UtenlandsoppholdForm
                                    lagreUtenlandsopphold={lagre.lagreUtenlandsoppholdOgGåTilNeste}
                                    lagretUtenlandsopphold={data.lagretUtenlandsopphold}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && data.lagretUtenlandsopphold && (
                        <Route
                            path="/soknad/fremtidig-utenlandsopphold"
                            element={
                                <FremtidigUtlandsopphold
                                    lagretFremtidigUtenlandsopphold={data.lagretFremtidigUtenlandsopphold}
                                    lagreFremtidigUtenlandsopphold={lagre.lagreFremtidigUtenlandsoppholdOgGåTilNeste}
                                    avbrytSøknad={avbrytSøknad}
                                />
                            }
                        />
                    )}
                    {data.lagretOmBarnet && data.lagretUtenlandsopphold && (
                        <Route
                            path="/soknad/oppsummering"
                            element={
                                <Oppsummering
                                    person={person}
                                    omBarnet={data.lagretOmBarnet}
                                    utenlandsopphold={data.lagretUtenlandsopphold}
                                    avbrytSøknad={avbrytSøknad}
                                    sendSøknad={sendSøknad}
                                />
                            }
                        />
                    )}
                    {data.kvittering && (
                        <Route
                            path="/kvittering"
                            element={<SøknadSendt person={person} kvittering={data.kvittering} />}
                        />
                    )}
                </>
            )}
        </Routes>
    );
};

export default Engangsstønad;
