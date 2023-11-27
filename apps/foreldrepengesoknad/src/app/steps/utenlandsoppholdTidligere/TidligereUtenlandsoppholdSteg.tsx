import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import createConfig, { getPreviousStepHref } from '../stepsConfig';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const TidligereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = notEmpty(useFpStateData(FpDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useFpStateData(FpDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreTidligereUtenlandsopphold = useFpStateSaveFn(FpDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const lagredeTidligereUtenlandsopphold =
        tidligereUtenlandsopphold && tidligereUtenlandsopphold.tidligereOpphold.length > 0
            ? {
                  utenlandsoppholdSiste12Mnd: tidligereUtenlandsopphold.tidligereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const save = (values: UtenlandsoppholdTidligere) => {
        lagreTidligereUtenlandsopphold({
            tidligereOpphold: values.utenlandsoppholdSiste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        });

        const nesteSide = utenlandsopphold.iNorgeNeste12Mnd
            ? SøknadRoutes.INNTEKTSINFORMASJON
            : SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
        lagreAppRoute(nesteSide);
        mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        const appRoute = getPreviousStepHref('utenlandsoppholdTidligere');
        lagreAppRoute(appRoute);
        mellomlagreSøknadOgNaviger();
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    const stepConfig = createConfig(intl, false).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsoppholdTidligere',
    }));

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={lagredeTidligereUtenlandsopphold}
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

export default TidligereUtenlandsoppholdSteg;
