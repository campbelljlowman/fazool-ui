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
    "\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            accountID\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n": types.VoterDocument,
    "\n    query getAccount {\n        account {\n            id\n            firstName\n            lastName\n            activeSession\n            streamingService\n            fazoolTokens\n        }\n    }\n": types.GetAccountDocument,
    "\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n": types.UpdateCurrentlyPlayingDocument,
    "\n    mutation endSession($sessionID: Int!){\n        endSession(sessionID: $sessionID)\n    }\n": types.EndSessionDocument,
    "\n    mutation setPlaylist($sessionID: Int!, $playlistID: String!) {\n        setPlaylist (sessionID: $sessionID, playlistID: $playlistID) {\n            numberOfVoters\n        }\n    }\n": types.SetPlaylistDocument,
    "\n    query playlists ($sessionID: Int!){\n        playlists (sessionID: $sessionID){\n            id\n            name\n            image\n        }\n    }\n": types.PlaylistsDocument,
    "\n    mutation updateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n": types.UpdateQueueDocument,
    "\n    mutation removeSongFromQueue($sessionID: Int!, $songID: String!) {\n        removeSongFromQueue(sessionID: $sessionID, songID: $songID) {\n            numberOfVoters\n        }\n    }\n": types.RemoveSongFromQueueDocument,
    "\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n": types.MusicSearchDocument,
    "\n    mutation addBonusVotes($sessionID: Int!, $targetAccountID: Int!, $bonusVoteAmount: BonusVoteAmount!) {\n        addBonusVotes(sessionID: $sessionID, targetAccountID: $targetAccountID, bonusVoteAmount: $bonusVoteAmount) {\n            fazoolTokens\n        }\n    }\n": types.AddBonusVotesDocument,
    "\n    mutation addFazoolTokens($sessionID: Int!, $targetAccountID: Int!, $fazoolTokenAmount: FazoolTokenAmount!) {\n        addFazoolTokens(sessionID: $sessionID, targetAccountID: $targetAccountID, fazoolTokenAmount: $fazoolTokenAmount)\n    }\n": types.AddFazoolTokensDocument,
    "\n    mutation setSuperVoterSession($sessionID: Int!, $targetAccountID: Int!) {\n        setSuperVoterSession(sessionID: $sessionID, targetAccountID: $targetAccountID) {\n            fazoolTokens\n        }\n    }\n": types.SetSuperVoterSessionDocument,
    "\n    mutation setSpotifyStreamingService ($spotifyRefreshToken: String!) {\n        setSpotifyStreamingService(spotifyRefreshToken: $spotifyRefreshToken){\n            id\n        }\n    }\n": types.SetSpotifyStreamingServiceDocument,
    "\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n": types.CreateSessionDocument,
    "\n    mutation removeSpotifyStreamingService($targetAccountID: Int!) {\n        removeSpotifyStreamingService(targetAccountID: $targetAccountID) {\n            id\n        }\n    }\n": types.RemoveSpotifyStreamingServiceDocument,
    "\n    query getVoterToken ($sessionID: Int!) {\n        voterToken(sessionID:$sessionID)\n    }\n": types.GetVoterTokenDocument,
    "\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n": types.LoginDocument,
    "\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n": types.CreateAccountDocument,
    "\n    mutation changePassword ($passwordChangeRequestID: String!, $newPassword: String!) {\n        changePassword(passwordChangeRequestID: $passwordChangeRequestID, newPassword: $newPassword) {\n            id\n        }\n    }\n": types.ChangePasswordDocument,
    "\n    mutation createPasswordChangeRequest ($email: String!) {\n        createPasswordChangeRequest(email:$email)\n    }\n": types.CreatePasswordChangeRequestDocument,
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
export function graphql(source: "\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            accountID\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n"): (typeof documents)["\n    query voter ($sessionID: Int!){\n        voter (sessionID: $sessionID){\n            id\n            accountID\n            type\n            songsUpVoted\n            songsDownVoted\n            bonusVotes\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAccount {\n        account {\n            id\n            firstName\n            lastName\n            activeSession\n            streamingService\n            fazoolTokens\n        }\n    }\n"): (typeof documents)["\n    query getAccount {\n        account {\n            id\n            firstName\n            lastName\n            activeSession\n            streamingService\n            fazoolTokens\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {\n        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation endSession($sessionID: Int!){\n        endSession(sessionID: $sessionID)\n    }\n"): (typeof documents)["\n    mutation endSession($sessionID: Int!){\n        endSession(sessionID: $sessionID)\n    }\n"];
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
export function graphql(source: "\n    mutation updateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation updateQueue($sessionID: Int!, $song: SongUpdate!) {\n        updateQueue(sessionID: $sessionID, song: $song) {\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeSongFromQueue($sessionID: Int!, $songID: String!) {\n        removeSongFromQueue(sessionID: $sessionID, songID: $songID) {\n            numberOfVoters\n        }\n    }\n"): (typeof documents)["\n    mutation removeSongFromQueue($sessionID: Int!, $songID: String!) {\n        removeSongFromQueue(sessionID: $sessionID, songID: $songID) {\n            numberOfVoters\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n"): (typeof documents)["\n    query musicSearch ($sessionID: Int!, $query: String!){\n        musicSearch (sessionID: $sessionID, query: $query){\n            id\n            title\n            artist\n            image\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addBonusVotes($sessionID: Int!, $targetAccountID: Int!, $bonusVoteAmount: BonusVoteAmount!) {\n        addBonusVotes(sessionID: $sessionID, targetAccountID: $targetAccountID, bonusVoteAmount: $bonusVoteAmount) {\n            fazoolTokens\n        }\n    }\n"): (typeof documents)["\n    mutation addBonusVotes($sessionID: Int!, $targetAccountID: Int!, $bonusVoteAmount: BonusVoteAmount!) {\n        addBonusVotes(sessionID: $sessionID, targetAccountID: $targetAccountID, bonusVoteAmount: $bonusVoteAmount) {\n            fazoolTokens\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addFazoolTokens($sessionID: Int!, $targetAccountID: Int!, $fazoolTokenAmount: FazoolTokenAmount!) {\n        addFazoolTokens(sessionID: $sessionID, targetAccountID: $targetAccountID, fazoolTokenAmount: $fazoolTokenAmount)\n    }\n"): (typeof documents)["\n    mutation addFazoolTokens($sessionID: Int!, $targetAccountID: Int!, $fazoolTokenAmount: FazoolTokenAmount!) {\n        addFazoolTokens(sessionID: $sessionID, targetAccountID: $targetAccountID, fazoolTokenAmount: $fazoolTokenAmount)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation setSuperVoterSession($sessionID: Int!, $targetAccountID: Int!) {\n        setSuperVoterSession(sessionID: $sessionID, targetAccountID: $targetAccountID) {\n            fazoolTokens\n        }\n    }\n"): (typeof documents)["\n    mutation setSuperVoterSession($sessionID: Int!, $targetAccountID: Int!) {\n        setSuperVoterSession(sessionID: $sessionID, targetAccountID: $targetAccountID) {\n            fazoolTokens\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation setSpotifyStreamingService ($spotifyRefreshToken: String!) {\n        setSpotifyStreamingService(spotifyRefreshToken: $spotifyRefreshToken){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation setSpotifyStreamingService ($spotifyRefreshToken: String!) {\n        setSpotifyStreamingService(spotifyRefreshToken: $spotifyRefreshToken){\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n"): (typeof documents)["\n    mutation createSession {\n        createSession{\n            activeSession\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeSpotifyStreamingService($targetAccountID: Int!) {\n        removeSpotifyStreamingService(targetAccountID: $targetAccountID) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation removeSpotifyStreamingService($targetAccountID: Int!) {\n        removeSpotifyStreamingService(targetAccountID: $targetAccountID) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getVoterToken ($sessionID: Int!) {\n        voterToken(sessionID:$sessionID)\n    }\n"): (typeof documents)["\n    query getVoterToken ($sessionID: Int!) {\n        voterToken(sessionID:$sessionID)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n"): (typeof documents)["\n    mutation login ($accountLogin: AccountLogin!) {\n        login(accountLogin:$accountLogin)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n"): (typeof documents)["\n    mutation createAccount ($newAccount: NewAccount!) {\n        createAccount(newAccount: $newAccount)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation changePassword ($passwordChangeRequestID: String!, $newPassword: String!) {\n        changePassword(passwordChangeRequestID: $passwordChangeRequestID, newPassword: $newPassword) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation changePassword ($passwordChangeRequestID: String!, $newPassword: String!) {\n        changePassword(passwordChangeRequestID: $passwordChangeRequestID, newPassword: $newPassword) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPasswordChangeRequest ($email: String!) {\n        createPasswordChangeRequest(email:$email)\n    }\n"): (typeof documents)["\n    mutation createPasswordChangeRequest ($email: String!) {\n        createPasswordChangeRequest(email:$email)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;