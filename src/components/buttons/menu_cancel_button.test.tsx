import { fireEvent, render, screen } from '@testing-library/react';
import MenuCancelButton from './menu_cancel_button';

describe('MenuCancelButton component', () => {
  it('should fire onClick function when clicked', () => {
    const onClick = jest.fn();
    
    // arrange
    render(<MenuCancelButton onClick={onClick} showMenu={true} />);

    // act
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // assert
    expect(onClick).toHaveBeenCalled();
  });

  it('should show menu icon if "showMenu" prop is = false', () => {    
    // arrange
    render(<MenuCancelButton onClick={jest.fn()} showMenu={false} />);

    // act
    const menuIcon = screen.getByTestId('menu-icon');
    
    // assert
    expect(menuIcon).toBeInTheDocument();
  });

  it('should show cancel icon if "showMenu" prop is = true', () => {    
    // arrange
    render(<MenuCancelButton onClick={jest.fn()} showMenu={true} />);

    // act
    const cancelIcon = screen.getByTestId('cancel-icon');
    
    // assert
    expect(cancelIcon).toBeInTheDocument();
  });

});