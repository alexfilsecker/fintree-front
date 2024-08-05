type CategoryBoxProps = {
  name: string;
};

const CategoryBox = ({ name }: CategoryBoxProps): JSX.Element => {
  return (
    <div className="p-4 bg-gray-100 w-min whitespace-nowrap self-center">
      {name}
    </div>
  );
};

export default CategoryBox;
