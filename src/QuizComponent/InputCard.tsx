import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { CategoryDetails } from '../API/QuizData';
import { inputPropType, CategoryType, DIFFICULTY } from '../Types/quizTypes';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '80%',
      },
    },
  }),
);

const questions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];


const InputCard: React.FC<inputPropType> = ({category, setCategory, totalQuestion, setTotalQuestion, difficulty, setDifficulty, callback }) => {
  const classes = useStyles();
  let [categoryData, setCategoryData] = useState<CategoryType[]>([]);


  useEffect(() => {
    async function Categories() {
      const categoryData = await CategoryDetails();
      setCategoryData(categoryData);
    }
    Categories();
  }, [])


  return (
    <form className={classes.root}
      action=''
      onSubmit={(e: React.FormEvent<EventTarget>) =>
        callback(e, category, totalQuestion, difficulty)
      }
    >
      <div className='configuration'>
      <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          defaultValue={category}
          required
          onChange={(event) => setCategory(Number(event.target.value))}
          label="Category"
        >
          {categoryData.map ((option: CategoryType, ind: number) => (
            <MenuItem key={ind} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </div>
      

      <div className='configuration' >
        <FormControl variant="outlined" fullWidth className='formControl'>
        <InputLabel id="demo-simple-select-outlined-label">
          No of Questions
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={totalQuestion}
          defaultValue={totalQuestion}
          required
          onChange={(event) => setTotalQuestion(Number(event.target.value))}
          label="No of Questions"
        >
          {questions.map ((question: number, ind: number) => (
            <MenuItem key={ind} value={question}>
              {question}
            </MenuItem>
          ))}
        </Select>
          </FormControl>
      </div>


      <div className='configuration' >
        <FormControl variant="outlined" fullWidth className='formControl'>
        <InputLabel id="demo-simple-select-outlined-label">
        Difficulty Level
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={difficulty}
          defaultValue={difficulty}
          required
          onChange={(event) => setDifficulty(event.target.value as DIFFICULTY)}
          label="Difficulty Level"
        >
            <MenuItem value={DIFFICULTY.EASY}>
              Easy
            </MenuItem>
            <MenuItem value={DIFFICULTY.MEDIUM}>
              Medium
            </MenuItem>
            <MenuItem value={DIFFICULTY.DIFFICULT}>
              Hard
            </MenuItem>
        </Select>
          </FormControl>
      </div>

      < input className="startBtn" value="Start Quiz" type='submit' />
    </form>
  )
  
}

export default InputCard
