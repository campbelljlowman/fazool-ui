import {describe, test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinLink from './JoinLink';

describe("Join Link Test", () => {
    test("Should render props", () => {
        render(<JoinLink sessionID={123456} numberOfVoters={69} maximumVoters={420}/>)

        expect(screen.getByText("Session 123456"));
        expect(screen.getByText("69/420 Voters"));
    })
})