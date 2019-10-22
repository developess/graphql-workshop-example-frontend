import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_ADDRESSES_QUERY = gql`
  query getAllAddresses {
    getAddresses {
      id
      houseNumber
      postcode
    }
  }
`;

export const Addresses = () => {
  const { loading, error, data } = useQuery(GET_ADDRESSES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>List of addresses</h2>

      <ul>
        {data.getAddresses.map(({ id, postcode, houseNumber }, index) => (
          <li key={index}>
            {houseNumber}, {postcode}
          </li>
        ))}
      </ul>
    </div>
  );
};
