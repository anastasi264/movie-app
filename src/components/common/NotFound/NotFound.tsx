type Props = {
  text: string,
  icon: any,
};

export const NotFound: React.FC<Props> = ({ text, icon }) => {
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-10">
      <div className="text-[200px] lg:text-[120px] text-gray-500">
        {icon}
      </div>
      <h3 className="w-[60%] sm:w-[80%] text-center text-4xl lg:text-2xl text-gray-400">
        {text}
      </h3>
    </div>
  );
};
