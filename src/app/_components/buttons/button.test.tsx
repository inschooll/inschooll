import { fireEvent, render, screen } from '@testing-library/react';
import Button from './button';

describe('Button component', () => {
  it('should display children and fire onClick function when clicked', () => {
    const onClick = jest.fn();
    
    // arrange
    render(
      <Button onClick={onClick}>
        <div data-testid='inside-content'>inside content</div>
      </Button>
    );

    // act
    const insideContent = screen.getByTestId('inside-content');
    const button = screen.getByRole('button');

    expect(insideContent).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);

    // assert
    expect(onClick).toHaveBeenCalled();
  });
});