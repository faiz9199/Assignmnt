import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <>
      <Link to="create-note">
        <div className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          Create Note
        </div>
      </Link>
    </>
  );
};

export default AddButton;
