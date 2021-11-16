import {PrismaClient} from '@prisma/client';
import {DeepMockProxy, mockDeep} from "jest-mock-extended";

export interface Context {
    prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const context: Context = {
    prisma: prisma,
};

/*Testspesifikke exports*/

export const testClient: PrismaClient = new PrismaClient({
    datasources: {
        db: {
            url: "file:./test.db"
        }
    }
})

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    }
}
