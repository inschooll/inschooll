import images from "~/app/core/constants/images";
import AvatarUsername from "~/components/avatar-username";
import Button2 from "~/components/buttons/button2";
import { TableHeaderItem, TableItem } from "./components";


// Name, Role, Department, Buttons
export function UserTableNRDB({topRound="2xl", buttonColumnTitle="Column", onClickButton, enableCheckbox=false} : {topRound?: "none"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"full", buttonColumnTitle: string, onClickButton: () => void, enableCheckbox?: boolean}) {
  return (
    <div className={``}>
      {/* Nav */}
      <div className={`grid h-12 px-5 grid-cols-7 items-center border border-cc-border-main rounded-${topRound}`} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
        <div className="col-span-3 pr-10 flex items-center gap-4">
          {enableCheckbox && <input type="checkbox" name={'all'} value={'select all'} />}
          <TableHeaderItem value="Name"/>
        </div>
        <TableHeaderItem value="Role" colSpan={1} />
        <TableHeaderItem value="Department" colSpan={2} />
        <TableHeaderItem value={buttonColumnTitle} colSpan={1} />
      </div>
      {/* Body */}
      <div>
        {[1, 2, 3].map((item, index) => (
            <div
              key={item}
              className="grid h-12 grid-cols-7 items-center border-x border-b border-cc-border-main px-5 app-hover"
            >
              <div className="col-span-3 pr-10 flex items-center gap-4">
                {enableCheckbox && <input type="checkbox" name={`${item}`} value={index} id={`${item}`} />}
                <AvatarUsername imgUrl={images.random1} text="Tony Fergurson" imgSize={5} />
              </div>
              <TableItem value="Student" colSpan={1}/>
              <TableItem value="Computer Science" colSpan={2}/>
              <div className="col-span-1">
                <Button2 variant="green" py={1} onClick={onClickButton} >Added</Button2>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export function UserTableNRDSPA({topRound="2xl", enableCheckbox=false} : {topRound?: "none"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"full", enableCheckbox?: boolean}) {
  return (
    <div className={``}>
      {/* Nav */}
      <div className={`grid h-12 px-5 grid-cols-9 items-center border border-cc-border-main rounded-${topRound}`} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
        <div className="col-span-3 pr-10 flex items-center gap-4">
          {enableCheckbox && <input type="checkbox" name={'all'} value={'select all'} />}
          <TableHeaderItem value="Name"/>
        </div>
        <TableHeaderItem value="Role" colSpan={1} />
        <TableHeaderItem value="Department" colSpan={2} />
        <TableHeaderItem value="Statement" colSpan={1} />
        <TableHeaderItem value="Previous Cases" colSpan={1} />
        <TableHeaderItem value="Appeal" colSpan={1} />
      </div>
      {/* Body */}
      <div>
        {[1, 2, 3].map((item, index) => (
            <div
              key={item}
              className="grid h-12 grid-cols-9 items-center border-x border-b border-cc-border-main px-5 app-hover"
            >
              <div className="col-span-3 pr-10 flex items-center gap-4">
                {enableCheckbox && <input type="checkbox" name={`${item}`} value={index} id={`${item}`} />}
                <AvatarUsername imgUrl={images.random1} text="Tony Fergurson" imgSize={5} />
              </div>
              <TableItem value="Student" colSpan={1}/>
              <TableItem value="Computer Science" colSpan={2}/>
              <div className="col-span-1">
                <p>view</p>
              </div>
              <TableItem value="1" colSpan={1}/>
              <div className="col-span-1">
                <p>view</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export function UserTableNRDP({topRound="2xl", enableCheckbox=false} : {topRound?: "none"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"full", enableCheckbox?: boolean}) {
  return (
    <div className={``}>
      {/* Nav */}
      <div className={`grid h-12 px-5 grid-cols-7 items-center border border-cc-border-main rounded-${topRound}`} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
        <div className="col-span-3 pr-10 flex items-center gap-4">
          {enableCheckbox && <input type="checkbox" name={'all'} value={'select all'} />}
          <TableHeaderItem value="Name"/>
        </div>
        <TableHeaderItem value="Role" colSpan={1} />
        <TableHeaderItem value="Department" colSpan={2} />
        <TableHeaderItem value="Punishment" colSpan={1} />
      {/* Body */}
      </div>
      <div>
        {[1, 2, 3].map((item, index) => (
            <div
              key={item}
              className="grid h-12 grid-cols-7 items-center border-x border-b border-cc-border-main px-5 app-hover"
            >
              <div className="col-span-3 pr-10 flex items-center gap-4">
                {enableCheckbox && <input type="checkbox" name={`${item}`} value={index} id={`${item}`} />}
                <AvatarUsername imgUrl={images.random1} text="Tony Fergurson" imgSize={5} />
              </div>
              <TableItem value="Student" colSpan={1}/>
              <TableItem value="Computer Science" colSpan={2}/>
              <div className="col-span-1">
                <div className="px-3 py-1 rounded bg-cc-red/70 border border-cc-red inline-block">Expulsion</div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
