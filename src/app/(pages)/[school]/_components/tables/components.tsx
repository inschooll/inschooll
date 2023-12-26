interface TableItemProps {
  value: string, 
  colSpan?: number
}

export const TableHeaderItem = ({value, colSpan=1}: TableItemProps) => (
  <p className={`col-span-${colSpan} text-sm font-semibold text-cc-content-main/50`}>
    {value}
  </p>
);

export const TableItem = ({value, colSpan=1} : TableItemProps) => (
  <div className={`col-span-${colSpan} pr-10`}>
    <p className="font-semibold text-cc-content-sub/50 truncate">{value}</p>
  </div>
);

export const TableTitle = ({value, colSpan=3} : TableItemProps) => (
  <div className={`col-span-${colSpan} pr-10`}>
    <p className="font-semibold text-cc-content-sub truncate">
      {value}
    </p>
  </div>
);
