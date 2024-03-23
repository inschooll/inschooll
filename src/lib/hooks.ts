import { useEffect, useState } from "react";
import { useToast } from "~/components/ui/use-toast";

export const useDebounce = <T>(value: T, delay = 1000) => {
  const [dValue, setDValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [delay, value]);

  return dValue;
};

/**
 * This custom hook provides useful pieces that can be used to create the 
 * Inschooll onboarding experience
 * @returns {
 *  - `componentHistory`: This is a stack of all the components that have been visited
 *  - `component`: This is the current component on display
 *  - `handleDisplayNewComponent`: This is a function that allows you
 *     to display a new component in the onboarding experience
 *  - `bottomNavClick`: This is a function that basically sets the current
 *     `component` to be a particular component in the component history
 *     (already visited component) and then in the componentHistory stack
 *     it pops / removes all components on top of it
 * }
 */
export const useOnboarding = () => {
  const [componentHistory, setComponentHistory] = useState<React.ReactNode[]>(
    [],
  );
  const [component, setComponent] = useState<React.ReactNode>(null);

  const handleDisplayNewComponent = (newDisplayComponent: React.ReactNode) => {
    setComponentHistory((comps) => [...comps, component]);
    setComponent(newDisplayComponent);
  };

  const bottomNavClick = (i: number) => {
    if (i >= componentHistory.length) return;
    setComponent(componentHistory[i]);

    // remove preceding components from history
    setComponentHistory((components) => components.slice(0, i));
  };

  return {
    handleDisplayNewComponent,
    component,
    componentHistory,
    bottomNavClick,
  };
};

/**
 * This hook is used to add new fields to {@link fieldsList}, remove fields, and update specific fields
 * @param defaultFieldItem This is the defaultItem that is added to {@link fieldsList} whenever the {@link addNewField} function is called
 * @param maxFieldListLength This is the maximum fields list length we are unable to exceed
 * @returns
 */
export function useManageFields<T>(defaultFieldItem: T, maxFieldListLength = 8) {
  const [fieldsList, setFieldsList] = useState<T[]>([defaultFieldItem]);
  const { toast } = useToast();

  const addNewField = () => {
    if (fieldsList.length === maxFieldListLength) {
      return toast({ description: "Maximum fields count reached!" });
    }
    setFieldsList((prev) => [...prev, defaultFieldItem]);
  };

  const removeFieldAt = (i: number) => {
    const newFields = fieldsList.filter((_, index) => index !== i);
    console.log({ newFields });
    setFieldsList(newFields);
  };

  const updateFieldAt = (item: T, i: number) => {
    const newList = [...fieldsList];
    newList[i] = item;
    setFieldsList(newList);
  };

  return { fieldsList, addNewField, removeFieldAt, updateFieldAt };
}