import {PrismaClient} from '@prisma/client';
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import * as Process from "process";

export interface Context {
    prisma: PrismaClient;
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: Process.env.SQLITE_PATH
        }
    }
});

export const context: Context = {
    prisma: prisma,
};

/*Testspesifikke exports*/

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    };
};
