type Props = {
  text: string,
  icon: any,
};

export const Title: React.FC<Props>  = ({ text, icon }) => {
  return (
    <div className="flex gap-2 items-center text-3xl lg:text-2xl font-bold">
      <h3>{text}</h3>
      <span>{icon}</span>
    </div>
  );
};
