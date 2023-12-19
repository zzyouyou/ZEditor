import { createModel } from '@rematch/core'
import type { RootModel } from '.'
import { Dispatch, RootState } from './store'
import { useDispatch, useSelector } from 'react-redux'

type QuestionType = 'boolean' | 'multiple' | 'mixed'
type QuestionsState = {
	questions: number[]
	amount: number
	type: QuestionType
}

export const questions = createModel<RootModel>()({
	state: {
		questions: [],
		amount: 2,
		type: 'boolean',
	} as QuestionsState,
	reducers: {
		setQuestions(state, payload: Array<number>) {
			return { ...state, questions: payload }
		},
	},
	effects: (dispatch) => ({
		async loadQuestions() {
			dispatch.questions.setQuestions([1, 2])
		},
        async otherLoadQuestion() {
            console.log(1);
        },
	}),
})

/**
 * 导出store hook
 *
 * @export
 */
export function useDemoStore() {
  const { state } = useSelector((state: RootState) => ({
    state: state.questions
  }));
    const rematchDispatch = useDispatch<Dispatch>();
    
  return {
    state,
      userViewConfigDispatch: rematchDispatch.useDemoStore
  };
}


