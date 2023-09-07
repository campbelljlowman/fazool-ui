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
  fazoolTokens?: Maybe<Scalars['Int']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  streamingService?: Maybe<StreamingService>;
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

export enum BonusVoteAmount {
  Fifty = 'FIFTY',
  Ten = 'TEN',
  TwentyFive = 'TWENTY_FIVE'
}

export type CurrentlyPlayingSong = {
  __typename?: 'CurrentlyPlayingSong';
  isPlaying: Scalars['Boolean'];
  simpleSong: SimpleSong;
  songDurationSeconds: Scalars['Int'];
  songProgressSeconds: Scalars['Int'];
};

export enum FazoolTokenAmount {
  Five = 'FIVE',
  Ten = 'TEN',
  TwentyTwo = 'TWENTY_TWO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBonusVotes: Account;
  addFazoolTokens: Scalars['String'];
  changePassword: Account;
  createAccount: Scalars['String'];
  createPasswordChangeRequest: Scalars['String'];
  createSession: Account;
  deleteAccount: Scalars['String'];
  endSession: Scalars['String'];
  login: Scalars['String'];
  removeSongFromQueue: SessionState;
  removeSpotifyStreamingService: Account;
  setAccountType: Account;
  setPlaylist: SessionState;
  setSpotifyStreamingService: Account;
  setSuperVoterSession: Account;
  updateCurrentlyPlaying: SessionState;
  updateQueue: SessionState;
};


export type MutationAddBonusVotesArgs = {
  bonusVoteAmount: BonusVoteAmount;
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
};


export type MutationAddFazoolTokensArgs = {
  fazoolTokenAmount: FazoolTokenAmount;
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  passwordChangeRequestID: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  newAccount: NewAccount;
};


export type MutationCreatePasswordChangeRequestArgs = {
  email: Scalars['String'];
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


export type MutationRemoveSongFromQueueArgs = {
  sessionID: Scalars['Int'];
  songID: Scalars['String'];
};


export type MutationRemoveSpotifyStreamingServiceArgs = {
  targetAccountID: Scalars['Int'];
};


export type MutationSetAccountTypeArgs = {
  accountType: AccountType;
  targetAccountID: Scalars['Int'];
};


export type MutationSetPlaylistArgs = {
  playlistID: Scalars['String'];
  sessionID: Scalars['Int'];
};


export type MutationSetSpotifyStreamingServiceArgs = {
  spotifyRefreshToken: Scalars['String'];
};


export type MutationSetSuperVoterSessionArgs = {
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
};


export type MutationUpdateCurrentlyPlayingArgs = {
  action: QueueAction;
  sessionID: Scalars['Int'];
};


export type MutationUpdateQueueArgs = {
  sessionID: Scalars['Int'];
  song: SongUpdate;
};

export type NewAccount = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
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
  voterToken: Scalars['String'];
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


export type QueryVoterTokenArgs = {
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
  maximumVoters: Scalars['Int'];
  sessionID: Scalars['Int'];
};

export type SessionState = {
  __typename?: 'SessionState';
  currentlyPlaying: CurrentlyPlayingSong;
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

export enum StreamingService {
  None = 'NONE',
  Spotify = 'SPOTIFY'
}

export type Subscription = {
  __typename?: 'Subscription';
  subscribeSessionState: SessionState;
};


export type SubscriptionSubscribeSessionStateArgs = {
  sessionID: Scalars['Int'];
};

export type Voter = {
  __typename?: 'Voter';
  accountID: Scalars['Int'];
  bonusVotes?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  songsDownVoted?: Maybe<Array<Scalars['String']>>;
  songsUpVoted?: Maybe<Array<Scalars['String']>>;
  type: VoterType;
};

export enum VoterType {
  Admin = 'ADMIN',
  Free = 'FREE',
  Super = 'SUPER'
}

export type SubscribeSessionStateSubscriptionVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type SubscribeSessionStateSubscription = { __typename?: 'Subscription', subscribeSessionState: { __typename?: 'SessionState', numberOfVoters: number, currentlyPlaying: { __typename?: 'CurrentlyPlayingSong', isPlaying: boolean, songProgressSeconds: number, songDurationSeconds: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }, queue?: Array<{ __typename?: 'QueuedSong', votes: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }> | null } };

export type GetSessionStateQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type GetSessionStateQuery = { __typename?: 'Query', sessionState: { __typename?: 'SessionState', numberOfVoters: number, currentlyPlaying: { __typename?: 'CurrentlyPlayingSong', isPlaying: boolean, songProgressSeconds: number, songDurationSeconds: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }, queue?: Array<{ __typename?: 'QueuedSong', votes: number, simpleSong: { __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string } }> | null } };

export type GetSessionConfigQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type GetSessionConfigQuery = { __typename?: 'Query', sessionConfig: { __typename?: 'SessionConfig', sessionID: number, adminAccountID: number, maximumVoters: number } };

export type VoterQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type VoterQuery = { __typename?: 'Query', voter: { __typename?: 'Voter', id: string, accountID: number, type: VoterType, songsUpVoted?: Array<string> | null, songsDownVoted?: Array<string> | null, bonusVotes?: number | null } };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: number, firstName: string, lastName: string, activeSession?: number | null, streamingService?: StreamingService | null, fazoolTokens?: number | null } };

export type UpdateCurrentlyPlayingMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  action: QueueAction;
}>;


export type UpdateCurrentlyPlayingMutation = { __typename?: 'Mutation', updateCurrentlyPlaying: { __typename?: 'SessionState', numberOfVoters: number } };

export type EndSessionMutationVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type EndSessionMutation = { __typename?: 'Mutation', endSession: string };

export type SetPlaylistMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  playlistID: Scalars['String'];
}>;


export type SetPlaylistMutation = { __typename?: 'Mutation', setPlaylist: { __typename?: 'SessionState', numberOfVoters: number } };

export type PlaylistsQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type PlaylistsQuery = { __typename?: 'Query', playlists?: Array<{ __typename?: 'Playlist', id: string, name: string, image: string }> | null };

export type UpdateQueueMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  song: SongUpdate;
}>;


export type UpdateQueueMutation = { __typename?: 'Mutation', updateQueue: { __typename?: 'SessionState', numberOfVoters: number } };

export type RemoveSongFromQueueMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  songID: Scalars['String'];
}>;


export type RemoveSongFromQueueMutation = { __typename?: 'Mutation', removeSongFromQueue: { __typename?: 'SessionState', numberOfVoters: number } };

export type MusicSearchQueryVariables = Exact<{
  sessionID: Scalars['Int'];
  query: Scalars['String'];
}>;


export type MusicSearchQuery = { __typename?: 'Query', musicSearch?: Array<{ __typename?: 'SimpleSong', id: string, title: string, artist: string, image: string }> | null };

export type AddBonusVotesMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
  bonusVoteAmount: BonusVoteAmount;
}>;


export type AddBonusVotesMutation = { __typename?: 'Mutation', addBonusVotes: { __typename?: 'Account', fazoolTokens?: number | null } };

export type AddFazoolTokensMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
  fazoolTokenAmount: FazoolTokenAmount;
}>;


export type AddFazoolTokensMutation = { __typename?: 'Mutation', addFazoolTokens: string };

export type SetSuperVoterSessionMutationVariables = Exact<{
  sessionID: Scalars['Int'];
  targetAccountID: Scalars['Int'];
}>;


export type SetSuperVoterSessionMutation = { __typename?: 'Mutation', setSuperVoterSession: { __typename?: 'Account', fazoolTokens?: number | null } };

export type SetSpotifyStreamingServiceMutationVariables = Exact<{
  spotifyRefreshToken: Scalars['String'];
}>;


export type SetSpotifyStreamingServiceMutation = { __typename?: 'Mutation', setSpotifyStreamingService: { __typename?: 'Account', id: number } };

export type CreateSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Account', activeSession?: number | null } };

export type RemoveSpotifyStreamingServiceMutationVariables = Exact<{
  targetAccountID: Scalars['Int'];
}>;


export type RemoveSpotifyStreamingServiceMutation = { __typename?: 'Mutation', removeSpotifyStreamingService: { __typename?: 'Account', id: number } };

export type GetVoterTokenQueryVariables = Exact<{
  sessionID: Scalars['Int'];
}>;


export type GetVoterTokenQuery = { __typename?: 'Query', voterToken: string };

export type LoginMutationVariables = Exact<{
  accountLogin: AccountLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateAccountMutationVariables = Exact<{
  newAccount: NewAccount;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: string };

export type ChangePasswordMutationVariables = Exact<{
  passwordChangeRequestID: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'Account', id: number } };

export type CreatePasswordChangeRequestMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreatePasswordChangeRequestMutation = { __typename?: 'Mutation', createPasswordChangeRequest: string };


export const SubscribeSessionStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"subscribeSessionState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeSessionState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"songProgressSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"songDurationSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<SubscribeSessionStateSubscription, SubscribeSessionStateSubscriptionVariables>;
export const GetSessionStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSessionState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"songProgressSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"songDurationSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"queue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simpleSong"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<GetSessionStateQuery, GetSessionStateQueryVariables>;
export const GetSessionConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSessionConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionID"}},{"kind":"Field","name":{"kind":"Name","value":"adminAccountID"}},{"kind":"Field","name":{"kind":"Name","value":"maximumVoters"}}]}}]}}]} as unknown as DocumentNode<GetSessionConfigQuery, GetSessionConfigQueryVariables>;
export const VoterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"voter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountID"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"songsUpVoted"}},{"kind":"Field","name":{"kind":"Name","value":"songsDownVoted"}},{"kind":"Field","name":{"kind":"Name","value":"bonusVotes"}}]}}]}}]} as unknown as DocumentNode<VoterQuery, VoterQueryVariables>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"activeSession"}},{"kind":"Field","name":{"kind":"Name","value":"streamingService"}},{"kind":"Field","name":{"kind":"Name","value":"fazoolTokens"}}]}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const UpdateCurrentlyPlayingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCurrentlyPlaying"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueueAction"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentlyPlaying"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<UpdateCurrentlyPlayingMutation, UpdateCurrentlyPlayingMutationVariables>;
export const EndSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}]}]}}]} as unknown as DocumentNode<EndSessionMutation, EndSessionMutationVariables>;
export const SetPlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setPlaylist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setPlaylist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"playlistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<SetPlaylistMutation, SetPlaylistMutationVariables>;
export const PlaylistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<PlaylistsQuery, PlaylistsQueryVariables>;
export const UpdateQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"song"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SongUpdate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"song"},"value":{"kind":"Variable","name":{"kind":"Name","value":"song"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<UpdateQueueMutation, UpdateQueueMutationVariables>;
export const RemoveSongFromQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSongFromQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"songID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSongFromQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"songID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"songID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfVoters"}}]}}]}}]} as unknown as DocumentNode<RemoveSongFromQueueMutation, RemoveSongFromQueueMutationVariables>;
export const MusicSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"musicSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<MusicSearchQuery, MusicSearchQueryVariables>;
export const AddBonusVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBonusVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bonusVoteAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BonusVoteAmount"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBonusVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetAccountID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}}},{"kind":"Argument","name":{"kind":"Name","value":"bonusVoteAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bonusVoteAmount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fazoolTokens"}}]}}]}}]} as unknown as DocumentNode<AddBonusVotesMutation, AddBonusVotesMutationVariables>;
export const AddFazoolTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addFazoolTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fazoolTokenAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FazoolTokenAmount"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFazoolTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetAccountID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}}},{"kind":"Argument","name":{"kind":"Name","value":"fazoolTokenAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fazoolTokenAmount"}}}]}]}}]} as unknown as DocumentNode<AddFazoolTokensMutation, AddFazoolTokensMutationVariables>;
export const SetSuperVoterSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setSuperVoterSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSuperVoterSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetAccountID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fazoolTokens"}}]}}]}}]} as unknown as DocumentNode<SetSuperVoterSessionMutation, SetSuperVoterSessionMutationVariables>;
export const SetSpotifyStreamingServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setSpotifyStreamingService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spotifyRefreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSpotifyStreamingService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spotifyRefreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spotifyRefreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SetSpotifyStreamingServiceMutation, SetSpotifyStreamingServiceMutationVariables>;
export const CreateSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeSession"}}]}}]}}]} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const RemoveSpotifyStreamingServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSpotifyStreamingService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSpotifyStreamingService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetAccountID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetAccountID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveSpotifyStreamingServiceMutation, RemoveSpotifyStreamingServiceMutationVariables>;
export const GetVoterTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVoterToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voterToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionID"}}}]}]}}]} as unknown as DocumentNode<GetVoterTokenQuery, GetVoterTokenQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountLogin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountLogin"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountLogin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountLogin"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newAccount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewAccount"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newAccount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newAccount"}}}]}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordChangeRequestID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passwordChangeRequestID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordChangeRequestID"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePasswordChangeRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPasswordChangeRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPasswordChangeRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CreatePasswordChangeRequestMutation, CreatePasswordChangeRequestMutationVariables>;