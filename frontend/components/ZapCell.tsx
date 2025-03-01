const ZapCell = ({ name, index }: { name?: string; index: number }) => {
  return (
    <div className="border border-black py-8 px-8 flex justify-center w-[300px] cursor-pointer">
      <div className="flex text-xl">
        <div className="font-bold">{index}.</div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default ZapCell;
