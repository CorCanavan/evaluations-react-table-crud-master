import { gql } from 'apollo-boost';

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

export const ROLES_QUERY = gql`
  query {
    __type(name: "Role") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      name
      role
    }
  }
`;

export const RESET_USERS = gql`
  mutation ResetUsers {
    resetUsers
  }
`;
