"use client";
import { Plus, Trash2 } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import Input from "~/components/inputs/input";
import { Button } from "~/components/ui/button";
import SelectCombo, {
  type SelectComboFrameworksProps,
} from "~/components/ui/custom/select-combo";
import { cn } from "~/lib/utils";
import { SectionTitle } from "../../../_components/section-title";


type TGradingItem = { type: string; grade: number };
export default function GradingSection () {
  const gradingTypes = [
    { label: "Assignment", value: "Assignments" },
    { label: "Attendance", value: "Attendance" },
    { label: "Exam", value: "Exam" },
    { label: "Practical", value: "Practicals" },
    { label: "Presentation", value: "Presentation" },
    { label: "Project", value: "Project" },
    { label: "Test", value: "Tests" },
    { label: "Workshop", value: "Workshop" },
  ];
  const defaultGradingTypes = [...gradingTypes];
  // exclude exam
  defaultGradingTypes.splice(1, 1);
  const [availableGradingTypes, setAvailableGradingTypes] =
    useState<SelectComboFrameworksProps>(defaultGradingTypes);

  const [gradingItems, setGradingItems] = useState<TGradingItem[]>([
    { type: "Exam", grade: 100 },
  ]);

  const [totalGrade, setTotalGrade] = useState(100);

  const updateAvailableGradingTypes = (currentGradingItems: TGradingItem[]) => {
    console.log("updating grading type");
    const selectedTypes = currentGradingItems.map((item) => item.type);
    const newGradingTypes = gradingTypes.filter(
      (item) => !selectedTypes.includes(item.label),
    );

    setAvailableGradingTypes(newGradingTypes);
  };

  const getTotalGrade = () => {
    const total = gradingItems.reduce((acc, item) => acc + item.grade, 0);
    return total;
  };
  getTotalGrade();

  const updateGradingItemAtIndex = (i: number, gradingItem: TGradingItem) => {
    const newGradingItems = [...gradingItems];
    newGradingItems[i] = gradingItem;
    console.log("New", newGradingItems);
    // update available grading types only when a grading type
    // was updated and not the grade
    if (gradingItems.at(i)?.type !== gradingItem.type) {
      updateAvailableGradingTypes(newGradingItems);
    }
    // update totalGrade only when grade was updated and not the grade type
    if (gradingItems.at(i)?.grade !== gradingItem.grade) {
      const total = newGradingItems.reduce((acc, item) => acc + item.grade, 0);;
      setTotalGrade(total);
    }
    setGradingItems(newGradingItems);
  };

  const removeGradingItemAtIndex = (i: number) => {
    const newGradingItems = [...gradingItems];
    const removedItem = newGradingItems.splice(i, 1);
    console.log("New", newGradingItems);
    setGradingItems(newGradingItems);
    // update available grading types only when removed item had a grading type
    if (removedItem[0]?.type) updateAvailableGradingTypes(newGradingItems);
  };

  const addNewGradingItem = () => {
    // Don't add new grading item when all grading types have been used
    if (gradingTypes.length === gradingItems.length) return;
    const defaultGrade = (totalGrade >= 0 && totalGrade <= 100) ? 100 - totalGrade  : 0;
    // update total grade only when defaultGrade is not 0
    if (defaultGrade > 0) setTotalGrade(totalGrade + defaultGrade);
    setGradingItems((prevItems) => [...prevItems, { type: "", grade: defaultGrade }]);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle
        title="Grading"
        description="This specifies how the grades for this course will be allocated"
      />

      <div className="flex flex-col gap-2 max-w-xs">
        
        {/* Title and Grade input fields */}
        <div className='flex flex-col gap-2'>
          {/* Header */}
          <div className="grid grid-cols-7 gap-5">
            <p className="col-span-4">Type</p>
            <p className="col-span-2">Grade</p>
          </div>
          {/* Grades */}
          {gradingItems.map((gradingItem, i) => (
            <GradeItem
              key={gradingItem.type + i}
              index={i}
              gradingTypes={availableGradingTypes}
              gradingItem={gradingItem}
              updateGradingItem={updateGradingItemAtIndex}
              removeGradingItem={removeGradingItemAtIndex}
            />
          ))}
        </div>

        {/* Add Grade Button */}
        <div className="grid grid-cols-7 gap-5 items-center">
          <div className="col-span-4">
            <Button
              variant={"tertiary"}
              className="w-32"
              type="button"
              onClick={addNewGradingItem}
            >
              <div className="flex items-center gap-0.5">
                <Plus className="shrink-0" size={16} />
                <p className="">Add another</p>
              </div>
            </Button>
          </div>

          {/* Total Grade */}
          <div className={cn("col-span-2", {
            'text-red-500 animate-pulse': totalGrade !== 100,
            'text-tertiary font-semibold': totalGrade === 100
          })}>
            <p>{totalGrade}%</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

type GradeItemProps = {
  index: number;
  gradingItem: TGradingItem;
  gradingTypes: SelectComboFrameworksProps;
  updateGradingItem: (i: number, gradingItem: TGradingItem) => void;
  removeGradingItem: (i: number) => void;
};

const GradeItem = ({
  index,
  gradingItem,
  gradingTypes,
  updateGradingItem,
  removeGradingItem,
}: GradeItemProps) => {
  const updateGrade = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    // Return when value is NaN(not a number)
    if (value !== 0 && !value) return;
    
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    
    updateGradingItem(index, { type: gradingItem.type, grade: value });
  };

  const updateTitle = (value: string) => {
    updateGradingItem(index, { type: value, grade: gradingItem.grade });
  };

  const removeItem = () => removeGradingItem(index);

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-4">
        <SelectCombo
          defaultValue={gradingItem.type || "Select grading type"}
          frameworks={gradingTypes}
          onChange={updateTitle}
          buttonClassName="w-full"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          className="w-full"
          value={gradingItem.grade}
          onChange={updateGrade}
        />
      </div>
      <div className="col-span-1">
        <Button
          className="h-10 p-2.5"
          variant={"secondary"}
          type="button"
          onClick={removeItem}
        >
          <Trash2 className="text-cc-content/50" size={18} />
        </Button>
      </div>
    </div>
  );
};