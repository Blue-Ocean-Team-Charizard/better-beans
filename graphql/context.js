import { PrismaClient } from '@prisma/client';
import prisma from './index';

export const Context = {
  prisma: PrismaClient,
};

export const createContext = ({ req, res }) => ({ prisma });
