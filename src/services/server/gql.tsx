import { gql } from '@apollo/client';

const SERVER_DEFINITION = gql`
  fragment ServerDefinitionFields on ServerDefinition {
    id
    instanceID
    instanceKind
    allocationID
    elasticIP
    name
    region
    description
    url
    bannerURL
    background
    tickRate
    mapSalt
    mapSeed
    mapSize
    maxPlayers
    mapWipeFrequency
    blueprintWipeFrequency
    wipeDay
    tags {
      id
      description
      icon
      value
    }
    moderators {
      id
      steamID
    }
    schedule {
      id
      day
      hour
      kind
    }
  }
`;

export const SERVERS = gql`
  ${SERVER_DEFINITION}
  query Servers($state: State!) {
    servers(input: { state: $state }) {
      servers {
        __typename
        ... on LiveServer {
          id
          associationID
          activePlayers
          queuedPlayers
          updatedAt
          createdAt
          definition {
            ...ServerDefinitionFields
          }
        }
        ... on DormantServer {
          id
          updatedAt
          createdAt
          startsAt
          definition {
            ...ServerDefinitionFields
          }
        }
      }
    }
  }
`;
