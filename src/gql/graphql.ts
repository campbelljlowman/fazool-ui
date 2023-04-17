/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  activeSession?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
};

export type AccountLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum AccountType {
  Free = 'FREE',
  LargeVenue = 'LARGE_VENUE',
  SmallVenue = 'SMALL_VENUE'
}

export type CurrentlyPlayingSong = {
  __typename?: 'CurrentlyPlayingSong';
  playing: Scalars['Boolean'];
  simpleSong: SimpleSong;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBonusVotes: Account;
  createAccount: Scalars['String'];
  createSession: Account;
  deleteAccount: Scalars['String'];
  endSession: Scalars['String'];
  login: Scalars['String'];
  setAccountType: Account;
  setPlaylist: SessionState;
  setVoterType: Account;
  updateCurrentlyPlaying: SessionState;
  updateQueue: SessionState;
  upsertSpotifyToken: Account;
  voterToken: Scalars['String'];
};


export type MutationAddBonusVotesArgs = {
  bonusVotes: Scalars['Int'];
  targetAccountID: Scalars['Int'];
};


export type MutationCreateAccountArgs = {
  newAccount: NewAccount;
};


export type MutationDeleteAccountArgs = {
  targetAccountID: Scalars['Int'];
};


export type MutationEndSessionArgs = {
  sessionID: Scalars['Int'];
};


export type MutationLoginArgs = {
  accountLogin: AccountLogin;
};


export type MutationSetAccountTypeArgs = {
  accountType: AccountType;
  targetAccountID: Scalars['Int'];
};


export type MutationSetPlaylistArgs = {
  playlist: Scalars['String'];
  sessionID: Scalars['Int'];
};


export type MutationSetVoterTypeArgs = {
  targetAccountID: Scalars['Int'];
  voterType: VoterType;
};


export type MutationUpdateCurrentlyPlayingArgs = {
  action: QueueAction;
  sessionID: Scalars['Int'];
};


export type MutationUpdateQueueArgs = {
  sessionID: Scalars['Int'];
  song: SongUpdate;
};


export type MutationUpsertSpotifyTokenArgs = {
  spotifyCreds: SpotifyCreds;
};

export type NewAccount = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  musicSearch?: Maybe<Array<SimpleSong>>;
  playlists?: Maybe<Array<Playlist>>;
  sessionConfig: SessionConfig;
  sessionState: SessionState;
  voter: Voter;
};


export type QueryMusicSearchArgs = {
  query: Scalars['String'];
  sessionID: Scalars['Int'];
};


export type QueryPlaylistsArgs = {
  sessionID: Scalars['Int'];
};


export type QuerySessionConfigArgs = {
  sessionID: Scalars['Int'];
};


export type QuerySessionStateArgs = {
  sessionID: Scalars['Int'];
};


export type QueryVoterArgs = {
  sessionID: Scalars['Int'];
};

export enum QueueAction {
  Advance = 'ADVANCE',
  Pause = 'PAUSE',
  Play = 'PLAY'
}

export type QueuedSong = {
  __typename?: 'QueuedSong';
  simpleSong: SimpleSong;
  votes: Scalars['Int'];
};

export type SessionConfig = {
  __typename?: 'SessionConfig';
  adminAccountID: Scalars['Int'];
  id: Scalars['Int'];
  maximumVoters: Scalars['Int'];
};

export type SessionState = {
  __typename?: 'SessionState';
  currentlyPlaying?: Maybe<CurrentlyPlayingSong>;
  numberOfVoters: Scalars['Int'];
  queue?: Maybe<Array<QueuedSong>>;
};

export type SimpleSong = {
  __typename?: 'SimpleSong';
  artist: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type SongUpdate = {
  action: SongVoteAction;
  artist?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  vote: SongVoteDirection;
};

export enum SongVoteAction {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export enum SongVoteDirection {
  Down = 'DOWN',
  Up = 'UP'
}

export type SpotifyCreds = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeSessionState: SessionState;
};


export type SubscriptionSubscribeSessionStateArgs = {
  sessionID: Scalars['Int'];
};

export type Voter = {
  __typename?: 'Voter';
  bonusVotes?: Maybe<Scalars['Int']>;
  songsDownVoted?: Maybe<Array<Scalars['String']>>;
  songsUpVoted?: Maybe<Array<Scalars['String']>>;
  type: VoterType;
};

export enum VoterType {
  Admin = 'ADMIN',
  Free = 'FREE',
  Privileged = 'PRIVILEGED'
}

export type SubscribeSessionStateSubscriptionVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type SubscribeSessionStateSubscription = { __typename?: 'Subscription', subscribeSessionState: { __typename?: 'SessionState', numberOfVoters: number, currentlyPlaying?: { __typename?: 'CurrentlyPlayingSong', playing: boolean, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } } | null, queue?: Array<{ __typename?: 'QueuedSong', votes: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }> | null } };

export type GetSessionStateQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type GetSessionStateQuery = { __typename?: 'Query', sessionState: { __typename?: 'SessionState', numberOfVoters: number, currentlyPlaying?: { __typename?: 'CurrentlyPlayingSong', playing: boolean, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } } | null, queue?: Array<{ __typename?: 'QueuedSong', votes: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }> | null } };

export type GetSessionConfigQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type GetSessionConfigQuery = { __typename?: 'Query', sessionConfig: { __typename?: 'SessionConfig', id: number, adminAccountID: number, maximumVoters: number } };

export type VoterQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type VoterQuery = { __typename?: 'Query', voter: { __typename?: 'Voter', type: VoterType, songsUpVoted?: Array<string> | null, songsDownVoted?: Array<string> | null, bonusVotes?: number | null } };

export type UpdateCurrentlyPlayingMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  action: QueueAction;
}>;


export type UpdateCurrentlyPlayingMutation = { __typename?: 'Mutation', updateCurrentlyPlaying: { __typename?: 'SessionState', numberOfVoters: number } };

export type UpdateQueueMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  song: SongUpdate;
}>;


export type UpdateQueueMutation = { __typename?: 'Mutation', updateQueue: { __typename?: 'SessionState', numberOfVoters: number } };

export type MusicSearchQueryVariables = Exact<{
  sessionID: Scalars['Int'];
  query: Scalars['String'];
}>;


export type MusicSearchQuery = { __typename?: 'Query', musicSearch?: Array<{ __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string }> | null };

export type UpsertSpotifyCredentialsMutationVariables = Exact<{
  spotifyCreds: SpotifyCreds;
}>;


export type UpsertSpotifyCredentialsMutation = { __typename?: 'Mutation', upsertSpotifyToken: { __typename?: 'Account', id: number } };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: number, firstName?: string | null, activeSession?: number | null } };

export type CreateSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Account', activeSession?: number | null } };

export type GetVoterTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type GetVoterTokenMutation = { __typename?: 'Mutation', voterToken: string };

export type LoginMutationVariables = Exact<{
  accountLogin: AccountLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateAccountMutationVariables = Exact<{
  newAccount: NewAccount;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: string };


export const SubscribeSessionStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"subscribeSessionState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeSessionState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<SubscribeSessionStateSubscription, SubscribeSessionStateSubscriptionVariables>;
export const GetSessionStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSessionState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<GetSessionStateQuery, GetSessionStateQueryVariables>;
export const GetSessionConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSessionConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adminAccountID"}},{"kind":"Field","name":{"kind":"Name","value":"maximumVoters"}}]}}]}}]} as unknown as DocumentNode<GetSessionConfigQuery, GetSessionConfigQueryVariables>;
export const VoterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"voter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"songsUpVoted"}},{"kind":"Field","name":{"kind":"Name","value":"songsDownVoted"}},{"kind":"Field","name":{"kind":"Name","value":"bonusVotes"}}]}}]}}]} as unknown as DocumentNode<VoterQuery, VoterQueryVariables>;
export const UpdateCurrentlyPlayingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCurrentlyPlaying"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueueAction"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentlyPlaying"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<UpdateCurrentlyPlayingMutation, UpdateCurrentlyPlayingMutationVariables>;
export const UpdateQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SongUpdate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"song"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<UpdateQueueMutation, UpdateQueueMutationVariables>;
export const MusicSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"musicSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<MusicSearchQuery, MusicSearchQueryVariables>;
export const UpsertSpotifyCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertSpotifyCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spotifyCreds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyCreds"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertSpotifyToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spotifyCreds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spotifyCreds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertSpotifyCredentialsMutation, UpsertSpotifyCredentialsMutationVariables>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"activeSession"}}]}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const CreateSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeSession"}}]}}]}}]} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const GetVoterTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getVoterToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voterToken"}}]}}]} as unknown as DocumentNode<GetVoterTokenMutation, GetVoterTokenMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountLogin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountLogin"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountLogin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountLogin"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newAccount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewAccount"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newAccount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newAccount"}}}]}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;