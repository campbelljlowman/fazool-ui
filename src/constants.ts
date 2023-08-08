import { BonusVoteAmount, FazoolTokenAmount } from "./gql/graphql"

// THESE SHOULD ALWAYS BE IN SYNC WITH VALUES IN BACKEND!!!
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

interface FazoolTokenCost {
    NumberOfFazoolTokens:   number,
    CostInDollars:          number,
    FazoolTokenAmount:      FazoolTokenAmount
}

export const fazoolTokenCostMapping: FazoolTokenCost[] = [
    {NumberOfFazoolTokens: 5, CostInDollars: 5, FazoolTokenAmount: FazoolTokenAmount.Five}
]