import {render, screen } from '@testing-library/react';
import Input from './input';

describe('TextInputField Component', () => {
  it('should render with provided properties', () => {
    const name = 'username';
    const placeholder = 'Enter your username';
    const type = 'text';

    render(
      <Input name={name} placeholder={placeholder} type={type} />
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', name);
    expect(inputElement).toHaveAttribute('placeholder', placeholder);
    expect(inputElement).toHaveAttribute('type', type);
  });

  it('should render with default type if not provided', () => {
    const name = 'email';
    const placeholder = 'Enter your email';

    render(
      <Input name={name} placeholder={placeholder} />
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', name);
    expect(inputElement).toHaveAttribute('placeholder', placeholder);
    expect(inputElement).toHaveAttribute('type', 'text'); // Default type should be 'text'
  });
});