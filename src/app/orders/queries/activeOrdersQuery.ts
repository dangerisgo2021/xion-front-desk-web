import { gql } from "@apollo/client";

export const activeOrdersQuery = gql`
  query activeOrdersQuery($limit: Int) {
    orders(input: { limit: $limit, completed: false }) {
      entries {
        id
        created
        updated
        completed
        assignee {
          email
        }
        firstName
        lastName
        roomNumber
        destination
      }
    }
  }
`;
