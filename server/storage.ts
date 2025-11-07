import { type Session, type InsertSession, type Prediction, type InsertPrediction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSession(id: string, data: Partial<InsertSession>): Promise<Session | undefined>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getSessionPredictions(sessionId: string): Promise<Prediction[]>;
  getAllSessions(): Promise<Session[]>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, Session>;
  private predictions: Map<string, Prediction>;

  constructor() {
    this.sessions = new Map();
    this.predictions = new Map();
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = {
      id,
      startTime: new Date(),
      endTime: null,
      totalRecognitions: insertSession.totalRecognitions || 0,
      averageConfidence: insertSession.averageConfidence || 0,
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: string, data: Partial<InsertSession>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updated: Session = {
      ...session,
      ...data,
      endTime: data.endTime !== undefined ? data.endTime : session.endTime,
    };
    this.sessions.set(id, updated);
    return updated;
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const id = randomUUID();
    const prediction: Prediction = {
      id,
      timestamp: new Date(),
      ...insertPrediction,
    };
    this.predictions.set(id, prediction);
    return prediction;
  }

  async getSessionPredictions(sessionId: string): Promise<Prediction[]> {
    return Array.from(this.predictions.values())
      .filter(p => p.sessionId === sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }
}

export const storage = new MemStorage();
