"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AddressForm = ({ addressType, initialData, formAction }) => {
  const [address, setAddress] = useState(initialData || {
    streetAddress: "",
    city: "",
    postal: "",
    country: "",
    phone: ""
  });

  const keys = Object.keys(address);

  const session = useSession();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`/api/user/profile/${session.data.user.id}`);
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const user = await response.json();
        
        if (user) {
          const { _id, ...data } = user[addressType];
          setAddress({ ...data });
        }
      } catch (e) {
        console.log(e);
      }
    }

    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(address);
  };

  return (
    <div>
      <h1 className="text-center text-sky-600">{`${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Form`}</h1>
      <form action={formAction}>
        {keys.map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type="text"
              id={key}
              name={key}
              className="input-box my-1"
              value={address[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
