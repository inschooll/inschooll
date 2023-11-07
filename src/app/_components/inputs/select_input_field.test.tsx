import { render, screen, fireEvent } from "@testing-library/react";
import SelectInputField from "./select_input_field";

describe('SelectInputField Component', () => {
  it('should render with provided properties', () => {
    const name = 'gender';
    const select = 'female';
    const options = ['male', 'female'];

    render(
      <SelectInputField name={name} select={select} options={options} />
    );

    const selectElement = screen.getByRole('combobox');
    const selectedOption = screen.getByText('female'); // Should match the "select" value

    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute('name', name);
    expect(selectElement).toHaveValue(select); // Check if the selected value matches the "select" prop

    // Check if all the options are available
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    expect(selectedOption).toBeInTheDocument();
  });

  it('should handle selection changes', () => {
    const name = 'gender';
    const select = 'female';
    const options = ['male', 'female'];

    render(
      <SelectInputField name={name} select={select} options={options} />
    );

    const selectElement = screen.getByRole('combobox');
    const newSelectedValue = 'male';

    fireEvent.change(selectElement, { target: { value: newSelectedValue } });
    console.log(selectElement);

    expect(selectElement).toHaveValue(newSelectedValue);
  });
});