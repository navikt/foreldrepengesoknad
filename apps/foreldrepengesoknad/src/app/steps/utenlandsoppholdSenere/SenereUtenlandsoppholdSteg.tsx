import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@navikt/ds-react';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdSenere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import createConfig from '../stepsConfig';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknad: () => void;
    avbrytSøknad: () => void;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknad, avbrytSøknad }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = notEmpty(useFpStateData(FpDataType.UTENLANDSOPPHOLD));
    const senereUtenlandsopphold = useFpStateData(FpDataType.UTENLANDSOPPHOLD_SENERE);

    const lagreSenereUtenlandsopphold = useFpStateSaveFn(FpDataType.UTENLANDSOPPHOLD_SENERE);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const lagredeSenereUtenlandsopphold =
        senereUtenlandsopphold && senereUtenlandsopphold.senereOpphold.length > 0
            ? {
                  utenlandsoppholdNeste12Mnd: senereUtenlandsopphold.senereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const save = async (values: UtenlandsoppholdSenere) => {
        lagreSenereUtenlandsopphold({
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        });

        lagreAppRoute(SøknadRoutes.INNTEKTSINFORMASJON);
        await mellomlagreSøknad();
        navigate(SøknadRoutes.INNTEKTSINFORMASJON);
    };

    const goToPreviousStep = () => {
        navigate(
            utenlandsopphold.iNorgeSiste12Mnd ? SøknadRoutes.UTENLANDSOPPHOLD : SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
        );
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    const stepConfig = createConfig(intl, false).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsoppholdSenere',
    }));

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={lagredeSenereUtenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
                supportsTempSaving
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
