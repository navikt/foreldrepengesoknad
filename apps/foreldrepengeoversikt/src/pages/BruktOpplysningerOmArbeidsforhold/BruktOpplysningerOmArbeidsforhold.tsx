import { FormattedMessage } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { ForsideHeader } from '../../components/header/Header';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';

export const BruktOpplysniungerOmArbeidsforhold = () => {
    return (
        <PageRouteLayout header={<ForsideHeader />}>
            <VStack gap="10">
                <h1 className="">
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tittel" />
                </h1>
                <div className="flex justify-center mt-4">
                    <p className="text-center mt-4  font-bold text-xl">
                        <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.1" />
                    </p>
                </div>
                <p className="text-center mt-4  font-bold text-xl">
                    <FormattedMessage id="BruktOpplysningerOmArbeidsforhold.tekst.2" />
                </p>
            </VStack>
        </PageRouteLayout>
    );
};
