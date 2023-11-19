import { render, screen } from '@testing-library/react';
import AppLogo from './app_logo';
import constants from '~/app/core/constants/constants';
import images from '~/app/core/constants/images';

describe(`${constants.appName} component`, () => {
  it('should render logo', () => {
    // arrange
    render(<AppLogo />);

    // act
    const appLogo = screen.getByTestId('app-logo');

    // assert
    expect(appLogo).toHaveAttribute('src', images.logo);
  });
});