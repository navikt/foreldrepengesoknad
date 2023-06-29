import SvangerskapspengerContextProvider from 'app/context/SvangerskapspengerContext';

const withSvangerskapspengerContextProvider = (Story: any) => (
    <SvangerskapspengerContextProvider>
        <Story />
    </SvangerskapspengerContextProvider>
);

export default withSvangerskapspengerContextProvider;
