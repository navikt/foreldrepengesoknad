import React from 'react';
import renderer from 'react-test-renderer';
import Svangerskapspengesøknad from 'app/connectedComponents/svangerskapspengesoknad/Svangerskapspengesøknad';

describe('Svangerskapspengesøknad', () => {
    it('should be defined', () => {
        const component = renderer.create(<Svangerskapspengesøknad />);
        expect(component).toBeDefined();
    });
});
