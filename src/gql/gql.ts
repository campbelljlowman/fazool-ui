/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    subscription subscribeSessionState($sessionID: Int!){\n        subscribeSessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n": types.SubscribeSessionStateDocument,
    "\n    query getSessionState($sessionID: Int!){\n        sessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n": types.GetSessionStateDocument,
    "\n    query getSessionConfig($sessionID: Int!){\n        sessionConfig(sessionID: $sessionID){\n            sessionID\n            adminAccountID\n            maximumVoters\n        }\n    }\n": types.GetSessionConfigDocument,
    "\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n": types.VoterDocument,
    "\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n": types.UpdateCurrentlyPlayingDocument,
    "\n    mutation setPlaylist($sessionID: Int!, $playlistID: String!) {\n        setPlaylist (sessionID: $sessionID, playlistID: $playlistID) {\n            numberOfVoters\n        }\n    }\n": types.SetPlaylistDocument,
    "\n    query playlists ($sessionID: Int!){\n        playlists (sessionID: $sessionID){\n            id\n            name\n            image\n        }\n    }\n": types.PlaylistsDocument,
    "\n    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n": types.UpdateQueueDocument,
    "\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n": types.MusicSearchDocument,
    "\n    mutation upsertSpotifyCredentials ($spotifyCreds: SpotifyCreds!) {\n        upsertSpotifyToken(spotifyCreds:$spotifyCreds){\n            id\n        }\n    }\n": types.UpsertSpotifyCredentialsDocument,
    "\n    query getAccount {\n        account {\n            id\n            firstName\n            activeSession\n            streamingService\n        }\n    }\n": types.GetAccountDocument,
    "\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n": types.CreateSessionDocument,
    "\n    query getVoterToken {\n        voterToken\n    }\n": types.GetVoterTokenDocument,
    "\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n": types.LoginDocument,
    "\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n": types.CreateAccountDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription subscribeSessionState($sessionID: Int!){\n        subscribeSessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    subscription subscribeSessionState($sessionID: Int!){\n        subscribeSessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getSessionState($sessionID: Int!){\n        sessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    query getSessionState($sessionID: Int!){\n        sessionState(sessionID: $sessionID){\n            currentlyPlaying {\n                simpleSong{\n                    id\n                    title\n                    artist\n                    image\n                }\n                isPlaying\n                songProgressSeconds\n                songDurationSeconds\n            }\n            queue {\n                simpleSong {\n                    id\n                    title\n                    artist\n                    image\n                }\n                votes\n            }\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getSessionConfig($sessionID: Int!){\n        sessionConfig(sessionID: $sessionID){\n            sessionID\n            adminAccountID\n            maximumVoters\n        }\n    }\n"): (typeof documents)["\n    query getSessionConfig($sessionID: Int!){\n        sessionConfig(sessionID: $sessionID){\n            sessionID\n            adminAccountID\n            maximumVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n"): (typeof documents)["\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation setPlaylist($sessionID: Int!, $playlistID: String!) {\n        setPlaylist (sessionID: $sessionID, playlistID: $playlistID) {\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation setPlaylist($sessionID: Int!, $playlistID: String!) {\n        setPlaylist (sessionID: $sessionID, playlistID: $playlistID) {\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query playlists ($sessionID: Int!){\n        playlists (sessionID: $sessionID){\n            id\n            name\n            image\n        }\n    }\n"): (typeof documents)["\n    query playlists ($sessionID: Int!){\n        playlists (sessionID: $sessionID){\n            id\n            name\n            image\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n"): (typeof documents)["\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation upsertSpotifyCredentials ($spotifyCreds: SpotifyCreds!) {\n        upsertSpotifyToken(spotifyCreds:$spotifyCreds){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation upsertSpotifyCredentials ($spotifyCreds: SpotifyCreds!) {\n        upsertSpotifyToken(spotifyCreds:$spotifyCreds){\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAccount {\n        account {\n            id\n            firstName\n            activeSession\n            streamingService\n        }\n    }\n"): (typeof documents)["\n    query getAccount {\n        account {\n            id\n            firstName\n            activeSession\n            streamingService\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n"): (typeof documents)["\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getVoterToken {\n        voterToken\n    }\n"): (typeof documents)["\n    query getVoterToken {\n        voterToken\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n"): (typeof documents)["\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n"): (typeof documents)["\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;