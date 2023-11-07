const TapOutsideLayout = ({children, onClick} : {children : React.ReactNode, onClick: React.MouseEventHandler<HTMLDivElement>}) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full z-10" data-testid='outside-div' onClick={onClick}></div>
      {children}
    </>
  );
}

export default TapOutsideLayout;