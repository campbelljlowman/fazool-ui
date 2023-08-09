import { BonusVoteAmount, FazoolTokenAmount } from "./gql/graphql"

// THESE SHOULD ALWAYS BE IN SYNC WITH VALUES IN BACKEND!!!
// https://github.com/campbelljlowman/fazool-api/blob/master/constants/constants.go
// https://github.com/campbelljlowman/fazool-api/blob/master/payments/stripe.go

export const superVoterCost = 6

interface BonusVoteCostTuple {
    NumberOfBonusVotes: number,
    CostInFazoolTokens: number,
    BonusVoteAmount:    BonusVoteAmount
}

export const bonusVoteCostMapping: BonusVoteCostTuple[] = [
    {NumberOfBonusVotes: 10, CostInFazoolTokens: 3, BonusVoteAmount: BonusVoteAmount.Ten},
    {NumberOfBonusVotes: 25, CostInFazoolTokens: 6, BonusVoteAmount: BonusVoteAmount.TwentyFive},
    {NumberOfBonusVotes: 50, CostInFazoolTokens: 10, BonusVoteAmount: BonusVoteAmount.Fifty}
]

interface FazoolTokenCostTuple {
    NumberOfFazoolTokens:   number,
    CostInDollars:          number,
    FazoolTokenAmount:      FazoolTokenAmount
}

export const fazoolTokenCostMapping: FazoolTokenCostTuple[] = [
    {NumberOfFazoolTokens: 5, CostInDollars: 5, FazoolTokenAmount: FazoolTokenAmount.Five},
    {NumberOfFazoolTokens: 10, CostInDollars: 10, FazoolTokenAmount: FazoolTokenAmount.Ten},
    {NumberOfFazoolTokens: 22, CostInDollars: 20, FazoolTokenAmount: FazoolTokenAmount.TwentyTwo}
]
