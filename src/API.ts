import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

// below uses the types from Question, and add the answers property to it
export type QuestionsState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
  // return type is a Promise
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  
  // why double await?
  // first await the fetch itself
  // then await when convert response to JSON
  const data = await (await fetch(endpoint)).json();
  // map through all and add the property, answers: string[] from line 12
  return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
  }));
};