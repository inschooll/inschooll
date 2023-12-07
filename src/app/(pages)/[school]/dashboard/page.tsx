

export default function Dashboard({ params }: { params: { school: string } }) {
  return (
    <div className="bg-green-5000 flex-grow overflow-auto">
      <div></div>
      {/* {Array.from({length: 50}, (_, index) => index).map((index) => (<p key={index}>{index}</p>))} */}
    </div>
  );
}
