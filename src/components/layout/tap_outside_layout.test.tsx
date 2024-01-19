import { fireEvent, render, screen } from '@testing-library/react';
import TapOutsideLayout from './tap_outside_layout';

describe('TapOutsideLayout component', () => {
  it('should trigger onClick function when outside the box is clicked', () => {
    // arrange
    const onClick = jest.fn();
    render(
      <TapOutsideLayout onClick={onClick} data-testid='outside-div'>
        <div data-testid='inside-content'>Inside content</div>
      </TapOutsideLayout>
    )
    // act
    const insideDiv = screen.getByTestId('inside-content');
    const outsideDiv = screen.getByTestId('outside-div');

    expect(insideDiv).toBeInTheDocument();
    expect(outsideDiv).toBeInTheDocument();

    fireEvent.click(outsideDiv);

    // assert
    expect(onClick).toHaveBeenCalled();
  });
})