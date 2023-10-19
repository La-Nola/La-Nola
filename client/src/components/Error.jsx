import { useContext } from "react";
import { DataContext } from "../store/context";

// when an axios error happens, display this component

const Error = () => {
  const { error, setError } = useContext(DataContext);
  const handleClick = () => {
    setError(null);
  };

  return (
    <div className='error'>
      <div>
      <p>Nachricht: {error.message || "Etwas ist schiefgelaufen"}</p>
        <button type='button' onClick={handleClick}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Error;
