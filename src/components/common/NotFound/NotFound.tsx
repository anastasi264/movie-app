type Props = {
  text: string,
  icon: any,
};

export const NotFound: React.FC<Props> = ({ text, icon }) => {
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-10">
      <div className="text-[200px] md:text-[120px] text-gray-500">
        {icon}
      </div>
      <h3 className="w-[60%] text-center text-[40px] md:text-[30px] text-gray-400">
        {text}
      </h3>
    </div>
  );
};
