import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import { QuestionCardType } from '../Types/quizTypes';

const QuestionCard: React.FC<QuestionCardType> = ({ question, answer, option, totalQuestion, currentQuestion, callback }) => {
    
    const [selectedAns, setSelectedAns] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAns(e.target.value)
    }


    return (
        <div className='questionCard'>
            <div className='questionAlign'>
                <div>Question: {++currentQuestion} / {totalQuestion}</div>
                <div className='question'>Q: {question}</div>
            </div>

            <form className='question-form' action='' onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="option" name="option" value={selectedAns} onChange={handleChange}>
                    {option.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                <FormControlLabel value={opt} control={<Radio required={true} />} label={opt} />
                            </div>
                            
                        )
                        
                    })}
                    
                </RadioGroup>
                </FormControl>
                
                <input className="submit-btn" value="Next" type='submit' />
            </form>
            
            
        </div>
    )
}

export default QuestionCard;
