interface ChatIconProps {
  iconUrl?: string;
  id: number;
  name: string;
  size: number;
}

export const ChatIcon = ({ iconUrl, id, name, size }: ChatIconProps) => {
  const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#C70039", "#900C3F"];

  const getRandomColor = () => {
    const randomIndex = id % colors.length;
    return colors[randomIndex];
  };

  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      className="rounded-full mr-4 flex items-center justify-center text-[20px] font-semibold"
      style={{
        backgroundColor: getRandomColor(),
        width: size,
        height: size,
      }}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={`${id}`}
          className="rounded-full mr-4 flex items-center justify-center text-[20px] font-semibold"
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        getFirstLetter(name)
      )}
    </div>
  );
};
